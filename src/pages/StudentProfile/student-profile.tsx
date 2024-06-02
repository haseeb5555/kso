import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Footer from "@/components/footer";
import Nav from "@/components/stuNac";

const StudentProfile = () => {
    const [student, setStudent] = useState({});
    const [enrolledJobs, setEnrolledJobs] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();

    const fetchStudent = async () => {
        try {
            const response = await axios.get("https://backend.foworks.com.tr/student/get", {
                withCredentials: true,
            });
            setStudent(response.data);
        } catch (error) {
            // navigate('/login');
        }
    };

    const fetchEnrolledJobs = async () => {
        try {
            const response = await axios.get("https://backend.foworks.com.tr/enrollement/getAll", {
                withCredentials: true,
            });
            if (Array.isArray(response.data)) {
                setEnrolledJobs(response.data);
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
                setEnrolledCourses(response.data);
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

    return (
        <>
            <Nav />
            <div className="p-5">
                <h1 className="text-2xl font-bold mt-5">Merhaba {student.name}</h1>
                <div className="my-5 flex flex-col md:flex-row items-start md:items-center">
                    <div className="flex items-center mb-5 md:mb-0 md:mr-5">
                        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                            <img className="w-10 h-10" alt="profile icon" src="/vector.svg" />
                        </div>
                    </div>
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
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-lg font-bold">Hakkında</label>
                    <textarea className="w-full p-2 border rounded h-24" value={student.about || ""} readOnly />
                </div>
                <div className="mb-5">
                    <h1 className="text-2xl font-bold mb-5">Açılan kurslar</h1>
                    {enrolledCourses.length === 0 ? (
                        <p>Henüz kayıtlı kurs yok.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {enrolledCourses.map((course, index) => (
                                <div key={course.id} className="border p-5 rounded">
                                    <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                                    <p className="mb-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded">
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
                            {enrolledJobs.map((job, index) => (
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
                <div className="bg-gray-200 p-5 rounded">
                    <h2 className="text-lg font-bold mb-2">Bize ulaşın</h2>
                    <p>kso@kosano.org.tr</p>
                    <p>262 315 80 00</p>
                    <p>Fuar İçi 41040 İzmit/KOCAELİ</p>
                </div>
                <label className="block font-bold text-center mt-5">FOWORKS</label>
                <img className="w-full mt-5" alt="footer banner" src="/footerbanner2-copy-1@2x.png" />
                <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
            </div>
            <Footer />
        </>
    );
};

export default StudentProfile;
