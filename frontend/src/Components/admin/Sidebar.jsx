import { useNavigate } from "react-router-dom";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
    const nav = useNavigate(); // ✅ inside component

    return (
        <div className="w-64 bg-teal-800 text-white min-h-screen p-4">
            <h2 className="text-xl font-bold mb-6">Vedanta Admin</h2>

            <SidebarItem text="Dashboard" onClick={() => nav("/admin")} />
            <SidebarItem text="Courses" onClick={() => nav("/admin/courses")} />
            <SidebarItem text="Add Course" onClick={() => nav("/admin/add-course")} />

            <SidebarItem text="Students" onClick={() => nav("/admin/students")} />
            <SidebarItem text="Admin Profile" onClick={() => nav("/admin/profile")} />
            <SidebarItem text="Enquiry Form" onClick={() => nav("/admin/enquiry")} />
            <SidebarItem text="Enquiry Status" onClick={() => nav("/admin/enquiry-status")} />
            <SidebarItem text="Messages" onClick={() => nav("/admin/messages")} />
            <SidebarItem text="Logout" onClick={() => {
                localStorage.clear();
                nav("/login");
            }} />
        </div>
    );
}