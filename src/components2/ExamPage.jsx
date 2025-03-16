import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { Clock, ArrowLeft, Check, X } from 'lucide-react'
import { MainContextObj } from "./shared/MainContext"

// Mock exam data
const examData = {
  titleAr: "امتحان الفصل الاول : الدرس الثاني",
  titleEn: "First Chapter Exam: Second Lesson",
  duration: 3, // minutes
  totalQuestions: 3,
  questions: [
    {
      id: 1,
      text: "What is the capital of Egypt?",
      points: 1,
      options: [
        { id: "a", text: "Alexandria" },
        { id: "b", text: "Cairo" },
        { id: "c", text: "Luxor" },
        { id: "d", text: "Aswan" },
      ],
      correctAnswer: "b"
    },
    {
      id: 2,
      text: "How many sides does a triangle have?",
      points: 1,
      options: [
        { id: "a", text: "3" },
        { id: "b", text: "4" },
        { id: "c", text: "5" },
        { id: "d", text: "6" },
      ],
      correctAnswer: "a"
    },
    {
      id: 3,
      text: "What is the largest planet in the solar system?",
      points: 1,
      options: [
        { id: "a", text: "Earth" },
        { id: "b", text: "Mars" },
        { id: "c", text: "Jupiter" },
        { id: "d", text: "Saturn" },
      ],
      correctAnswer: "c"
    },
  ],
}

export default function examPage() {
  const data = useContext(MainContextObj)

  const {examID} = useParams()

  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(examData.duration * 60) // Convert to seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  // Handle countdown
  useEffect(() => {
    if (!examSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            handleSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [examSubmitted])

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Calculate progress percentage
  const progress = ((examData.duration * 60 - timeLeft) / (examData.duration * 60)) * 100

  // Get warning color based on time left
  const getProgressColor = () => {
    if (timeLeft < 300) return "var(--danger-color)" // Less than 5 minutes
    if (timeLeft < 600) return "var(--warning-color)" // Less than 10 minutes
    return "var(--success-color)"
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    // Calculate score
    let correctAnswers = 0
    examData.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })
    const calculatedScore = (correctAnswers / examData.questions.length) * 100

    setScore(calculatedScore)
    setExamSubmitted(true)
    
    // Simulate API call
    console.log(JSON.stringify({
      examId: "exam-001",
      studentId: "student-001",
      timeSpent: examData.duration * 60 - timeLeft,
      answers: answers,
      score: calculatedScore,
      submittedAt: new Date().toISOString()
    }, null, 2))

    setIsSubmitting(false)
  }

  return (
    <div className={`exam-page ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>
      {/* Progress bar */}
      <div className="exam-progress-bar">
        <div
          className="progress-fill"
          style={{ 
            width: `${progress}%`,
            backgroundColor: getProgressColor(),
          }}
        />
      </div>

      {/* Exam Content */}
      <div className="exam-container">
        <div className="exam-header">
          <Link to="/exams" className="back-button">
            <ArrowLeft />
            <span>{data.isArabic ? "عودة" : "Back"}</span>
          </Link>
          <div className="exam-timer">
            <Clock className="timer-icon" />
            <span className={timeLeft < 300 ? "text-danger" : ""}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="exam-title">
          <h1>{examID}</h1>
          {/* <h1>{data.isArabic ? examData.titleAr : examData.titleEn}</h1> */}
          <p className="exam-info">
            {data.isArabic ? "عدد الأسئلة:" : "Questions:"} {examData.questions.length} •{" "}
            {data.isArabic ? "مدة الامتحان:" : "Duration:"} {examData.duration} {data.isArabic ? "دقيقة" : "minutes"}
          </p>
        </div>

        <div className="exam-questions">
          {examData.questions.map((question) => (
            <div key={question.id} className={`question-card ${examSubmitted ? (answers[question.id] === question.correctAnswer ? 'correct' : 'incorrect') : ''}`}>
              <div className="question-header">
                <h3>
                  {question.id}. {question.text}
                </h3>
                <span className="question-points">
                  {question.points} {data.isArabic ? "درجة" : "point"}
                </span>
              </div>
              <div className="question-options">
                {question.options.map((option) => (
                  <label key={option.id} className={`option-label ${examSubmitted ? (option.id === question.correctAnswer ? 'correct' : answers[question.id] === option.id ? 'incorrect' : '') : ''}`}>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.id}
                      checked={answers[question.id] === option.id}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      disabled={examSubmitted}
                    />
                    <span className="option-text">
                      {option.text}
                    </span>
                    {examSubmitted && option.id === question.correctAnswer && <Check className="icon-correct" />}
                    {examSubmitted && answers[question.id] === option.id && option.id !== question.correctAnswer && <X className="icon-incorrect" />}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="exam-footer">
          {!examSubmitted ? (
            <button 
              className="submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                data.isArabic ? "جاري التسليم..." : "Submitting..."
              ) : (
                data.isArabic ? "تسليم" : "Submit"
              )}
            </button>
          ) : (
            <div className="exam-results">
              <h2>{data.isArabic ? "نتيجة الاختبار" : "Exam Results"}</h2>
              <p>{data.isArabic ? `درجتك: ${score.toFixed(2)}%` : `Your score: ${score.toFixed(2)}%`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
