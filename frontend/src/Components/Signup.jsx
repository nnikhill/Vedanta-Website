import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/signup", data);
      alert("Signup Successful 🎉");
      nav("/login");
    } catch (err) {
      alert("Signup Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center px-6">
      
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Left Illustration */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center justify-center bg-purple-50 p-6"
        >
          <img
            src="https://i.pinimg.com/736x/23/64/cf/2364cff80b4d38fcfe4c5911f4470994.jpg"
            alt="Signup"
            className="w-full max-w-sm"
          />
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 md:p-10"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account 🚀
          </h2>
          <p className="text-gray-500 mt-2">
            Join VCE and start learning today
          </p>

          {/* Form */}
          <div className="mt-6 space-y-4">

            <input
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
              className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none p-3 rounded-lg"
            />

            <input
              type="password"
              placeholder="Create password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none p-3 rounded-lg"
            />

            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-600 transition shadow-md"
            >
              {loading ? "Creating Account..." : "Signup"}
            </button>
          </div>

          {/* Footer Link */}
          <p className="mt-6 text-sm text-gray-500 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-purple-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}