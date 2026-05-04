import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);

  const API = "https://vedanta-website.onrender.com/api";

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API}/courses`);
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="text-gray-600">Admin</span>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">

        {/* Courses Count */}
        <div className="bg-pink-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold">{courses.length}</h2>
          <p className="mt-2">Courses</p>
        </div>

        {/* Active */}
        <div className="bg-blue-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Active</h2>
          <p className="mt-2">Courses Active</p>
        </div>

        {/* Admin */}
        <div className="bg-green-500 text-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold">Admin</h2>
          <p className="mt-2">Control Access</p>
        </div>

      </div>

      {/* Recent Courses */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Recent Courses</h2>

        <div className="grid md:grid-cols-3 gap-4">
          {courses.slice(0, 3).map((c) => (
            <div key={c._id} className="bg-white p-4 rounded-xl shadow">
              <img
                src={c.image}
                alt=""
                className="h-32 w-full object-cover rounded"
              />
              <h3 className="font-bold mt-2">{c.title}</h3>
              <p className="text-gray-600">₹{c.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}