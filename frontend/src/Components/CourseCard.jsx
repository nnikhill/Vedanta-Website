import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function CourseCard({ course }) {
  const nav = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="min-w-[260px] bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100"
    >
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-40 w-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">
          {course.title}
        </h2>

        <p className="text-purple-600 font-bold mt-2 text-lg">
          ₹{course.price}
        </p>

        {/* Button */}
        <button
          onClick={() => nav(`/course/${course._id}`)}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 rounded-lg hover:from-purple-700 hover:to-purple-600 transition shadow-sm"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
}