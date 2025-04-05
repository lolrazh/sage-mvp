
Okay, let's detail the plan for Phase 2: The Prompt Variable Engine. We'll treat this as a focused design and specification effort for this specific component within the larger architecture.

---

**Current Phase:** Architecture Design & Technical Specification (Focused on Prompt Engine)

**1. Objective:**
To create a dynamic, server-side utility that constructs a contextual prompt for the AI model. This prompt will incorporate the user's specific onboarding information and recent interaction history (daily summaries) to provide a personalized and historically aware context for chat interactions and insight generation.

**2. Scope:**
*   Develop a TypeScript function `generateUserContextPrompt(userId: string): Promise<string>`.
*   This function will fetch data specifically for the given `userId` from Supabase:
    *   `user_onboarding_data` from the `users` table.
    *   The 5-7 most recent `daily_summaries` from the `daily_summaries` table.
*   It will assemble the fetched data, along with the predefined system persona, into a single string formatted with XML-like tags (`<system>`, `<onboarding>`, `<about_user>`).
*   Basic error handling for data fetching will be included.

**3. Technical Design:**

*   **Function Signature:**
    ```typescript
    // Location: src/lib/prompts/generateUserContextPrompt.ts (new file)
    import { SupabaseClient } from '@supabase/supabase-js'; // Or appropriate server client type
    import { SAGE_SYSTEM_PROMPT } from './sage-system'; 

    interface OnboardingData {
      name: string;
      culture: string; // Assuming alpha3 code
      mood: string[] | string; // Adjust based on actual stored type
      environment: string;
      aspirations: string[];
      selfPerception: string;
      reflection: string;
      // Add other fields as needed from your onboarding store
    }

    interface DailySummary {
      date: string; // YYYY-MM-DD format from Supabase date type
      summary: string; // Expecting bullet points as text
    }

    /**
     * Generates a contextual prompt string for a given user.
     * Fetches onboarding data and recent daily summaries from Supabase.
     * Assembles the prompt using XML-like tags.
     * @param userId - The UUID of the user.
     * @param supabase - An authenticated Supabase client instance (server-side).
     * @returns A promise resolving to the formatted prompt string.
     */
    export async function generateUserContextPrompt(
      userId: string,
      supabase: SupabaseClient 
    ): Promise<string> {
      // Implementation details below
    }
    ```
*   **Data Fetching (within `generateUserContextPrompt`):**
    *   Use the provided `supabase` client instance (this must be a server-side client capable of making authenticated requests, likely created using `createServerClient` from `@supabase/ssr` or similar in the calling context like an API route or Server Action).
    *   **Fetch Onboarding Data:**
        ```typescript
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('user_onboarding_data')
          .eq('id', userId)
          .single(); 
        
        if (userError) {
          console.error(`Error fetching onboarding data for user ${userId}:`, userError);
          // Handle error - maybe return a default prompt or throw
        }
        const onboardingData = userData?.user_onboarding_data as OnboardingData | null;
        ```
    *   **Fetch Daily Summaries:**
        ```typescript
        const { data: summariesData, error: summariesError } = await supabase
          .from('daily_summaries')
          .select('date, summary')
          .eq('user_id', userId)
          .order('date', { ascending: false })
          .limit(7); // Fetch last 7 days

        if (summariesError) {
          console.error(`Error fetching summaries for user ${userId}:`, summariesError);
          // Handle error
        }
        const dailySummaries = (summariesData || []) as DailySummary[];
        ```
*   **Prompt Construction:**
    *   **`<system>`:** Directly use the imported `SAGE_SYSTEM_PROMPT`. **Note:** The current `SAGE_SYSTEM_PROMPT` in `src/lib/prompts/sage-system.ts` already includes hardcoded onboarding data. This needs to be refactored. The `SAGE_SYSTEM_PROMPT` should *only* contain the system instructions, and the `<onboarding>` section should be dynamically generated here.
    *   **`<onboarding>`:**
        *   Check if `onboardingData` exists.
        *   Iterate through the keys/values of `onboardingData` (or use a predefined structure matching the onboarding questions).
        *   Format into a multi-line string like:
            ```
            q1: what can I call you?
            a1: [Value from onboardingData.name]
            q2: where are you from?
            a2: [Value from onboardingData.culture]
            ...etc
            ```
        *   Handle cases where some data might be missing or have different types (e.g., `mood` array).
    *   **`<about_user>`:**
        *   Check if `dailySummaries` array is not empty.
        *   Sort summaries by date ascending (since we fetched descending).
        *   Iterate through the summaries.
        *   Format into a multi-line string, adding date headers:
            ```
            # [Date e.g., March 16]
            - [Summary bullet point 1]
            - [Summary bullet point 2]
            # [Date e.g., March 17]
            - [Summary bullet point 1]
            ...etc
            ```
    *   **Assembly:** Combine the sections using template literals:
        ```typescript
        const systemSection = `<system>\n${SAGE_SYSTEM_PROMPT}\n</system>`; // Assuming refactored prompt
        const onboardingSection = onboardingData 
          ? `<onboarding>\n${formatOnboarding(onboardingData)}\n</onboarding>` 
          : '<onboarding>\nNo onboarding data available.\n</onboarding>';
        const aboutUserSection = dailySummaries.length > 0 
          ? `<about_user>\n${formatSummaries(dailySummaries)}\n</about_user>`
          : '<about_user>\nNo recent history available.\n</about_user>';

        return `${systemSection}\n${onboardingSection}\n${aboutUserSection}`;
        ```
*   **Error Handling:** For MVP, log errors to the console. If essential data (like `user_onboarding_data`) is missing, consider returning a simplified prompt containing only the `<system>` section or throwing an error to be handled by the caller. If summaries are missing, just omit the `<about_user>` section or include the "No recent history" message.

**4. Implementation Steps:**

1.  **Refactor `SAGE_SYSTEM_PROMPT`:** Remove the hardcoded `<onboarding>` section from `src/lib/prompts/sage-system.ts`. It should only contain the core persona/behavior instructions.
2.  **Create File:** Create `src/lib/prompts/generateUserContextPrompt.ts`.
3.  **Define Types:** Add the `OnboardingData` and `DailySummary` interfaces within the file.
4.  **Implement `generateUserContextPrompt`:**
    *   Add the function signature.
    *   Implement the Supabase data fetching logic for `users` and `daily_summaries`.
    *   Implement helper functions `formatOnboarding(data: OnboardingData): string` and `formatSummaries(summaries: DailySummary[]): string`.
    *   Implement the final prompt assembly logic.
    *   Add console logging for errors.
5.  **Testing (Conceptual):** Prepare mock data for users with/without onboarding, with varying numbers of summaries, and test the output format locally.

**5. Integration Points:**

1.  **`src/app/api/chat/route.ts`:**
    *   This route **must** be authenticated to get the `userId`. The current `middleware.ts` already protects routes, but the API route itself needs to access the user session.
    *   Modify the `POST` handler:
        *   Get the `userId` from the authenticated Supabase session (e.g., using `createServerClient` with cookies/headers from the request).
        *   Instantiate the Supabase server client.
        *   Call `await generateUserContextPrompt(userId, supabase)` *before* preparing the `chatHistory`.
        *   Use the **result** of `generateUserContextPrompt` as the *single* initial "system" message (or prepend it effectively) to the AI model, replacing the current static `SYSTEM_MESSAGE`. The AI SDK/Google AI library needs to be configured to accept this full context as the initial turn or system instruction. **Crucially, ensure the entire generated context is passed correctly.**
2.  **Daily Insight Generation (Phase 5):** The future CRON job or scheduled function responsible for generating insights will also need to:
    *   Instantiate a Supabase server client.
    *   Get the `userId`.
    *   Call `generateUserContextPrompt(userId, supabase)`.
    *   Use the resulting prompt as context for the insight generation call to the AI.

**6. Testing Strategy:**

*   **Unit Tests:** Create `generateUserContextPrompt.test.ts`.
    *   Mock the Supabase client (`supabase.from().select()...`).
    *   Test with various mock data inputs:
        *   User with complete onboarding and 7 summaries.
        *   User with complete onboarding and 0 summaries.
        *   User with complete onboarding and 3 summaries.
        *   User with *missing* onboarding data (test error handling/default output).
        *   User where Supabase fetch fails (test error handling).
    *   Assert the structure and content of the returned prompt string match expectations for each case.
*   **Integration Tests:**
    *   Modify the chat API endpoint (`/api/chat`) test (if one exists) or manually test via the UI:
        *   Log the prompt being sent to the AI model to verify it includes the dynamic sections.
        *   Observe AI responses to ensure they seem contextually aware of the injected onboarding/summary data.

**7. Dependencies:**

*   `@supabase/supabase-js` or `@supabase/ssr` (for server-side client).
*   Authenticated user context (`userId`) available in the calling environment (API routes, Server Actions, etc.).
*   Refactored `SAGE_SYSTEM_PROMPT` from `src/lib/prompts/sage-system.ts`.
*   Existing Supabase tables (`users`, `daily_summaries`) with appropriate RLS policies.

**8. Risks & Mitigation:**

*   **Risk:** `SAGE_SYSTEM_PROMPT` refactoring breaks existing chat functionality before integration.
    *   **Mitigation:** Perform refactoring and `generateUserContextPrompt` implementation concurrently or ensure the old prompt is used until the new function is fully integrated into `/api/chat`.
*   **Risk:** Incorrect Supabase client usage (client vs. server, authentication).
    *   **Mitigation:** Ensure the client passed to `generateUserContextPrompt` is a server-side, authenticated client. Test authentication thoroughly during integration testing.
*   **Risk:** Performance degradation due to Supabase queries on every call.
    *   **Mitigation:** Ensure database indexes are correctly set on `users.id` (PK), `daily_summaries.user_id`, and `daily_summaries.date`. Monitor query performance. Caching could be explored later if needed, but likely premature for MVP.
*   **Risk:** Prompt formatting errors (malformed XML-like tags).
    *   **Mitigation:** Rigorous unit testing of the formatting functions (`formatOnboarding`, `formatSummaries`) and the final assembly.
*   **Risk:** Handling large onboarding data or summaries impacting prompt size.
    *   **Mitigation:** Limit summaries fetched (already set to 7). For onboarding, ensure the stored JSON isn't excessively large. This is unlikely to be an issue with a 1M token context window.

**9. Timeline Estimate:** 2-3 Days (aligned with initial plan).

---

**Current Confidence:** 85% (High confidence in the technical approach, slight uncertainty lies in the exact integration mechanics within the Next.js/API route context and ensuring the AI model correctly interprets the structured prompt).

**Next Steps:**

1.  Proceed with the "Implementation Steps" outlined above, starting with refactoring `SAGE_SYSTEM_PROMPT`.
2.  Develop the `generateUserContextPrompt` function and its helper formatters.
3.  Write unit tests for the new function.
4.  Integrate the function call into `src/app/api/chat/route.ts`, ensuring proper authentication and context passing.
5.  Perform integration testing via the chat interface.
