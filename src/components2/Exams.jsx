import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Clock, FileText, ChevronLeft } from "lucide-react"
import Navbar from "./NavBar"
import AllLinks from "./Links"

// Sample exam data
const examData = {
  currentExams: [
    {
      id: 1,
      titleAr: "اختبار على الفصل الأول",
      titleEn: "First Chapter Exam",
      time: 30,
      questions: 60,
      reviewUrl: "#",
    },
    {
      id: 2,
      titleAr: "اختبار على الفصل الثاني",
      titleEn: "Second Chapter Exam",
      time: 30,
      questions: 60,
      reviewUrl: "#",
    },
    {
      id: 3,
      titleAr: "امتحان تفاعلي",
      titleEn: "Interactive Exam",
      time: "-",
      questions: "-",
      reviewUrl: "#",
    },
  ],
  upcomingExams: [
    {
      id: 1,
      titleAr: "الفصل الثالث",
      titleEn: "Third Chapter",
      date: "2024/6/20",
      time: "9:00 مساءً",
      timeEn: "9:00 PM",
      duration: 30,
      score: 100,
    },
    {
      id: 2,
      titleAr: "الفصل الثاني",
      titleEn: "Second Chapter",
      date: "2024/6/25",
      time: "8:30 مساءً",
      timeEn: "8:30 PM",
      duration: 30,
      score: 100,
    },
  ],
  examResults: [
    {
      id: 1,
      titleAr: "الفصل الأول",
      titleEn: "First Chapter",
      date: "2024/6/15",
      status: "نجاح",
      statusEn: "Pass",
      score: "90/100",
    },
    {
      id: 2,
      titleAr: "الفصل الرابع",
      titleEn: "Fourth Chapter",
      date: "2024/6/17",
      status: "نجاح",
      statusEn: "Pass",
      score: "95/100",
    },
    {
      id: 3,
      titleAr: "امتحان شامل",
      titleEn: "Comprehensive Exam",
      date: "2024/6/17",
      status: "رسوب",
      statusEn: "Fail",
      score: "60/100",
    },
  ],
}

export default function Exams() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef(null)

  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light")
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme"
  }, [isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", isArabic ? "ar" : "en")
    document.dir = isArabic ? "rtl" : "ltr"
  }, [isArabic])

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isSidebarOpen])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className={`dashboard ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <Navbar
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="dashboard-container">
        {/* Left Sidebar */}
        <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="profile-section">
            <img src="/placeholder.svg?height=80&width=80" alt="Profile" className="profile-image" />
            <h3>{isArabic ? "يوسف احمد" : "Yousef Ahmed"}</h3>
            <p>{isArabic ? "الصف الثاني" : "Second Grade"}</p>
          </div>

          <div className="sidebar-links">
          <AllLinks isArabic={isArabic} />
          </div>
        </div>

        {/* Main Content */}
        <main className="main-content">
          <div className="exams-container">
            <h1>{isArabic ? "الاختبارات" : "Exams"}</h1>

            {/* Current Exams */}
            <div className="current-exams">
              {examData.currentExams.map((exam) => (
                <div key={exam.id} className="exam-card">
                  <h3>{isArabic ? exam.titleAr : exam.titleEn}</h3>
                  <div className="exam-details">
                    <div className="detail-item">
                      <Clock className="icon" />
                      <span>{isArabic ? "الوقت" : "Time"}</span>
                      <strong>
                        {exam.time} {isArabic ? "دقيقة" : "min"}
                      </strong>
                    </div>
                    <div className="detail-item">
                      <FileText className="icon" />
                      <span>{isArabic ? "الأسئلة" : "Questions"}</span>
                      <strong>
                        {exam.questions} {isArabic ? "سؤال" : "questions"}
                      </strong>
                    </div>
                  </div>
                  <div className="exam-actions">
                    <button className="btn-start">{isArabic ? "بدء الامتحان" : "Start Exam"}</button>
                    <a to={exam.reviewUrl} className="review-link">
                      <ChevronLeft className="icon" />
                      {isArabic ? "مراجعة الدرس" : "Review Lesson"}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Exams */}
            <div className="exams-section">
              <h2>{isArabic ? "امتحانات قادمة" : "Upcoming Exams"}</h2>
              <div className="table-responsive">
                <table className="exams-table">
                  <thead>
                    <tr>
                      <th>{isArabic ? "عنوان الامتحان" : "Exam Title"}</th>
                      <th>{isArabic ? "المدة" : "Duration"}</th>
                      <th>{isArabic ? "التاريخ" : "Date"}</th>
                      <th>{isArabic ? "الوقت" : "Time"}</th>
                      <th>{isArabic ? "الدرجة" : "Score"}</th>
                      <th>{isArabic ? "تفاصيل" : "Details"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examData.upcomingExams.map((exam) => (
                      <tr key={exam.id}>
                        <td>{isArabic ? exam.titleAr : exam.titleEn}</td>
                        <td>
                          {exam.duration} {isArabic ? "دقيقة" : "min"}
                        </td>
                        <td>{exam.date}</td>
                        <td>{isArabic ? exam.time : exam.timeEn}</td>
                        <td>{exam.score}</td>
                        <td>
                          <button className="btn-details">{isArabic ? "تفاصيل" : "Details"}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Exam Results */}
            <div className="exams-section">
              <h2>{isArabic ? "نتيجة الامتحانات" : "Exam Results"}</h2>
              <div className="table-responsive">
                <table className="exams-table results-table">
                  <thead>
                    <tr>
                      <th>{isArabic ? "عنوان الامتحان" : "Exam Title"}</th>
                      <th>{isArabic ? "التاريخ" : "Date"}</th>
                      <th>{isArabic ? "الحالة" : "Status"}</th>
                      <th>{isArabic ? "الدرجة" : "Score"}</th>
                      <th>{isArabic ? "تفاصيل" : "Details"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examData.examResults.map((result) => (
                      <tr key={result.id}>
                        <td>{isArabic ? result.titleAr : result.titleEn}</td>
                        <td>{result.date}</td>
                        <td>
                          <span className={`status-badge ${result.status === "نجاح" ? "success" : "fail"}`}>
                            {isArabic ? result.status : result.statusEn}
                          </span>
                        </td>
                        <td>{result.score}</td>
                        <td>
                          <button className="btn-details">{isArabic ? "تفاصيل" : "Details"}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>

        {/* Right Navigation */}
        <div className="right-nav">
        <AllLinks isArabic={isArabic} />
        </div>
      </div>
    </div>
  )
}

