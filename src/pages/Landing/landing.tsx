import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";

import Footer from "../../components/footer";

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
      <div className="mx-auto max-w-[1440px]  flex flex-col justify-center items-center  ">
        <img className="w-full" alt="header banner" src="/header-copy-2@2x.png" />
     

        <div className="flex justify-center items-center py-10 gap-16 max-sm:gap-20 max-sm:flex-col ">
          <img className="w-full max-w-[500px] rounded-2xl h-[300px]  max-sm:w-[340px] max-sm:h-full  max-sm:mb-0"  src="/ana.jpeg" alt="Banner Image" />
          <div className='flex flex-col gap-4 justify-center items-center '>
          <div className='flex gap-4'>
    
              <button className="w-[200px] max-sm:w-[170px] bg-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white focus:outline-none focus:ring" 
              onClick={handleCoursesClick}>Dersler
              </button>
              <button className="w-[200px] max-sm:[170px] bg-[#D9D9D9] text-black px-4 py-2 rounded-lg hover:bg-blue-600  hover:text-white focus:outline-none focus:ring" 
              onClick={handleJobsClick} >İş ilanları</button>
          </div>
          <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className='w-[400px] max-sm:[340px] '>
          {Array.from({ length: 13 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="flex justify-center items-center">
                {/* <Card> */}
                {/* <CardContent className="flex aspect-square items-center justify-center p-6"> */}
                <img
                  onClick={()=>navigate('/haberler')}
                  src={`/images/slider/image${index+1}.jpg`}
                  className="rounded-2xl  "
                />
                {/* </CardContent> */}
                {/* </Card> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
          </div>
        </div>
      </div>
  

      <Footer />
    </>
  );
};

export default LandingPage;
