import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Footer from "@/components/footer";
import Nav from "@/components/stuNac";

const StudentProfile = () => {
    const [student, setStudent] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });
    const [enrolledJobs, setEnrolledJobs] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();

    const fetchStudent = async () => {
        try {
            // should send a request to the backend to get the student details with session cookie but it not sending the session cookie
            // s%3AzEJON_xdLq68Q72e3MsloRaDwS6OelGp.2vcRMytWAT4VRXlHun%2FJ3Fx1j894wkT3LC2tqEmPVjA
            const response = await axios.get("https://backend.foworks.com.tr/student/get", {
                withCredentials: true,
            });

            setStudent(response.data);
        } catch (error) {
            navigate('/login');
        }
    };

    const fetchEnrolledJobs = async () => {
        try {
            const response = await axios.get("https://backend.foworks.com.tr/enrollement/getAll", {
                withCredentials: true,
            });
            if (Array.isArray(response.data)) {
                setEnrolledJobs(response.data as any);
            } else {
                console.error("Expected array but received:", response.data);
                setEnrolledJobs([]);
            }
        } catch (error) {
            console.error("Error fetching enrolled jobs:", error);
        }
    };

    const fetchEnrolledCourses = async () => {
        try {
            const response = await axios.get("https://backend.foworks.com.tr/courseEnrollement/getAll", {
                withCredentials: true,
            });
            if (Array.isArray(response.data)) {
                setEnrolledCourses(response.data as any);
            } else {
                console.error("Expected array but received:", response.data);
                setEnrolledCourses([]);
            }
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
        }
    };

    useEffect(() => {
        fetchStudent();
        fetchEnrolledJobs();
        fetchEnrolledCourses();
    }, []);

    const handleStatusClick = async (jobId:any) => {
        try {
            const response = await axios.get(`https://backend.foworks.com.tr/enrollement/getEnrollment/${jobId}`, {
                withCredentials: true,
            });
            const enrollment = response.data;
            alert(`Status: ${enrollment.status}`);
        } catch (error) {
            console.error("Error fetching enrollment details:", error);
            alert("Error fetching enrollment details");
        }
    };
if (!student) return null;
    return (
        <>
            <Nav />
            <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
            <div className="mx-20">
                <h1 className="text-2xl font-bold mt-5">Merhaba {student.name}</h1>
                <div className="my-5 flex flex-col md:flex-row items-start md:items-center">
                    <div className="flex items-center mb-5 md:mb-0 md:mr-5 ">
                        <div className="w-60 h-60 bg-gray-200 rounded-full flex items-center justify-center max-sm:ml-28">
                            <img className="w-10 h-10" alt="profile icon" src="/vector.svg" />
                        </div>
                    </div>
                    <div className="w-full flex justify-between  gap-16 max-sm:flex-col" >
               <div className="text-lg">
                    <p>
                        <span className="font-bold">İletişim:</span> {student.phone}
                    </p>
                    <p>
                        <span className="font-bold">Email:</span> {student.email}
                    </p>
                    <p>
                        <span className="font-bold">Adres:</span> {student.address}
                    </p>
                </div>
                <div>
               <div className="w-full flex justify-between">
                <label className="block mb-2 text-lg font-bold">Hakkında</label>
                <img className="w-4 " alt="profile icon" src="/vector1.svg" />
               </div>
                <textarea className="w-[400px]  max-sm:w-full p-2 border rounded h-24"  readOnly />
                </div>
            </div>
            </div>
                <div className="mb-5">
                    <h1 className="text-2xl font-bold mb-5">Açılan kurslar</h1>
                    {enrolledCourses.length === 0 ? (
                        <p>Henüz kayıtlı kurs yok.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {enrolledCourses.map((course:any) => (
                                <div key={course.id} className="border p-5 rounded">
                                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                                    <p className="mb-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <button className="bg-[#D9D9D9] text-white py-2 px-4 rounded">
                                        Görüntüle
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <h1 className="text-2xl font-bold mb-5">Başvurulan işler</h1>
                    {enrolledJobs.length === 0 ? (
                        <p>Henüz başvurduğunuz iş yok.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {enrolledJobs.map((job:any) => (
                                <div key={job.id} className="border p-5 rounded">
                                    <h3 className="text-lg font-bold mb-2">{job.title}</h3>
                                    <p className="mb-2">{job.description}</p>
                                    <button
                                        className="bg-blue-500 text-white py-2 px-4 rounded"
                                        onClick={() => handleStatusClick(job.id)}
                                    >
                                        Status
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
        
                
            </div>
            
                <img className="w-full mt-5" alt="footer banner" src="/footerbanner2-copy-1@2x.png" />
           
            <Footer />
        </>
    );
};

export default StudentProfile;
