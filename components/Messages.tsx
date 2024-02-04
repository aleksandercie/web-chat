'use client';

import { useMessage } from '@/lib/store/messages';
import Image from 'next/image';

export default function Messages() {
  const messages = useMessage((state) => state.messages);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto max-h-[320px]">
      {messages.map((message) => (
        <div className="flex gap-3" key={message?.text}>
          <Image
            src={message?.users?.avatar_url!}
            alt={message?.users?.display_name!}
            width={32}
            height={32}
            className="rounded-full ring-2 h-8 w-8"
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <h2 className="font-bold capitalize">
                {message?.users?.display_name}
              </h2>
              <h3 className="text-gray-400">
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
