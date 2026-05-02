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
  useEffect(() => {
    getCourses();
    getStats();
    getMessages();
    getUsers();
    getEnrollments();
  }, []);

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
    const res = await axios.get("http://localhost:5000/api/admin/messages", {
      headers: { Authorization: "Bearer " + token },
    });
    setMessages(res.data);
  };

  const getUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/users", {
      headers: { Authorization: "Bearer " + token },
    });
    setUsers(res.data);
  };

  const getEnrollments = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/enrollments",
      { headers: { Authorization: "Bearer " + token } }
    );
    setEnrollments(res.data);
  };

  // ================= COURSE CRUD =================
  const handleSubmit = async () => {
    if (editId) {
      await axios.put(
        `http://localhost:5000/api/update-course/${editId}`,
        course,
        { headers: { Authorization: "Bearer " + token } }
      );
    } else {
      await axios.post(
        "http://localhost:5000/api/add-course",
        course,
        { headers: { Authorization: "Bearer " + token } }
      );
    }

    setCourse({ title: "", price: "", image: "", description: "" });
    setEditId(null);
    getCourses();
    getStats();
  };

  const deleteCourse = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/delete-course/${id}`,
      { headers: { Authorization: "Bearer " + token } }
    );
    getCourses();
    getStats();
  };

  const editCourse = (c) => {
    setCourse(c);
    setEditId(c._id);
    setActiveTab("add");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <div className="w-64 bg-purple-800 text-white">

        <div className="p-5 border-b border-purple-700">
          <h1 className="text-xl font-bold">Ranchi Branch</h1>
          <p className="text-sm text-purple-200">VedantaRanchi</p>
        </div>

        <div className="p-4 space-y-2 text-sm">

          <p className="text-purple-300 text-xs uppercase">
            Navigation
          </p>

          <SidebarBtn title="📊 Dashboard" tab="dashboard" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="👤 Profile" tab="profile" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="📝 Enquiry" tab="enquiry" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="🎓 Student" tab="student" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="💸 Expenses" tab="expenses" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="💰 Incomes" tab="incomes" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="📈 Report" tab="report" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="📚 Study Material" tab="study" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="📖 Courses" tab="courses" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="🧾 Marksheet" tab="marksheet" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="➕ Add Course" tab="add" {...{activeTab,setActiveTab}} />
          <SidebarBtn title="📩 Messages" tab="messages" {...{activeTab,setActiveTab}} />

        </div>
      </div>

      {/* ================= ENQUIRY ================= */}
{activeTab === "enquiry" && (
  <div className="bg-white p-6 rounded-xl shadow">

    <h2 className="text-xl font-bold mb-4">📄 STUDENT ENQUIRY</h2>

    <p className="text-purple-700 font-semibold mb-4">
      1. PERSONAL DETAILS
    </p>

    <div className="grid md:grid-cols-3 gap-4">

      <Input label="Branch Code *" placeholder="Vest/02/RAN/14486" />
      <Select label="Admission Year *" />
      <Input label="Student Name *" />

      <Input label="Date Of Birth *" type="date" />
      <Input label="Contact No *" />
      <Input label="Other Contact No." />

      <Select label="Call Status *" />
      <Select label="Last General Qualification" />
      <Textarea label="Address" />

      <Input label="Pincode *" />
      <Input label="Email Id *" />
      <Select label="Course Category *" />

      <Select label="Course *" />
      <Select label="Batch *" />
      <Input label="Date of Inquiry *" type="date" />

      <Input label="Next Date of Call *" type="date" />
      <Select label="Enquiry Source" />
      <Textarea label="Remarks" />

    </div>

    {/* BUTTONS */}
    <div className="flex gap-4 mt-6">
      <button className="bg-green-600 text-white px-6 py-2 rounded">
        Submit
      </button>

      <button className="bg-red-600 text-white px-6 py-2 rounded">
        Exit
      </button>
    </div>

  </div>
)}

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between bg-white p-4 rounded shadow mb-6">
          <h2 className="font-bold">Control Panel</h2>
          <span className="bg-green-500 text-white px-3 py-1 rounded">
            ₹ {stats.enrollments * 100}
          </span>
        </div>

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-4 gap-6">

            <Card title="STUDENT" value={stats.users} color="bg-pink-500" />
            <Card title="SYLLABUS" value="1" color="bg-blue-500" />
            <Card title="STUDY MATERIALS" value="1" color="bg-teal-500" />
            <Card title="VIDEO CLASSES" value="1" color="bg-purple-500" />

            <Card title="PROGRAM" value="10" color="bg-orange-500" />
            <Card title="COURSES" value={stats.courses} color="bg-blue-600" />
            <Card title="SUBJECT" value="26" color="bg-yellow-500" />
            <Card title="MARKSHEET" value="118" color="bg-red-500" />

            <Card title="LEAD MANAGEMENT" value="0" color="bg-cyan-500" />

          </div>
        )}

        {/* ================= STUDENTS ================= */}
        {activeTab === "student" && (
          <div className="bg-white p-5 rounded shadow">
            <h2 className="font-bold mb-4">Students</h2>
            {users.map((u) => (
              <div key={u._id} className="border p-2 mb-2 rounded">
                {u.email}
              </div>
            ))}
          </div>
        )}

        {/* ================= COURSES ================= */}
        {activeTab === "courses" && (
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((c) => (
              <div key={c._id} className="bg-white p-4 rounded shadow">
                <img src={c.image} className="h-40 w-full object-cover" />
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <p>₹{c.price}</p>

                <button onClick={()=>editCourse(c)} className="bg-blue-500 text-white px-2 py-1 mr-2">Edit</button>
                <button onClick={()=>deleteCourse(c._id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
              </div>
            ))}
          </div>
        )}

        {/* ================= ADD COURSE ================= */}
        {activeTab === "add" && (
          <div className="bg-white p-5 rounded shadow max-w-md">
            <input placeholder="Title" value={course.title}
              onChange={(e)=>setCourse({...course,title:e.target.value})}
              className="border p-2 w-full mb-2" />

            <input placeholder="Price" value={course.price}
              onChange={(e)=>setCourse({...course,price:e.target.value})}
              className="border p-2 w-full mb-2" />

            <input placeholder="Image" value={course.image}
              onChange={(e)=>setCourse({...course,image:e.target.value})}
              className="border p-2 w-full mb-2" />

            <textarea placeholder="Description" value={course.description}
              onChange={(e)=>setCourse({...course,description:e.target.value})}
              className="border p-2 w-full mb-2" />

            <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2">
              Save
            </button>
          </div>
        )}

        {/* ================= MESSAGES ================= */}
        {activeTab === "messages" && (
          <div>
            {messages.map((m)=>(
              <div key={m._id} className="bg-white p-3 mb-2 rounded shadow">
                <b>{m.name}</b>
                <p>{m.email}</p>
                <p>{m.message}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

/* COMPONENTS */
function SidebarBtn({ title, tab, activeTab, setActiveTab }) {
  return (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-full text-left px-3 py-2 rounded ${
        activeTab === tab ? "bg-purple-600" : "hover:bg-purple-700"
      }`}
    >
      {title}
    </button>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`${color} text-white p-5 rounded shadow`}>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p>{title}</p>
      <div className="text-right text-sm mt-2">More info →</div>
    </div>
  );
}