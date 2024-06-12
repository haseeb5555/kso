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
      <div className="px-20 max-sm:px-4 mt-300px">

        <div className="flex gap-16 justify-start items-start mt-10 max-sm:flex-col">
     

        <p>
        <strong>
      Ekim 2023 tarihinde Kocaeli Sanayi Odası tarafından imzalanan Doğu Marmara’da Geleceğin İşlerine Uyum Projesi, T.C. Çalışma ve Sosyal Güvenlik Bakanlığı tarafından sağlanan Cinsiyet Eşitliği  Odağında Geleceğin İnsana Yakışır İşleri Yaklaşımının Desteklenmesi Hibe Programı kapsamında desteklenmektedir. Proje çerçevesinde Kocaeli ilinde toplumsal cinsiyet eşitliğinin gözetilerek, genç ve dezavantajlı grupların istihdamının önündeki engellerin kaldırılması amacıyla bilişim sektöründe nitelikli personel yetiştirilmesi hedeflenmektedir.<br/> 
        -Proje Paydaşlarımız:<br/>
        İzmit Mesleki ve Teknik Anadolu Lisesi (eş faydalanıcı)<br/>
    Bizimköy Engelliler Üretim Merkezi  <br/>
      Kocaeli Valiliği İl Göç İdaresi <br/>
        Türk Kızılayı Toplum Merkezi Kocaeli Şubesi<br/>
      Veribis <br/>
      Bimser<br/>
      Nacsoft Yazılım <br/>
      KOÜ Teknopark A.Ş.</strong></p>
          <img className="w-[55%] max-sm:w-full rounded-2xl" src="/images/green/projeLogos.png"></img>
        </div>

  


        <div className="mt-20">



          <div className=" relative container mx-auto py-10">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-[#40E0D0] p-4 rounded-lg w-64 flex flex-col items-center  justify-center">
              
                {/* <h3 className="text-lg font-semibold">USP</h3> */}
                <p>İzmit Mesleki ve Teknik Anadolu Lisesi’nde 21 kişilik bilişim laboratuvarı ve engelli lavabosu kuruldu. Kursiyerlerimiz; IOT Uygulamaları ve Siber Güvenlik konularında 300’er saatlik eğitim aldılar.
                </p>
              </div>
              <div className="bg-[#40E0D0] p-4 rounded-lg w-64 flex flex-col items-center justify-center">
              
                {/* <h3 className="text-lg font-semibold">USP</h3> */}
                <p>Hedef grupların teknoloji dünyasındaki son gelişmeler hakkında bilgi alması Bilişim firmaları temsilcileri ile tanışmaları adına Bilişim Vadisi’ne gezi düzenlendi.
                </p>
              </div>
              <div className="bg-[#40E0D0] p-4 rounded-lg w-64 flex flex-col items-center justify-center">
              
                {/* <h3 className="text-lg font-semibold">USP</h3> */}
                <p>Bilişim firmalarının katılımı ile “Yeşil Bilişim, Endüstri 4.0” Eğitimi düzenlendi</p>
              </div>
              <div className="bg-[#40E0D0] p-4 rounded-lg w-64 flex flex-col items-center justify-center">
              
                {/* <h3 className="text-lg font-semibold">USP</h3> */}
                <p>Öğrencilerimize bilişim alanında staj imkanı sağlandı</p>
              </div>
            </div>
          </div>
          {/* <div className="our-usps">Güçlü yönlerimiz</div> */}
        </div>
        <div className="relative justify-center items-center flex mb-8">
          <p className="text-white font-bold text-4xl absolute z-10 text-center top-60 left-[350px] max-sm:top-28 max-sm:left-4" >“İşin geleceğine güvenle yol alacağız”</p>
          <img className="w-[800px] h-[500px] max-sm:h-full -z-10" src="/images/blue/brain.png" alt="Banner Image" />
        </div>
        

  
      </div>
   
      <Footer />
    </>
  );
};

export default AboutUs;
