// // src/pages/VerifyCertificate.jsx
// import React, { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { database } from '../firebase';
// import { ref, get } from 'firebase/database';

// function VerifyCertificate() {
//   const [searchParams] = useSearchParams();
//   const certID = searchParams.get("id");
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [valid, setValid] = useState(false);

//   useEffect(() => {
//     if (certID) {
//       const certRef = ref(database, `certificates/${certID}`);
//       get(certRef).then((snapshot) => {
//         if (snapshot.exists()) {
//           setData(snapshot.val());
//           setData(certData);
//           setValid(true);

//           const viewsRef = ref(database, `certificates/${certID}/views`);
//             set(viewsRef, (certData.views || 0) + 1);
//         }
//         setLoading(false);
//       });
//     }
//   }, [certID]);

//   if (loading) return <div className="p-4">🔄 Verifying certificate...</div>;

//   return (
//     <div className="p-4 max-w-xl mx-auto text-center">
//       {valid ? (
//         <div className="bg-white border p-6 shadow-md">
//           <h1 className="text-2xl font-bold">✅ Verified Certificate</h1>
//           <p>This is to certify that</p>
//           <h2 className="text-xl font-semibold">{data.name}</h2>
//           <p>has completed the internship in</p>
//           <p><strong>{data.domain}</strong></p>
//           <p>from <strong>{data.duration}</strong></p>
//           <p>Date of Issue: {data.date}</p>
//           <p className="mt-4 text-sm text-gray-500">Certificate ID: {certID}</p>
//         </div>
//       ) : (
//         <div className="bg-red-100 p-6 rounded text-red-800">
//           ❌ Invalid or Expired Certificate
//         </div>
//       )}
//     </div>
//   );
// }

// export default VerifyCertificate;




import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ref, get, update } from "firebase/database";
import { database } from "../firebase";

export default function VerifyCertificate() {
  const [params] = useSearchParams();
  const [cert, setCert] = useState(null);
  const id = params.get("id");

  useEffect(() => {
    if (id) {
      const certRef = ref(database, `certificates/${id}`);
      get(certRef).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          update(certRef, { views: (data.views || 0) + 1 });
          setCert(data);
        } else {
          setCert(false);
        }
      });
    }
  }, [id]);

  if (cert === null) return <p>Loading...</p>;
  if (cert === false) return <p>Certificate not found</p>;

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">Internship Completion Certificate</h2>
      <p>This is to certify that <strong>{cert.name}</strong> completed an internship in <strong>{cert.domain}</strong> for <strong>{cert.duration}</strong>.</p>
      <p className="text-sm text-gray-500">Verified Views: {cert.views}</p>
    </div>
  );
}
