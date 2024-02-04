import { Suspense, lazy } from 'react';
import { supabaseServer } from '@/lib/supabase/server';

const Users = lazy(() => import('./Users'));
const InitUsers = lazy(() => import('@/lib/store/InitUsers'));

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
