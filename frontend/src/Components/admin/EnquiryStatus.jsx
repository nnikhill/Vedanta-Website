// EnquiryStatus.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function EnquiryStatus() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("https://vedanta-website.onrender.com/api/admin/enquiries", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setData(res.data));
  }, []);

  return (
    <div className="p-4 grid md:grid-cols-3 gap-4">
      {data.map(e => (
        <div className="bg-white p-4 shadow rounded">
          <h3>{e.studentName}</h3>
          <p>{e.course}</p>
          <p>{e.contact}</p>
        </div>
      ))}
    </div>
  );
}