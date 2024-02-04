'use client';

import { Imessage, useMessage } from '@/lib/store/messages';
import { supabaseBrowser } from '@/lib/supabase/browser';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import Spinner from './Spinner';

export default function Messages() {
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { messages, addMessage, optimisticIds } = useMessage((state) => state);

  const supabase = supabaseBrowser();
  useEffect(() => {
    const channel = supabase
      .channel('chat')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          if (!optimisticIds.includes(payload.new.send_by)) {
            const { error, data } = await supabase
              .from('users')
              .select('*')
              .eq('id', payload.new.send_by)
              .single();
            if (error) {
              toast.error(error.message);
            } else {
              const newMessage = {
                ...payload.new,
                users: data
              };
              addMessage(newMessage as Imessage);
            }
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

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
              <h2 className="font-bold capitalize text-sm">
                {message?.users?.display_name}
              </h2>
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
