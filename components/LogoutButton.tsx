'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button className="w-20" onClick={handleLogout}>
      Logout
    </Button>
  );
}
