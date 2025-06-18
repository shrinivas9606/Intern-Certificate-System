// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, form.email, form.password);
//       navigate("/"); // redirect to dashboard
//     } catch (err) {
//       setError("Invalid credentials");
//     }
//   };

//   return (
//     <div className="p-4 max-w-sm mx-auto">
//       <h2 className="text-xl font-bold">Admin Login</h2>
//       <form onSubmit={handleLogin} className="space-y-3 mt-4">
//         <input type="email" name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2" />
//         <input type="password" name="password" onChange={handleChange} placeholder="Password" className="w-full border p-2" />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2">Login</button>
//         {error && <p className="text-red-600">{error}</p>}
//       </form>
//     </div>
//   );
// }





import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/add");
    } catch (err) {
      setError("Invalid credentials or user does not exist");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" className="w-full border p-2" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full border p-2" onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-600 text-white px-4 py-2 w-full">Login</button>
      </form>
    </div>
  );
}
