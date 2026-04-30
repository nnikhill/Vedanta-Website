import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className=" py-20 px-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Learn Skills for Your{" "}
            <span className="text-purple-600">Future 🚀</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
            Welcome to <span className="font-semibold text-purple-700">VCE - Vedanta Computer Education</span>.  
            Start your journey with modern courses in Web Development, Programming, and more.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex space-x-4">
            <Link to='/explore_courses'>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition shadow-md">
              Explore Courses
            </button>
            </Link>
<Link to='/login'>
            <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition">
              Get Started
            </button>
            </Link>
          </div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <img
            src="https://i.pinimg.com/1200x/44/05/32/440532145ebc9d089c9617cc69726103.jpg"
            alt="Learning Illustration"
            className="w-full max-w-md"
          />
        </motion.div>
      </div>
    </section>
  );
}