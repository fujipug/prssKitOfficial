export default function Profile() {
  return (
    <div className="min-h-screen bg-base-10 space-y-4">
      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">Profile</p>
        <p className="text-gray-500 mb-8">Manage your profile here.</p>
      </div>

      <div className="bg-base-200 border-base-300 rounded-box border p-4">
        <p className="text-lg font-bold mb-4">Settings</p>
        <p className="text-gray-500 mb-8">Adjust your account settings here.</p>
      </div>
    </div>
  );
}