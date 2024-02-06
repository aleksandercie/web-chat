import { User } from '@supabase/supabase-js';
import LogoutButton from './LogoutButton';
import ListMessages from './ListMessages';
import ListUsers from './ListUsers';

export default function Chat({
  user: {
    user_metadata: { user_name }
  }
}: {
  user: User;
}) {
  return (
    <div className="w-full flex flex-col max-w-screen-lg border">
      <div className="w-full flex flex-col md:flex-row gap-4 justify-between md:items-center border-b p-4 md:p-8">
        <h1 className="text-xl md:text-2xl capitalize overflow-hidden text-ellipsis whitespace-nowrap w-full">
          Welcome: <br />
          {user_name}
        </h1>
        <LogoutButton />
      </div>
      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-8">
        <div className="w-full md:w-1/2">
          <ListUsers />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-8">
          <ListMessages />
        </div>
      </div>
    </div>
  );
}
