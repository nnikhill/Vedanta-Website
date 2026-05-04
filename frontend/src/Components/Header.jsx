import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");

    setIsLogin(!!token);
    setEmail(userEmail);
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

  const handleNavClick = () => {
    setMobileMenu(false);
    setOpenDropdown(null);
  };

  const scrollToContact = () => {
    handleNavClick();
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
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-purple-700">
          VCE
        </Link>

        {/* DESKTOP MENU */}
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

          <button onClick={scrollToContact}>Contact</button>
          <Link to="/payment">Fee Payment</Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">
          {isLogin ? (
            <>
              <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                <div className="w-7 h-7 bg-purple-600 text-white flex items-center justify-center rounded-full text-sm">
                  {email?.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs text-purple-700">{email}</span>
              </div>

              <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="bg-purple-600 text-white px-3 py-1 rounded-md">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* MOBILE ICON */}
        <button className="md:hidden text-2xl text-purple-700" onClick={() => setMobileMenu(!mobileMenu)}>
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-4 text-gray-700">

          <Link to="/" onClick={handleNavClick}>Home</Link>

          {/* REUSABLE DROPDOWN BLOCK */}
          {[
            {
              title: "About",
              key: "about",
              links: [
                { name: "About", path: "/about" },
                { name: "Director", path: "/director" }
              ]
            },
            {
              title: "Courses",
              key: "courses",
              links: [
                { name: "Basic", path: "/basic" },
                { name: "Advanced", path: "/advanced" }
              ]
            },
            {
              title: "Student",
              key: "student",
              links: [
                { name: "Result", path: "/result" },
                { name: "Certificate", path: "/certificate" }
              ]
            },
            {
              title: "Download",
              key: "download",
              links: [
                { name: "Notes", path: "/notes" },
                { name: "Syllabus", path: "/syllabus" }
              ]
            },
            {
              title: "Franchise",
              key: "franchise",
              links: [
                { name: "Apply", path: "/apply" },
                { name: "Benefits", path: "/benefits" }
              ]
            },
            {
              title: "Gallery",
              key: "gallery",
              links: [
                { name: "Photos", path: "/photos" },
                { name: "Videos", path: "/videos" }
              ]
            }
          ].map((menu) => (
            <div key={menu.key}>
              <button
                className="w-full text-left font-medium"
                onClick={() => toggleDropdown(menu.key)}
              >
                {menu.title} ▾
              </button>

              {openDropdown === menu.key && (
                <div className="ml-4 mt-2 space-y-2">
                  {menu.links.map((link, i) => (
                    <Link key={i} to={link.path} onClick={handleNavClick}>
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button onClick={scrollToContact}>Contact</button>
          <Link to="/payment" onClick={handleNavClick}>Fee Payment</Link>

          {/* AUTH */}
          {isLogin ? (
            <>
              <div className="text-sm text-purple-700">{email}</div>
              <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleNavClick}>Login</Link>
              <Link to="/signup" onClick={handleNavClick} className="bg-purple-600 text-white px-3 py-1 rounded">
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}