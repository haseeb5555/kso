import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '@/components/stuNav';
import Footer from '@/components/footer';

const CourseInfoPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    console.log('courseId:', courseId);
    const [courseInfo, setCourseInfo] = useState(null);

    useEffect(() => {
        const fetchCourseInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/course/get/${courseId}`, {
                    withCredentials: true,
                  });
                setCourseInfo(response.data);
            } catch (error) {
                console.error("Error fetching course info:", error);
            }
        };
        fetchCourseInfo();
    }, [courseId]);

    const handleEnroll = async (courseId) => {
        try {
          // Check if the user is logged in by making an authenticated request
          const checkLoginResponse = await axios.get('http://localhost:3001/auth/check', { withCredentials: true });
          
          if (checkLoginResponse.data.loggedIn) {
            // User is logged in, proceed with enrollment
            const response = await axios.post(`http://localhost:3001/courseEnrollement/enroll/${courseId}`, {}, {
              withCredentials: true, // Send cookies along with the request
            });
            alert('Successfully enrolled for the course!');
          } else {
            // User is not logged in, redirect to login page
            navigate('/login');
          }
        } catch (error) {
          console.error("Error enrolling for course:", error);
          alert('Failed to enroll for the course. Please try again.');
        }
      };

    if (!courseInfo) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Nav />

            <img src="/header-copy-2@2x.png" alt="Header Copy" className="w-full mt-5" />
            <div className="min-h-screen flex flex-col items-center">
               
        
                <div className="text-center py-8">
                    <h1 className="text-3xl font-bold">{courseInfo.title}</h1>
                    <p className="mt-4 max-w-2xl mx-auto">{courseInfo.description}</p>
                </div>
                <div className="flex flex-wrap justify-center mt-8 mb-12">
                    {courseInfo.classes.map((classItem:any, index:any) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4 m-4 max-w-xs">
                            <h3 className="text-xl font-semibold">{classItem.title}</h3>
                            <p className="mt-2">{classItem.description}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold">Kayıt olmak ister misiniz?</h2>
                    <button
                        className="mt-4 px-6 py-2 bg-[#D9D9D9] text-black rounded"
                        onClick={() => handleEnroll(courseId)}
                    >
                       Kayıt ol
                    </button>
                </div>
              



            </div>

           
            <Footer />
        </>
    );
};

export default CourseInfoPage;
