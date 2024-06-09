import CompNav from "@/components/compNav";
import Footer from "@/components/footer";
import SimpleNav from "@/components/simpleNav";
import Nav from "@/components/stuNav";
import TeaNav from "@/components/teaNav";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Etkinlik = () => {
    const [userType, setUserType] = useState(null); // null, 'student', or 'company'
    // const navigate = useNavigate();
  
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
  Autoplay({ delay: 1000 });

  return (
    <>
          {userType === 'student' && <Nav />}
        {userType === 'company' && <CompNav />}
        {userType === 'teacher' && <TeaNav />}
        {userType === null && <SimpleNav />}
    <img className="w-full" alt="header banner" src="/header-copy-2@2x.png" />
    <section className="max-w-[1440px] px-20 py-12 flex flex-col  justify-center items-center gap-16 max-sm:px-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {Array.from({ length: 13 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="flex justify-center items-center">
                {/* <Card> */}
                {/* <CardContent className="flex aspect-square items-center justify-center p-6"> */}
                <img
                  src={`/images/image${index ===0 ?index + 2:index+1}.jpg`}
                  className="rounded-2xl aspect-square w-[900px] h-[400px] max-sm:w-full"
                />
                {/* </CardContent> */}
                {/* </Card> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <h1 className="font-bold">Yeşil Bilişim- Endüstri 4.0 Eğitimi</h1>
      <div className="flex flex-col gap-4 justify-center items-center">
        <img src="/images/green/image1.png" className="w-80 rounded-lg" />
        <img src="/images/image14.jpg" className="w-[800px] rounded-lg" />
        <p className="w-[800px] max-sm:w-full ">
          Odamız tarafından yürütülen Doğu Marmara’da Geleceğin İşlerine Uyum
          Projesi’nin temel faaliyetleri arasında yer alan ‘Bilişim Firmalarına
          önelik Yeşil Dönüşüm Eğitimi” gerçekleştirildi. 20 adet Bilişim
          firmasının temsilcilerinin katıldığı etkinlikte : Sera Etkisi ve
          Küresel İklim Değişikliği Kyoto Protokolü, Paris Anlaşması ve
          Türkiye’nin konumu, Yeşil Mutabakat Eylem Planı, Green IT , Karbon
          Ayak İzi , Enerji Verimliliği vb. konular hakkında bilgi aktarıldı.{" "}
        </p>
      </div>
        <h1 className="font-bold ">Bilişim Vadisi Ziyareti</h1>
      <div className="flex flex-col gap-4 justify-center items-center">
        <img src="/images/image2.jpg" className="w-[800px] rounded-lg" />
        <p className="w-[800px] max-sm:w-full " >Projemiz kapsamında eğitim alan kursiyerlerimiz ve eğitmenlerimizin katılımı ile Bilişim Vadisi ziyareti gerçekleştirildi. Ziyaret kapsamında Bilişim Vadisi tanıtım sunumu, firma ziyaretleri ve kuluçka Merkezi ziyareti ve tanıtımı gerçekleştirildi. </p>
      </div>
        <h1 className="font-bold ">Tematik İzleme Ziyareti Gerçekleştirildi</h1>
      <div>
        <img src="/images/image4.jpg" className="w-[800px] rounded-lg" />
        <p className="w-[800px] max-sm:w-full ">Projemiz kapsamında Çalışma Bakanlığı Çalışma Uzmanımız tarafından Tematik İzleme Ziyareti gerçekleştirildi. Proje personelimiz tarafından faaliyetlerimizin detaylı sunumu gerçekleştirildi. </p>
      </div>
      <h1 className="font-bold">Ara Denetim Ziyareti Gerçekleştirildi</h1>
      <div className="flex flex-col gap-4 justify-start items-start max-sm:items-center">
        <div className="flex gap-2 max-sm:flex-col">
        <img src="/images/image3.jpg" className="w-80 rounded-lg max-sm:w-full" />
        <img src="/images/image6.jpg" className="w-80 rounded-lg max-sm:w-full" />
        </div>
        <img src="/images/image5.jpg" className="w-80 rounded-lg max-sm:w-full" />
        <p className="w-[800px] max-sm:w-full" >Projemiz kapsamında Çalışma Bakanlığı- Avrupa Birliği ve Mali Yardımlar Proje Uzmanımız tarafından Kocaeli Sanayi Odası ve İzmit Mesleki ve Teknik Anadolu Lisesi’nde ara denetim ziyareti gerçekleştirildi. Projemizin gidişatı hakkında sunum yapıldı, ardından proje kapsamında eğitimlerimizin gerçekleştirileceği sınıflar ziyaret edildi. </p>
      </div>
      <h1 className="font-bold">İzmit Mesleki ve Teknik AL’de Proje Eğitimleri Başladı </h1>
      <div className="flex flex-col gap-4 justify-start items-start max-sm:items-center">
        <div className="flex gap-2 max-sm:flex-col">
        <img src="/images/image8.jpg" className="w-80 rounded-lg max-sm:w-full" />
        <img src="/images/image7.jpg" className="w-80 rounded-lg max-sm:w-full" />
        </div>
        <img src="/images/image11.jpg" className="w-80 rounded-lg max-sm:w-full" />
        <p className="w-[800px] max-sm:w-full" >Projemiz kapsamında 300’er saat sürecek olan Siber Güvenlik ve Ağ Yönetimi  ile IOT Uygulamaları Eğitimi ile Akıllı Sistemler Tasarımcılığı Eğitimleri İzmit Mesleki Teknik Anadolu Lisesi’nde başladı. </p>
      </div>
      <div className="flex flex-col gap-4 justify-start items-start max-sm:items-center">
        <h1 className="font-bold">Proje Ekibi Toplantısı Gerçekleştirildi</h1>
        <img src="/images/image9.jpg" className="w-[800px] rounded-lg" />
        <p className="w-[800px] max-sm:w-full ">Proje ekibimizin online olarak biraraya geldiği toplantıda, projenin gidişatı ve gelecek eylem planları hakkında istişare edildi. Eğitim içerikleri görüşüldü, aksiyon planı oluşturuldu. </p>
      </div>
      <div className="flex flex-col gap-4 justify-start items-start max-sm:items-center">
        <h1 className="font-bold">Proje Ekibi Toplantısı Gerçekleştirildi</h1>
        <img src="/images/image10.jpg" className="w-[800px] rounded-lg" />
        <p className="w-[800px] max-sm:w-full ">Proje ekibimizin online olarak biraraya geldiği toplantıda, eğitim faaliyeti ile alakalı görüşüldü. Kursiyer seçimi, eğitim duyuruları, eğitim modülleri kapsamı vb. konularda mutabakat sağlandı.  </p>
      </div>
      <div className="flex flex-col gap-4 justify-start items-start max-sm:items-center">
        <h1 className="font-bold">Proje Ekibi Toplantısı Gerçekleştirildi</h1>
        <img src="/images/image12.jpg" className="w-[800px] rounded-lg" />
        <p className="w-[800px] max-sm:w-full ">T.C. Çalışma ve Sosyal Güvenlik Bakanlığı’nın ‘Cinsiyet Eşitliği Odağında Geleceğin İnsana Yakışır İşleri Yaklaşımının Desteklenmesi Hibe Programı’ kapsamında destek aldığımız “Doğu Marmara’da Geleceğin İşlerine Uyum” projemizin Proje Ekibi Toplantısı İzmit MTAL’de gerçekleştirildi. Toplantıda proje adımları ve faaliyetleri konusunda görüşüldü.  </p>
      </div>
      <div className="flex flex-col gap-4 justify-start items-start max-sm:items-center">
        <h1 className="font-bold">
Doğu Marmara’da Geleceğin İşlerine Uyum Projesinin İmzaları Atıldı
</h1>
        <img src="/images/image13.jpg" className="w-[800px] rounded-lg" />
        <p className="w-[800px] max-sm:w-full ">Mesleki eğitimin yanında yenilikçi iş süreçlerine uyumu da önemseyen KSO, T.C. Çalışma ve Sosyal Güvenlik Bakanlığı’nın ‘Cinsiyet Eşitliği Odağında Geleceğin İnsana Yakışır İşleri Yaklaşımının Desteklenmesi Hibe Programı’ kapsamında hazırladığı “Doğu Marmara’da Geleceğin İşlerine Uyum” projesine hibe desteği almaya hak kazandı. Projenin imza töreni; Kocaeli Sanayi Odası Başkanı Ayhan Zeytinoğlu, Kocaeli Sanayi Odası Genel Sekreteri Memet Barış Turabi ve Kocaeli Sanayi Odası İş Geliştirme Sorumlusu Aynur Hacıfettahoğlu’nun katılımları ile Ankara’da gerçekleştirildi. İmzaların ardından projenin hazırlık çalışmaları da başladı. Kocaeli Sanayi Odası, proje kapsamında sivil toplum diyaloğunu güçlendirmeyi ve çevreci yaklaşımı yaygınlaştırmayı hedefliyor. </p>
      </div>
      <div>
        <h1 className="font-bold">KOCAELİ’YE FAYDALI PROJE</h1>
        <p className="w-[800px] max-sm:w-full ">KSO Başkanı Ayhan Zeytinoğlu, “Dünya değişiyor ve dönüşüyor. Yeni dünya düzenin yolu yeşil ve dijital dönüşümden geçiyor. Kocaeli Sanayi Odası olarak değişen bu iş süreçlerine uyumu önemsiyoruz. Kocaeli’de bilişim sektöründe nitelikli personel yetiştirmek, dezavantajlı grupların mesleki katılımını ve adaptasyonunu sağlamak adına başlatacağımız projenin şehrimize ve bölgemize fayda getireceğine inanıyoruz” dedi.
        </p>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Etkinlik;
