import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");
    const userRole = localStorage.getItem("role");

    setIsLogin(!!token);
    setEmail(userEmail);
    setRole(userRole);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("authChanged", checkAuth);
    return () => window.removeEventListener("authChanged", checkAuth);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  const scrollToContact = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* 🔥 LOGO (SHORT) */}
        <Link className="text-2xl font-bold text-purple-700">
          VCE
        </Link>

        {/* 🔥 MENU (COMPACT) */}
        <nav className="hidden md:flex items-center gap-5 text-sm text-gray-700">

          <Link to="/">Home</Link>

          {/* About */}
          <div className="relative group">
            <button>About ▾</button>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded w-40">
              <Link to="/about" className="block px-3 py-2 hover:bg-purple-50">About</Link>
              <Link to="/director" className="block px-3 py-2 hover:bg-purple-50">Director</Link>
            </div>
          </div>

          {/* Courses */}
          <div className="relative group">
            <button>Courses ▾</button>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded w-40">
              <Link to="/basic" className="block px-3 py-2 hover:bg-purple-50">Basic</Link>
              <Link to="/advanced" className="block px-3 py-2 hover:bg-purple-50">Advanced</Link>
            </div>
          </div>

          {/* Student */}
          <div className="relative group">
            <button>Student ▾</button>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded w-40">
              <Link to="/result" className="block px-3 py-2 hover:bg-purple-50">Result</Link>
              <Link to="/certificate" className="block px-3 py-2 hover:bg-purple-50">Certificate</Link>
            </div>
          </div>

          {/* Download */}
          <div className="relative group">
            <button>Download ▾</button>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded w-40">
              <Link to="/notes" className="block px-3 py-2 hover:bg-purple-50">Notes</Link>
              <Link to="/syllabus" className="block px-3 py-2 hover:bg-purple-50">Syllabus</Link>
            </div>
          </div>

          {/* Franchise */}
          <div className="relative group">
            <button>Franchise ▾</button>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded w-40">
              <Link to="/apply" className="block px-3 py-2 hover:bg-purple-50">Apply</Link>
              <Link to="/benefits" className="block px-3 py-2 hover:bg-purple-50">Benefits</Link>
            </div>
          </div>

          {/* Gallery */}
          <div className="relative group">
            <button>Gallery ▾</button>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded w-40">
              <Link to="/photos" className="block px-3 py-2 hover:bg-purple-50">Photos</Link>
              <Link to="/videos" className="block px-3 py-2 hover:bg-purple-50">Videos</Link>
            </div>
          </div>

          {/* Login dropdown */}
          {/* <div className="relative group">
            <button>Login ▾</button>
            <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded w-40">
              <Link to="/login" className="block px-3 py-2 hover:bg-purple-50">Student</Link>
              <Link to="/admin-login" className="block px-3 py-2 hover:bg-purple-50">Admin</Link>
            </div>
          </div> */}

          {/* Contact */}
          <button onClick={scrollToContact}>Contact</button>

          {/* Fee */}
          <Link to="/payment">Fee Payment</Link>

        </nav>

        {/* 🔥 RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">

          {isLogin ? (
            <>
              <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                <div className="w-7 h-7 bg-purple-600 text-white flex items-center justify-center rounded-full text-sm">
                  {email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-purple-700">{email}</span>
              </div>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/signup" className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}