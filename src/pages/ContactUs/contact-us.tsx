import "./ContactUs.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from "@/components/stuNav";
import CompNav from "@/components/compNav";
import TeaNav from "@/components/teaNav";
import SimpleNav from "@/components/simpleNav";
import Footer from "@/components/footer";
import { InboxIcon, LocateIcon, PhoneIcon } from "lucide-react";
import MapEmbed from "@/components/MapEmbed";


const ContactUs = () => {
  const [userType, setUserType] = useState(null); // null, 'student', or 'company'
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const checkUserType = async () => {
      try {
        const response = await axios.get(' https://backend.foworks.com.tr/auth/check-session', { withCredentials: true });
        const { userType } = response.data; // Assuming the server returns { userType: 'student' } or { userType: 'company' }
        setUserType(userType);
      } catch (error) {
        console.error('Error checking session:', error);
        setUserType(null); // No session or error occurred
      }
    };

    checkUserType();
  }, []);


  const handleSubmit = async () => {
    try {
      await axios.post('https://backend.foworks.com.tr/contact', {
        name,
        phone,
        email,
        message,
      });
      alert('Mesajınız başarıyla gönderildi.');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Mesaj gönderilirken bir hata oluştu.');
    }
  }

  return (
    <>
      <div className="mx-auto">
        {userType === 'student' && <Nav />}
        {userType === 'company' && <CompNav />}
        {userType === 'teacher' && <TeaNav />}
        {userType === null && <SimpleNav />}


        <img className="w-full mt-5" alt="" src="/header-copy-2@2x.png" />
        <div className="flex gap-16 mx-20 max-sm:mx-4 max-sm:flex-col">
         <MapEmbed 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8620752274305!2d29.935762399999998!3d40.7650582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4f87128f0c97%3A0x944f3b6dad28cccb!2sIzmit%20High%20School!5e0!3m2!1sen!2s!4v1718215613042!5m2!1sen!2s"
         />
        <MapEmbed
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.057674745265!2d29.939322999999995!3d40.760756199999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cb4568a5555555%3A0x9593ffebc22d9857!2sKocaeli%20Chamber%20of%20Industry!5e0!3m2!1sen!2s!4v1718398818324!5m2!1sen!2s"
        
        />
        </div>
      
        <div className="relative max-w-4xl mx-auto p-4 text-black mt-8 ">
          <h1 className="text-4xl font-bold text-center mb-6">Bize ulaşın</h1>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Kişisel bilgi</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                İsim

                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="İsim"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Telefon numarası

                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    type="text"
                    placeholder="Telefon numarası"
                    onChange={(e) => setPhone(e.target.value)}
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
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Bize ne için ulaşmak istiyorsunuz?
              </h2>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                Mesaj
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  placeholder="Mesaj"
                  rows={4}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSubmit}
              >
                Gönder
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-around text-center">
            <div className="mb-4">
              <PhoneIcon className="mx-auto mb-2 h-6 w-6 fill-current text-black" />
              <h3 className="font-bold">Telefon
              :</h3>
              <p>262 315 80 00</p>
            </div>
            <div className="mb-4">
              <InboxIcon className="mx-auto mb-2 h-6 w-6 fill-current text-black" />
              <h3 className="font-bold">Email:</h3>
              <p>
proje@kosana.org.tr
</p>
            </div>
            <div className="mb-4">
              <LocateIcon className="mx-auto mb-2 h-6 w-6 fill-current text-black" />
              <h3 className="font-bold">Adres:</h3>
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
