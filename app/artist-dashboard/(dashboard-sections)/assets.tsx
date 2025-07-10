export default function Assets() {
  return (
    <div className="min-h-dvh bg-base-10 space-y-4">
      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">Collection</p>
        <p className="text-gray-500 mb-8">Manage your assets here.</p>
      </div>

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">Images</p>
        <p className="text-gray-500 mb-8">Manage your images here.</p>
      </div>

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">Videos</p>
        <p className="text-gray-500 mb-8">Manage your videos here.</p>
      </div>

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">Audio</p>
        <p className="text-gray-500 mb-8">Manage your audio files here.</p>
      </div>
    </div>
  );
}