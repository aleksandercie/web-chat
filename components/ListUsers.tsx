import { Suspense } from 'react';
import { supabaseServer } from '@/lib/supabase/server';
import InitUsers from '@/lib/store/InitUsers';
import Users from './Users';

export default async function ListUsers() {
  const supabase = supabaseServer();
  const { data } = await supabase.from('users').select('*');

  return (
    <Suspense fallback="loading...">
      <Users />
      <InitUsers users={data || []} />
    </Suspense>
  );
}
