'use client';

import React, { useRef } from 'react'; // Ensure React is imported
import { Input } from '@/components/ui/input';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@/lib/store/user';
import { Imessage, useMessage } from '@/lib/store/messages';

export default function ChatInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const user = useUser((state) => state.user);
  const addMessage = useMessage((state) => state.addMessage);
  const supabase = supabaseBrowser();
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const text = e.currentTarget.value;

      if (text.trim()) {
        const id = uuidv4();
        console.log(text, id);
        const newMessage = {
          id,
          text,
          send_by: user?.id,
          created_at: new Date().toISOString(),
          users: {
            id: user?.id,
            avatar_url: user?.user_metadata.avatar_url,
            created_at: new Date().toISOString(),
            display_name: user?.user_metadata.user_name
          }
        };

        addMessage(newMessage as Imessage);

        const { error } = await supabase.from('messages').insert({ text });
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

  return (
    <Input
      placeholder="send message"
      onKeyDown={handleKeyDown}
      ref={inputRef}
    />
  );
}
