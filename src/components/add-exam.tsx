import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { ScrollArea } from "./ui/scroll-area"

export default function AddExam() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quizTitle, setQuizTitle] = useState("")
  const [questions, setQuestions] = useState([
    {
      text: "",
      options: ["", "", "", "", ""],
      correctAnswer: 0,
    },
  ])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: ["", "", "", "", ""],
        correctAnswer: 0,
      },
    ])
    setCurrentQuestionIndex(questions.length)
  }

  const updateQuestionText = (index: number, text: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[index].text = text
    setQuestions(updatedQuestions)
  }

  const updateQuestionOption = (questionIndex: number, optionIndex: number, option: any) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].options[optionIndex] = option
    setQuestions(updatedQuestions)
  }

  const updateCorrectAnswer = (questionIndex: number, answer: any) => {
    const updatedQuestions = [...questions]
    updatedQuestions[questionIndex].correctAnswer = answer
    setQuestions(updatedQuestions)
  }

  const saveQuiz = () => {
    console.log("Quiz Title:", quizTitle)
    console.log("Questions:", questions)
    setIsModalOpen(false)
  }

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Add Quiz</Button>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] h-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Quiz</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="quiz-title">Quiz Title</Label>
              <Input id="quiz-title" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
            </div>
            <div key={currentQuestionIndex} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`question-${currentQuestionIndex}`}>Question {currentQuestionIndex + 1}</Label>
                <Input
                  id={`question-${currentQuestionIndex}`}
                  value={questions[currentQuestionIndex].text}
                  onChange={(e) => updateQuestionText(currentQuestionIndex, e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Options</Label>
                <div className="grid grid-cols-2 gap-2">
                  {questions[currentQuestionIndex].options.map((option, optionIndex) => (
                    <Input
                      key={optionIndex}
                      value={option}
                      onChange={(e) => updateQuestionOption(currentQuestionIndex, optionIndex, e.target.value)}
                    />
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`correct-answer-${currentQuestionIndex}`}>Correct Answer</Label>
                <Select
                  id={`correct-answer-${currentQuestionIndex}`}
                  value={questions[currentQuestionIndex].correctAnswer}
                  onValueChange={(value: any) => updateCorrectAnswer(currentQuestionIndex, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select correct answer" />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4].map((option) => (
                      <SelectItem key={option} value={option}>
                        Option {option + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={addQuestion}>Add Question</Button>
            <div className="flex justify-between mt-4">
              <Button onClick={prevQuestion} disabled={currentQuestionIndex === 0}>
                Previous Question
              </Button>
              <Button onClick={nextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
                Next Question
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={saveQuiz}>Save Quiz</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
