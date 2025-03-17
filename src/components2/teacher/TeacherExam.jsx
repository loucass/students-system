import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import {
  Grid,
  User,
  MessageSquare,
  FileText,
  BookOpen,
  Award,
  Settings,
  LogOut,
  ChevronDown,
  ChevronLeft,
  FileText as FileIcon,
} from "lucide-react"
import "./teacherExam.css"
import { MainContextObj } from "../shared/MainContext"

// Mock data for exams
const mockExamData = {
  teacher: {
    id: "T12345",
    name: "م/أحمد حسن",
    role: "مدرس رياضيات",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  notifications: 1,
  upcomingExams: [
    {
      id: 1,
      title: "الفصل الثالث",
      date: "2024/6/20",
      time: "9:00 مساءً",
      duration: 60,
      grade: 100,
    },
    {
      id: 2,
      title: "الفصل الثاني",
      date: "2024/6/25",
      time: "6:30 مساءً",
      duration: 40,
      grade: 60,
    },
    {
      id: 3,
      title: "امتحان شامل",
      date: "2024/6/22",
      time: "10:00 صباحًا",
      duration: 30,
      grade: 100,
    },
    {
      id: 4,
      title: "الفصل الأول",
      date: "2024/6/15",
      time: "11:00 صباحًا",
      duration: 60,
      grade: 50,
    },
    {
      id: 5,
      title: "مراجعة الفصل الأول",
      date: "2024/6/17",
      time: "7:00 مساءً",
      duration: 20,
      grade: 80,
    },
    {
      id: 6,
      title: "الفصل الرابع",
      date: "2024/6/17",
      time: "4:00 مساءً",
      duration: 60,
      grade: 40,
    },
    {
      id: 7,
      title: "امتحان شامل",
      date: "2024/6/17",
      time: "11:30 صباحًا",
      duration: 60,
      grade: 100,
    },
    {
      id: 8,
      title: "الفصل الرابع",
      date: "2024/6/17",
      time: "10:15 صباحًا",
      duration: 40,
      grade: 50,
    },
  ],
  examResults: [
    {
      id: 1,
      title: "الفصل الثالث",
      date: "2024/6/20",
      successRate: 90,
      grade: 100,
    },
    {
      id: 2,
      title: "الفصل الثاني",
      date: "2024/6/25",
      successRate: 45,
      grade: 50,
    },
    {
      id: 3,
      title: "الفصل الأول",
      date: "2024/6/22",
      successRate: 95,
      grade: 100,
    },
    {
      id: 4,
      title: "الفصل الأول",
      date: "2024/6/15",
      successRate: 85,
      grade: 100,
    },
    {
      id: 5,
      title: "امتحان شامل",
      date: "2024/6/17",
      successRate: 80,
      grade: 50,
    },
    {
      id: 6,
      title: "الفصل الرابع",
      date: "2024/6/17",
      successRate: 90,
      grade: 100,
    },
    {
      id: 7,
      title: "امتحان شامل",
      date: "2024/6/17",
      successRate: 90,
      grade: 50,
    },
    {
      id: 8,
      title: "الفصل الرابع",
      date: "2024/6/17",
      successRate: 90,
      grade: 100,
    },
  ],
  currentClass: {
    name: "الصف الأول الثانوي",
  },
}

export default function TeacherExam() {
    const data = useContext(MainContextObj)

  const [examData, setExamData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  // New exam form state
  const [newExam, setNewExam] = useState({
    title: "",
    duration: "",
    grade: "",
    date: "",
    time: "",
  })

  // Sort state for tables
  const [upcomingExamsSort, setUpcomingExamsSort] = useState({ field: "date", direction: "asc" })
  const [examResultsSort, setExamResultsSort] = useState({ field: "date", direction: "asc" })

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setExamData(mockExamData)
      } catch (error) {
        console.error("Error fetching exam data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewExam({
      ...newExam,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!newExam.title || !newExam.duration || !newExam.grade || !newExam.date || !newExam.time) {
      alert(data.isArabic ? "يرجى ملء جميع الحقول" : "Please fill all fields")
      return
    }

    // Format data for backend
    const examToSubmit = {
      title: newExam.title,
      duration: Number.parseInt(newExam.duration),
      grade: Number.parseInt(newExam.grade),
      date: newExam.date,
      time: newExam.time,
    }

    // Log the data that would be sent to backend
    console.log("Submitting exam data to backend:", JSON.stringify(examToSubmit, null, 2))

    // Simulate successful submission
    alert(data.isArabic ? "تم إنشاء الامتحان بنجاح" : "Exam created successfully")

    // Reset form
    setNewExam({
      title: "",
      duration: "",
      grade: "",
      date: "",
      time: "",
    })
  }

  // Sort function for tables
  const sortData = (data, sortConfig) => {
    if (!sortConfig.field) return data

    return [...data].sort((a, b) => {
      if (a[sortConfig.field] < b[sortConfig.field]) {
        return sortConfig.direction === "asc" ? -1 : 1
      }
      if (a[sortConfig.field] > b[sortConfig.field]) {
        return sortConfig.direction === "asc" ? 1 : -1
      }
      return 0
    })
  }

  // Handle sort for upcoming exams
  const handleUpcomingExamsSort = (field) => {
    setUpcomingExamsSort({
      field,
      direction: upcomingExamsSort.field === field && upcomingExamsSort.direction === "asc" ? "desc" : "asc",
    })
  }

  // Handle sort for exam results
  const handleExamResultsSort = (field) => {
    setExamResultsSort({
      field,
      direction: examResultsSort.field === field && examResultsSort.direction === "asc" ? "desc" : "asc",
    })
  }

  // Get sorted data
  const getSortedUpcomingExams = () => {
    if (!examData) return []
    return sortData(examData.upcomingExams, upcomingExamsSort)
  }

  const getSortedExamResults = () => {
    if (!examData) return []
    return sortData(examData.examResults, examResultsSort)
  }

  if (loading) {
    return <div className="teacher-exam-styling-loading">جاري التحميل...</div>
  }

  if (!examData) {
    return <div className="teacher-exam-styling-error">حدث خطأ في تحميل البيانات</div>
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-exam-styling-dashboard-container">
        {/* Sidebar */}
        <aside className="teacher-exam-styling-sidebar">
          <div className="teacher-exam-styling-profile">
            <img
              src={examData.teacher.avatar || "/placeholder.svg"}
              alt="Teacher Profile"
              className="teacher-exam-styling-profile-image"
            />
            <h3 className="teacher-exam-styling-profile-name">{examData.teacher.name}</h3>
          </div>

          <div className="teacher-exam-styling-class-selector">
            <span>{examData.currentClass.name}</span>
            <ChevronDown />
          </div>

          <nav className="teacher-exam-styling-nav">
            <Link to="/teacher" className="teacher-exam-styling-nav-item">
              <Grid size={20} />
              <span>{data.isArabic ? "الرئيسية" : "Dashboard"}</span>
            </Link>
            <Link to="/teacher/students" className="teacher-exam-styling-nav-item">
              <User size={20} />
              <span>{data.isArabic ? "الطلاب" : "Students"}</span>
            </Link>
            <Link to="/teacher/live-lessons" className="teacher-exam-styling-nav-item">
              <MessageSquare size={20} />
              <span>{data.isArabic ? "الدروس المباشرة" : "Live Lessons"}</span>
            </Link>
            <Link to="/teacher/exams" className="teacher-exam-styling-nav-item active">
              <FileText size={20} />
              <span>{data.isArabic ? "الاختبارات" : "Exams"}</span>
            </Link>
            <Link to="/teacher/curriculum" className="teacher-exam-styling-nav-item">
              <BookOpen size={20} />
              <span>{data.isArabic ? "المنهج" : "Curriculum"}</span>
            </Link>
            <Link to="/teacher/revisions" className="teacher-exam-styling-nav-item">
              <FileText size={20} />
              <span>{data.isArabic ? "المراجعات" : "Revisions"}</span>
            </Link>
            <Link to="/teacher/challenges" className="teacher-exam-styling-nav-item">
              <Award size={20} />
              <span>{data.isArabic ? "التحديات" : "Challenges"}</span>
            </Link>
            <Link to="/teacher/chat" className="teacher-exam-styling-nav-item">
              <MessageSquare size={20} />
              <span>{data.isArabic ? "المحادثات" : "Chat"}</span>
            </Link>
            <Link to="/teacher/help" className="teacher-exam-styling-nav-item">
              <User size={20} />
              <span>{data.isArabic ? "المساعدة" : "Help"}</span>
            </Link>
            <Link to="/teacher/settings" className="teacher-exam-styling-nav-item">
              <Settings size={20} />
              <span>{data.isArabic ? "الإعدادات" : "Settings"}</span>
            </Link>
          </nav>

          <div className="teacher-exam-styling-logout">
            <LogOut size={20} />
            <span>{data.isArabic ? "تسجيل الخروج" : "Logout"}</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className="teacher-exam-styling-main">
          <div className="teacher-exam-styling-header">
            <h1 className="teacher-exam-styling-title">{data.isArabic ? "الاختبارات" : "Exams"}</h1>
          </div>

          {/* Create New Exam Form */}
          <div className="teacher-exam-styling-create-exam-container">
            <div className="teacher-exam-styling-create-exam-header">
              <h2 className="teacher-exam-styling-create-exam-title">
                {data.isArabic ? "اضف امتحان جديد" : "Add New Exam"}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="teacher-exam-styling-create-exam-form">
              <div className="teacher-exam-styling-form-row">
                <div className="teacher-exam-styling-form-group">
                  <input
                    type="text"
                    className="teacher-exam-styling-form-control"
                    placeholder={data.isArabic ? "عنوان الامتحان..." : "Exam Title..."}
                    name="title"
                    value={newExam.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="teacher-exam-styling-form-group">
                  <input
                    type="number"
                    className="teacher-exam-styling-form-control"
                    placeholder={data.isArabic ? "مدة الامتحان..." : "Exam Duration..."}
                    name="duration"
                    value={newExam.duration}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="teacher-exam-styling-form-group">
                  <input
                    type="number"
                    className="teacher-exam-styling-form-control"
                    placeholder={data.isArabic ? "الدرجة النهائية..." : "Final Grade..."}
                    name="grade"
                    value={newExam.grade}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="teacher-exam-styling-form-row">
                <div className="teacher-exam-styling-form-group">
                  <input
                    type="date"
                    className="teacher-exam-styling-form-control"
                    placeholder={data.isArabic ? "التاريخ..." : "Date..."}
                    name="date"
                    value={newExam.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="teacher-exam-styling-form-group">
                  <input
                    type="time"
                    className="teacher-exam-styling-form-control"
                    placeholder={data.isArabic ? "الوقت..." : "Time..."}
                    name="time"
                    value={newExam.time}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="teacher-exam-styling-form-group">
                  <Link to="/teacher/exams/questions" className="teacher-exam-styling-add-questions-btn">
                    {data.isArabic ? "ادخل الأسئلة" : "Add Questions"}
                    <ChevronLeft className="teacher-exam-styling-icon-left" />
                  </Link>
                </div>
              </div>
              <div className="teacher-exam-styling-form-actions">
                <button type="submit" className="teacher-exam-styling-submit-btn">
                  <FileIcon size={18} />
                  <span>{data.isArabic ? "اضف الامتحان" : "Add Exam"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Exams Tables */}
          <div className="teacher-exam-styling-tables-container">
            <div className="teacher-exam-styling-table-section">
              <div className="teacher-exam-styling-table-header">
                <h3 className="teacher-exam-styling-table-title">{data.isArabic ? "امتحانات قادمة" : "Upcoming Exams"}</h3>
                <div className="teacher-exam-styling-sort-controls">
                  <span className="teacher-exam-styling-sort-label">{data.isArabic ? "ترتيب حسب" : "Sort by"}</span>
                  <select
                    className="teacher-exam-styling-sort-select"
                    onChange={(e) => handleUpcomingExamsSort(e.target.value)}
                    value={upcomingExamsSort.field}
                  >
                    <option value="date">{data.isArabic ? "التاريخ" : "Date"}</option>
                    <option value="grade">{data.isArabic ? "الدرجة" : "Grade"}</option>
                    <option value="duration">{data.isArabic ? "المدة" : "Duration"}</option>
                  </select>
                </div>
              </div>
              <div className="teacher-exam-styling-table-wrapper">
                <table className="teacher-exam-styling-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleUpcomingExamsSort("date")} className="teacher-exam-styling-sortable">
                        {data.isArabic ? "التاريخ" : "Date"}
                        {upcomingExamsSort.field === "date" && (
                          <span className="teacher-exam-styling-sort-indicator">
                            {upcomingExamsSort.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th>{data.isArabic ? "الوقت" : "Time"}</th>
                      <th onClick={() => handleUpcomingExamsSort("grade")} className="teacher-exam-styling-sortable">
                        {data.isArabic ? "الدرجة" : "Grade"}
                        {upcomingExamsSort.field === "grade" && (
                          <span className="teacher-exam-styling-sort-indicator">
                            {upcomingExamsSort.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th onClick={() => handleUpcomingExamsSort("duration")} className="teacher-exam-styling-sortable">
                        {data.isArabic ? "المدة" : "Duration"}
                        {upcomingExamsSort.field === "duration" && (
                          <span className="teacher-exam-styling-sort-indicator">
                            {upcomingExamsSort.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th>{data.isArabic ? "عنوان الامتحان" : "Exam Title"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedUpcomingExams().map((exam) => (
                      <tr key={exam.id}>
                        <td>{exam.date}</td>
                        <td>{exam.time}</td>
                        <td>{exam.grade}</td>
                        <td>
                          {exam.duration} {data.isArabic ? "دقيقة" : "min"}
                        </td>
                        <td className="teacher-exam-styling-exam-title">{exam.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="teacher-exam-styling-table-section">
              <div className="teacher-exam-styling-table-header">
                <h3 className="teacher-exam-styling-table-title">{data.isArabic ? "نتيجة الامتحانات" : "Exam Results"}</h3>
                <div className="teacher-exam-styling-sort-controls">
                  <span className="teacher-exam-styling-sort-label">{data.isArabic ? "ترتيب حسب" : "Sort by"}</span>
                  <select
                    className="teacher-exam-styling-sort-select"
                    onChange={(e) => handleExamResultsSort(e.target.value)}
                    value={examResultsSort.field}
                  >
                    <option value="date">{data.isArabic ? "التاريخ" : "Date"}</option>
                    <option value="successRate">{data.isArabic ? "نسبة النجاح" : "Success Rate"}</option>
                    <option value="grade">{data.isArabic ? "الدرجة" : "Grade"}</option>
                  </select>
                </div>
              </div>
              <div className="teacher-exam-styling-table-wrapper">
                <table className="teacher-exam-styling-table">
                  <thead>
                    <tr>
                      <th>{data.isArabic ? "عنوان الامتحان" : "Exam Title"}</th>
                      <th onClick={() => handleExamResultsSort("grade")} className="teacher-exam-styling-sortable">
                        {data.isArabic ? "الدرجة" : "Grade"}
                        {examResultsSort.field === "grade" && (
                          <span className="teacher-exam-styling-sort-indicator">
                            {examResultsSort.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th
                        onClick={() => handleExamResultsSort("successRate")}
                        className="teacher-exam-styling-sortable"
                      >
                        {data.isArabic ? "نسبة النجاح" : "Success Rate"}
                        {examResultsSort.field === "successRate" && (
                          <span className="teacher-exam-styling-sort-indicator">
                            {examResultsSort.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th onClick={() => handleExamResultsSort("date")} className="teacher-exam-styling-sortable">
                        {data.isArabic ? "التاريخ" : "Date"}
                        {examResultsSort.field === "date" && (
                          <span className="teacher-exam-styling-sort-indicator">
                            {examResultsSort.direction === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th>{data.isArabic ? "التقرير" : "Report"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSortedExamResults().map((result) => (
                      <tr key={result.id}>
                        <td className="teacher-exam-styling-exam-title">{result.title}</td>
                        <td>{result.grade}</td>
                        <td>
                          <div className="teacher-exam-styling-success-rate">
                            <div
                              className="teacher-exam-styling-success-rate-bar"
                              style={{ width: `${result.successRate}%` }}
                            ></div>
                            <span>{result.successRate}%</span>
                          </div>
                        </td>
                        <td>{result.date}</td>
                        <td>
                          <Link to={`/teacher/exams/report/${result.id}`} className="teacher-exam-styling-report-link">
                            {data.isArabic ? "التقرير" : "Report"}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-exam-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

