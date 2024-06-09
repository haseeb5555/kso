import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import Footer from "../../components/footer";
import axios from 'axios';
import StuNav from '@/components/stuNav';
import CompNav from '@/components/compNav';
import TeaNav from '@/components/teaNav';
import Nav from '@/components/simpleNav';
// import "./Landing.css"

const LandingPage = () => {
  const [userType, setUserType] = useState(null); // null, 'student', or 'company'
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const response = await axios.get('https://backend.foworks.com.tr/auth/check-session', { withCredentials: true });
        const { userType } = response.data; // Assuming the server returns { userType: 'student' } or { userType: 'company' }
        setUserType(userType);
      } catch (error) {
        console.error('Error checking session:', error);
        setUserType(null); // No session or error occurred
      }
    };

    checkUserType();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleJobsClick = () => navigate('/jobs');
  const handleCoursesClick = () => navigate('/courses');

  return (
    <>
        {userType === 'student' && <StuNav />}
        {userType === 'company' && <CompNav />}
        {userType === 'teacher' && <TeaNav />}
        {userType === null && <Nav />}
      <div className=" min-h-screen mx-20 max-w-[1440px] max-sm:mx-6">

        <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />

        <div className="flex justify-center items-center py-10 gap-60 max-sm:gap-20 max-sm:flex-col">
          <div className='flex flex-col gap-4 '>

          <button className="w-[300px] bg-[#D9D9D9] text-black px-4 py-2 rounded-lg focus:outline-none focus:ring" 
          onClick={handleCoursesClick}>Dersler
          </button>
          <button className="w-[300px] bg-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring" 
          onClick={handleJobsClick} >İş ilanları</button>
          </div>
          <img className="w-full max-w-[600px] rounded-2xl" src="/ana.jpeg" alt="Banner Image" />
        </div>
      </div>
      <img className="w-full mt-5" alt="footer banner" src="/footerbanner2-copy-1@2x.png" />

      <Footer />
    </>
  );
};

export default LandingPage;
