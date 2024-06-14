import Footer from "@/components/footer";
import TeaNav from "@/components/teaNav";
import { UploadIcon, PlusIcon, ChevronDownIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function EditCourse() {
  const [selectedCategory, setSelectedCategory] = useState("Python");
  const [classes, setClasses] = useState([{ id: 1, name: "", description: "", media: null, document: null }]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchedData = {
      title: "Existing Course Title",
      category: "Python",
      description: "Existing course description",
      classes: [
        { id: 1, name: "Existing Class 1", description: "Existing description 1", media: null, document: null },
        { id: 2, name: "Existing Class 2", description: "Existing description 2", media: null, document: null }
      ]
    };

    setTitle(fetchedData.title);
    setSelectedCategory(fetchedData.category);
    setDescription(fetchedData.description);
    setClasses(fetchedData.classes);
  }, []);

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

  const handleFileUpload = (event: any, id: number, key: string) => {
    const file = event.target.files[0];
    handleClassChange(id, key, file);
  };

  const handleSubmit = () => {

    const courseData = {
      title,
      category: selectedCategory,
      description,
      classes
    };

    console.log("Submitting course data:", courseData);
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
          <div className="mb-4">
            <label htmlFor="courseMedia" className="block font-bold text-lg mb-2">
              Kurs Medyası
            </label>
            <div className="relative">
              <input
                type="file"
                id="courseMedia"
                className="hidden"
                // Add logic for handling course media file if needed
              />
              <label
                htmlFor="courseMedia"
                className="flex items-center justify-center cursor-pointer border hover:bg-blue-700 hover:text-white border-gray-300 rounded px-3 py-2 bg-[#D9D9D9]"
              >
                <UploadIcon size={24} className="mr-2" />
                Dosya Seç
              </label>
            </div>
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
                    value={cls.name}
                    onChange={(e) => handleClassChange(cls.id, "name", e.target.value)}
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
                      type="file"
                      id={`classMedia-${cls.id}`}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, cls.id, "media")}
                    />
                    <label
                      htmlFor={`classMedia-${cls.id}`}
                      className="flex items-center justify-center cursor-pointer border hover:bg-blue-700 hover:text-white border-gray-300 rounded px-3 py-2 bg-[#D9D9D9]"
                    >
                      <UploadIcon size={24} className="mr-2" />
                      Dosya Seç
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <Label htmlFor={`classDocument-${cls.id}`} className="font-bold text-lg">Sınıf Dokümanı</Label>
                  <div className="relative">
                    <input
                      type="file"
                      id={`classDocument-${cls.id}`}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, cls.id, "document")}
                    />
                    <label
                      htmlFor={`classDocument-${cls.id}`}
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
