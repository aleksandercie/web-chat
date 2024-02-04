'use client';

import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';

export default function LoginButton() {
  const handleLogin = () => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: location.origin + '/auth/callback'
      }
    });
  };

  return (
    <Button className="w-full max-w-xs mt-8" onClick={handleLogin}>
      Login
    </Button>
  );
}
