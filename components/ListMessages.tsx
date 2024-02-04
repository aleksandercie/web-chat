import { Suspense, lazy } from 'react';
import { supabaseServer } from '@/lib/supabase/server';

const Messages = lazy(() => import('./Messages'));
const InitMessages = lazy(() => import('@/lib/store/InitMessages'));

export default async function ListMessages() {
  const supabase = supabaseServer();

  const { data } = await supabase.from('messages').select('*,users(*)');

  return (
    <Suspense fallback="loading...">
      <Messages />
      <InitMessages messages={data || []} />
    </Suspense>
  );
}
