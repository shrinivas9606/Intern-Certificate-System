// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../firebase";

// export default function PrivateRoute({ children }) {
//   const [user, loading] = useAuthState(auth);

//   if (loading) return <p className="p-4">Checking authentication...</p>;
//   if (!user) return <Navigate to="/login" replace />;

//   return children;
// }


// ✅ Update PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "../firebase";
import { ref, onValue } from "firebase/database";

export default function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    if (user) {
      const userRef = ref(database, `users/${user.uid}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setIsAdmin(data?.role === "admin");
      });
    }
  }, [user]);

  if (loading || isAdmin === null) return <p className="p-4">🔐 Checking access...</p>;
  if (!user || !isAdmin) return <Navigate to="/login" replace />;

  return children;
}
