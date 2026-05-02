import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://vedanta-website.onrender.com/api/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => {
        setError("Course not found ❌");
      });
  }, [id]);

  const buyCourse = async () => {
    const { data } = await axios.post(
      "https://vedanta-website.onrender.com/api/payment",
      {
        amount: course.price,
      }
    );

    const options = {
      key: "YOUR_RAZORPAY_KEY",
      amount: data.amount,
      currency: "INR",
      name: "VCE - Vedanta Computer Education",
      description: course.title,
      image: course.image,
      handler: function () {
        alert("Payment Successful 🎉");
      },
      theme: {
        color: "#7c3aed",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!course) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <section className="bg-gradient-to-br from-white to-purple-50 py-16 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img
            src={course.image}
            alt={course.title}
            className="rounded-2xl shadow-lg w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {course.title}
          </h1>

          <p className="mt-4 text-gray-600">
            {course.description}
          </p>

          <p className="mt-6 text-2xl font-bold text-purple-600">
            ₹{course.price}
          </p>

          <ul className="mt-4 text-gray-600 space-y-2">
            <li>✔ Lifetime Access</li>
            <li>✔ Certificate Included</li>
            <li>✔ Beginner to Advanced</li>
          </ul>

          <button
            onClick={buyCourse}
            className="mt-8 w-full md:w-auto bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Enroll Now 🚀
          </button>
        </motion.div>
      </div>
    </section>
  );
}