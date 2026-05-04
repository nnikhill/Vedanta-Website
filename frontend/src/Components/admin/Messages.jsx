import { useEffect, useState } from "react";
import axios from "axios";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  const API = "https://vedanta-website.onrender.com/api";

  // ✅ SINGLE FUNCTION
  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token ❌");
        return;
      }

      const res = await axios.get(`${API}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Messages:", res.data);
      setMessages(res.data);

    } catch (err) {
      console.log("ERROR:", err.response?.data);

      // ✅ AUTO LOGOUT
      if (err.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ✅ DELETE FIX
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/message/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMessages();

    } catch (err) {
      console.log("Delete Error:", err.response?.data);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Messages</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {messages.length === 0 ? (
          <p>No messages found</p>
        ) : (
          messages.map((m) => (
            <div key={m._id} className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-sm text-gray-500">{m.email}</p>
              <p className="text-sm text-gray-500">{m.phone}</p>
              <p className="mt-2">{m.message}</p>

              <button
                onClick={() => handleDelete(m._id)}
                className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}