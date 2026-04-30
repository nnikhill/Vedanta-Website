import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/login", data);

      // ✅ Save data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", res.data.role); // 🔥 MOST IMPORTANT FIX

      // 🔥 Trigger header update
      window.dispatchEvent(new Event("authChanged"));

      alert("Login Successful 🎉");
      nav("/");

    } catch (err) {
      alert(err.response?.data?.message || "Invalid Credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex items-center justify-center px-6">
      
      <div className="max-w-5xl w-full grid md:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center justify-center bg-purple-50 p-6"
        >
          <img
            src="https://i.pinimg.com/1200x/ba/7b/97/ba7b970256a931702b86d4837dda51dc.jpg"
            alt="Login"
            className="w-full max-w-sm"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-8 md:p-10"
        >
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Login to continue learning
          </p>

          <div className="mt-6 space-y-4">

            <input
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
              className="w-full border border-gray-200 p-3 rounded-lg"
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              className="w-full border border-gray-200 p-3 rounded-lg"
            />

            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="mt-6 text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Signup
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}