import "./Hire.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Navbar from "../components/comNavbar";

const VieweditJob = () => {

  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState({ title: "", category: "", description: "" });
  const [studentId, setStudentId] = useState(""); // State to store the student ID
  const { jobId } = useParams();

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`https://backend.foworks.com.tr/enrollement/studentsEnrolled/${jobId}`, {
        withCredentials: true, // Send cookies along with the request
      });
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`https://backend.foworks.com.tr/job/getJob/${jobId}`, {
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
      const response = await axios.put(`https://backend.foworks.com.tr/enrollement/hire/${studentId}`, {
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

  return (
    <div className="hire_vieweditjob">
      <Navbar/>
      <form className="hire_group-form" onSubmit={handleSubmit}>
        <div className="hire_job-title11">{jobDetails.title}</div>
        <h1 className="hire_applications">Applications</h1>
        <div className="hire_applicant-hired">Applicant Hired?</div>
        {/* <img className="hire_vector-icon6" alt="" src="/vector2.svg" /> */}
        <div className="hire_rectangle-parent22">
          <input className="hire_group-child77" type="text" value = {jobDetails.category}  />
          <div className="hire_job-category">Job Category</div>
          {/* <img className="hire_vector-icon7" alt="" src="/vector2.svg" /> */}
          {/* <div className="hire_graphic-desin"/> */}
        </div>
        <div className="hire_rectangle-parent23">
          <input 
          className="hire_group-child78" 
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}  />
          <div className="hire_applicant-id">Applicant ID</div>
          {/* <img className="hire_vector-icon8" alt="" src="/vector2.svg" /> */}
          {/* <div className="hire_applicant-id-here">Applicant ID Here</div> */}
        </div>
        <div className="hire_group-parent39">
          <div className="hire_rectangle-wrapper20">
            <textarea className="hire_group-child79" value={jobDetails.description} />
          </div>
          {/* <img className="hire_vector-icon9" alt="" src="/vector2.svg" /> */}
          <div className="hire_job-description2">Job Description</div>
          {/* <div className="hire_job-description3">Job Description</div> */}
        </div>


        <div className="hire_group-parent40">
          {applications.length === 0 ? (
            <p>No jobs posts yet.</p>
          ) : (
            applications.slice(0, 3).map((student, index) => (
              <div className={`app${index}`}>
                <p className="hire_applicant-name">{student.name} | ID {student.id} </p>
                <img className="hire_vector-icon10" alt="" src="/vector4.svg" />
                <div className="hire_resume">Resume</div>
              </div>
            )))}

          {/* <div className="hire_line-div" />
          <div className="hire_group-child80" />
          <div className="hire_group-child81" />
          <div className="hire_group-child82" />
          <div className="hire_group-child83" />
          <div className="hire_group-child84" />
          <div className="hire_group-child85" />
          <div className="hire_group-child86" />
          <div className="hire_group-child87" />
          <div className="hire_group-child88" />
          <div className="hire_group-child89" />
          <div className="hire_group-child90" /> */}
        </div>
        <div className="hire_rectangle-parent24">
          <button className="hire_group-child91" type="submit">Submit</button>
        </div>
      </form>
      <div className="hire_rectangle-parent25">
        <div className="hire_group-child92" />
        <div className="hire_sitemap-link-1-container4">
          <p className="hire_sitemap4">Sitemap</p>
          <p className="hire_sitemap4">&nbsp;</p>
          <p className="hire_sitemap4">Link 1</p>
          <p className="hire_sitemap4">Link 2</p>
          <p className="hire_sitemap4">Link 3</p>
          <p className="hire_sitemap4">Link 4</p>
          <p className="hire_sitemap4">Link 5</p>
          <p className="hire_sitemap4">Link 6</p>
        </div>
        <div className="hire_contact-helpdomaincom-1-container4">
          <p className="hire_sitemap4">Contact</p>
          <p className="hire_sitemap4">&nbsp;</p>
          <p className="hire_sitemap4">help@domain.com</p>
          <p className="hire_sitemap4">+1 2345 4567</p>
          <p className="hire_sitemap4">&nbsp;</p>
          <p className="hire_sitemap4">123 Address Street City, Country</p>
        </div>
        <div className="hire_foworks8">FOWORKS</div>
      </div>
      <img
        className="hire_footerbanner2-copy-14"
        alt=""
        src="/footerbanner2-copy-1@2x.png"
      />
      <img className="hire_header-copy-24" alt="" src="/header-copy-2@2x.png" />
    </div>
  );
};

export default VieweditJob;
