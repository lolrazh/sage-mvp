import { SupabaseClient } from '@supabase/supabase-js';
import { SAGE_SYSTEM_PROMPT, formatOnboardingPrompt, type OnboardingData } from './sage-system';

interface DailySummary {
  date: string;
  summary: string[];
}

function formatDailySummaries(summaries: DailySummary[]): string {
  if (!summaries.length) return '';

  const formattedSummaries = summaries
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(({ date, summary }) => {
      const formattedDate = new Date(date).toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric' 
      });
      return `# ${formattedDate}\n${summary.map(s => `- ${s}`).join('\n')}`;
    })
    .join('\n\n');

  return `<about_user>\n${formattedSummaries}\n</about_user>`;
}

/**
 * Generates a contextual prompt string for a given user.
 * Fetches onboarding data and recent daily summaries from Supabase.
 * @param userId - The UUID of the user
 * @param supabase - An authenticated Supabase client instance
 * @returns The formatted prompt string with system, onboarding, and user context
 */
export async function generateUserContextPrompt(
  userId: string,
  supabase: SupabaseClient
): Promise<string> {
  try {
    // Fetch user's onboarding data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_onboarding_data')
      .eq('id', userId)
      .single();

    if (userError) {
      console.error('Error fetching onboarding data:', userError);
      throw userError;
    }

    const onboardingData = userData?.user_onboarding_data as OnboardingData;
    if (!onboardingData) {
      throw new Error('No onboarding data found for user');
    }

    // Fetch user's daily summaries (last 7 days)
    const { data: summariesData, error: summariesError } = await supabase
      .from('daily_summaries')
      .select('date, summary')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(7);

    if (summariesError) {
      console.error('Error fetching daily summaries:', summariesError);
      throw summariesError;
    }

    // Format the prompt sections
    const onboardingSection = formatOnboardingPrompt(onboardingData);
    const summariesSection = formatDailySummaries(summariesData || []);

    // Combine all sections
    return `${SAGE_SYSTEM_PROMPT}\n${onboardingSection}\n${summariesSection}`;
  } catch (error) {
    console.error('Error generating user context prompt:', error);
    // For MVP, if we can't get summaries, just return system + onboarding
    // This way chat still works, just without history
    if (error instanceof Error) {
      throw error; // Rethrow all errors
    }
    return SAGE_SYSTEM_PROMPT; // Fallback to just system prompt if error is not an Error instance
  }
} 