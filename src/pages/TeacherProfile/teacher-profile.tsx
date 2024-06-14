import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TeaNav from "@/components/teaNav";
import Footer from "@/components/footer";
import { EditIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeacherProfile = () => {
    const [teacher, setTeacher] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });
    const [courses, setCourses] = useState([
        // dummy data
        {
            id: 1,
            title: "Python",
            description: "Python is a programming language that lets you work quickly and integrate systems more effectively.",
            enrolledStudents: 560,
        },
        {
            id: 2,
            title: "JavaScript",
            description: "JavaScript is a programming language that lets you work quickly and integrate systems more effectively.",
            enrolledStudents: 50,
        },
        {
            id: 3,
            title: "React",
            description: "React is a JavaScript library for building user interfaces. React makes it painless to create interactive UIs.",
            enrolledStudents: 260,
        }

    ]);
    const [oldCourses, setOldCourses] = useState([{
        id: 1,
        title: "Python",
        description: "Python is a programming language that lets you work quickly and integrate systems more effectively.",
        enrolledStudents: 960,
    }, 
    {
        id: 2,
        title: "JavaScript",
        description: "JavaScript is a programming language that lets you work quickly and integrate systems more effectively.",
        enrolledStudents: 560,
    },

    {
        id: 3,
        title: "React",
        description: "React is a JavaScript library for building user interfaces. React makes it painless to create interactive UIs.",
        enrolledStudents: 560,
    },
  
    

]);



    const navigate = useNavigate();

    const fetchTeacher = async () => {
        try {
            const response = await axios.get("https://backend.foworks.com.tr/teacher/get", {
                withCredentials: true,
            });
            setTeacher(response.data);
            setCourses(response.data.courses || []); // Assuming courses are part of the teacher data
        } catch (error) {
            // navigate('/login');
        }
    };

    useEffect(() => {
        fetchTeacher();
    }, []);

    if(!teacher) return null;

    return (
        <>
            <TeaNav />
            <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
            <div className="px-20 max-sm:px-4">
                <h1 className="text-2xl font-bold mt-5">Merhaba {teacher.name}</h1>
                <div className="my-5 flex flex-col md:flex-row items-start md:items-center">
                    <div className="flex items-center mb-5 md:mb-0 md:mr-5">
                        <div className="w-80 h-80 bg-gray-200 rounded-full flex items-center justify-center max-sm:h-40 max-sm:w-40">
                            <img className="w-10 h-10" alt="profile icon" src="/vector.svg" />
                        </div>
                    </div>
                    <div className="w-full flex justify-between gap-16 max-sm:flex-col">
                        <div className="text-lg">
                            <p>
                                <span className="font-bold">İletişim:</span> {teacher.phone}
                            </p>
                            <p>
                                <span className="font-bold">Email:</span> {teacher.email}
                            </p>
                            <p>
                                <span className="font-bold">Adres:</span> {teacher.address}
                            </p>
                        </div>
                        <div>
                            <div className="w-full flex justify-between">
                                <label className="block mb-2 text-lg font-bold">Hakkında</label>
                                <img className="w-4" alt="profile icon" src="/vector1.svg" />
                            </div>
                            <textarea className="w-[400px] max-sm:w-full p-2 border rounded h-24" readOnly />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center gap-4 max-sm:mb-0 max-sm:mt-10">
                            <h1 className="text-2xl font-bold mb-5 ">Offering Courses</h1>
                            <button className="bg-transparent mb-2 border border-black rounded-full cursor-pointer text-black" onClick={() => navigate('/addCourse')}>
                            <PlusIcon size={24} className=""  />
                            </button>
                        </div>
                        <div className="mt-20 mb-20 flex justify-center items-center gap-16 max-sm:flex-col flex-wrap ">
                            {courses.map((course, index) => (
                                <div key={index} className="relative w-[300px] border flex flex-col  pb-5 rounded-3xl gap-2 ">
                                    <div className="bg-gray-200 px-20 py-20 border border-black rounded-3xl"/>
                                    <h3 className="text-lg font-bold mb-2 ml-4">{course.title}</h3>
                                    <p className="mb-2 text-sm ml-4">
                                        {course.description}
                                    </p>
                                    <div className="flex justify-between items-center gap-4 px-4">

                                    <button className="w-full bg-gray-200 text-black py-2 px-4 rounded-2xl ">
                                        Görüntüle
                                    </button>
                                    <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-2xl ">
                                     
                                        {course.enrolledStudents}&nbsp;<span>Öğrenci</span>
                                    </button>
                                    </div>
                                    <button onClick={() => navigate(`/editCourse`)} className="absolute top-2 right-2">
                                     <EditIcon size={24} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold mb-5">Old Courses</h1>
                            {/* <div className="mt-5 flex gap-2 items-center cursor-pointer">
                                <span className="text-blue-500 ">Ekle</span>
                                <img className="w-5 h-5" alt="add icon" src="/vector3.svg" />
                            </div> */}
                        </div>
                        <div className="mt-20 mb-20 flex justify-center items-center gap-16 max-sm:flex-col flex-wrap ">
                            {oldCourses.map((course, index) => (
                                <div key={index} className="relative w-[300px] border flex flex-col  pb-5 rounded-3xl gap-2 ">
                                    <div className="bg-gray-200 px-20 py-20 border border-black rounded-3xl"/>
                                    <h3 className="text-lg font-bold mb-2 ml-4">{course.title}</h3>
                                    <p className="mb-2 text-sm ml-4">
                                        {course.description}
                                    </p>
                                    <div className="flex justify-between items-center gap-4 px-4">

                                    <button className="w-full bg-gray-200 text-black py-2 px-4 rounded-2xl ">
                                        Görüntüle
                                    </button>
                                    <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-2xl ">
                                     
                                        {course.enrolledStudents}&nbsp;<span>Öğrenci</span>
                                    </button>
                                    </div>
                                    <button onClick={() => navigate(`/editCourse`)} className="absolute top-2 right-2">
                                     <EditIcon size={24} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default TeacherProfile;

