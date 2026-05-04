import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import CourseDetails from "./Components/CourseDetails";
import { ExploreCourses } from "./Components/ExploreCourses";
import ProtectedAdmin from "./Components/ProtectedAdmin";

// ✅ Admin Layout + Pages
import AdminLayout from "./Components/admin/AdminLayout";
import Dashboard from "./Components/admin/Dashboard";
import Courses from "./Components/admin/Courses";
import AddCourse from "./Components/admin/AddCourse";
import Students from "./Components/admin/Students";
import Profile from "./Components/admin/Profile";
import EnquiryForm from "./Components/admin/EnquiryForm";
import EnquiryStatus from "./Components/admin/EnquiryStatus";
import Messages from "./Components/admin/Messages";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/explore_courses" element={<ExploreCourses />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedAdmin>
              <AdminLayout />
            </ProtectedAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="students" element={<Students />} />
          <Route path="profile" element={<Profile />} />
          <Route path="enquiry" element={<EnquiryForm />} />
          <Route path="enquiry-status" element={<EnquiryStatus />} />
          <Route path="messages" element={<Messages />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;