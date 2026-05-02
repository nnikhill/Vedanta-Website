import { useState } from "react";
import axios from "axios";
import { CourseCard } from "./CourseCard";
import { motion } from "framer-motion";

export function SearchCourses() {
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);

      const res = await axios.get(
        `https://vedanta-website.onrender.com/api/courses?search=${query}`
      );

      setCourses(res.data);
    } catch (err) {
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-white to-purple-100 py-16 px-6">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Search <span className="text-purple-600">Courses</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Find the best course for you 🚀
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto flex items-center bg-white shadow-md rounded-xl overflow-hidden">
        <input
          type="text"
          placeholder="Search courses like Web, Python..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && search()} // 🔥 Enter key
          className="flex-1 p-4 outline-none"
        />

        <button
          onClick={search}
          className="bg-purple-600 text-white px-6 py-4 hover:bg-purple-700 transition"
        >
          Search
        </button>
      </div>

      {/* 🔥 Results ONLY after search */}
      {hasSearched && (
        <div className="max-w-7xl mx-auto mt-12">

          {/* Loading */}
          {loading && (
            <p className="text-center text-gray-500">
              Searching... 🔍
            </p>
          )}

          {/* No Results */}
          {!loading && courses.length === 0 && (
            <p className="text-center text-gray-500">
              No courses found 😔
            </p>
          )}

          {/* Courses Grid */}
          <div className="grid gap-8 
                          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {courses.map((course) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>

        </div>
      )}
    </section>
  );
}