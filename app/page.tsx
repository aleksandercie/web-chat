import Chat from '@/components/Chat';
import Login from '@/components/Login';
import InitUser from '@/lib/store/InitUser';
import { supabaseServer } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = supabaseServer();
  const { data } = await supabase.auth.getSession();
  const user = data.session?.user;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {user ? <Chat user={user} /> : <Login />}
      </main>
      <InitUser user={user} />
    </>
  );
}
