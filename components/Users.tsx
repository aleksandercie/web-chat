'use client';

import Image from 'next/image';
import { useCallback } from 'react';
import { useUsers } from '@/lib/store/users';
import { useUser } from '@/lib/store/user';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { Iroom, useRooms } from '@/lib/store/rooms';
import Spinner from './Spinner';

export default function Users() {
  const { users } = useUsers((state) => state);
  const { user } = useUser((state) => state);
  const { setActiveRoom } = useRooms((state) => state);
  const supabase = supabaseBrowser();

  const handleUserClick = useCallback(
    async (otherUserId: string) => {
      if (!user) return;

      const { data: rooms, error } = await supabase
        .from('rooms')
        .select('*')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .or(`user1_id.eq.${otherUserId},user2_id.eq.${otherUserId}`);

      if (error) {
        console.error('Error fetching room:', error);
        return;
      }

      let room: Iroom;
      if (rooms.length > 0) {
        room = rooms[0];
      } else {
        const { data: newRoom, error: insertError } = await supabase
          .from('rooms')
          .insert([{ user1_id: user.id, user2_id: otherUserId }])
          .select('*')
          .single();

        if (insertError) {
          console.error('Error creating new room:', insertError);
          return;
        }
        room = newRoom;
      }
      if (room) {
        setActiveRoom(room);
      }
    },
    [setActiveRoom, supabase, user]
  );

  const filteredUsers = users?.filter((otherUser) => otherUser.id !== user?.id);

  return (
    <div
      className={`flex flex-col gap-4  max-h-[320px] ${
        filteredUsers !== undefined && 'overflow-y-auto'
      }`}
    >
      <h2>Users list:</h2>
      {filteredUsers === undefined && <Spinner />}
      {filteredUsers?.map((user) => (
        <button
          key={user.id}
          className="flex gap-2 items-center"
          onClick={() => handleUserClick(user.id)}
          aria-label={`Chat with ${user.display_name}`}
        >
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
        </button>
      ))}
    </div>
  );
}
