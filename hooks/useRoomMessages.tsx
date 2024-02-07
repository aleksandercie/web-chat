import { useEffect } from 'react';
import { useMessage } from '@/lib/store/messages';
import { useRooms } from '@/lib/store/rooms';
import { supabaseBrowser } from '@/lib/supabase/browser';

export const useRoomMessages = () => {
  const { activeRoom } = useRooms((state) => state);
  const { updateMessages, setLoadingMessages } = useMessage((state) => state);
  const supabase = supabaseBrowser();

  useEffect(() => {
    if (!activeRoom) return;
    setLoadingMessages(true);
    const fetchRoomMessages = async () => {
      const { data: messages, error } = await supabase
        .from('messages')
        .select(
          `
        created_at,
        id,
        room_id,
        send_by,
        text,
        users (
          avatar_url,
          created_at,
          display_name,
          id
        )
      `
        )
        .eq('room_id', activeRoom.id);

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        updateMessages(messages);
        setLoadingMessages(false);
      }
    };

    fetchRoomMessages();
  }, [activeRoom, updateMessages, supabase]);
};
