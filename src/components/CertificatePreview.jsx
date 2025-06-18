// src/components/CertificatePreview.jsx
import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function CertificatePreview({ data, certID }) {
  const qrRef = useRef(null);
  const certRef = useRef(null);
  const link = `${window.location.origin}/verify?id=${certID}`;

  useEffect(() => {
    QRCode.toCanvas(qrRef.current, link, { width: 100 });
  }, [link]);

  const handleDownload = async () => {
    const canvas = await html2canvas(certRef.current);
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape");
    pdf.addImage(img, "PNG", 10, 10, 270, 180);
    pdf.save(`${certID}.pdf`);
  };

  return (
    <div>
      <div ref={certRef} className="bg-white border p-6 shadow-md mt-6 text-center">
        <h1 className="text-2xl font-bold">Internship Certificate</h1>
        <p>This is to certify that</p>
        <h2 className="text-xl font-semibold">{data.name}</h2>
        <p>has successfully completed the internship in</p>
        <p><strong>{data.domain}</strong></p>
        <p>from <strong>{data.duration}</strong></p>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <canvas ref={qrRef} className="mt-4 mx-auto" />
        <p className="text-sm text-gray-500">Scan to verify</p>
      </div>
      <button className="mt-4 bg-green-600 text-white px-4 py-2" onClick={handleDownload}>Download PDF</button>
    </div>
  );
}

export default CertificatePreview;
