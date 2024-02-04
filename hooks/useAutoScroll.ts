import { useEffect } from 'react';
import { useMessage } from '@/lib/store/messages';

export function useAutoScroll(
  scrollRef: React.MutableRefObject<HTMLDivElement>
) {
  const { messages } = useMessage((state) => state);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, scrollRef]);
}
