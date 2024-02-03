import { Button } from '@/components/ui/button';

export default function Chat() {
  return (
    <div className="w-full flex flex-col max-w-screen-lg border">
      <div className="w-full flex justify-between items-center border-b p-8">
        <h1 className="text-2xl">Welcome: username</h1>
        <Button className="w-20">Logout</Button>
      </div>
      <div className="flex gap-8 p-8">
        <div className="w-1/2">users list</div>
        <div className="w-1/2 flex flex-col gap-4">
          <div>chat history</div>
          <div>input text</div>
        </div>
      </div>
    </div>
  );
}
