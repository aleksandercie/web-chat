import Chat from '@/components/Chat';
import Login from '@/components/Login';
import { supabaseServer } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data.session?.user ? <Chat user={data.session?.user} /> : <Login />}
    </main>
  );
}
