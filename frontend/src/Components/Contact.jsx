import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const API = "https://vedanta-website.onrender.com/api";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!form.name || !form.email || !form.message) {
      return alert("Please fill all required fields ⚠️");
    }

    try {
      setLoading(true);

      await axios.post(`${API}/contact`, form);

      alert("Message sent successfully ✅");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (err) {
      console.log(err);
      alert("Failed to send ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-white to-purple-50 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
       <motion.div
  initial={{ opacity: 0, x: -60 }}
  animate={{ opacity: 1, x: 0 }}
>
  <h2 className="text-3xl font-bold">
    Get in <span className="text-purple-600">Touch</span>
  </h2>

  <p className="mt-4 text-gray-600">
    Fill the form and we’ll contact you 🚀
  </p>

  {/* ✅ IMAGE BACK */}
  <img
    src="https://i.pinimg.com/1200x/35/e0/dc/35e0dc16b3ac8a55de11a8f5a21f2eae.jpg"
    alt="Contact"
    className="mt-8 w-full max-w-md"
  />
</motion.div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <form onSubmit={submit} className="space-y-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full border p-3 rounded"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full border p-3 rounded"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border p-3 rounded"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full border p-3 rounded"
            />

            <button
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </motion.div>
      </div>
    </section>
  );
}