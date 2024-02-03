import { User } from '@supabase/supabase-js';
import LogoutButton from './LogoutButton';
import ChatInput from './ChatInput';
import ListMessages from './ListMessages';

export default function Chat({ user }: { user: User }) {
  return (
    <div className="w-full flex flex-col max-w-screen-lg border">
      <div className="w-full flex justify-between items-center border-b p-8">
        <h1 className="text-2xl">Welcome: {user.user_metadata.user_name}</h1>
        <LogoutButton />
      </div>
      <div className="flex gap-8 p-8">
        <div className="w-1/2">users list</div>
        <div className="w-1/2 flex flex-col gap-4">
          <ListMessages />
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
