import "./AboutUs.css"
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Footer from "@/components/footer";


const AboutUs = () => {
  const [userType, setUserType] = useState(null); // null, 'student', or 'company'

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
    <img className="w-full" src="/header-copy-2@2x.png" />
    <div className="aboutus px-20">


      
      <div className="a_rectangle-parent5">
        <img className="w-full" src="/aboutusBanner.png" alt="Banner Image" />

      </div>
      <div className="a_rectangle-parent6">
        <img className="w-full " src = "/banner.png"></img>
      </div>
      <div className="about-us-group">
        <div className="about-us3">Proje Hakkında</div>
        <div className="lorem-ipsum-dol1">
          Kocaeli Sanayi Odası hakkında bilgiler
        </div>
      </div>
      <div className="why-us-parent">
        <div className="why-us">Neden biz?</div>
        <div className="lorem-ipsum-dol1">
        Çünkü biz eğitim alanında iddialıyız.
        </div>
      </div>
      <div className="a_rectangle-parent8 max-sm:mt-[300px]">
        <div className="group-child48" />
        <div className="group-child52" />
        <div className="lorem-ipsum-dolor-container1">
          <p className="lorem-ipsum-dolor10">
            Eğitim kıvılcımla ateş yakmaktır. Boş bir kabı doldurmak değildir.
          </p>
          <p className="lorem-ipsum-dolor10">&nbsp;</p>
          <p className="lorem-ipsum-dolor10">
            <i>-Sokrates</i>
          </p>
        </div>
        <div className="testimonials1"></div>
        <div className="group-child53" />
      </div>
      {/* <div className="a_rectangle-parent9"> */}
        
       {/*} <div className="group-child54" />
        <div className="sitemap-link-1-container2">
          <p className="lorem-ipsum-dolor10">Sitemap</p>
          <p className="lorem-ipsum-dolor10">&nbsp;</p>
          <p className="lorem-ipsum-dolor10">Link 1</p>
          <p className="lorem-ipsum-dolor10">Link 2</p>
          <p className="lorem-ipsum-dolor10">Link 3</p>
          <p className="lorem-ipsum-dolor10">Link 4</p>
          <p className="lorem-ipsum-dolor10">Link 5</p>
          <p className="lorem-ipsum-dolor10">Link 6</p>
        </div>
        <div className="contact-helpdomaincom-1-container2">
          <p className="lorem-ipsum-dolor10">Bize ulaşın</p>
          <p className="lorem-ipsum-dolor10">&nbsp;</p>
          <p className="lorem-ipsum-dolor10">help@domain.com</p>
          <p className="lorem-ipsum-dolor10">+1 2345 4567</p>
          <p className="lorem-ipsum-dolor10">&nbsp;</p>
          <p className="lorem-ipsum-dolor10">
            123 Address Street City, Country
          </p>
        </div>
  <div className="foworks4">FOWORKS</div> */}
      {/* </div>  */}
    
     
      <div className="mt-[1900px] ">

    
      
      <div className=" relative container mx-auto py-10">
        <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-300 p-4 rounded-lg w-64 flex flex-col items-center">
                <div className="bg-black rounded-full w-12 h-12 mb-4"></div>
                <h3 className="text-lg font-semibold">USP</h3>
                <p>Eğitmen kalitemiz</p>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg w-64 flex flex-col items-center">
                <div className="bg-black rounded-full w-12 h-12 mb-4"></div>
                <h3 className="text-lg font-semibold">USP</h3>
                <p>Sektördeki bağlantılarımız</p>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg w-64 flex flex-col items-center">
                <div className="bg-black rounded-full w-12 h-12 mb-4"></div>
                <h3 className="text-lg font-semibold">USP</h3>
                <p>Eğitmen kalitemiz</p>
            </div>
            <div className="bg-gray-300 p-4 rounded-lg w-64 flex flex-col items-center">
                <div className="bg-black rounded-full w-12 h-12 mb-4"></div>
                <h3 className="text-lg font-semibold">USP</h3>
                <p>Sektördeki bağlantılarımız</p>
            </div>
        </div>
    </div>
        <div className="our-usps">Güçlü yönlerimiz</div>
      </div>
      </div>
      <img
        className="w-full "
        alt=""
        src="/footerbanner2-copy-1@2x.png"
      />
      <Footer/>
      </>
  );
};

export default AboutUs;
