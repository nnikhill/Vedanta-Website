import { useState } from "react";
import axios from "axios";

export default function AddCourse() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  const token = sessionStorage.getItem("token");
  const API = "https://vedanta-website.onrender.com/api";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/add-course`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Course Added ✅");

      setForm({
        title: "",
        price: "",
        image: "",
        description: "",
      });

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Add Course</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
        >
          Add Course
        </button>

      </form>
    </div>
  );
}