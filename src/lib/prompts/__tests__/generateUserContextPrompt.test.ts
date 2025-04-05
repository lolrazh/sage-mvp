import { generateUserContextPrompt } from '../generateUserContextPrompt';
import { SAGE_SYSTEM_PROMPT } from '../sage-system';
import { SupabaseClient } from '@supabase/supabase-js';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';

// Mock Supabase client
const mockSupabase = {
  from: jest.fn(),
  auth: {
    getSession: jest.fn()
  }
} as unknown as jest.Mocked<SupabaseClient>;

describe('generateUserContextPrompt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should generate a complete prompt with onboarding and summaries', async () => {
    // Mock onboarding data
    const mockOnboardingData = {
      name: 'Test User',
      culture: 'Global Citizen',
      mood: ['calm', 'hopeful'],
      environment: 'exploring something new alone',
      aspirations: ['gaining clarity', 'breaking old patterns'],
      selfPerception: 'creative and passionate',
      reflection: 'Understanding my path forward'
    };

    // Mock daily summaries
    const mockSummaries = [
      {
        date: '2025-04-04',
        summary: [
          'Felt anxious about upcoming changes',
          'Found peace in evening meditation',
          'Made progress on personal project'
        ]
      },
      {
        date: '2025-04-03',
        summary: [
          'Had a breakthrough moment',
          'Connected with old friend',
          'Reflected on past decisions'
        ]
      }
    ];

    // Setup mock responses
    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockReturnThis();
    const mockOrder = jest.fn().mockReturnThis();
    const mockLimit = jest.fn();
    const mockSingle = jest.fn();

    // Mock users table response
    mockSingle.mockImplementation(() => Promise.resolve({
      data: { onboarding_data: mockOnboardingData },
      error: null
    }));

    // Mock daily_summaries table response
    mockLimit.mockImplementation(() => Promise.resolve({
      data: mockSummaries,
      error: null
    }));

    (mockSupabase.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'users') {
        return {
          select: mockSelect,
          eq: mockEq,
          single: mockSingle
        };
      }
      return {
        select: mockSelect,
        eq: mockEq,
        order: mockOrder,
        limit: mockLimit
      };
    });

    const userId = 'test-user-id';
    const prompt = await generateUserContextPrompt(userId, mockSupabase);

    // Verify the prompt structure
    expect(prompt).toContain(SAGE_SYSTEM_PROMPT);
    expect(prompt).toContain('<onboarding>');
    expect(prompt).toContain('Test User'); // from onboarding
    expect(prompt).toContain('Global Citizen'); // from onboarding
    expect(prompt).toContain('<about_user>');
    expect(prompt).toContain('April 3'); // formatted date
    expect(prompt).toContain('April 4'); // formatted date
    expect(prompt).toContain('Had a breakthrough moment'); // from summaries
    expect(prompt).toContain('Found peace in evening meditation'); // from summaries

    // Verify Supabase calls
    expect(mockSupabase.from).toHaveBeenCalledWith('users');
    expect(mockSupabase.from).toHaveBeenCalledWith('daily_summaries');
  });

  it('should handle missing onboarding data', async () => {
    // Setup mock to return no onboarding data
    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockReturnThis();
    const mockSingle = jest.fn().mockImplementation(() => Promise.resolve({
      data: null,
      error: null
    }));

    (mockSupabase.from as jest.Mock).mockImplementation(() => ({
      select: mockSelect,
      eq: mockEq,
      single: mockSingle
    }));

    const userId = 'test-user-id';
    
    await expect(generateUserContextPrompt(userId, mockSupabase))
      .rejects
      .toThrow('No onboarding data found for user');
  });

  it('should handle missing summaries gracefully', async () => {
    // Mock onboarding data but no summaries
    const mockOnboardingData = {
      name: 'Test User',
      culture: 'Global Citizen',
      mood: ['calm', 'hopeful'],
      environment: 'exploring something new alone',
      aspirations: ['gaining clarity', 'breaking old patterns'],
      selfPerception: 'creative and passionate',
      reflection: 'Understanding my path forward'
    };

    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockReturnThis();
    const mockOrder = jest.fn().mockReturnThis();
    const mockLimit = jest.fn();
    const mockSingle = jest.fn();

    // Mock users table response
    mockSingle.mockImplementation(() => Promise.resolve({
      data: { onboarding_data: mockOnboardingData },
      error: null
    }));

    // Mock empty summaries response
    mockLimit.mockImplementation(() => Promise.resolve({
      data: [],
      error: null
    }));

    (mockSupabase.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'users') {
        return {
          select: mockSelect,
          eq: mockEq,
          single: mockSingle
        };
      }
      return {
        select: mockSelect,
        eq: mockEq,
        order: mockOrder,
        limit: mockLimit
      };
    });

    const userId = 'test-user-id';
    const prompt = await generateUserContextPrompt(userId, mockSupabase);

    // Should still include system and onboarding, but no about_user section
    expect(prompt).toContain(SAGE_SYSTEM_PROMPT);
    expect(prompt).toContain('<onboarding>');
    expect(prompt).toContain('Test User');
    expect(prompt).not.toContain('<about_user>');
  });

  it('should handle Supabase errors gracefully', async () => {
    // Setup mock to simulate a Supabase error
    const mockSelect = jest.fn().mockReturnThis();
    const mockEq = jest.fn().mockReturnThis();
    const mockSingle = jest.fn().mockImplementation(() => Promise.resolve({
      data: null,
      error: new Error('Database error')
    }));

    (mockSupabase.from as jest.Mock).mockImplementation(() => ({
      select: mockSelect,
      eq: mockEq,
      single: mockSingle
    }));

    const userId = 'test-user-id';
    
    await expect(generateUserContextPrompt(userId, mockSupabase))
      .rejects
      .toThrow('Database error');
  });
}); 