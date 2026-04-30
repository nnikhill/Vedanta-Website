import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import { Login } from "./Components/Login";
import { Signup } from "./Components/Signup";
import CourseDetails from "./Components/CourseDetails";
import AdminPanel from "./Components/AdminPanel";
import { ExploreCourses } from "./Components/ExploreCourses";
import ProtectedAdmin from "./Components/ProtectedAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/explore_courses" element={<ExploreCourses />} />
          <Route
            path="/admin"
            element={
              <ProtectedAdmin>
                <AdminPanel />
              </ProtectedAdmin>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );

}
export default App;