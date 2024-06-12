import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import TeaNav from "@/components/teaNav";
import Footer from "@/components/footer";

const TeacherProfile = () => {
    const [teacher, setTeacher] = useState({
        phone: "",
        email: "",
        address: "",
    });
    const navigate = useNavigate();

    const fetchTeacher = async () => {
        try {
            const response = await axios.get("https://backend.foworks.com.tr/teacher/get", {
                withCredentials: true,
            });
            setTeacher(response.data);
        } catch (error) {
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchTeacher();
    }, []);
    if(!teacher) return null;
    return (
        <>
            <TeaNav  />
            <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
        <div className="mx-20 ">
            <h1 className="text-2xl font-bold mt-5">Merhaba</h1>
            <div className="my-5 flex flex-col md:flex-row items-start md:items-center">
                <div className="flex items-center mb-5 md:mb-0 md:mr-5">
                    <div className="w-80 h-80 bg-gray-200 rounded-full flex items-center justify-center  max-sm:ml-28">
                        <img className="w-10 h-10" alt="profile icon" src="/vector.svg" />
                    </div>
                </div>
            
            <div className="w-full flex justify-between  gap-16 max-sm:flex-col" >
               <div className="text-lg">
                    <p>
                        <span className="font-bold">İletişim:</span> {teacher.phone}
                    </p>
                    <p>
                        <span className="font-bold">Email:</span> {teacher.email}
                    </p>
                    <p>
                        <span className="font-bold">Adres:</span> {teacher.address}
                    </p>
                </div>
                <div>
               <div className="w-full flex justify-between">
                <label className="block mb-2 text-lg font-bold">Hakkında</label>
                <img className="w-4 " alt="profile icon" src="/vector1.svg" />
               </div>
                <textarea className="w-[400px] p-2 border rounded h-24"  readOnly />
                </div>
            </div>
            </div>
            <div>
                <div className="flex flex-col justify-center items-center ">
                <div className="flex justify-between items-center  ">

                <h1 className="text-2xl font-bold mb-5">Açılan kurslar</h1>
                {/* <div className="mt-5 flex gap-2 items-center cursor-pointer">
                    <span className="text-blue-500 ">Ekle</span>
                    <img className="w-5 h-5" alt="add icon" src="/vector3.svg" />
                </div> */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mx-60 max-sm:mx-0">
                    {/* {Array(6).fill().map((_, index) => (
                        <div key={index} className="w-[250px] border flex flex-col border-black pb-5 rounded-lg gap-2">
                            <div className=" bg-gray-200 px-20 py-20 border border-black"/>
                            <h3 className="text-lg font-bold mb-2 ml-4">Graphic Design 101</h3>
                            <p className="mb-2 text-sm ml-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <button className="ml-4 bg-gray-200 text-white py-2 px-4 rounded w-[100px]">
                                Görüntüle
                            </button>
                        </div>
                    ))} */}
                </div>
                </div>
             
            </div>
          
        </div>
           <Footer/>
        </>
    );
};

export default TeacherProfile;
