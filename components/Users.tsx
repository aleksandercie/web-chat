'use client';

import { useUsers } from '@/lib/store/users';
import Image from 'next/image';

export default function Users() {
  const users = useUsers((state) => state.users);

  return (
    <div className="flex flex-col gap-4 overflow-y-auto max-h-[320px]">
      <h2>User list: </h2>
      {users?.map((user) => (
        <div key={user.id} className="flex gap-2 items-center">
          <Image
            src={user.avatar_url}
            alt={user.display_name}
            width={32}
            height={32}
            className="rounded-full ring-2 h-8 w-8"
          />
          <h3 className="font-bold capitalize">{user.display_name}</h3>
        </div>
      ))}
    </div>
  );
}
