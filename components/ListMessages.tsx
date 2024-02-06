import { Suspense, lazy } from 'react';
import { supabaseServer } from '@/lib/supabase/server';
import ChatInput from './ChatInput';

const Messages = lazy(() => import('./Messages'));
const InitMessages = lazy(() => import('@/lib/store/InitMessages'));
const InitRooms = lazy(() => import('@/lib/store/InitRooms'));

export default async function ListMessages({ userId }: { userId: string }) {
  const supabase = supabaseServer();

  const { data: rooms } = await supabase
    .from('rooms')
    .select('*')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`);
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
