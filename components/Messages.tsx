'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useSupabaseSubscription } from '@/hooks/useSupabaseSubscription';
import { useMessage } from '@/lib/store/messages';
import { useRooms } from '@/lib/store/rooms';
import { useRoomMessages } from '@/hooks/useRoomMessages';
import Spinner from './Spinner';

export default function Messages() {
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { messages } = useMessage((state) => state);
  const { activeRoom } = useRooms((state) => state);

  useSupabaseSubscription();
  useRoomMessages();
  useAutoScroll(scrollRef);

  const filteredMessages = messages?.filter(
    (message) => message.room_id === activeRoom?.id
  );

  if (activeRoom === undefined) {
    return (
      <div className="max-h-[320px] h-full flex items-center justify-center">
        <p className="text-gray-300 text-center max-w-[200px] mx-auto">{`Please select a user from the list to start chatting.`}</p>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-2 max-h-[320px] ${
        filteredMessages !== undefined && 'overflow-y-auto'
      }`}
      ref={scrollRef}
    >
      {filteredMessages === undefined && <Spinner />}
      {filteredMessages?.length === 0 && (
        <p className="text-gray-300 text-center max-w-[240px] mx-auto">{`No messages in this chat yet. Start the conversation!`}</p>
      )}
      {filteredMessages?.map((message) => (
        <div className="flex gap-3" key={message?.id}>
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
                <h3 className="font-bold capitalize text-sm">
                  {message?.users?.display_name}
                </h3>
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
