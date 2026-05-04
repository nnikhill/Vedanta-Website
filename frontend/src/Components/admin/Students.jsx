// Students.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("https://vedanta-website.onrender.com/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStudents(res.data));
  }, []);

  return (
    <div className="p-4 grid md:grid-cols-3 gap-4">
      {students.map(s => (
        <div className="bg-white p-4 shadow rounded">
          <h3>{s.email}</h3>
          <p>Role: {s.role}</p>
        </div>
      ))}
    </div>
  );
}