import { Button } from '@/components/ui/button';

export default function Login() {
  return (
    <div className="w-full flex flex-col items-center max-w-screen-lg">
      <h1 className="text-2xl text-center">WeChat</h1>
      <Button className="w-full max-w-xs mt-8">Login</Button>
    </div>
  );
}
