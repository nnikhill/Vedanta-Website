import { useEffect, useState } from "react";
import axios from "axios";
import { CourseCard } from "./CourseCard";

export function ExploreCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("https://vedanta-website.onrender.com/api/courses")
      .then((res) => setCourses(res.data))
      .catch(() => {
        // fallback demo data
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
    <section className="bg-gradient-to-br from-white to-purple-50 min-h-screen py-16 px-6">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Explore <span className="text-purple-600">Courses</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Choose from our wide range of professional courses 🚀
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 
                      grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
}