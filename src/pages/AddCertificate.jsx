// // src/pages/AddCertificate.jsx
// import React, { useState } from 'react';
// import { database } from '../firebase';
// import { ref, set } from 'firebase/database';
// import CertificatePreview from '../components/CertificatePreview';
// import emailjs from '@emailjs/browser';

// function AddCertificate() {
//   const [form, setForm] = useState({ name: '', domain: '', duration: '' });
//   const [certID, setCertID] = useState(null);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const generateCertID = () => `cert_${Date.now()}`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const id = generateCertID();
//     setCertID(id);
//     const certRef = ref(database, `certificates/${id}`);
//     await set(certRef, {
//       ...form,
//       date: new Date().toLocaleDateString(),
//     });
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Generate Internship Certificate</h2>
//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input name="name" placeholder="Intern Name" className="border p-2 w-full" onChange={handleChange} required />
//         <input name="domain" placeholder="Domain (e.g., Web Dev)" className="border p-2 w-full" onChange={handleChange} required />
//         <input name="duration" placeholder="Duration (e.g., May - July 2025)" className="border p-2 w-full" onChange={handleChange} required />
//         <button type="submit" className="bg-blue-600 text-white px-4 py-2">Generate</button>
//       </form>

//       {certID && (
//         <div className="mt-8">
//           <CertificatePreview data={form} certID={certID} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddCertificate;

// const sendCertificateEmail = (internData, certificateURL) => {
//   const templateParams = {
//     intern_name: internData.name,
//     intern_domain: internData.domain,
//     internship_duration: internData.duration,
//     certificate_link: certificateURL
//   };

//   emailjs.send(
//     import.meta.env.VITE_EMAILJS_SERVICE_ID,
//     import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
//     templateParams,
//     import.meta.env.VITE_EMAILJS_PUBLIC_KEY
//   ).then((res) => {
//     console.log("✅ Email sent", res);
//   }).catch((err) => {
//     console.error("❌ Email error", err);
//   });
// };


import React, { useState } from "react";
import { ref, push } from "firebase/database";
import { database } from "../firebase";
import { QRCodeCanvas } from "qrcode.react";
import emailjs from "@emailjs/browser";

export default function AddCertificate() {
  const [intern, setIntern] = useState({ name: "", domain: "", duration: "" });
  const [qrURL, setQRURL] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setIntern({ ...intern, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const certRef = push(ref(database, "certificates"));
    const certID = certRef.key;
    const certURL = `${window.location.origin}/verify?id=${certID}`;
    await certRef.set({ ...intern, views: 0, id: certID });
    setQRURL(certURL);
    setSubmitted(true);
    sendCertificateEmail(intern, certURL);
  };

  const sendCertificateEmail = (internData, certificateURL) => {
    const templateParams = {
      intern_name: internData.name,
      intern_domain: internData.domain,
      internship_duration: internData.duration,
      certificate_link: certificateURL
    };

    emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Generate Certificate</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" name="name" onChange={handleChange} placeholder="Intern Name" className="w-full border p-2" required />
        <input type="text" name="domain" onChange={handleChange} placeholder="Internship Domain" className="w-full border p-2" required />
        <input type="text" name="duration" onChange={handleChange} placeholder="Internship Duration" className="w-full border p-2" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Generate</button>
      </form>
      {submitted && (
        <div className="mt-6 text-center">
          <QRCodeCanvas value={url} size={160} />
          <a href={qrURL} target="_blank" rel="noreferrer" className="text-blue-600 underline">{qrURL}</a>
        </div>
      )}
    </div>
  );
}
