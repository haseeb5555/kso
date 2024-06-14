import Footer from "@/components/footer";
import TeaNav from "@/components/teaNav";
import { UploadIcon, PlusIcon, ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddCourse() {
  const [selectedCategory, setSelectedCategory] = useState("Python");
  const [classes, setClasses] = useState([{ id: 1 }]);

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const addClass = () => {
    const newClass = { id: classes.length + 1 };
    setClasses([...classes, newClass]);
  };

  const removeClass = (id: number) => {
    const newClasses = classes.filter((cls) => cls.id !== id);
    setClasses(newClasses);
  };

  const handleFileUpload = (event: any, classId: number) => {
    console.log(`Class ${classId} file selected:`, event.target.files[0]);
  };

  return (
    <>
      <TeaNav />
      <div className="h-full w-full flex flex-col md:flex-row  px-20 py-12 max-sm:px-4 max-w-[1440px] mx-auto">
        <div className="md:w-1/3 p-4 space-y-6 ">
          <div className="mb-4">
            <label htmlFor="title" className="block font-bold text-lg mb-2">
              Başlık
            </label>
            <Input
              type="text"
              id="title"
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
                onChange={(e) => handleFileUpload(e, -1)}
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
            <Collapsible key={cls.id} className="space-y-12 mb-4">
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
                    placeholder="Sınıf Adı"
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor={`classDesc-${cls.id}`} className="font-bold text-lg">Sınıf Açıklaması</Label>
                  <textarea
                    id={`classDesc-${cls.id}`}
                    className="w-full border border-gray-300 rounded px-3 py-2"
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
                      onChange={(e) => handleFileUpload(e, cls.id)}
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
                  <Label htmlFor={`classMedia-${cls.id}`} className="font-bold text-lg">Sınıf Document</Label>
                  <div className="relative">
                    <input
                      type="file"
                      id={`classMedia-${cls.id}`}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, cls.id)}
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
            <Button type="submit" variant="default" className="w-full bg-[#D9D9D9] text-black font-bold py-2 px-4 rounded lg:w-[40%] hover:bg-blue-700 hover:text-white">
              Gönder
            </Button>
          </div>
        </ScrollArea>
      </div>
      <Footer />
    </>
  );
}
