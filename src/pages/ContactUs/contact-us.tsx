import "./ContactUs.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "@/components/stuNac";
import CompNav from "@/components/compNav";
import TeaNav from "@/components/teaNav";
import SimpleNav from "@/components/simpleNav";
import Footer from "@/components/footer";
import { InboxIcon, LocateIcon, PhoneIcon } from "lucide-react";


const ContactUs = () => {
  const [userType, setUserType] = useState(null); // null, 'student', or 'company'
  const navigate = useNavigate();

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
  }, []);

  return (
    <>
    <div className="contactus">
      {userType === 'student' && <Nav />}
      {userType === 'company' && <CompNav />}
      {userType === 'teacher' && <TeaNav />}
      {userType === null && <SimpleNav />}
   
      <img
        className="footerbanner2-copy-15"
        alt=""
        src="/footerbanner2-copy-1@2x.png"
      />
      <img className="header-copy-24" alt="" src="/header-copy-2@2x.png" />
      <div className="rectangle-parent34">
        <img className="group-child133" src="/contactBanner.png" alt="Banner Image" />

      </div>
      <div className="relative max-w-4xl mx-auto p-4 text-black mt-[800px]">
      <h1 className="text-4xl font-bold text-center mb-6">Bize ulaşın</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="text"
                placeholder="Phone"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Your Query?</h2>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              placeholder="Message"
              rows={4}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-around text-center">
        <div className="mb-4">
          <PhoneIcon className="mx-auto mb-2 h-6 w-6 fill-current text-black" />
          <h3 className="font-bold">Contact:</h3>
          <p>262 315 80 00</p>
        </div>
        <div className="mb-4">
          <InboxIcon className="mx-auto mb-2 h-6 w-6 fill-current text-black" />
          <h3 className="font-bold">Email:</h3>
          <p>kso@kosano.org.tr</p>
        </div>
        <div className="mb-4">
          <LocateIcon className="mx-auto mb-2 h-6 w-6 fill-current text-black" />
          <h3 className="font-bold">Address:</h3>
          <p>
            Fuar İçi 41040
            <br />
            İzmit KOCAELİ
          </p>
        </div>
      </div>
    </div>
    </div>

<Footer />
</>
  );
};

export default ContactUs;
