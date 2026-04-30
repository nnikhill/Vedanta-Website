import { FaInstagram, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-bold text-purple-700">
            VCE
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Vedanta Computer Education provides modern courses to help students
            build real-world skills in programming and technology 🚀
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-purple-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/explore_courses" className="hover:text-purple-600">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-purple-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Popular Courses
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-purple-600">Web Development</li>
            <li className="hover:text-purple-600">Python Programming</li>
            <li className="hover:text-purple-600">Java & DSA</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Connect With Us
          </h3>

          <div className="flex space-x-4 text-2xl text-gray-600">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-600 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-600 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-600 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-600 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
        © 2026{" "}
        <span className="text-purple-600 font-semibold">VCE</span> - Vedanta
        Computer Education. All rights reserved.
      </div>
    </footer>
  );
}