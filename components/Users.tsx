'use client';

import { useUsers } from '@/lib/store/users';
import { useUser } from '@/lib/store/user';
import { supabaseBrowser } from '@/lib/supabase/browser';
import Image from 'next/image';
import { useEffect } from 'react';
import Spinner from './Spinner';

export default function Users() {
  const { setActiveUsersByIds, activeUsers, users } = useUsers(
    (state) => state
  );
  const user = useUser((state) => state.user);
  const supabase = supabaseBrowser();

  useEffect(() => {
    const channel = supabase.channel('room1');
    channel
      .on('presence', { event: 'sync' }, () => {
        const activeUserIds = [];
        for (const id in channel.presenceState()) {
          // @ts-ignore
          activeUserIds.push(channel.presenceState()[id][0].user_id);
        }
        setActiveUsersByIds(activeUserIds);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div
      className={`flex flex-col gap-4  max-h-[320px] ${
        users !== undefined && 'overflow-y-auto'
      }`}
    >
      <h2>Users list:</h2>
      {users === undefined && <Spinner />}
      {users?.map((user) => (
        <div key={user.id} className="flex gap-2 items-center">
          <Image
            src={user.avatar_url}
            alt={user.display_name}
            width={32}
            height={32}
            className="rounded-full ring-2 h-8 w-8"
          />
          <div className="flex gap-1 items-center">
            <h3 className="font-bold capitalize">{user.display_name}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
