import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const linkStyle =
    "block px-4 py-2 rounded-lg hover:bg-green-700 transition";

  const activeStyle = "bg-green-700";

  return (
    <div className="flex min-h-screen">

      {/* ✅ Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-green-900 text-white p-5 transform 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 z-50`}
      >
        {/* Close button (mobile) */}
        <button
          className="md:hidden mb-4"
          onClick={() => setOpen(false)}
        >
          <X size={28} />
        </button>

        <h2 className="text-xl font-bold mb-6">Vedanta Admin</h2>

        {/* ✅ Links */}
        <nav className="space-y-2">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/courses"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Courses
          </NavLink>

          <NavLink
            to="/admin/add-course"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Add Course
          </NavLink>

          <NavLink
            to="/admin/students"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Students
          </NavLink>

          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Admin Profile
          </NavLink>

          <NavLink
            to="/admin/enquiry"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Enquiry Form
          </NavLink>

          <NavLink
            to="/admin/enquiry-status"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Enquiry Status
          </NavLink>

          <NavLink
            to="/admin/messages"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            Messages
          </NavLink>

        </nav>
      </div>

      {/* ✅ Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* ✅ Main Content */}
      <div className="flex-1 bg-gray-100 w-full">

        {/* Top Bar (mobile) */}
        <div className="flex items-center justify-between p-4 bg-white shadow md:hidden">
          <button onClick={() => setOpen(true)}>
            <Menu size={28} />
          </button>
          <h2 className="font-bold">Admin Panel</h2>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}