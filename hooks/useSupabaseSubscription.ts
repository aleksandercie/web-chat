import { useEffect } from 'react';
import { Imessage, useMessage } from '@/lib/store/messages';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { toast } from 'sonner';
import { useRooms } from '@/lib/store/rooms';

export function useSupabaseSubscription() {
  const { addMessage, optimisticIds } = useMessage((state) => state);
  const { activeRoom } = useRooms((state) => state);

  useEffect(() => {
    const supabase = supabaseBrowser();
    const channel = supabase
      .channel('chat')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        async (payload) => {
          if (
            !optimisticIds.includes(payload.new.send_by) &&
            payload.new.room_id === activeRoom?.id
          ) {
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
  }, [addMessage, optimisticIds, activeRoom?.id]);
}
