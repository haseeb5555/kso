import { Route, Routes } from "react-router-dom"
import Footer from "./components/footer"

import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/SignUp"

import AboutUs from "./pages/AboutUs/about"
import CompanyProfile from "./pages/CompanyProfile/comany-profile"
import ContactUs from "./pages/ContactUs/contact-us"
import DetailCoursePage from "./pages/CourseDetailPage/CourseDetailPage"
import CourseInfoPage from "./pages/CourseInfoPage/course-info"
import Courses from "./pages/Courses/courses"
import VieweditJob from "./pages/Hire/Hire"
import JobInfoPage from "./pages/JobInfoPage/job-info"
import ExploreJobs from "./pages/Jobs/explore-jobs"
import LandingPage from "./pages/Landing/landing"
import StudentProfile from "./pages/StudentProfile/student-profile"
import TeacherProfile from "./pages/TeacherProfile/teacher-profile"
import AddJob from "./pages/addjob/add-job"
import Etkinlik from "./pages/Etkinlik/Etkinlik"
import AddCourse from "./pages/addCourse/add-course"
import EditCourse from "./pages/aditCourse/edit-course"
import Exam from "./pages/exam/exam"

function App() {


  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/StudentProfile" element={<StudentProfile />} />
      <Route path="/CompanyProfile" element={<CompanyProfile />} />
      <Route path="/TeacherProfile" element={<TeacherProfile />} />
      <Route path="/addCourse" element={<AddCourse />} />
      <Route path="/exam" element={<Exam />} />
      <Route path="/editCourse/:id" element={<EditCourse />} />
      <Route path="/" element={<LandingPage />} />
 
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/jobs" element={<ExploreJobs />} />
      <Route path="/courses" element={<Courses/>} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/addjob" element={<AddJob />} />
      <Route path="/hire/:jobId" element={<VieweditJob />} />
      <Route path="/jobinfopage/:jobId" element={<JobInfoPage />} />
      <Route path="/coursedetail/:courseId" element={<DetailCoursePage />} />
      <Route path="/courseInfoPage/:courseId" element={<CourseInfoPage />} />
      <Route path="/footer" element={<Footer />} />
      <Route path="/haberler" element={<Etkinlik />} />
    </Routes>
  )
}

export default App
