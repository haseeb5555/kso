import Footer from '@/components/footer';
import Nav from '@/components/stuNac';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const JobInfoPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [jobInfo, setJobInfo] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);

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
      await axios.post(`https://backend.foworks.com.tr/enrollement/enroll/${jobId}`, {}, {
        withCredentials: true,
      });
      alert('Successfully applied for the job!');
    } catch (error) {
      console.error("Error applying for job:", error);
      alert('Failed to apply for the job. Please try again.');
    }
  };

  return (
    <>
      <Nav />
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
        <h2 className="text-2xl font-bold">Want to apply?</h2>
        <button
          onClick={() => handleApply(jobId)}
          className="bg-[] text-black font-bold py-2 px-4 rounded"
        >
          Signup/Apply
        </button>
      </div>
    </div>
    <img className="w-full mt-5" alt="footer banner" src="/footerbanner2-copy-1@2x.png" />
    <Footer />
    </>
  );
};

export default JobInfoPage;
