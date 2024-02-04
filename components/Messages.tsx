'use client';

import { useMessage } from '@/lib/store/messages';
import Image from 'next/image';
import { useRef } from 'react';
import Spinner from './Spinner';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useSupabaseSubscription } from '@/hooks/useSupabaseSubscription';
import { useUsers } from '@/lib/store/users';

export default function Messages() {
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { messages } = useMessage((state) => state);
  const { activeUsers } = useUsers((state) => state);

  useSupabaseSubscription();
  useAutoScroll(scrollRef);

  const isUserActive = (id: string) =>
    activeUsers?.some((user) => user.id === id);

  return (
    <div
      className="flex flex-col gap-2 overflow-y-auto max-h-[320px]"
      ref={scrollRef}
    >
      {messages === undefined && <Spinner />}
      {messages?.map((message) => (
        <div className="flex gap-3" key={message?.text}>
          <Image
            src={message?.users?.avatar_url!}
            alt={message?.users?.display_name!}
            width={32}
            height={32}
            className="rounded-full ring-2 h-8 w-8"
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-col lg:flex-row gap-1 lg:gap-2 lg:items-center">
              <div className="flex items-center gap-1">
                {message?.users?.id && isUserActive(message?.users?.id) && (
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                )}
                <h2 className="font-bold capitalize text-sm">
                  {message?.users?.display_name}
                </h2>
              </div>
              <h3 className="text-gray-400 text-xs w-28">
                {new Date(message?.created_at!).toDateString()}
              </h3>
            </div>
            <p className="text-gray-300">{message?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
