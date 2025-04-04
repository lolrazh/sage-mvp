'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';

export function AuthTest() {
  const { user, signOut } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function fetchUserData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // First, check if user exists in the users table
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "not found" error
          throw fetchError;
        }

        if (!existingUser) {
          // If user doesn't exist, create them
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: user.id,
                onboarding_data: {
                  email: user.email,
                  created_at: new Date().toISOString(),
                }
              }
            ])
            .select()
            .single();

          if (insertError) throw insertError;
          setUserData(newUser);
        } else {
          setUserData(existingUser);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [user, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Auth Status</h2>
        <pre className="bg-gray-800 p-4 rounded overflow-auto">
          {JSON.stringify({ user }, null, 2)}
        </pre>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {userData && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Database User Data</h2>
          <pre className="bg-gray-800 p-4 rounded overflow-auto">
            {JSON.stringify(userData, null, 2)}
          </pre>
        </div>
      )}

      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
} 