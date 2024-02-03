'use client';
import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';

export default function Login() {
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
    <div className="w-full flex flex-col items-center max-w-screen-lg">
      <h1 className="text-2xl text-center">WeChat</h1>
      <Button className="w-full max-w-xs mt-8" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
}
