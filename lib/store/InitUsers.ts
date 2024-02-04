'use client';

import { useEffect, useRef } from 'react';
import { Iuser, useUsers } from './users';

export default function InitUsers({ users }: { users: Iuser[] | undefined }) {
  const initState = useRef(false);

  useEffect(() => {
    if (!initState.current) {
      useUsers.setState({ users });
    }
    initState.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
