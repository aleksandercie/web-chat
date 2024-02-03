import { User } from '@supabase/supabase-js';
import LogoutButton from './LogoutButton';
import { Input } from '@/components/ui/input';
import Message from './Message';

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
          <div className="flex flex-col gap-2">
            <Message />
          </div>
          <Input placeholder="send message" />
        </div>
      </div>
    </div>
  );
}
