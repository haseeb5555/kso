import CompNav from "@/components/compNav";
import Footer from "@/components/footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

const VieweditJob = () => {
  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState({ title: "", category: "", description: "" });
  const [studentId, setStudentId] = useState(""); // State to store the student ID
  const { jobId } = useParams();

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/enrollment/studentsEnrolled/${jobId}`, {
        withCredentials: true, // Send cookies along with the request
      });
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/job/getJob/${jobId}`, {
        withCredentials: true, // Send cookies along with the request
      });
      setJobDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.put(`http://localhost:3001/enrollment/hire/${studentId}`, {
        withCredentials: true, // Send cookies along with the request
      });
      console.log(response.data); // Log the response for debugging
      alert("Student hired successfully!");
    } catch (error) {
      console.error(error);
      alert("Error hiring student. Please try again later.");
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchJobDetails();
  }, [jobId]);

  const handleDownloadResume = (resumeUrl) => {
    window.open(`http://localhost:3001/${resumeUrl}`, '_blank');
  };

  return (
    <>
      <CompNav />
      <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
      <div className=" mx-20 max-sm:mx-2">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="text-2xl font-bold mb-4">{jobDetails.title}</div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Job Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              value={jobDetails.category}
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Job Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              value={jobDetails.description}
              readOnly
            />
          </div>

          <h2 className="text-xl font-bold  text-center mb-4">Applications</h2>
          <div className="mb-6">
            {applications.length === 0 ? (
              <p>No job posts yet.</p>
            ) : (
              applications.map((student, index) => (
                <div key={index} className="flex justify-between items-center mb-2">
                  <p className="text-gray-700">{student.name} | ID {student.id}</p>
                  {student.resume && (
                    <button
                      className="text-[#D9D9D9] hover:text-[#fffefa] focus:outline-none"
                      onClick={() => handleDownloadResume(student.resume)}
                    >
                      Download Resume
                    </button>
                  )}
                </div>
              ))
            )}
          </div>

          <h2 className="text-xl font-bold  text-center mb-4">Applicant Hired?</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
              Applicant ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="studentId"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-[#D9D9D9] text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>


      <Footer />
    </>
  );
};

export default VieweditJob;
