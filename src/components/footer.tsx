
const Footer = () => {
    return (
        <div className="bg-[#0e4194] text-white max-w-[1440px] flex flex-col md:flex-row justify-between items-center mx-auto">
              <div className="flex justify-start items-start gap-20 max-sm:gap-16 mx-8 max-sm:flex-wrap max-sm:justify-center max-sm:items-center">
                  <img src="/images/yellow/2.PNG" alt="1" className="w-40 h-full mt-8" />
                  <div className="w-[400px] max-sm:w-[350px] flex flex-col mt-8 justify-center items-center ml-16 max-sm:ml-4">
                    <div className="flex gap-2">
                  <img src="/images/yellow/4.png" alt="" className="w-20 h-20 " />
                  <img src="/images/yellow/3.PNG" alt="2" className="w-20 h-20"/>
                    </div>
                    <p className="mt-2 text-center">Bu sitenin içeriğinden yalnızca Kocaeli Sanayi Odası ve İzmit Mesleki ve Teknik Anadolu Lisesi sorumludur ve bu içerik hiçbir şekilde Avrupa Birliği veya Türkiye Cumhuriyeti'nin görüş ve tutumunu yansıtmamaktadır</p>
                  </div>
                  <img src="/images/yellow/1.PNG" alt="" className="h-80  -mt-16" />
            </div>
       
          <div className="h-[320px] max-sm:w-full bg-[#09295C] flex justify-center items-center">

            <div className="mt-4 md:mt-0 ">
                <div className="text-center md:text-right md:mr-20">
                    <p>Bize ulaşın</p>
                    <p>&nbsp;</p>
                    <p>kso@kosano.org.tr</p>
                    <p>262 315 80 00</p>
                    <p>&nbsp;</p>
                    <p>Fuar İçi 41040 İzmit/KOCAELİ</p>
                </div>
            </div>
          </div>
        </div>
    );
};

export default Footer;
