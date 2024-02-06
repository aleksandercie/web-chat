'use client';

import React, { useRef } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { Input } from '@/components/ui/input';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { useUser } from '@/lib/store/user';
import { Imessage, useMessage } from '@/lib/store/messages';
import { useRooms } from '@/lib/store/rooms';

export default function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useUser((state) => state.user);
  const { activeRoom } = useRooms((state) => state);
  const { updateMessages, setOptimisticIds } = useMessage((state) => state);
  const supabase = supabaseBrowser();
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const text = e.currentTarget.value;

      if (text.trim()) {
        const id = uuidv4();
        const newMessage = {
          id,
          text,
          send_by: user?.id,
          room_id: activeRoom?.id,
          created_at: new Date().toISOString(),
          users: {
            id: user?.id,
            avatar_url: user?.user_metadata.avatar_url,
            created_at: new Date().toISOString(),
            display_name: user?.user_metadata.user_name
          }
        };

        updateMessages(newMessage as Imessage);
        setOptimisticIds(newMessage.send_by as string);

        const { error } = await supabase
          .from('messages')
          .insert({ text, room_id: activeRoom?.id });
        if (error) {
          toast.error(error.message);
        }

        if (inputRef.current) {
          inputRef.current.value = '';
        }
      } else {
        toast.error('Message can not be empty!');
      }
    }
  };

  if (!activeRoom) return;

  return (
    <Input
      placeholder="send message"
      onKeyDown={handleKeyDown}
      ref={inputRef}
    />
  );
}
