import Footer from '@/components/footer';
import StuNav from "@/components/stuNav";
import Nav from "@/components/simpleNav";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const JobInfoPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobInfo, setJobInfo] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [userType, setUserType] = useState(null); // null, 'student', or 'company'

  useEffect(() => {
    const fetchJobInfo = async () => {
      try {
        const response = await axios.get(`https://backend.foworks.com.tr/job/getJob/${jobId}`);
        setJobInfo(response.data);
        fetchCompanyInfo(response.data.appliedBy);
      } catch (error) {
        console.error("Error fetching job info:", error);
      }
    };

    const fetchCompanyInfo = async (email) => {
      try {
        const response = await axios.get(`https://backend.foworks.com.tr/company/get/${email}`);
        setCompanyInfo(response.data);
      } catch (error) {
        console.error("Error fetching company info:", error);
      }
    };

    fetchJobInfo();
  }, [jobId]);

  const handleApply = async (jobId) => {
    try {

       // Check if the user is logged in by making an authenticated request
       const checkLoginResponse = await axios.get('https://backend.foworks.com.tr/auth/check', { withCredentials: true });
      
       if (!checkLoginResponse) {
      const response = await axios.post(`https://backend.foworks.com.tr/enrollement/enroll/${jobId}`, {}, {
        withCredentials: true, // Send cookies along with the request
      });
      alert('Successfully applied for the job!');
    }
    else{
      navigate("/login");
    }
    } catch (error) {
      console.error("Error applying for job:", error);
      alert('Failed to apply for the job. Please try again.');
    }
  };

  return (
    <>
       {userType === 'student' && <StuNav />}
      {userType === null && <Nav />}
      <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
    <div className="min-h-screen flex flex-col items-center mx-20">
      {jobInfo && companyInfo ? (
        <div className="flex flex-col items-center mt-10">
          <div className="text-3xl font-bold mb-4">{companyInfo.name}</div>
       
          <div className="text-xl font-semibold mb-4">{jobInfo.title}</div>
          <div className="text-center mb-4">
            <p>{jobInfo.description}</p>
          </div>
        </div>
      ) : (
        <p className="mt-10">Loading job details...</p>
      )}
      <div className="mt-10 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Başvurmak ister misiniz?</h2>
        <button
          onClick={() => handleApply(jobId)}
          className="bg-[] text-black font-bold py-2 px-4 rounded"
        >
          Başvur
        </button>
      </div>
    </div>
   
    <Footer />
    </>
  );
};

export default JobInfoPage;
