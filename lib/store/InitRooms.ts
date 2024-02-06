'use client';

import { useEffect, useRef } from 'react';
import { Iroom, useRooms } from './rooms';

export default function InitRooms({ rooms }: { rooms: Iroom[] }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useRooms.setState({ rooms });
    }
    initState.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
