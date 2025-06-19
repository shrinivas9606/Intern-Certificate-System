import React, { useState, useEffect } from "react";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Wait for useAuthState to detect login
    } catch (err) {
      setError("❌ Invalid credentials or user does not exist");
      setLoggingIn(false);
    }
  };

  useEffect(() => {
  // Only redirect if login was just attempted and user is set
  if (user && !loading && loggingIn) {
    navigate("/add");
  }
}, [user, loading, loggingIn]);

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {loggingIn && !error && <p className="text-yellow-600 mb-2">Checking access...</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 w-full" disabled={loggingIn}>
          {loggingIn ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
