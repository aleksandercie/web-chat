import { Suspense } from 'react';
import Messages from './Messages';
import { supabaseServer } from '@/lib/supabase/server';
import InitMessages from '@/lib/store/InitMessages';

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
