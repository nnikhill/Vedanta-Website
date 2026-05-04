// Profile.jsx
export default function Profile() {
  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded shadow max-w-md">
        <img
          src="https://i.pravatar.cc/150"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-center mt-4 font-bold">Admin</h2>
        <p className="text-center text-gray-500">admin@gmail.com</p>
      </div>
    </div>
  );
}