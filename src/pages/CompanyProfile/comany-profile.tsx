import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TeaNav from "@/components/teaNav";
import Footer from "@/components/footer";
import "./ComanyProfile.css"
const CompanyProfile = () => {
    
    const [company, setCompany] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
    });
    const [addedJobs, setAddedJobs] = useState([]);
    const navigate = useNavigate();

    const fetchCompany = async () => {
        try {
            const response = await axios.get("https://backend.foworks.com.tr/company/get", {
                withCredentials: true, // Send cookies along with the request
            });
            setCompany(response.data);
        } catch (error) {
            navigate('/login');
        }
    };

    const fetchEnrolledjobs = async () => {
        try {
            const response = await axios.get("https://backend.foworks.com.tr/job/getAddedJobs", {
                withCredentials: true, // Send cookies along with the request
            });
            setAddedJobs(response.data);
        } catch (error) {
            console.error("Error fetching enrolled courses:", error);
        }
    };

   
    useEffect(() => {
        fetchCompany();
        fetchEnrolledjobs();
    }, []);


    const handleViewClick = (jobId:any) => {
        // Navigate to the login page ("/login")
        navigate(`/hire/${jobId}`);
    };

    const handleAddJobClick = () => {
        // Navigate to the login page ("/login")
        navigate('/addjob');
    };

    return (
        <>
            <TeaNav  />
            <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
        <div className="mx-20 ">
            <h1 className="text-2xl font-bold mt-5">Merhaba  {company.name}</h1>
            <div className="my-5 flex flex-col md:flex-row items-start md:items-center">
                <div className="flex items-center mb-5 md:mb-0 md:mr-5">
                    <div className="w-80 h-80 bg-gray-200 rounded-full flex items-center justify-center  max-sm:ml-28">
                        <img className="w-10 h-10" alt="profile icon" src="/vector.svg" />
                    </div>
                </div>
            
            <div className="w-full flex justify-between  gap-16 max-sm:flex-col" >
               <div className="text-lg">
                    <p>
                        <span className="font-bold">İletişim:</span> {company.phone}
                    </p>
                    <p>
                        <span className="font-bold">Email:</span> {company.email}
                    </p>
                    <p>
                        <span className="font-bold">Adres:</span> {company.address}
                    </p>
                </div>
                <div>
               <div className="w-full flex justify-between">
                <label className="block mb-2 text-lg font-bold">Hakkında</label>
                <img className="w-4 " alt="profile icon" src="/vector1.svg" />
               </div>
                <textarea className="w-[400px] p-2 border rounded h-24"  readOnly />
                </div>
            </div>
            </div>
            <div>
            <div className="com_offering-jobs-parent">

<h1 className="com_offering-jobs">İş ilanları</h1>
{addedJobs.length === 0 ? (
    <p>Henüz bir ilanınız yok.</p>
) : (
    addedJobs.slice(0, 3).map((job:any, index) => (
        <div className={`com_group-parent${index}`}
        
        // key={job.id}
        
        >
            <div className="com_job-title-parent1">
                <h3 className="com_job-title3">
                    {job.title}
                    
                    </h3>
                <p className="com_lorem-ipsum-dolor13">
                    {job.description}
                </p>
                <div className="com_group-child52" />
            </div>
            <div className="com_group-parent28">
                <div className="com_rectangle-wrapper12">
                    <button className="com_group-child53"
                     onClick={() => handleViewClick(job.id)
                        
                     } >View</button>
                </div>
            </div>
            {/* <div className="com_submissions">456 Submissions</div> */}
        </div>
    ))
)}

<div className="com_add-parent">
    <div className="com_add">Ekle</div>
    <img className="com_vector-icon5" alt="" src="/vector3.svg" onClick={handleAddJobClick} />
</div>
</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16  mx-60 max-sm:mx-0">
                <div className="border flex flex-col px-6 py-6 w-[250px] space-x-6 text-black">
                    <div className="flex flex-col">
                        <h3 className="text-semibold text-[18px]">İlan başlığı</h3>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="" />
                    </div>
                    <div className="">
                        <div className="px-4 py-2 bg-[#D9D9D9]  text-black w-[100px] rounded-2xl border">
                            <button className="">İşe alındı</button>
                        </div>
                        {/* <div className="com_hired">Hired</div> */}
                    </div>
                    {/* <div className="com_submissions">456 Submissions</div> */}
                </div>
                <div className="border flex flex-col px-6 py-6 w-[250px]">
                    <div className="flex flex-col">
                        <h3 className="text-semibold text-[18px]">İlan başlığı</h3>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="" />
                    </div>
                    <div className="">
                        <div className="px-4 py-2 bg-[#D9D9D9] text-black w-[100px] rounded-2xl border">
                            <button className="">İşe alındı</button>
                        </div>
                        {/* <div className="com_hired">Hired</div> */}
                    </div>
                    {/* <div className="com_submissions">456 Submissions</div> */}
                </div>
                <div className="border flex flex-col px-6 py-6 w-[250px]  ">
                    <div className="flex flex-col">
                        <h3 className="text-semibold text-[18px]">İlan başlığı</h3>
                        <p className="text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <div className="" />
                    </div>
                    <div className="">
                        <div className="px-4 py-2 bg-[#D9D9D9] text-black w-[100px] rounded-2xl border">
                            <button className="">İşe alındı</button>
                        </div>
                        {/* <div className="com_hired">Hired</div> */}
                    </div>
                    {/* <div className="com_submissions">456 Submissions</div> */}
                </div>
                
             
            </div>
            <img className="w-full mt-5" alt="footer banner" src="/footerbanner2-copy-1@2x.png" />
        </div>
        </div>
           <Footer/>
        </>
        
    );
};

export default CompanyProfile;
