import Footer from "@/components/footer";
import TeaNav from "@/components/teaNav";
import { UploadIcon, PlusIcon, ChevronDownIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function EditCourse() {
  const { id } = useParams(); // Fetching 'id' from URL params
  const [selectedCategory, setSelectedCategory] = useState("Python");
  const [classes, setClasses] = useState([{ id: 1, name: "", description: "", media: null, document: null }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchedData = {
  //     title: "Existing Course Title",
  //     category: "Python",
  //     description: "Existing course description",
  //     classes: [
  //       { id: 1, name: "Existing Class 1", description: "Existing description 1", media: null, document: null },
  //       { id: 2, name: "Existing Class 2", description: "Existing description 2", media: null, document: null }
  //     ]
  //   };

  //   setTitle(fetchedData.title);
  //   setSelectedCategory(fetchedData.category);
  //   setDescription(fetchedData.description);
  //   setClasses(fetchedData.classes);
  // }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/course/get/${id}`, {
        withCredentials: true,
      });

      setTitle(response.data.title);
      setSelectedCategory(response.data.category);
      setDescription(response.data.description);
      setClasses(response.data.classes);
    } catch (error) {
      console.error("Error fetching course details:", error);
      setError(error); // Set error state to display to the user
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [id]);

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const addClass = () => {
    const newClass = { id: classes.length + 1, name: "", description: "", media: null, document: null };
    setClasses([...classes, newClass]);
  };

  const removeClass = (id: number) => {
    const newClasses = classes.filter((cls) => cls.id !== id);
    setClasses(newClasses);
  };

  const handleClassChange = (id: number, key: string, value: any) => {
    setClasses(
      classes.map((cls) => (cls.id === id ? { ...cls, [key]: value } : cls))
    );
  };

  const handleFileUpload = (event, classId) => {
    const file = event.target.files[0];
    const updatedClasses = classes.map(cls => {
      if (cls.id === classId) {
        return { ...cls, classMediaFile: file };
      }
      return cls;
    });
    setClasses(updatedClasses);
  };

  // const handleSubmit = () => {

  //   const courseData = {
  //     title,
  //     category: selectedCategory,
  //     description,
  //     classes
  //   };

  //   console.log("Submitting course data:", courseData);
  // };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', selectedCategory);
      formData.append('description', description);
      formData.append('classes', JSON.stringify(classes));

      // classes.forEach(cls => {
      //   formData.append(`media-${cls.id}`, cls.media);
      //   formData.append(`document-${cls.id}`, cls.document);
      // });
      
    classes.forEach((cls, index) => {
      if (cls.classMediaFile) {
        formData.append(`pdfFiles`, cls.classMediaFile);
      }
    });

      const response = await axios.post(`http://localhost:3001/course/edit/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Server response:', response.data);
      if (response.status === 200) {
        // Optionally handle success or navigate away
        alert("Kurs başarıyla güncellendi")
        navigate("/TeacherProfile")

      }

      // Optionally handle success or navigate away
    } catch (error) {
      console.error('Error submitting course data:', error);
      setError(error); // Set error state to display to the user
    }
  };


  return (
    <>
      <TeaNav />
      <div className="w-full flex flex-col md:flex-row mx-auto px-20 py-12 max-sm:px-4">
        <div className="md:w-1/3 p-4 space-y-8">
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold text-lg mb-2">
              Başlık
            </label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Kurs Başlığı"
            />
          </div>
          <div className="flex gap-1 flex-wrap mb-4">
            {['Python', 'Database', 'Graphic Design', 'AI',"ML"].map((cat) => (
              <div key={cat} className="flex items-center space-x-2 space-y-2">
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
          <div className="mb-4">
            <label htmlFor="description" className="block font-bold text-lg mb-2">
              Kurs Açıklaması
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Kurs Açıklaması"
              rows={4}
            />
          </div>
      
        </div>
        <ScrollArea className="h-[500px] w-full rounded-md md:w-2/3 p-4 ">
          <h2 className="text-lg font-bold mb-4">Sınıflar</h2>
          {classes.map((cls) => (
            <Collapsible key={cls.id} className="space-y-4 mb-4">
              <div className="flex items-center justify-between space-x-4">
                <h3 className="text-lg font-bold">Sınıf {cls.id}</h3>
                <CollapsibleTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <ChevronDownIcon className="h-5 w-5" />
                    <span className="sr-only">Değiştir</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="grid gap-4">
                <div className="mb-4">
                  <Label htmlFor={`className-${cls.id}`} className="font-bold text-lg">Sınıf Adı</Label>
                  <Input
                    type="text"
                    id={`className-${cls.id}`}
                    value={cls.title}
                    onChange={(e) => handleClassChange(cls.id, "title", e.target.value)}
                    placeholder="Sınıf Adı"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor={`classDesc-${cls.id}`} className="font-bold text-lg">Sınıf Açıklaması</Label>
                  <textarea
                    id={`classDesc-${cls.id}`}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    value={cls.description}
                    onChange={(e) => handleClassChange(cls.id, "description", e.target.value)}
                    placeholder="Sınıf Açıklaması"
                    rows={4}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor={`classMedia-${cls.id}`} className="font-bold text-lg">Sınıf Medyası</Label>
                  <div className="relative">
                    <input
                      type="text"
                      value={
                        cls.videoLink
                        }
                      id={`classMedia-${cls.id}`}
                     className="w-full border border-gray-300 rounded px-3 py-2"
                      onChange={(e) => handleClassChange(cls.id, "videoLink", e.target.value)}
                    />
                  
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor={`classMediaFile-${cls.id}`} className="font-bold text-lg">Sınıf Dokümanı</Label>
                  <div className="relative">
                    <input
                      type="file"
                      id={`classMediaFile-${cls.id}`}
                      // value={cls.pdfFile}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, cls.id)}
                    />
                    <label
                      htmlFor={`classMediaFile-${cls.id}`}
                      className="flex items-center justify-center cursor-pointer border border-gray-300 hover:bg-blue-700 hover:text-white rounded px-3 py-2 bg-[#D9D9D9]"
                    >
                      <UploadIcon size={24} className="mr-2" />
                      Dosya Seç
                    </label>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => removeClass(cls.id)} className="bg-[#D9D9D9] text-black">
                  Sınıfı Kaldır
                </Button>
              </CollapsibleContent>
            </Collapsible>
          ))}
          <Button onClick={addClass} className="bg-[#0e4194]">
            <PlusIcon className="h-4 w-4 mr-2" />
            Başka Bir Sınıf Ekle
          </Button>
          <div className="mt-4 flex justify-center items-center">
            <Button onClick={handleSubmit} className="w-full bg-[#D9D9D9] text-black font-bold py-2 px-4 rounded lg:w-[40%] hover:bg-blue-700 hover:text-white">
              Güncelle
            </Button>
          </div>
        </ScrollArea>
        </div>
      <Footer />
    </>
  );
}
