import { useEffect, useState } from "react";
import axios from "axios";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  const token = sessionStorage.getItem("token");
  const API = "https://vedanta-website.onrender.com/api";

  const fetchCourses = async () => {
    const res = await axios.get(`${API}/courses`);
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    await axios.delete(`${API}/delete-course/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchCourses();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Courses</h2>

      <div className="grid md:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c._id} className="bg-white p-4 rounded-xl shadow">
            <img src={c.image} alt="" className="h-40 w-full object-cover rounded" />
            <h3 className="text-lg font-bold mt-2">{c.title}</h3>
            <p className="text-gray-600">₹{c.price}</p>

            <button
              onClick={() => handleDelete(c._id)}
              className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}