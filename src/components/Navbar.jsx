// ✅ FILE: components/Navbar.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);

  if (!user) return null;

  return (
    <div className="p-4 bg-gray-800 text-white flex justify-between">
      <h1 className="text-lg font-bold">Intern Admin Panel</h1>
      <button onClick={() => signOut(auth)} className="bg-red-600 px-4 py-1 rounded">
        Logout
      </button>
    </div>
  );
}
