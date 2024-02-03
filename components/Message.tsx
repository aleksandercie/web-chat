export default function Message() {
  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <h2 className="font-bold">username</h2>
        <h3 className="text-gray-400">{new Date().toDateString()}</h3>
      </div>
      <p className="text-gray-300">message</p>
    </div>
  );
}
