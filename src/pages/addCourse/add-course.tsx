import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UploadIcon, PlusIcon, ChevronDownIcon } from "lucide-react";
import TeaNav from "@/components/teaNav";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Footer from "@/components/footer";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Python");
  const [classes, setClasses] = useState([
    {
      id: 1,
      className: "",
      classDesc: "",
      classMediaURL: "",
      classMediaFile: null,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      text: "",
      options: ["", "", "", "", ""],
      correctAnswer: 0,
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: ["", "", "", "", ""],
        correctAnswer: 0,
      },
    ]);
    setCurrentQuestionIndex(questions.length);
  };

  const updateQuestionText = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };

  const updateQuestionOption = (
    questionIndex: number,
    optionIndex: number,
    option: any
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = option;
    setQuestions(updatedQuestions);
  };

  const updateCorrectAnswer = (questionIndex: number, answer: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = answer;
    setQuestions(updatedQuestions);
  };

  const saveQuiz = () => {
    console.log("Quiz Title:", quizTitle);
    console.log("Questions:", questions);
    setIsModalOpen(false);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClassFieldChange = (id, field, value) => {
    const updatedClasses = classes.map((cls) => {
      if (cls.id === id) {
        return { ...cls, [field]: value };
      }
      return cls;
    });
    setClasses(updatedClasses);
  };

  const addClass = () => {
    const newClass = {
      id: classes.length + 1,
      className: "",
      classDesc: "",
      classMediaURL: "",
      classMediaFile: null,
    };
    setClasses([...classes, newClass]);
  };

  const removeClass = (id) => {
    const newClasses = classes.filter((cls) => cls.id !== id);
    setClasses(newClasses);
  };

  const handleFileUpload = (event, classId) => {
    const file = event.target.files[0];
    const updatedClasses = classes.map((cls) => {
      if (cls.id === classId) {
        return { ...cls, classMediaFile: file };
      }
      return cls;
    });
    setClasses(updatedClasses);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", selectedCategory);
    formData.append("description", description);
    formData.append(
      "classes",
      JSON.stringify(
        classes.map((cls) => ({
          title: cls.className,
          description: cls.classDesc,
          videoLink: cls.classMediaURL,
        }))
      )
    );

    formData.append(
      "questions",
      JSON.stringify({
        questions: questions,
      })
    );

    classes.forEach((cls, index) => {
      if (cls.classMediaFile) {
        formData.append(`pdfFiles`, cls.classMediaFile);
      }
    });

    try {
      const response = await fetch("http://localhost:3001/course/add", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();
      console.log("Course added successfully:", data);
      // Handle success, maybe redirect or show a success message
    } catch (error) {
      console.error("Error adding course:", error);
      alert(`Error adding course: ${error.message}`);
      // Handle error, show error message to the user
    }
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Kurs Başlığı"
            />
          </div>
          <div className="flex gap-1 flex-wrap mb-4">
            {["Python", "Database", "Graphic Design", "AI", "ML"].map((cat) => (
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
                  className={`px-4 py-2 border rounded cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#D9D9D9] text-black"
                      : "bg-white text-black"
                  }`}
                >
                  {cat}
                </label>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block font-bold text-lg mb-2"
            >
              Kurs Açıklaması
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Kurs Açıklaması"
              rows={4}
            />
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
                  <Label
                    htmlFor={`className-${cls.id}`}
                    className="font-bold text-lg"
                  >
                    Sınıf Adı
                  </Label>
                  <Input
                    type="text"
                    id={`className-${cls.id}`}
                    value={cls.className}
                    onChange={(e) =>
                      handleClassFieldChange(
                        cls.id,
                        "className",
                        e.target.value
                      )
                    }
                    placeholder="Sınıf Adı"
                  />
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor={`classDesc-${cls.id}`}
                    className="font-bold text-lg"
                  >
                    Sınıf Açıklaması
                  </Label>
                  <textarea
                    id={`classDesc-${cls.id}`}
                    value={cls.classDesc}
                    onChange={(e) =>
                      handleClassFieldChange(
                        cls.id,
                        "classDesc",
                        e.target.value
                      )
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="Sınıf Açıklaması"
                    rows={4}
                  />
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor={`classMedia-${cls.id}`}
                    className="font-bold text-lg"
                  >
                    Sınıf Medyası URL
                  </Label>
                  <Input
                    type="text"
                    id={`classMedia-${cls.id}`}
                    value={cls.classMediaURL}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    onChange={(e) =>
                      handleClassFieldChange(
                        cls.id,
                        "classMediaURL",
                        e.target.value
                      )
                    }
                    placeholder="URL"
                  />
                </div>
                <div className="mb-4">
                  <Label
                    htmlFor={`classMediaFile-${cls.id}`}
                    className="font-bold text-lg"
                  >
                    Sınıf Document
                  </Label>
                  <div className="relative">
                    <input
                      type="file"
                      id={`classMediaFile-${cls.id}`}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, cls.id)}
                    />
                    <label
                      htmlFor={`classMediaFile-${cls.id}`}
                      className="flex items-center justify-center cursor-pointer border hover:bg-blue-700 hover:text-white border-gray-300 rounded px-3 py-2 bg-[#D9D9D9]"
                    >
                      <UploadIcon size={24} className="mr-2" />
                      Dosya Seç
                    </label>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => removeClass(cls.id)}
                  className="bg-[#D9D9D9] text-black"
                >
                  Sınıfı Kaldır
                </Button>
              </CollapsibleContent>
            </Collapsible>
          ))}
          <Button onClick={addClass} className="bg-[#0e4194]">
            <PlusIcon className="h-4 w-4 mr-2" />
            Başka Bir Sınıf Ekle
          </Button>
          <div className="mt-8">
            <Button onClick={() => setIsModalOpen(true)} className="w-full">
              <PlusIcon className="h-4 w-4 mr-2" />
              Test Ekle
            </Button>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="sm:max-w-[600px] ">
                <DialogHeader>
                  <DialogTitle>Yeni Test Ekle</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div key={currentQuestionIndex} className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`question-${currentQuestionIndex}`}>
                        Soru {currentQuestionIndex + 1}
                      </Label>
                      <Input
                        id={`question-${currentQuestionIndex}`}
                        value={questions[currentQuestionIndex].text}
                        onChange={(e) =>
                          updateQuestionText(
                            currentQuestionIndex,
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Seçenekler</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {questions[currentQuestionIndex].options.map(
                          (option, optionIndex) => (
                            <Input
                              key={optionIndex}
                              value={option}
                              onChange={(e) =>
                                updateQuestionOption(
                                  currentQuestionIndex,
                                  optionIndex,
                                  e.target.value
                                )
                              }
                            />
                          )
                        )}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`correct-answer-${currentQuestionIndex}`}>
                        Doğru cevap
                      </Label>
                      <Select
                        id={`correct-answer-${currentQuestionIndex}`}
                        value={questions[currentQuestionIndex].correctAnswer}
                        onValueChange={(value: any) =>
                          updateCorrectAnswer(currentQuestionIndex, value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Doğru cevabı seç" />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4].map((option) => (
                            <SelectItem key={option} value={option}>
                              Seçenek {option + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={addQuestion}>Add Question</Button>
                  <div className="flex justify-between mt-4">
                    <Button
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      Önceki Soru
                    </Button>
                    <Button
                      onClick={nextQuestion}
                      disabled={currentQuestionIndex === questions.length - 1}
                    >
                      Sonraki soru
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={saveQuiz}>Testi Kaydet</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div className="mt-4 flex justify-center items-center">
            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-[#D9D9D9] text-black font-bold py-2 px-4 rounded lg:w-[40%] hover:bg-blue-700 hover:text-white"
            >
              Gönder
            </Button>
          </div>
        </ScrollArea>
      </div>
      <Footer />
    </>
  );
}
