import { useEffect, useState } from "react";
import axios from "axios";
import { CourseCard } from "./CourseCard";
import { motion } from "framer-motion";

export function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("https://vedanta-website.onrender.com/api/courses")
      .then((res) => setCourses(res.data))
      .catch(() => {
        // 🔥 fallback demo data
        setCourses([
          {
            _id: 1,
            title: "Web Development",
            price: "₹1999",
            image: "https://i.pinimg.com/1200x/bb/25/03/bb250304e6e90a31b457b9d9dc420f18.jpg",
          },
          {
            _id: 2,
            title: "Python Programming",
            price: "₹1499",
            image: "https://i.pinimg.com/1200x/87/6d/ba/876dba1a55215f5cfd765f5e9f45d706.jpg",
          },
          {
            _id: 3,
            title: "Java Mastery",
            price: "₹1799",
            image: "https://i.pinimg.com/1200x/4c/2b/16/4c2b16e41ed0afe46e7488bf04c78624.jpg",
          },
          {
            _id: 4,
            title: "Data Structures",
            price: "₹1999",
            image: "https://i.pinimg.com/1200x/e1/1e/92/e11e92bf31754c9cef7cce3cc7a91848.jpg",
          },
           {
            _id: 5,
            title: "Web Development",
            price: "₹1999",
            image: "https://i.pinimg.com/1200x/bb/25/03/bb250304e6e90a31b457b9d9dc420f18.jpg",
          },
          {
            _id: 6,
            title: "Python Programming",
            price: "₹1499",
            image: "https://i.pinimg.com/1200x/87/6d/ba/876dba1a55215f5cfd765f5e9f45d706.jpg",
          },
          {
            _id: 7,
            title: "Java Mastery",
            price: "₹1799",
            image: "https://i.pinimg.com/1200x/4c/2b/16/4c2b16e41ed0afe46e7488bf04c78624.jpg",
          },
          {
            _id: 8,
            title: "Data Structures",
            price: "₹1999",
            image: "https://i.pinimg.com/1200x/e1/1e/92/e11e92bf31754c9cef7cce3cc7a91848.jpg",
          }
        ]);
      });
  }, []);

  return (
    <section className="py-16 bg-purple-50">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">
          Our <span className="text-purple-600">Courses</span>
        </h2>
        <p className="text-gray-500 mt-2">
          Learn trending skills with VCE 🚀
        </p>
      </div>

      {/* Slider */}
      <div className="overflow-x-auto px-6 scrollbar-hide">
        <div className="flex gap-6 w-max">
          {courses.map((c) => (
            <motion.div
              key={c._id}
              whileHover={{ scale: 1.05 }}
              className="min-w-[250px]"
            >
              <CourseCard course={c} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}