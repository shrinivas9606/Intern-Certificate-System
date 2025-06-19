
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
