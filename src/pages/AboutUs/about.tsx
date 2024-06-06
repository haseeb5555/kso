import "./AboutUs.css"
import { useEffect, useState } from 'react';

import axios from 'axios';
import Footer from "@/components/footer";
import Nav from "@/components/stuNav";
import TeaNav from "@/components/teaNav";
import SimpleNav from "@/components/simpleNav";
import CompNav from "@/components/compNav";


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
      {
        userType === 'student' && (
          <Nav />
        )
      }
      {
        userType === 'teacher' && (
          <TeaNav />
        )
      }
      {
        userType === null && (
          <SimpleNav />
        )
      }
      {
        userType === "company" && (
          <CompNav />
        )
      }
      <img className="w-full mb-[-30px]" src="/header-copy-2@2x.png" />
      <div className="aboutus px-20 mt-300px">

        <div className="a_rectangle-parent5 px-40 mt-[-260px]">
          <img className="w-full h-0px" src="/about.png" alt="Banner Image" />

        </div>
        <div className="a_rectangle-parent6 px-40 mt-[-160px]">
          <img className="w-full " src="/aboutBanner.png"></img>
        </div>
        <div className="group-child52 mt-20" />

        <div className="lorem-ipsum-dolor-container1 mt-5">
          
          <h3>-Proje Paydaşlarımız:</h3>
            <p>İzmit Mesleki ve Teknik Anadolu Lisesi (eş faydalanıcı) </p>
              <p>Bizimköy Engelliler Üretim Merkezi</p>
              <p>Kocaeli Valiliği İl Göç İdaresi</p>
              <p>Türk Kızılayı Toplum Merkezi Kocaeli Şubesi</p>
              <p>Veribis</p>
              <p>Bimser</p>
              <p>Nacsoft Yazılım</p>
              <p>KOÜ Teknopark A.Ş.</p>
        </div>
        <div className="about-us-group mt-[-160px]">
          <div className="about-us3">Proje Hakkında</div>
          <div className="lorem-ipsum-dol1">
            1 Ekim 2023 tarihinde Kocaeli Sanayi Odası tarafından imzalanan Doğu Marmara’da Geleceğin İşlerine Uyum Projesi, T.C. Çalışma ve Sosyal Güvenlik Bakanlığı tarafından sağlanan Cinsiyet Eşitliği Odağında Geleceğin İnsana Yakışır İşleri Yaklaşımının Desteklenmesi Hibe Programı kapsamında desteklenmektedir. Proje çerçevesinde Kocaeli ilinde toplumsal cinsiyet eşitliğinin gözetilerek, genç ve dezavantajlı grupların istihdamının önündeki engellerin kaldırılması amacıyla bilişim sektöründe nitelikli personel yetiştirilmesi hedeflenmektedir.
          </div>
        </div>
        <div className="why-us-parent mt-[400px]">
          <div className="why-us">Neden biz?</div>
          <div className="lorem-ipsum-dol1">
            Çünkü biz eğitim alanında iddialıyız.
          </div>
        </div>
        <div className="a_rectangle-parent8 mt-[900px]">
          <div className="w-full bg-gray-100 py-8">
                    <div className="text-center ">
                        
                        <div className="mt-4 max-w-lg mx-auto bg-white p-4 shadow-lg rounded">
                            <p>İşin geleceğine güvenle yol alacağız</p>
                            <p className="mt-2 italic">Serkit</p>
                        </div>
                    </div>
                </div>
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


        <div className="mt-[2260px]">



          <div className=" relative container mx-auto py-10">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gray-300 p-4 rounded-lg w-64 flex flex-col items-center">
                <div className="bg-black rounded-full w-12 h-12 mb-4"></div>
                {/* <h3 className="text-lg font-semibold">USP</h3> */}
                <p>İzmit Mesleki ve Teknik Anadolu Lisesi’nde 21 kişilik bilişim laboratuvarı ve engelli lavabosu kuruldu. Kursiyerlerimiz; IOT Uygulamaları ve Siber Güvenlik konularında 300’er saatlik eğitim aldılar.
                </p>
              </div>
              <div className="bg-gray-300 p-4 rounded-lg w-64 flex flex-col items-center">
                <div className="bg-black rounded-full w-12 h-12 mb-4"></div>
                {/* <h3 className="text-lg font-semibold">USP</h3> */}
                <p>Hedef grupların teknoloji dünyasındaki son gelişmeler hakkında bilgi alması Bilişim firmaları temsilcileri ile tanışmaları adına Bilişim Vadisi’ne gezi düzenlendi.
                </p>
              </div>
              <div className="bg-gray-300 p-4 rounded-lg w-64 flex flex-col items-center">
                <div className="bg-black rounded-full w-12 h-12 mb-4"></div>
                {/* <h3 className="text-lg font-semibold">USP</h3> */}
                <p>Bilişim firmalarının katılımı ile “Yeşil Bilişim, Endüstri 4.0” Eğitimi düzenlendi</p>
              </div>
              <div className="bg-gray-300 p-4 rounded-lg w-64 flex flex-col items-center">
                <div className="bg-black rounded-full w-12 h-12 mb-4"></div>
                {/* <h3 className="text-lg font-semibold">USP</h3> */}
                <p>Öğrencilerimize bilişim alanında staj imkanı sağlandı</p>
              </div>
            </div>
          </div>
          {/* <div className="our-usps">Güçlü yönlerimiz</div> */}
        </div>
      </div>
      <img
        className="w-full "
        alt=""
        src="/footerbanner2-copy-1@2x.png"
      />
      <Footer />
    </>
  );
};

export default AboutUs;
