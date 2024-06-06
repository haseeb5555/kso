import Footer from "@/components/footer";
import Nav from "@/components/stuNav";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const ExploreJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Python");
  const navigate = useNavigate();

  const fetchJobs = async (category:any) => {
    try {
      const response = await axios.get(`https://backend.foworks.com.tr/job/get/${category}`, {
        withCredentials: true,
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching enrolled jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (event:any) => {
    setSelectedCategory(event.target.value);
  };

  const handleJobinfoClick = (jobId:any) => {
    navigate(`/jobinfopage/${jobId}`);
  };

  return (
    <>
   <Nav/>
   <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
    <div className="min-h-screen flex justify-center items-center ">
      <div className="container mx-auto -mt-80 flex justify-center items-center flex-col">
        <h3 className="text-2xl font-bold mb-4">Explore Jobs</h3>
         <div className="flex flex-wrap justify-center mt-10 space-x-2 space-y-2">
                    {['Python', 'Database', 'Artificial Intelligence', 'Graphic Design'].map((cat) => (
                        <div key={cat} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="options"
                                id={cat}
                                value={cat}
                                checked={selectedCategory === cat}
                                onChange={handleCategoryChange}
                                className="hidden"
                            />
                            <label
                                htmlFor={cat}
                                className={`px-4 py-2 border rounded cursor-pointer ${selectedCategory === cat ? 'bg-[#D9D9D9] text-black' : 'bg-white text-black'}`}
                            >
                                {cat}
                            </label>
                        </div>
                    ))}
                </div>
        <h1 className="text-xl font-semibold mb-4 mt-10">{selectedCategory}</h1>
        {jobs.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job:any) => (
              <div key={job.id} className="bg-white p-4 rounded-lg shadow-md w-[250px] border border-black">
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <button
                  className="px-4 py-2 bg-[#D9D9D9] text-black rounded-md"
                  onClick={() => handleJobinfoClick(job.id)}
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No jobs available for the selected category.</p>
        )}
      </div>
      
    </div>
    <img className="w-full mt-5" alt="footer banner" src="/footerbanner2-copy-1@2x.png" />
     <Footer/>
    </>
  );
};

export default ExploreJobs;
