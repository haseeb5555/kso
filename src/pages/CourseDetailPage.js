import "./CourseDetailPage.css";
import Navbar from "../components/stuNavbar";
import SimpleNavbar from "../components/simpleNavbar";
import Footer from "../components/footer";
import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!courseInfo) {
        return <div>Course information not found.</div>;
    }

    const getYoutubeEmbedUrl = (url) => {
        const videoId = url.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
        }
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <div className="detail_detailcoursepage">
            {userType === 'student' && <Navbar />}
            {userType === null && <SimpleNavbar />}
            <Footer />
            <div className="detail_rectangle-parent29">
                <div className="detail_group-child116" />
                <div className="detail_banner1">Banner</div>
            </div>
            <div className="detail_course-title-parent">
                <div className="detail_course-title">{courseInfo.title}</div>
                <div className="detail_lorem-ipsum-dol1">
                    {courseInfo.description}
                </div>
            </div>
            <img
                className="detail_footerbanner2-copy-16"
                alt=""
                src="/footerbanner2-copy-1@2x.png"
            />
            <img className="detail_header-copy-26" alt="" src="/header-copy-2@2x.png" />
            <div className="detail_classes-parent">
                <h1 className="detail_classes7">Classes</h1>
                {courseInfo.classes.map((classItem, index) => (
                    <div key={index} className={`detail_group-parent${index}`}>
                        <div className="detail_class-1-parent">
                        
                            <h3 className="detail_class-1">{classItem.title}</h3>
                            <p className="detail_lorem-ipsum-dolor25">
                                {classItem.description}
                            </p>
                            <div className="detail_document-name-parent">
                            <a 
                                    href={`https://backend.foworks.com.tr/${classItem.pdfFile}`} 
                                    className="detail_download-link overlapping-element " 
                                    download
                                >
                                    Download PDF
                                </a>
                            </div>
                            <div className="detail_group-child121" />
                        </div>
                        <div className="detail_rectangle-parent32">
                            <iframe
                                className="detail_wrapper"
                                width="560"
                                height="315"
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
    );
};

export default DetailCoursePage;
