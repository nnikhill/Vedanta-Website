// EnquiryForm.jsx
import { useState } from "react";
import axios from "axios";

export default function EnquiryForm() {
  const [form, setForm] = useState({
    studentName: "",
    fatherName: "",
    contact: "",
    email: "",
    course: "",
    state: "",
    district: "",
    address: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await axios.post("https://vedanta-website.onrender.com/api/enquiry", form);
    alert("Submitted ✅");
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl mb-4">Student Registration</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="studentName" placeholder="Student Name" onChange={handleChange} className="border p-2"/>
        <input name="fatherName" placeholder="Father Name" onChange={handleChange} className="border p-2"/>
        <input name="contact" placeholder="Contact" onChange={handleChange} className="border p-2"/>
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2"/>
        <input name="course" placeholder="Course" onChange={handleChange} className="border p-2"/>
        <input name="state" placeholder="State" onChange={handleChange} className="border p-2"/>
        <input name="district" placeholder="District" onChange={handleChange} className="border p-2"/>
        <textarea name="address" placeholder="Address" onChange={handleChange} className="border p-2 col-span-2"/>
      </div>

      <button onClick={submit} className="bg-purple-600 text-white mt-4 px-6 py-2 rounded">
        Submit
      </button>
    </div>
  );
}