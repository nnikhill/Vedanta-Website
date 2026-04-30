import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [course, setCourse] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });

  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    enrollments: 0,
  });

  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  // ================= FETCH =================
  const getCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses");
    setCourses(res.data);
  };

  const getStats = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/stats", {
      headers: { Authorization: "Bearer " + token },
    });
    setStats(res.data);
  };

  const getMessages = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/messages",
      { headers: { Authorization: "Bearer " + token } }
    );
    setMessages(res.data);
  };

  const getUsers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/users",
      { headers: { Authorization: "Bearer " + token } }
    );
    setUsers(res.data);
  };

  const getEnrollments = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/enrollments",
      { headers: { Authorization: "Bearer " + token } }
    );
    setEnrollments(res.data);
  };

  useEffect(() => {
    getCourses();
    getStats();
    getMessages();
    getUsers();
    getEnrollments();
  }, []);

  // ================= ADD / UPDATE =================
  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/update-course/${editId}`,
          course,
          { headers: { Authorization: "Bearer " + token } }
        );
        alert("Updated ✅");
      } else {
        await axios.post(
          "http://localhost:5000/api/add-course",
          course,
          { headers: { Authorization: "Bearer " + token } }
        );
        alert("Added ✅");
      }

      setCourse({ title: "", price: "", image: "", description: "" });
      setEditId(null);
      getCourses();
      getStats();

    } catch (err) {
      alert("Error ❌");
    }
  };

  // ================= DELETE =================
  const deleteCourse = async (id) => {
    if (!window.confirm("Delete course?")) return;

    await axios.delete(
      `http://localhost:5000/api/delete-course/${id}`,
      { headers: { Authorization: "Bearer " + token } }
    );

    getCourses();
    getStats();
  };

  // ================= EDIT =================
  const editCourse = (c) => {
    setCourse(c);
    setEditId(c._id);
    setActiveTab("add");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-purple-700 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>

        <button onClick={() => setActiveTab("dashboard")} className="block w-full text-left hover:bg-purple-600 p-2 rounded">
          📊 Dashboard
        </button>

        <button onClick={() => setActiveTab("courses")} className="block w-full text-left hover:bg-purple-600 p-2 rounded">
          📚 Courses
        </button>

        <button onClick={() => setActiveTab("add")} className="block w-full text-left hover:bg-purple-600 p-2 rounded">
          ➕ Add Course
        </button>

        <button onClick={() => setActiveTab("messages")} className="block w-full text-left hover:bg-purple-600 p-2 rounded">
          📩 Messages
        </button>
      </div>

      {/* 🔥 MAIN */}
      <div className="flex-1 p-6">

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <>
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
                👥
                <div>
                  <p className="text-gray-500">Users</p>
                  <h3 className="text-xl font-bold">{stats.users}</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
                📚
                <div>
                  <p className="text-gray-500">Courses</p>
                  <h3 className="text-xl font-bold">{stats.courses}</h3>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
                🎓
                <div>
                  <p className="text-gray-500">Enrollments</p>
                  <h3 className="text-xl font-bold">{stats.enrollments}</h3>
                </div>
              </div>
            </div>

            {/* Admin Info */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">
              <h3 className="text-xl font-semibold mb-3">Logged-in Admin 👤</h3>
              <p>{email}</p>
            </div>

            {/* Users */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">
              <h3 className="text-xl font-semibold mb-4">Users</h3>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {users.map((u) => (
                  <div key={u._id} className="border p-2 rounded">
                    {u.email}
                  </div>
                ))}
              </div>
            </div>

            {/* Enrollments */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-semibold mb-4">Enrollments</h3>
              <div className="max-h-48 overflow-y-auto space-y-3">
                {enrollments.map((e) => (
                  <div key={e._id} className="border p-3 rounded">
                    <p><b>User:</b> {e.userEmail}</p>
                    <p><b>Course:</b> {e.courseTitle}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ================= COURSES ================= */}
        {activeTab === "courses" && (
          <>
            <h2 className="text-2xl font-bold mb-6">Courses</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c._id} className="bg-white p-4 rounded-xl shadow">
                  <img src={c.image} className="h-40 w-full object-cover rounded" />
                  <h3 className="font-bold mt-2">{c.title}</h3>
                  <p className="text-sm text-gray-500">{c.description}</p>
                  <p className="text-purple-600 font-bold mt-2">₹{c.price}</p>

                  <div className="flex gap-2 mt-3">
                    <button onClick={() => editCourse(c)} className="bg-blue-500 text-white px-3 py-1 rounded">
                      Edit
                    </button>

                    <button onClick={() => deleteCourse(c._id)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ================= ADD COURSE ================= */}
        {activeTab === "add" && (
          <>
            <h2 className="text-2xl font-bold mb-6">
              {editId ? "Edit Course" : "Add Course"}
            </h2>

            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <input value={course.title} placeholder="Title"
                onChange={(e) => setCourse({ ...course, title: e.target.value })}
                className="w-full border p-3 rounded" />

              <input value={course.price} placeholder="Price"
                onChange={(e) => setCourse({ ...course, price: e.target.value })}
                className="w-full border p-3 rounded" />

              <input value={course.image} placeholder="Image URL"
                onChange={(e) => setCourse({ ...course, image: e.target.value })}
                className="w-full border p-3 rounded" />

              <textarea value={course.description} placeholder="Description"
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                className="w-full border p-3 rounded" />

              <button onClick={handleSubmit}
                className="bg-purple-600 text-white px-6 py-2 rounded">
                Save
              </button>
            </div>
          </>
        )}

        {/* ================= MESSAGES ================= */}
        {activeTab === "messages" && (
          <>
            <h2 className="text-2xl font-bold mb-6">Messages</h2>

            <div className="space-y-4">
              {messages.map((m) => (
                <div key={m._id} className="bg-white p-4 rounded-xl shadow">
                  <p className="font-bold">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.email}</p>
                  <p className="mt-2">{m.message}</p>
                </div>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );
}