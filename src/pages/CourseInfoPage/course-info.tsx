import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '@/components/stuNac';
import Footer from '@/components/footer';

const CourseInfoPage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    console.log('courseId:', courseId);
    const [courseInfo, setCourseInfo] = useState(null);

    useEffect(() => {
        const fetchCourseInfo = async () => {
            try {
                const response = await axios.get(`https://backend.foworks.com.tr/course/get/${courseId}`);
                setCourseInfo(response.data);
            } catch (error) {
                console.error("Error fetching course info:", error);
            }
        };
        fetchCourseInfo();
    }, [courseId]);

    const handleEnroll = async (courseId:any) => {
        try {
            const response = await axios.post(`https://backend.foworks.com.tr/courseEnrollement/enroll/${courseId}`, {}, {
                withCredentials: true,
            });
            alert('Successfully enrolled for the course!');
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
                    <h2 className="text-2xl font-bold">Want to enroll?</h2>
                    <button
                        className="mt-4 px-6 py-2 bg-[#D9D9D9] text-black rounded"
                        onClick={() => handleEnroll(courseId)}
                    >
                        Sign up
                    </button>
                </div>
                <div className="w-full bg-gray-200 py-8">
                    <div className="text-center">
                        <h2 className="text-xl font-bold">Testimonials</h2>
                        <div className="mt-4 max-w-lg mx-auto bg-white p-4 shadow-lg rounded">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p className="mt-2 italic">John Doe</p>
                        </div>
                    </div>
                </div>



            </div>

            <img src="/footerbanner2-copy-1@2x.png" alt="Footer Banner" className="mt-5 w-full" />
            <Footer />
        </>
    );
};

export default CourseInfoPage;
