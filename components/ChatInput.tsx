'use client';

import React from 'react'; // Ensure React is imported
import { Input } from '@/components/ui/input';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { toast } from 'sonner';

export default function ChatInput() {
  const supabase = supabaseBrowser();
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const { error } = await supabase
        .from('messgae')
        .insert({ text: e.currentTarget.value });
      if (error) {
        toast.error(error.message);
      }
      e.currentTarget.value = '';
    }
  };
  return <Input placeholder="send message" onKeyDown={handleKeyDown} />;
}
