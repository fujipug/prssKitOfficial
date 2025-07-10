export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="torn-paper text-black flex items-end space-x-2">
        <h1 className="font-bold text-5xl sm:text-7xl">Loading</h1>
        <span className="loading loading-dots loading-xl"></span>
      </div>
    </div>
  );
}