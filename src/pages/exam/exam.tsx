// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import Confetti from "react-confetti";
// import { PartyPopperIcon } from "lucide-react";
// export default function Exam() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [showResults, setShowResults] = useState(false);
//   const width = window.innerWidth;
//   const height = window.innerHeight;
//   const questions = [
//     {
//       question:
//         "Aşağıdakilerden hangisi kapsadığı alan bakımından en küçük ağ yapısıdır?",
//       options: ["MAN", "LAN", "PAN", "WLAN", "WAN"],
//       correctAnswer: 2,
//     },
//     {
//       question: "Aşağıdaki hangi kablo kombinasyonu çapraz kabloyu oluşturur?",
//       options: [
//         "T568A ve T568B",
//         "T568A ve T568A",
//         "T568B ve T568B",
//         "T568A ve T568C",
//         "T568B ve T568C",
//       ],
//       correctAnswer: 0,
//     },
//     {
//       question: "Aşağıdakilerden hangisi IPv4 adresi değildir?",
//       options: [
//         "192.168.0.1",
//         "10.0.5.2",
//         "172.16.25.254",
//         "127.0.0.1",
//         "192.168.255.3",
//       ],
//       correctAnswer: 4,
//     },
//     {
//       question:
//         "Bilgisayara atanmış IP adresi bilgilerini öğrenmek için hangi komut kullanılır?",
//       options: ["ping", "iping", "config", "ipconfig", "iconfig"],
//       correctAnswer: 3,
//     },
//     {
//       question: "Genel yayın adresi olarak aşağıdakilerden hangisi kullanılır?",
//       options: [
//         "0.0.0.0",
//         "111.111.111.111",
//         "128.128.128.128",
//         "192.168.1.1",
//         "255.255.255.255",
//       ],
//       correctAnswer: 4,
//     },
//     {
//       question:
//         "IP adresinin serbest bırakılması için kullanılan komut aşağıdakilerden hangisidir?",
//       options: [
//         "ipconfig /setclassid",
//         "ipconfig /renew",
//         "ipconfig /release",
//         "ipconfig /all",
//         "ipconfig /downi",
//       ],
//       correctAnswer: 2,
//     },
//     {
//       question:
//         "Aşağıdaki komutlardan hangisi Ethernet kartının fiziksel (MAC) adres bilgisini öğrenmede kullanılır?",
//       options: [
//         "ipconfit",
//         "ipconfig /all",
//         "nbstat -n",
//         "netstat",
//         "netstat –m",
//       ],
//       correctAnswer: 1,
//     },
//     {
//       question:
//         "Aşağıdaki komutlardan hangisiyle anahtara doğru bir şekilde isim verilir?",
//       options: [
//         "Anahtar>name MTAL",
//         "Anahtar#hostname MTAL",
//         "Anahtar(config)#hostname MTAL",
//         "Anahtar(config)#name MTAL",
//         "Anahtar(config-if)#hostname MTAL",
//       ],
//       correctAnswer: 2,
//     },
//     {
//       question:
//         "Anahtar MAC tablosunu görmek için aşağıdaki komutlardan hangisi kullanılır?",
//       options: [
//         "Anahtar>show mac-table-address",
//         "Anahtar#show mac-table",
//         "Anahtar>show mac-address-table",
//         "Anahtar#show mac-table-address",
//         "Anahtar#show mac-address-table",
//       ],
//       correctAnswer: 4,
//     },
//     {
//       question:
//         "Aşağıdakilerden hangisi bir kablosuz iletişim örneği değildir?",
//       options: [
//         "Bir kafeteryada Wi-Fi bağlantısı kullanarak internete bağlanmak",
//         "Kızılötesi kullanılarak cep telefonunda yer alan bir belgeyi bilgisayara aktarmak",
//         "Bir cihazdaki verileri USB kullanarak başka cihaza aktarmak",
//         "Bir cep telefonu ile diğer bir mobil cihazın bluetooth kullanarak iletişim kurmalarını sağlamak",
//         "Uzaktan kumanda kullanarak televizyondaki kanalları değiştirmek",
//       ],
//       correctAnswer: 2,
//     },
//   ];

//   const handleAnswerSelect = (index: any) => {
//     const updatedAnswers = [...selectedAnswers];
//     updatedAnswers[currentQuestion] = index;
//     setSelectedAnswers(updatedAnswers);
//   };
//   const handleNextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setShowResults(true);
//     }
//   };
//   const calculateScore = () => {
//     let score = 0;
//     questions.forEach((question, index) => {
//       if (selectedAnswers[index] === question.correctAnswer) {
//         score++;
//       }
//     });

//     return score;
//   };
//   const score = calculateScore();

//   const passingScore = Math.floor(questions.length * 0.5);

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import { PartyPopperIcon } from "lucide-react";
import { useLocation } from 'react-router-dom';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function Exam() {
  const location = useLocation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const width = window.innerWidth;
  const height = window.innerHeight;

  console.log(location.state.test);  // Log the questions array

  useEffect(() => {
    if (location.state && location.state.test) {
      setQuestions(location.state.test);
     
    }
  }, [location.state]);

  const handleAnswerSelect = (index: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestion] = index;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const score = calculateScore();
  const passingScore = Math.floor(questions.length * 0.5);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
      {!showResults ? (
        <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Test</h1>
            <p className="text-muted-foreground">
              Aşağıdaki {questions.length} çoktan seçmeli soruyu yanıtlayın
            </p>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Soru {currentQuestion + 1} ile ilgili {questions.length}
            </h2>
            <p className="text-lg mb-4">
              {questions[currentQuestion].text}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`bg-background border rounded-lg py-3 px-6 transition-colors hover:bg-accent hover:text-accent-foreground ${selectedAnswers[currentQuestion] === index
                      ? "bg-blue-700  text-white "
                      : ""
                    }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleNextQuestion}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-2">
              {score >= passingScore ? "Passed!" : "Failed"}
            </h1>
            <p className="text-muted-foreground">
              {questions.length} üzerinden {score} puan aldınız.
            </p>
            {!passingScore &&
              <Button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setSelectedAnswers([]);
                }}
              >
                Tekrar deneyin
              </Button>
            }
          </div>
          {score >= passingScore && (
            <>
              <Confetti
                width={width}
                height={height}
                title="hurrayyyyyyyyyyyyyyyyyyyyyyyyy"
              />
              <div className="flex justify-center items-center">
                <div className="relative w-full max-w-[400px] aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] rounded-full blur-[100px] opacity-50 animate-pulse" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#a18cd1] to-[#fbc2eb] rounded-full blur-[100px] opacity-50 animate-pulse delay-200" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#84fab0] to-[#8fd3f4] rounded-full blur-[100px] opacity-50 animate-pulse delay-400" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ffecd2] to-[#fcb69f] rounded-full blur-[100px] opacity-50 animate-pulse delay-600" />
                  <PartyPopperIcon className="self-center w-40 h-40 mt-20 ml-20 text-blue-700" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#a1c4fd] to-[#c2e9fb] rounded-full blur-[100px] opacity-50 animate-pulse delay-800" />
                </div>
              </div>
              <Button className="w-full bg-blue-700 text-white hover:bg-blue-600" onClick={() => { }}>
                Geri
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
