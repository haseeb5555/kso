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
                const response = await axios.get(`http://localhost:3001/course/get/${courseId}`);
                setCourseInfo(response.data);
            } catch (error) {
                console.error("Error fetching course info:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseInfo();
    }, [courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!courseInfo) {
        return <div>Course information not found.</div>;
    }

    const getYoutubeEmbedUrl = (url) => {
        if (!url) {
            return ''; // Return an empty string or handle appropriately
        }
    
        let videoId = '';
        let embedUrl = '';
    
        // Check if it's a YouTube link
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            // Extract video ID from different YouTube URL formats
            if (url.includes('youtube.com')) {
                videoId = url.split('v=')[1];
                const ampersandPosition = videoId.indexOf('&');
                if (ampersandPosition !== -1) {
                    videoId = videoId.substring(0, ampersandPosition);
                }
            } else if (url.includes('youtu.be')) {
                videoId = url.split('/').pop();
            }
    
            // Construct YouTube embed URL
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else {
            // Handle other video platforms or unrecognized links
            embedUrl = ''; // Return an empty string or handle as needed
        }
    
        return embedUrl;
    };
    



    return (
        <>
            {userType === 'student' && <Nav />}
            {userType === null && <SimpleNav/>}
            <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
        <div className=" mx-20 max-sm:mx-2 lg:flex lg:justify-center lg:items-center ">
           
            
            <div className="my-8">
                <div className="w-full bg-white p-4 rounded shadow-md mb-4 flex flex-col justify-center items-center">
                    <div className="text-3xl font-bold mb-2">{courseInfo.title}</div>
                    <div className="text-gray-700">{courseInfo.description}</div>
                </div>

                <h1 className="text-2xl font-bold my-4 text-center">Classes</h1>
                {courseInfo.classes.map((classItem, index) => (
                    <div key={index} className="flex flex-col md:flex-row bg-white p-4 mb-4 rounded shadow-md w-[700px] max-sm:w-full">
                        <div className="flex-1 mb-4 md:mb-0 md:mr-4">
                            <h3 className="text-xl font-bold mb-2">{classItem.title}</h3>
                            <p className="text-gray-700 mb-2">{classItem.description}</p>
                            <div className="flex justify-between mt-40 max-sm:mt-8 ">
                              <h2 className="font-bold">Download Here </h2>
                            <a 
                                href={`http://localhost:3001/${classItem.pdfFile}`}
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
