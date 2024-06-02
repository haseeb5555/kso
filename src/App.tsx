import { Route, Routes } from "react-router-dom"
import Footer from "./components/footer"

import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/SignUp"

import AboutUs from "./pages/AboutUs/about"
import LandingPage from "./pages/Landing/landing"
import ContactUs from "./pages/ContactUs/contact-us"
import AddJob from "./pages/addjob/add-job"
import TeacherProfile from "./pages/TeacherProfile/teacher-profile"
import CompanyProfile from "./pages/CompanyProfile/comany-profile"
import StudentProfile from "./pages/StudentProfile/student-profile"

function App() {


  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/StudentProfile" element={<StudentProfile />} />
      <Route path="/CompanyProfile" element={<CompanyProfile />} />
      <Route path="/TeacherProfile" element={<TeacherProfile />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/aboutus" element={<AboutUs />} />
      {/* <Route path="/jobs" element={<Jobs />} />
      <Route path="/courses" element={<Courses/>} /> */}
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/addjob" element={<AddJob />} />
      {/* <Route path="/hire/:jobId" element={<Hire />} />
      <Route path="/jobinfopage/:jobId" element={<JobInfoPage />} />
      <Route path="/courseInfoPage/:courseId" element={<CourseInfoPage />} />
      <Route path="/navba" element={<Stu />}/> */} 
      <Route path="/footer" element={<Footer />} />
    </Routes>
  )
}

export default App
