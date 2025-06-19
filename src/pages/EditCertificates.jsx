
import React, { useEffect, useState } from "react";
import { ref, get, remove, update } from "firebase/database";
import { database } from "../firebase";

export default function EditCertificates() {
  const [certs, setCerts] = useState({});
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", domain: "", duration: "" });

  useEffect(() => {
    const certRef = ref(database, "certificates");
    get(certRef).then(snapshot => {
      if (snapshot.exists()) setCerts(snapshot.val());
    });
  }, []);

  const startEdit = (id, data) => {
    setEditing(id);
    setForm({ name: data.name, domain: data.domain, duration: data.duration });
  };

  const handleUpdate = () => {
    const refToUpdate = ref(database, `certificates/${editing}`);
    update(refToUpdate, form).then(() => window.location.reload());
  };

  const handleDelete = (id) => {
    const refToDelete = ref(database, `certificates/${id}`);
    remove(refToDelete).then(() => window.location.reload());
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Edit Certificates</h2>
      {Object.entries(certs).map(([id, data]) => (
        <div key={id} className="border p-3 mb-2">
          {editing === id ? (
            <div className="space-y-2">
              <input className="w-full border p-1" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input className="w-full border p-1" value={form.domain} onChange={e => setForm({ ...form, domain: e.target.value })} />
              <input className="w-full border p-1" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} />
              <button className="bg-blue-600 text-white px-3 py-1 mr-2" onClick={handleUpdate}>Save</button>
            </div>
          ) : (
            <>
              <p><strong>{data.name}</strong> - {data.domain} ({data.duration})</p>
              <button className="text-blue-600 mr-2" onClick={() => startEdit(id, data)}>Edit</button>
              <button className="text-red-600" onClick={() => handleDelete(id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
