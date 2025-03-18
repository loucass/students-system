import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import {
  ChevronLeft,
  ChevronUp,
} from "lucide-react"
import "./TeacherExamReport.css"
import { MainContextObj } from "../shared/MainContext"
import TeacherSidebar from "./TeacherSidebar"

// Mock data for exam report
const mockExamReportData = {
  teacher: {
    id: "T12345",
    name: "م/أحمد حسن",
    role: "مدرس رياضيات",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  notifications: 1,
  currentClass: {
    name: "الصف الأول الثانوي",
  },
  exam: {
    id: 1,
    title: "امتحان الفصل الأول",
    date: "2024/6/15",
    totalStudents: 25,
    passRate: 92,
    averageScore: 89.5,
    chartData: {
      labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس"],
      grades: [65, 70, 85, 75, 95, 90, 85, 80],
      students: [50, 60, 55, 65, 75, 70, 65, 60],
    },
  },
  students: [
    {
      id: 1,
      name: "يوسف أحمد",
      grade: "98/100",
      time: "50 دقيقة",
      rank: "الأول",
    },
    {
      id: 2,
      name: "أحمد ابراهيم",
      grade: "98/100",
      time: "40 دقيقة",
      rank: "الثاني",
    },
    {
      id: 3,
      name: "مريم عبدالله",
      grade: "98/100",
      time: "40 دقيقة",
      rank: "الثالث",
    },
    {
      id: 4,
      name: "محمد محمود",
      grade: "98/100",
      time: "40 دقيقة",
      rank: "الرابع",
    },
    {
      id: 5,
      name: "علي عادل",
      grade: "98/100",
      time: "40 دقيقة",
      rank: "السادس",
    },
    {
      id: 6,
      name: "علي عادل",
      grade: "45/100",
      time: "40 دقيقة",
      rank: "السابع",
    },
    {
      id: 7,
      name: "علي عادل",
      grade: "98/100",
      time: "40 دقيقة",
      rank: "الثامن",
    },
    {
      id: 8,
      name: "علي عادل",
      grade: "98/100",
      time: "40 دقيقة",
      rank: "التاسع",
    },
  ],
}

export default function TeacherExamReport() {
  const data = useContext(MainContextObj)

  const [examReportData, setExamReportData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("rank")
  const [sortDirection, setSortDirection] = useState("asc")

  const { examId } = useParams()

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
        setExamReportData(mockExamReportData)
      } catch (error) {
        console.error("Error fetching exam report data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [examId])

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortDirection("asc")
    }
  }

  const getSortedStudents = () => {
    if (!examReportData) return []

    const filteredStudents = examReportData.students.filter((student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return [...filteredStudents].sort((a, b) => {
      let comparison = 0

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortBy === "grade") {
        const aGrade = Number.parseInt(a.grade.split("/")[0])
        const bGrade = Number.parseInt(b.grade.split("/")[0])
        comparison = aGrade - bGrade
      } else if (sortBy === "time") {
        const aTime = Number.parseInt(a.time.split(" ")[0])
        const bTime = Number.parseInt(b.time.split(" ")[0])
        comparison = aTime - bTime
      }

      return sortDirection === "asc" ? comparison : -comparison
    })
  }

  if (loading) {
    return <div className="teacher-exam-styling-loading">{data.isArabic ? "جاري التحميل..." : "loading..."}</div>
  }

  if (!examReportData) {
    return <div className="teacher-exam-styling-error">{data.isArabic ? "حدث خطأ في تحميل البيانات" : "error loading the data"}</div>
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-exam-report-styling-dashboard-container">
        <TeacherSidebar currentClass={mockExamReportData.currentClass.name} teacherName={mockExamReportData.teacher.name} currentPage="reports" />

        {/* Main Content */}
        <main className="teacher-exam-report-styling-main">
          <div className="teacher-exam-report-styling-header">
            <div className="teacher-exam-report-styling-breadcrumb">
              <Link to="/teacher/exams" className="teacher-exam-report-styling-breadcrumb-link">
                {data.isArabic ? "الاختبارات" : "Exams"}
              </Link>
              <ChevronLeft className="teacher-exam-report-styling-breadcrumb-separator" />
              <span className="teacher-exam-report-styling-breadcrumb-current">
                {data.isArabic ? "تقرير الاختبارات" : "Exam Report"}
              </span>
            </div>
            <h1 className="teacher-exam-report-styling-title">{data.isArabic ? "تقرير الاختبارات" : "Exam Report"}</h1>
          </div>

          {/* Performance Chart */}
          <div className="teacher-exam-report-styling-chart-container">
            <div className="teacher-exam-report-styling-chart-header">
              <div className="teacher-exam-report-styling-chart-legend">
                <div className="teacher-exam-report-styling-legend-item">
                  <span className="teacher-exam-report-styling-legend-color blue"></span>
                  <span>{data.isArabic ? "الدرجات" : "Grades"}</span>
                </div>
                <div className="teacher-exam-report-styling-legend-item">
                  <span className="teacher-exam-report-styling-legend-color teal"></span>
                  <span>{data.isArabic ? "عدد الطلاب" : "Student Count"}</span>
                </div>
              </div>
            </div>
            <div className="teacher-exam-report-styling-chart">
              <div className="teacher-exam-report-styling-chart-y-axis">
                {[100, 80, 60, 40, 20, 0].map((value) => (
                  <div key={value} className="teacher-exam-report-styling-y-axis-label">
                    {value}
                  </div>
                ))}
              </div>
              <div className="teacher-exam-report-styling-chart-content">
                <div
                  className="teacher-exam-report-styling-chart-line blue"
                  style={{
                    clipPath: `polygon(
                      0% ${100 - examReportData.exam.chartData.grades[0]}%,
                      14.28% ${100 - examReportData.exam.chartData.grades[1]}%,
                      28.57% ${100 - examReportData.exam.chartData.grades[2]}%,
                      42.85% ${100 - examReportData.exam.chartData.grades[3]}%,
                      57.14% ${100 - examReportData.exam.chartData.grades[4]}%,
                      71.42% ${100 - examReportData.exam.chartData.grades[5]}%,
                      85.71% ${100 - examReportData.exam.chartData.grades[6]}%,
                      100% ${100 - examReportData.exam.chartData.grades[7]}%
                    )`,
                  }}
                ></div>
                <div
                  className="teacher-exam-report-styling-chart-line teal"
                  style={{
                    clipPath: `polygon(
                      0% ${100 - examReportData.exam.chartData.students[0]}%,
                      14.28% ${100 - examReportData.exam.chartData.students[1]}%,
                      28.57% ${100 - examReportData.exam.chartData.students[2]}%,
                      42.85% ${100 - examReportData.exam.chartData.students[3]}%,
                      57.14% ${100 - examReportData.exam.chartData.students[4]}%,
                      71.42% ${100 - examReportData.exam.chartData.students[5]}%,
                      85.71% ${100 - examReportData.exam.chartData.students[6]}%,
                      100% ${100 - examReportData.exam.chartData.students[7]}%
                    )`,
                  }}
                ></div>
                <div className="teacher-exam-report-styling-chart-x-axis">
                  {examReportData.exam.chartData.labels.map((label) => (
                    <div key={label} className="teacher-exam-report-styling-x-axis-label">
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Exam Results Table */}
          <div className="teacher-exam-report-styling-table-container">
            <div className="teacher-exam-report-styling-table-header">
              <h2 className="teacher-exam-report-styling-table-title">
                {data.isArabic ? `تقرير ${examReportData.exam.title}` : `${examReportData.exam.title} Report`}
              </h2>
              <div className="teacher-exam-report-styling-sort-controls">
                <button
                  className={`teacher-exam-report-styling-sort-button ${sortBy === "rank" ? "active" : ""}`}
                  onClick={() => handleSort("rank")}
                >
                  {data.isArabic ? "ترتيب حسب" : "Sort by"} {data.isArabic ? "الترتيب" : "Rank"}
                  {sortBy === "rank" && (
                    <ChevronUp
                      className={`teacher-exam-report-styling-sort-icon ${sortDirection === "desc" ? "desc" : ""}`}
                    />
                  )}
                </button>
              </div>
            </div>
            <div className="teacher-exam-report-styling-table-wrapper">
              <table className="teacher-exam-report-styling-table">
                <thead>
                  <tr>
                    <th className="teacher-exam-report-styling-th-rank">{data.isArabic ? "الترتيب" : "Rank"}</th>
                    <th className="teacher-exam-report-styling-th-name" onClick={() => handleSort("name")}>
                      {data.isArabic ? "اسم الطالب" : "Student Name"}
                      {sortBy === "name" && (
                        <ChevronUp
                          className={`teacher-exam-report-styling-sort-icon ${sortDirection === "desc" ? "desc" : ""}`}
                        />
                      )}
                    </th>
                    <th className="teacher-exam-report-styling-th-grade" onClick={() => handleSort("grade")}>
                      {data.isArabic ? "الدرجة" : "Grade"}
                      {sortBy === "grade" && (
                        <ChevronUp
                          className={`teacher-exam-report-styling-sort-icon ${sortDirection === "desc" ? "desc" : ""}`}
                        />
                      )}
                    </th>
                    <th className="teacher-exam-report-styling-th-time" onClick={() => handleSort("time")}>
                      {data.isArabic ? "الوقت" : "Time"}
                      {sortBy === "time" && (
                        <ChevronUp
                          className={`teacher-exam-report-styling-sort-icon ${sortDirection === "desc" ? "desc" : ""}`}
                        />
                      )}
                    </th>
                    <th className="teacher-exam-report-styling-th-answers">{data.isArabic ? "الإجابات" : "Answers"}</th>
                  </tr>
                </thead>
                <tbody>
                  {getSortedStudents().map((student) => (
                    <tr key={student.id}>
                      <td className="teacher-exam-report-styling-td-rank">{student.rank}</td>
                      <td className="teacher-exam-report-styling-td-name">{student.name}</td>
                      <td className="teacher-exam-report-styling-td-grade">
                        <span
                          className={`teacher-exam-report-styling-grade ${Number.parseInt(student.grade) < 50 ? "low" : "high"}`}
                        >
                          {student.grade}
                        </span>
                      </td>
                      <td className="teacher-exam-report-styling-td-time">{student.time}</td>
                      <td className="teacher-exam-report-styling-td-answers">
                        <Link
                          to={`/teacher/exams/student-answers/${examId}/${student.id}`}
                          className="teacher-exam-report-styling-answers-link"
                        >
                          {data.isArabic ? "الإجابات" : "Answers"}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-exam-report-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

