import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Clock, ArrowLeft, Check, X } from 'lucide-react'

// Mock exam data
const examData = {
  titleAr: "امتحان الفصل الاول : الدرس الثاني",
  titleEn: "First Chapter Exam: Second Lesson",
  duration: 30, // minutes
  totalQuestions: 3,
  questions: [
    {
      id: 1,
      textAr: "ما هي عاصمة مصر؟",
      textEn: "What is the capital of Egypt?",
      points: 1,
      options: [
        { id: "a", textAr: "الإسكندرية", textEn: "Alexandria" },
        { id: "b", textAr: "القاهرة", textEn: "Cairo" },
        { id: "c", textAr: "الأقصر", textEn: "Luxor" },
        { id: "d", textAr: "أسوان", textEn: "Aswan" },
      ],
      correctAnswer: "b"
    },
    {
      id: 2,
      textAr: "كم عدد أضلاع المثلث؟",
      textEn: "How many sides does a triangle have?",
      points: 1,
      options: [
        { id: "a", textAr: "٣", textEn: "3" },
        { id: "b", textAr: "٤", textEn: "4" },
        { id: "c", textAr: "٥", textEn: "5" },
        { id: "d", textAr: "٦", textEn: "6" },
      ],
      correctAnswer: "a"
    },
    {
      id: 3,
      textAr: "ما هو أكبر كوكب في النظام الشمسي؟",
      textEn: "What is the largest planet in the solar system?",
      points: 1,
      options: [
        { id: "a", textAr: "الأرض", textEn: "Earth" },
        { id: "b", textAr: "المريخ", textEn: "Mars" },
        { id: "c", textAr: "المشتري", textEn: "Jupiter" },
        { id: "d", textAr: "زحل", textEn: "Saturn" },
      ],
      correctAnswer: "c"
    },
  ],
}

export default function examPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(examData.duration * 60) // Convert to seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [examSubmitted, setExamSubmitted] = useState(false)
  const [score, setScore] = useState(null)

  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light")
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme"
  }, [isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", isArabic ? "ar" : "en")
    document.dir = isArabic ? "rtl" : "ltr"
  }, [isArabic])

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
    <div className={`exam-page ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
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
            <span>{isArabic ? "عودة" : "Back"}</span>
          </Link>
          <div className="exam-controls">
            <button className="btn btn-outline-primary" onClick={() => setIsDarkTheme(!isDarkTheme)}>
              {isDarkTheme ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button className="btn btn-outline-primary" onClick={() => setIsArabic(!isArabic)}>
              {isArabic ? "English" : "عربي"}
            </button>
          </div>
          <div className="exam-timer">
            <Clock className="timer-icon" />
            <span className={timeLeft < 300 ? "text-danger" : ""}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="exam-title">
          <h1>{isArabic ? examData.titleAr : examData.titleEn}</h1>
          <p className="exam-info">
            {isArabic ? "عدد الأسئلة:" : "Questions:"} {examData.questions.length} •{" "}
            {isArabic ? "مدة الامتحان:" : "Duration:"} {examData.duration} {isArabic ? "دقيقة" : "minutes"}
          </p>
        </div>

        <div className="exam-questions">
          {examData.questions.map((question) => (
            <div key={question.id} className={`question-card ${examSubmitted ? (answers[question.id] === question.correctAnswer ? 'correct' : 'incorrect') : ''}`}>
              <div className="question-header">
                <h3>
                  {question.id}. {isArabic ? question.textAr : question.textEn}
                </h3>
                <span className="question-points">
                  {question.points} {isArabic ? "درجة" : "point"}
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
                      {isArabic ? option.textAr : option.textEn}
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
                isArabic ? "جاري التسليم..." : "Submitting..."
              ) : (
                isArabic ? "تسليم" : "Submit"
              )}
            </button>
          ) : (
            <div className="exam-results">
              <h2>{isArabic ? "نتيجة الاختبار" : "Exam Results"}</h2>
              <p>{isArabic ? `درجتك: ${score.toFixed(2)}%` : `Your score: ${score.toFixed(2)}%`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
