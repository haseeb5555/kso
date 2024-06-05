import SimpleNav from "@/components/simpleNav";
import Nav from "@/components/stuNav";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Footer from "../components/footer";
import { Download } from "lucide-react";

const DetailCoursePage = () => {
    const [userType, setUserType] = useState(null); // null, 'student', or 'company'
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch course details by courseId
        const fetchCourseInfo = async () => {
            try {
                const response = await axios.get(`https://backend.foworks.com.tr/course/get/${courseId}`);
                setCourseInfo(response.data);
            } catch (error) {
                console.error("Error fetching course info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseInfo();
    }, [courseId]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (!courseInfo) {
    //     return <div>Course information not found.</div>;
    // }

    const getYoutubeEmbedUrl = (url) => {
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
        }
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const dummyCourseInfo = {
        title: "Dummy Course",
        description: "This is a dummy course description.",
        classes: [
            {
                title: "Class 1",
                description: "This is a dummy class description",
                pdfFile: "dummy.pdf",
                videoLink: "https://www.youtube.com/watch?v=6JYIGclVQdw",
            },
            {
                title: "Class 2",
                description: "This is a dummy class description",
                pdfFile: "dummy.pdf",
                videoLink: "https://www.youtube.com/watch?v=6JYIGclVQdw",
            },
        ],
    };

    return (
        <>
            {userType === 'student' && <Nav />}
            {userType === null && <SimpleNav/>}
            <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
        <div className=" mx-20 max-sm:mx-2 lg:flex lg:justify-center lg:items-center ">
           
            
            <div className="my-8">
                <div className="w-full bg-white p-4 rounded shadow-md mb-4 flex flex-col justify-center items-center">
                    <div className="text-3xl font-bold mb-2">{dummyCourseInfo.title}</div>
                    <div className="text-gray-700">{dummyCourseInfo.description}</div>
                </div>

                <h1 className="text-2xl font-bold my-4 text-center">Classes</h1>
                {dummyCourseInfo.classes.map((classItem, index) => (
                    <div key={index} className="flex flex-col md:flex-row bg-white p-4 mb-4 rounded shadow-md w-[700px] max-sm:w-full">
                        <div className="flex-1 mb-4 md:mb-0 md:mr-4">
                            <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
                            <p className="text-gray-700 mb-2">{classItem.description}</p>
                            <div className="flex justify-between mt-40 max-sm:mt-8 ">
                              <h2 className="font-bold">Download Here </h2>
                            <a 
                                href={`https://backend.foworks.com.tr/${classItem.pdfFile}`}
                                download
                            >
                            
                            <Download size={24} className="ml-2 cursor-pointer" />
                            </a>
                            </div>
                        </div>
                        <div className="flex-1">
                            <iframe
                                className="w-full h-64 rounded"
                                src={getYoutubeEmbedUrl(classItem.videoLink)}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={classItem.title}
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <img className="w-full mt-5" alt="footer banner" src="/footerbanner2-copy-1@2x.png" />
       <Footer/>
        </>
    );
};

export default DetailCoursePage;
