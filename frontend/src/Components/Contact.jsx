import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/contact", form);

      alert("Message sent successfully ✅");

      setForm({ name: "", email: "", message: "" });

    } catch (err) {
      alert("Failed to send ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-gradient-to-br from-white to-purple-50 py-16 px-6"> <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"> {/* Left Side (Text) */} <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} > <h2 className="text-3xl md:text-4xl font-bold text-gray-800"> Get in <span className="text-purple-600">Touch</span> </h2> <p className="mt-4 text-gray-600"> Have questions or want to join VCE? Fill out the form and we’ll get back to you soon 🚀 </p> <img src="https://i.pinimg.com/1200x/35/e0/dc/35e0dc16b3ac8a55de11a8f5a21f2eae.jpg" alt="Contact Illustration" className="mt-8 w-full max-w-md" /> </motion.div> {/* Right Side (Form) */} <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="bg-white p-8 rounded-2xl shadow-lg" >
          <form onSubmit={submit} className="space-y-4">

            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your Name"
              className="w-full border p-3 rounded"
            />

            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Your Email"
              className="w-full border p-3 rounded"
            />

            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your Message"
              className="w-full border p-3 rounded"
            />

            <button className="w-full bg-purple-600 text-white py-3 rounded">
              {loading ? "Sending..." : "Send Message"}
            </button>

          </form>
        </motion.div>
      </div>
    </section>
  );
}