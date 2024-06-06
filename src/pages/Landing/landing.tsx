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
      <div className=" min-h-screen">

        {userType === 'student' && <StuNav />}
        {userType === 'company' && <CompNav />}
        {userType === 'teacher' && <TeaNav />}
        {userType === null && <Nav />}
        <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />

        <div className="flex justify-center items-center py-10">
          <img className="w-full max-w-screen-lg" src="/image2.png" alt="Banner Image" />
        </div>

        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-4">Hakkımızda</h2>
          <h6>Kocaeli Sanayi Odası tarafından başlatılan ve T.C. Çalışma ve Sosyal Güvenlik Bakanlığı'nın desteğiyle yürütülen Doğu Marmara’da Geleceğin İşlerine Uyum Projesi, toplumsal cinsiyet eşitliği odağında yenilikçi bir istihdam modeli sunmaktadır. Proje, Kocaeli ilinde gençler ve dezavantajlı grupların bilişim sektöründe nitelikli personel olarak yetiştirilmesini amaçlamaktadır. Bu kapsamda, istihdam önündeki engellerin kaldırılması ve toplumsal cinsiyet eşitliğinin sağlanması hedeflenmektedir. Cinsiyet Eşitliği Odağında Geleceğin İnsana Yakışır İşleri Yaklaşımının Desteklenmesi Hibe Programı ile desteklenen bu girişim, bölgedeki iş gücüne yeni bir soluk getirmeyi planlamaktadır.</h6>
        </div>

        <div className="flex justify-center items-center py-10">
          <img className="w-full max-w-screen-lg" src="/cta2.png" alt="CTA Image" />
        </div>



        <div className="container mx-auto py-10">
          {/* <h2 className="text-3xl font-bold text-center mb-8">Courses</h2> */}
          <div className="flex flex-wrap justify-center gap-8">
            {/* {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md w-full sm:w-72">
              <h3 className="text-xl font-semibold mb-2">Course Name</h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex justify-between items-center">
                <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring">Enroll</button>
                <span>563+ Positive Reviews</span>
              </div>
            </div>
          ))} */}
          </div>
          <div className="text-center mt-8">
            <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-lg focus:outline-none focus:ring" onClick={handleCoursesClick}>Bütün dersleri gör</button>
          </div>
        </div>

        <div className="container mx-auto py-10">
          {/* <h2 className="text-3xl font-bold text-center mb-8">Jobs</h2> */}
          <div className="flex flex-wrap justify-center gap-8">
            {/* {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md w-full sm:w-72">
              <h3 className="text-xl font-semibold mb-2">Job Title</h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex justify-between items-center">
                <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring">Apply</button>
                <span>563+ Applications Submitted</span>
              </div>
            </div>
          ))} */}
          </div>
          <div className="text-center mt-8">
            <button className="bg-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring" onClick={handleJobsClick} >Bütün ilanları gör</button>
            {/* onClick={userType === 'student' ? handleJobsClick : handleLoginClick} */}
          </div>
        </div>

        <div className="w-full bg-gray-100 py-8">
          <div className="text-center ">

            <div className="mt-4 max-w-lg mx-auto bg-white p-4 shadow-lg rounded">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <p className="mt-2 italic">Serkit</p>
            </div>
          </div>
        </div>
      </div>
      <img className="w-full mt-5" alt="footer banner" src="/footerbanner2-copy-1@2x.png" />

      <Footer />
    </>
  );
};

export default LandingPage;
