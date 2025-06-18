// ✅ FILE: src/pages/CreateAdmin.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../firebase";

export default function CreateAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Add user to database with role
      await set(ref(database, `users/${uid}`), {
        email,
        role: "admin"
      });

      setMessage("✅ Admin created successfully!");
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-xl font-bold mb-2">Create Admin User</h2>
      <input type="email" placeholder="Email" className="text-black p-2 mr-2" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="text-black p-2 mr-2" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister} className="bg-blue-600 p-2 rounded">Create Admin</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

