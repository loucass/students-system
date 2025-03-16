import { useState, useEffect, useRef, useContext } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Clock, FileText, ChevronLeft } from "lucide-react"
import AllLinks from "./Links"
import { MainContextObj } from "./shared/MainContext"

// Sample exam data
const examData = {
  currentExams: [
    {
      id: 1,
      title: "First Chapter Exam",
      time: 30,
      questions: 60,
      reviewUrl: "#",
      examLink: "/First Chapter Exam",
    },
    {
      id: 2,
      title: "Second Chapter Exam",
      time: 30,
      questions: 60,
      reviewUrl: "#",
      examLink: "/Second Chapter Exam",
    },
    {
      id: 3,
      title: "Interactive Exam",
      time: "-",
      questions: "-",
      reviewUrl: "#",
      examLink: "/Interactive Exam",
    },
  ],
  upcomingExams: [
    {
      id: 1,
      title: "Third Chapter",
      date: "2024/6/20",
      time: "9:00 PM",
      duration: 30,
      score: 100,
    },
    {
      id: 2,
      title: "Second Chapter",
      date: "2024/6/25",
      time: "8:30 PM",
      duration: 30,
      score: 100,
    },
  ],
  examResults: [
    {
      id: 1,
      title: "First Chapter",
      date: "2024/6/15",
      status: "Pass",
      score: "90/100",
    },
    {
      id: 2,
      title: "Fourth Chapter",
      date: "2024/6/17",
      status: "Pass",
      score: "95/100",
    },
    {
      id: 3,
      title: "Comprehensive Exam",
      date: "2024/6/17",
      status: "Fail",
      score: "60/100",
    },
  ],
}

export default function Exams() {
  const data = useContext(MainContextObj)

  const sidebarRef = useRef(null)

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && data.isSidebarOpen) {
        data.setIsSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [data.isSidebarOpen])

  const toggleSidebar = () => {
    data.setIsSidebarOpen(!data.isSidebarOpen)
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="dashboard-container">
        {/* Left Sidebar */}
        <div ref={sidebarRef} className={`sidebar ${data.isSidebarOpen ? "open" : ""}`}>
          <div className="profile-section">
            <img src="/placeholder.svg?height=80&width=80" alt="Profile" className="profile-image" />
            <h3>{data.isArabic ? "يوسف احمد" : "Yousef Ahmed"}</h3>
            <p>{data.isArabic ? "الصف الثاني" : "Second Grade"}</p>
          </div>

          <div className="sidebar-links">
          <AllLinks isArabic={data.isArabic} />
          </div>
        </div>

        {/* Main Content */}
        <main className="main-content">
          <div className="exams-container">
            <h1>{data.isArabic ? "الاختبارات" : "Exams"}</h1>

            {/* Current Exams */}
            <div className="current-exams">
              {examData.currentExams.map((exam) => (
                <div key={exam.id} className="exam-card">
                  <h3>{exam.title}</h3>
                  <div className="exam-details">
                    <div className="detail-item">
                      <Clock className="icon" />
                      <span>{data.isArabic ? "الوقت" : "Time"}</span>
                      <strong>
                        {exam.time} {data.isArabic ? "دقيقة" : "min"}
                      </strong>
                    </div>
                    <div className="detail-item">
                      <FileText className="icon" />
                      <span>{data.isArabic ? "الأسئلة" : "Questions"}</span>
                      <strong>
                        {exam.questions} {data.isArabic ? "سؤال" : "questions"}
                      </strong>
                    </div>
                  </div>
                  <div className="exam-actions">
                  <Link to={`/examPage${exam.examLink}`} className="btn-start text-decoration-none">{data.isArabic ? "بدء الامتحان" : "Start Exam"}</Link>
                  <Link to={exam.reviewUrl ? exam.reviewUrl : "#"} className="review-link">
                      <ChevronLeft className="icon" />
                      {data.isArabic ? "مراجعة الدرس" : "Review Lesson"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Exams */}
            <div className="exams-section">
              <h2>{data.isArabic ? "امتحانات قادمة" : "Upcoming Exams"}</h2>
              <div className="table-responsive">
                <table className="exams-table">
                  <thead>
                    <tr>
                      <th>{data.isArabic ? "عنوان الامتحان" : "Exam Title"}</th>
                      <th>{data.isArabic ? "المدة" : "Duration"}</th>
                      <th>{data.isArabic ? "التاريخ" : "Date"}</th>
                      <th>{data.isArabic ? "الوقت" : "Time"}</th>
                      <th>{data.isArabic ? "الدرجة" : "Score"}</th>
                      <th>{data.isArabic ? "تفاصيل" : "Details"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examData.upcomingExams.map((exam) => (
                      <tr key={exam.id}>
                        <td>{exam.title}</td>
                        <td>
                          {exam.duration} {data.isArabic ? "دقيقة" : "min"}
                        </td>
                        <td>{exam.date}</td>
                        <td>{exam.time}</td>
                        <td>{exam.score}</td>
                        <td>
                          <button className="btn-details">{data.isArabic ? "تفاصيل" : "Details"}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Exam Results */}
            <div className="exams-section">
              <h2>{data.isArabic ? "نتيجة الامتحانات" : "Exam Results"}</h2>
              <div className="table-responsive">
                <table className="exams-table results-table">
                  <thead>
                    <tr>
                      <th>{data.isArabic ? "عنوان الامتحان" : "Exam Title"}</th>
                      <th>{data.isArabic ? "التاريخ" : "Date"}</th>
                      <th>{data.isArabic ? "الحالة" : "Status"}</th>
                      <th>{data.isArabic ? "الدرجة" : "Score"}</th>
                      <th>{data.isArabic ? "تفاصيل" : "Details"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examData.examResults.map((result) => (
                      <tr key={result.id}>
                        <td>{result.title}</td>
                        <td>{result.date}</td>
                        <td>
                          <span className={`status-badge ${result.status === "نجاح" ? "success" : "fail"}`}>
                            {result.status}
                          </span>
                        </td>
                        <td>{result.score}</td>
                        <td>
                          <button className="btn-details">{data.isArabic ? "تفاصيل" : "Details"}</button>
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
        <AllLinks isArabic={data.isArabic} />
        </div>
      </div>
    </div>
  )
}

