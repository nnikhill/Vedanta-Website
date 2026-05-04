import { useEffect, useState } from "react";
import axios from "axios";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  const token = localStorage.getItem("token");
  const API = "https://vedanta-website.onrender.com/api";

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API}/messages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Messages:", res.data);
      setMessages(res.data);

    } catch (err) {
      console.log("ERROR:", err.response?.data);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${API}/message/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchMessages();
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