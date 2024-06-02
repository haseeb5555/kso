import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Footer from "../../components/footer";
import axios from 'axios';
import Nav from '@/components/stuNac';
import "./Landing.css"

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

  return (
    <>
    <div className=" min-h-screen">
     <Nav />
      

      <div className="flex justify-center items-center py-10">
        <img className="w-full max-w-screen-lg" src="/banner.png" alt="Banner Image" />
      </div>

      <div className="flex justify-center items-center py-10">
        <img className="w-full max-w-screen-lg" src="/CTA.png" alt="CTA Image" />
      </div>

      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Hakkımızda</h2>
        <p>Kocaeli Sanayi Odası hakkında bilgiler</p>
      </div>

      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-center mb-8">Courses</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md w-full sm:w-72">
              <h3 className="text-xl font-semibold mb-2">Course Name</h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex justify-between items-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring">Enroll</button>
                <span>563+ Positive Reviews</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring">See All Classes</button>
        </div>
      </div>

      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-center mb-8">Jobs</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md w-full sm:w-72">
              <h3 className="text-xl font-semibold mb-2">Job Title</h3>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex justify-between items-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring">Apply</button>
                <span>563+ Applications Submitted</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring" onClick={userType === 'student' ? handleJobsClick : handleLoginClick}>See All Jobs</button>
        </div>
      </div>

      <div className="rectangle-parent1 mt-40 max-sm:relative max-sm:flex max-sm:flex-wrap">
        <div className="group-child" />
        <div className="group-child16" />
        <div className="lorem-ipsum-dolor-container">
          <p className="p">
          Eğitim kıvılcımla ateş yakmaktır. Boş bir kabı doldurmak değildir.
          </p>
          <p className="p">&nbsp;</p>
          <p className="p">
            <i>-Sokrates</i>
          </p>
        </div>
        {/* <div className="testimonials">Testimonials</div> */}
        <div className="ellipse-div" />
      </div>
    </div>
    <div className='mt-80 max-sm:mt-0'>

    <Footer />
    </div>
    </>
  );
};

export default LandingPage;
