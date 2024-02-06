import { Suspense, lazy } from 'react';
import { supabaseServer } from '@/lib/supabase/server';
import ChatInput from './ChatInput';

const Messages = lazy(() => import('./Messages'));
const InitMessages = lazy(() => import('@/lib/store/InitMessages'));
const InitRooms = lazy(() => import('@/lib/store/InitRooms'));

export default async function ListMessages() {
  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getSession();
  const user = userData.session?.user;

  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')
    .or(`user1_id.eq.${user?.id},user2_id.eq.${user?.id}`);
  const { data } = await supabase.from('messages').select('*,users(*)');

  return (
    <Suspense fallback="loading...">
      <Messages />
      <ChatInput />
      <InitMessages messages={data || []} />
      <InitRooms rooms={rooms || []} />
    </Suspense>
  );
}
