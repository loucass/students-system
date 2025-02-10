import { useEffect, useState } from "react"
import { Check, X, Clock, AlertCircle } from "lucide-react"
import Navbar from "./NavBar"

// Mock exam data
const mockExam = {
  title: "Math Exam",
  timeLimit: 30, // in minutes
  questions: [
    {
      id: 1,
      text: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
    },
    {
      id: 2,
      text: "What is the square root of 16?",
      options: ["2", "4", "8", "16"],
    },
    {
      id: 3,
      text: "What is 10 * 5?",
      options: ["40", "50", "60", "70"],
    },
  ],
}

// Mock correct answers (simulating server response)
const mockCorrectAnswers = {
  1: "4",
  2: "4",
  3: "50",
}

export default function ExamPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(null)
  const [timeLeft, setTimeLeft] = useState(mockExam.timeLimit * 60)

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)

    // Simulate fetching correct answers from server
    setTimeout(() => {
      setCorrectAnswers(mockCorrectAnswers)
      let correctCount = 0
      Object.keys(mockCorrectAnswers).forEach((questionId) => {
        if (answers[questionId] === mockCorrectAnswers[questionId]) {
          correctCount++
        }
      })
      setScore(correctCount)
    }, 1000) // Simulate a 1-second delay
  }

  // Timer effect
  useEffect(() => {
    if (!submitted && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !submitted) {
      handleSubmit();
    }
  }, [timeLeft, submitted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  return (
    <div className={isDarkTheme ? "dark-theme examPage" : "light-theme"}>
      <Navbar
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        toggleSidebar={() => {}}
        isSidebarOpen={false}
      />

      <div className="exam-container">
        <h1 className="exam-title">{mockExam.title}</h1>
        <div className="exam-info">
          <div className="time-left">
            <Clock size={20} />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <div className="question-count">
            <AlertCircle size={20} />
            <span>
              {mockExam.questions.length} {isArabic ? "أسئلة" : "Questions"}
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="exam-form">
          {mockExam.questions.map((question) => (
            <div key={question.id} className="question-card">
              <h2 className="question-text">{question.text}</h2>
              <div className="options-container">
                {question.options.map((option, index) => (
                  <label key={index} className="option-label">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      onChange={() => handleAnswerChange(question.id, option)}
                      disabled={submitted}
                      required
                    />
                    <span className="option-text">{option}</span>
                    {submitted && correctAnswers && (
                      <span className="answer-indicator">
                        {option === correctAnswers[question.id] ? (
                          <Check className="correct" />
                        ) : answers[question.id] === option ? (
                          <X className="incorrect" />
                        ) : null}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
          {!submitted && (
            <button type="submit" className="submit-button">
              {isArabic ? "تقديم الامتحان" : "Submit Exam"}
            </button>
          )}
        </form>
        {submitted && correctAnswers && (
          <div className="result-container">
            <h2 className="result-title">{isArabic ? "نتيجة الامتحان" : "Exam Result"}</h2>
            <p className="result-score">
              {isArabic
                ? `لقد حصلت على ${score} من أصل ${mockExam.questions.length} نقاط`
                : `You scored ${score} out of ${mockExam.questions.length} points`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

