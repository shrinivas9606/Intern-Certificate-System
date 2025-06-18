
// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/add");
//     } catch (err) {
//       setError("Invalid credentials or user does not exist");
//     }
//   };

//   return (
//     <div className="max-w-sm mx-auto p-6">
//       <h2 className="text-xl font-bold mb-4">Admin Login</h2>
//       {error && <p className="text-red-600 mb-2">{error}</p>}
//       <form onSubmit={handleLogin} className="space-y-4">
//         <input type="email" placeholder="Email" className="w-full border p-2" onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" className="w-full border p-2" onChange={(e) => setPassword(e.target.value)} required />
//         <button className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
//       </form>
//     </div>
//   );
// }

// ✅ FILE: pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoggingIn(true);

    if (!email || !password) {
      setError("⚠️ Please enter both email and password.");
      setLoggingIn(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful — wait for useAuthState to detect user
    } catch (err) {
      setLoggingIn(false);
      if (err.code === "auth/user-not-found") {
        setError("❌ User does not exist.");
      } else if (err.code === "auth/wrong-password") {
        setError("❌ Incorrect password.");
      } else {
        setError("❌ " + err.message);
      }
    }
  };

  // ✅ If user is logged in, navigate to /add
  if (user && !loading) {
    navigate("/add");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

        {error && <p className="text-red-400 mb-2">{error}</p>}
        {loggingIn && <p className="text-yellow-400 mb-2">Checking access...</p>}

        <input
          type="email"
          placeholder="Email"
          className="p-2 mb-2 w-full text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 mb-4 w-full text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 w-full p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}
