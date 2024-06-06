import Footer from "@/components/footer";
import StuNav from "@/components/stuNav";
import Nav from "@/components/simpleNav";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState("Python");
    const [userType, setUserType] = useState(null); // null, 'student', or 'company'
    const navigate = useNavigate();

    const fetchCourses = async (category) => {
        try {
            console.log(`Fetching courses for category: ${category}`);
            const response = await axios.get(`https://backend.foworks.com.tr/course/getAll/${category}`, {
                withCredentials: true,
            });
            console.log('Courses fetched:', response.data);
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses:", error);
        }
    };

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
        fetchCourses(category);
    }, [category]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleCourseinfoClick = (courseId) => {
        navigate(`/courseInfoPage/${courseId}`);
    };

    return (
        <>
            {userType === 'student' && <StuNav />}
            {userType === null && <Nav />}
            <img className="mt-4 mx-auto" alt="" src="/header-copy-2@2x.png" />
        <div className="min-h-screen ">
            <div className="text-center py-8">
                <h3 className="text-2xl font-bold">dersleri keşfet</h3>
                <div className="flex flex-wrap justify-center mt-4 space-x-2 space-y-2">
                    {['Python', 'Database', 'Artificial Intelligence', 'Graphic Design'].map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="options"
                                id={cat}
                                value={cat}
                                checked={category === cat}
                                onChange={handleCategoryChange}
                                className="hidden"
                            />
                            <label
                                htmlFor={cat}
                                className={`px-4 py-2 border rounded cursor-pointer ${category === cat ? 'bg-[#D9D9D9] text-black' : 'bg-white text-black'}`}
                            >
                                {cat}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="text-center py-4">
                <h3 className="text-xl font-semibold">{category}</h3>
            </div>

            <div className="flex flex-wrap justify-center">
                {courses.length ? (
                    courses.map((course, index) => (
                        <div key={course.id} className="bg-white m-2 p-4 rounded-lg shadow-lg max-w-xs">
                            <div className="h-40 bg-gray-200 rounded mb-4"></div>
                            <h3 className="text-lg font-bold">{course.title}</h3>
                            <p className="text-gray-600 mb-4">{course.description}</p>
                            <button
                                className="bg-[#D9D9D9] text-black px-4 py-2 rounded"
                                onClick={() => handleCourseinfoClick(course.id)}
                            >
                                Kayıt ol
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No courses available for the selected category.</p>
                )}
            </div>

        
        </div>
        <img className="mt-4 mx-auto" alt="" src="/footerbanner2-copy-1@2x.png" />
        <Footer />
        </>
    );
};

export default Courses;
