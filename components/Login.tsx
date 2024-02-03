import LoginButton from './LoginButton';

export default function Login() {
  return (
    <div className="w-full flex flex-col items-center max-w-screen-lg">
      <h1 className="text-2xl text-center">WeChat</h1>
      <LoginButton />
    </div>
  );
}
