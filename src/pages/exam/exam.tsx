import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Confetti from "react-confetti";
import { PartyPopperIcon } from "lucide-react";
import { useLocation } from 'react-router-dom';
import Nav from "@/components/stuNav";
import Footer from "@/components/footer";

export default function Exam() {
  const location = useLocation();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    if (location.state && location.state.test) {
      console.log("Test data received:", location.state.test);
      if (Array.isArray(location.state.test.questions)) {
        const testQuestions = location.state.test.questions;
        console.log("Setting questions:", testQuestions);
        setQuestions(testQuestions);
      } else {
        console.error("Questions data is not an array:", location.state.test.questions);
      }
    } else {
      console.error("No test data found in location.state");
    }
  }, [location.state]);

  useEffect(() => {
    console.log("Questions state updated:", questions);
  }, [questions]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAnswerSelect = (index) => {
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
    <>
      <Nav />
      <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-muted">
        {!showResults ? (
          <div className="bg-background p-8 rounded-lg shadow-lg w-full max-w-3xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Test</h1>
              <p className="text-muted-foreground">
                Aşağıdaki {questions.length} çoktan seçmeli soruyu yanıtlayın
              </p>
            </div>
            {questions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Soru {currentQuestion + 1} / {questions.length}
                </h2>
                <p className="text-lg mb-4">
                  {questions[currentQuestion]?.text}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {questions[currentQuestion]?.options?.map((option, index) => (
                    <button
                      key={index}
                      className={`bg-background border rounded-lg py-3 px-6 transition-colors hover:bg-accent hover:text-accent-foreground ${selectedAnswers[currentQuestion] === index ? "bg-blue-700 text-white" : ""}`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
              {score < passingScore && (
                <Button
                  onClick={() => {
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setSelectedAnswers([]);
                  }}
                >
                  Tekrar deneyin
                </Button>
              )}
            </div>
            {score >= passingScore && (
              <>
                <Confetti
                  width={windowSize.width}
                  height={windowSize.height}
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
      <Footer />
    </>
  );
}