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
} from "lucide-react"
import "./TeacherStyle.css"
import { MainContextObj } from "../shared/MainContext"

// Update the mockTeacherData to remove unnecessary translations
const mockTeacherData = {
  teacher: {
    id: "T12345",
    name: "م/أحمد حسن",
    role: "مدرس رياضيات",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  notifications: 1,
  stats: {
    attendance: {
      percentage: 90,
      chartData: [60, 75, 65, 80, 85, 90],
    },
    payment: {
      percentage: 80,
      chartData: [50, 60, 70, 75, 80, 80],
    },
    studentGroups: [
      { name: "المجموعة الأولى", count: 25, color: "#7c4dff" },
      { name: "المجموعة الثانية", count: 18, color: "#ff4081" },
      { name: "المجموعة الثالثة", count: 12, color: "#4caf50" },
    ],
    studentTypes: [
      { type: "ذكور", count: 30, color: "#7c4dff" },
      { type: "إناث", count: 25, color: "#ff4081" },
    ],
  },
  students: [
    {
      id: 1,
      name: "يوسف أحمد محمد",
      code: "MK001",
      nationalId: "12345678912345",
      group: "الأولى",
      guardianPhone: "01023456789",
      type: "ذكر",
      status: "دفع",
    },
    {
      id: 2,
      name: "أحمد محمد اسماعيل",
      code: "MH022",
      nationalId: "12345678912345",
      group: "الثانية",
      guardianPhone: "01023456789",
      type: "أنثى",
      status: "لم يدفع",
    },
    {
      id: 3,
      name: "يوسف أحمد محمد",
      code: "MK001",
      nationalId: "12345678912345",
      group: "الثانية",
      guardianPhone: "01023456789",
      type: "ذكر",
      status: "دفع",
    },
    {
      id: 4,
      name: "يوسف أحمد محمد",
      code: "MK001",
      nationalId: "12345678912345",
      group: "الثالثة",
      guardianPhone: "01023456789",
      type: "ذكر",
      status: "دفع",
    },
    {
      id: 5,
      name: "يوسف أحمد محمد",
      code: "MK001",
      nationalId: "12345678912345",
      group: "الأولى",
      guardianPhone: "01023456789",
      type: "أنثى",
      status: "دفع",
    },
    {
      id: 6,
      name: "أحمد محمد اسماعيل",
      code: "MH022",
      nationalId: "12345678912345",
      group: "الثانية",
      guardianPhone: "01023456783",
      type: "أنثى",
      status: "لم يدفع",
    },
    {
      id: 7,
      name: "أحمد محمد اسماعيل",
      code: "MH022",
      nationalId: "12345678912345",
      group: "الثانية",
      guardianPhone: "01023456789",
      type: "أنثى",
      status: "لم يدفع",
    },
    {
      id: 8,
      name: "يوسف أحمد محمد",
      code: "MK001",
      nationalId: "12345678912345",
      group: "الثانية",
      guardianPhone: "01023456789",
      type: "ذكر",
      status: "دفع",
    },
    {
      id: 9,
      name: "أحمد محمد اسماعيل",
      code: "MH022",
      nationalId: "12345678912345",
      group: "الأولى",
      guardianPhone: "01023456789",
      type: "أنثى",
      status: "لم يدفع",
    },
    {
      id: 10,
      name: "أحمد محمد اسماعيل",
      code: "MH022",
      nationalId: "12345678912345",
      group: "الأولى",
      guardianPhone: "01023456789",
      type: "أنثى",
      status: "لم يدفع",
    },
    {
      id: 11,
      name: "أحمد محمد اسماعيل",
      code: "MH022",
      nationalId: "12345678912345",
      group: "الثانية",
      guardianPhone: "01023456789",
      type: "أنثى",
      status: "لم يدفع",
    },
  ],
  currentClass: {
    name: "الصف الأول الثانوي",
  },
}

export default function TeacherHome() {
  const data = useContext(MainContextObj)

  const [teacherData, setTeacherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredStudents, setFilteredStudents] = useState([])

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
        setTeacherData(mockTeacherData)
      } catch (error) {
        console.error("Error fetching teacher data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter students based on search query
  useEffect(() => {
    if (teacherData) {
      if (!searchQuery) {
        setFilteredStudents(teacherData.students)
      } else {
        const filtered = teacherData.students.filter((student) => {
          const searchLower = searchQuery.toLowerCase()

          return (
            student.name.toLowerCase().includes(searchLower) ||
            student.code.toLowerCase().includes(searchLower) ||
            student.group.toLowerCase().includes(searchLower)
          )
        })
        setFilteredStudents(filtered)
      }
    }
  }, [searchQuery, teacherData])

  if (loading) {
    return <div className="teacherstyling-loading">جاري التحميل...</div>
  }

  if (!teacherData) {
    return <div className="teacherstyling-error">حدث خطأ في ت��ميل البيانات</div>
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacherstyling-dashboard-container">
        {/* Sidebar */}
        <aside className="teacherstyling-sidebar">
          <div className="teacherstyling-profile">
            <img
              src={teacherData.teacher.avatar || "/placeholder.svg"}
              alt="Teacher Profile"
              className="teacherstyling-profile-image"
            />
            <h3 className="teacherstyling-profile-name">{teacherData.teacher.name}</h3>
          </div>

          <div className="teacherstyling-class-selector">
            <span>{teacherData.currentClass.name}</span>
            <ChevronDown />
          </div>

          <nav className="teacherstyling-nav">
            <Link to="/teacher" className="teacherstyling-nav-item active">
              <Grid size={20} />
              <span>{data.isArabic ? "الرئيسية" : "Dashboard"}</span>
            </Link>
            <Link to="/teacher/students" className="teacherstyling-nav-item">
              <User size={20} />
              <span>{data.isArabic ? "الطلاب" : "Students"}</span>
            </Link>
            <Link to="/teacher/live-lessons" className="teacherstyling-nav-item">
              <MessageSquare size={20} />
              <span>{data.isArabic ? "الدروس المباشرة" : "Live Lessons"}</span>
            </Link>
            <Link to="/teacher/exams" className="teacherstyling-nav-item">
              <FileText size={20} />
              <span>{data.isArabic ? "الاختبارات" : "Exams"}</span>
            </Link>
            <Link to="/teacher/curriculum" className="teacherstyling-nav-item">
              <BookOpen size={20} />
              <span>{data.isArabic ? "المنهج" : "Curriculum"}</span>
            </Link>
            <Link to="/teacher/revisions" className="teacherstyling-nav-item">
              <FileText size={20} />
              <span>{data.isArabic ? "المراجعات" : "Revisions"}</span>
            </Link>
            <Link to="/teacher/challenges" className="teacherstyling-nav-item">
              <Award size={20} />
              <span>{data.isArabic ? "التحديات" : "Challenges"}</span>
            </Link>
            <Link to="/teacher/chat" className="teacherstyling-nav-item">
              <MessageSquare size={20} />
              <span>{data.isArabic ? "المحادثات" : "Chat"}</span>
            </Link>
            <Link to="/teacher/help" className="teacherstyling-nav-item">
              <User size={20} />
              <span>{data.isArabic ? "المساعدة" : "Help"}</span>
            </Link>
            <Link to="/teacher/settings" className="teacherstyling-nav-item">
              <Settings size={20} />
              <span>{data.isArabic ? "الإعدادات" : "Settings"}</span>
            </Link>
          </nav>

          <div className="teacherstyling-logout">
            <LogOut size={20} />
            <span>{data.isArabic ? "تسجيل الخروج" : "Logout"}</span>
          </div>
        </aside>

        {/* Main Dashboard */}
        <main className="teacherstyling-main">
          {/* Stats Cards */}
          <div className="teacherstyling-stats-grid">
            {/* Attendance Chart */}
            <div className="teacherstyling-chart-card teacherstyling-attendance-chart">
              <h3>{data.isArabic ? "حضور الطلاب" : "Student Attendance"}</h3>
              <div className="teacherstyling-chart-container">
                <div className="teacherstyling-line-chart">
                  <div className="teacherstyling-line blue"></div>
                  <div className="teacherstyling-line teal"></div>
                  <div className="teacherstyling-chart-legend">
                    <div className="teacherstyling-legend-item">
                      <span className="teacherstyling-legend-color blue"></span>
                      <span>{data.isArabic ? "عدد الطلاب" : "Student Count"}</span>
                    </div>
                    <div className="teacherstyling-legend-item">
                      <span className="teacherstyling-legend-color teal"></span>
                      <span>{data.isArabic ? "الحضور" : "Attendance"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Percentage */}
            <div className="teacherstyling-stat-card">
              <h3>{data.isArabic ? "الحضور" : "Attendance"}</h3>
              <div className="teacherstyling-donut-chart">
                <svg viewBox="0 0 36 36" className="teacherstyling-circular-chart">
                  <path
                    className="teacherstyling-circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="teacherstyling-circle"
                    strokeDasharray={`${teacherData.stats.attendance.percentage}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="teacherstyling-percentage">
                    {teacherData.stats.attendance.percentage}%
                  </text>
                </svg>
                <p>{data.isArabic ? "نسبة الحضور" : "Attendance Rate"}</p>
              </div>
            </div>

            {/* Student Groups */}
            <div className="teacherstyling-stat-card">
              <h3>{data.isArabic ? "عدد الطلاب" : "Student Count"}</h3>
              <div className="teacherstyling-donut-chart">
                <svg viewBox="0 0 36 36" className="teacherstyling-circular-chart">
                  <circle cx="18" cy="18" r="15.9155" className="teacherstyling-circle-bg" />
                  {teacherData.stats.studentGroups.map((group, index) => {
                    const total = teacherData.stats.studentGroups.reduce((sum, g) => sum + g.count, 0)
                    const percentage = (group.count / total) * 100
                    const offset = teacherData.stats.studentGroups
                      .slice(0, index)
                      .reduce((sum, g) => sum + (g.count / total) * 100, 0)

                    return (
                      <circle
                        key={index}
                        cx="18"
                        cy="18"
                        r="15.9155"
                        className="teacherstyling-circle-segment"
                        style={{
                          stroke: group.color,
                          strokeDasharray: `${percentage} ${100 - percentage}`,
                          strokeDashoffset: -offset,
                        }}
                      />
                    )
                  })}
                </svg>
                <div className="teacherstyling-chart-legend">
                  {teacherData.stats.studentGroups.map((group, index) => (
                    <div key={index} className="teacherstyling-legend-item">
                      <span className="teacherstyling-legend-color" style={{ backgroundColor: group.color }}></span>
                      <span>{group.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Percentage */}
            <div className="teacherstyling-stat-card">
              <h3>{data.isArabic ? "دفع" : "Payment"}</h3>
              <div className="teacherstyling-donut-chart">
                <svg viewBox="0 0 36 36" className="teacherstyling-circular-chart">
                  <path
                    className="teacherstyling-circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="teacherstyling-circle"
                    strokeDasharray={`${teacherData.stats.payment.percentage}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="teacherstyling-percentage">
                    {teacherData.stats.payment.percentage}%
                  </text>
                </svg>
                <p>{data.isArabic ? "نسبة الدفع" : "Payment Rate"}</p>
              </div>
            </div>

            {/* Student Types */}
            <div className="teacherstyling-stat-card">
              <h3>{data.isArabic ? "نوع الطلاب" : "Student Type"}</h3>
              <div className="teacherstyling-donut-chart">
                <svg viewBox="0 0 36 36" className="teacherstyling-circular-chart">
                  <circle cx="18" cy="18" r="15.9155" className="teacherstyling-circle-bg" />
                  {teacherData.stats.studentTypes.map((type, index) => {
                    const total = teacherData.stats.studentTypes.reduce((sum, t) => sum + t.count, 0)
                    const percentage = (type.count / total) * 100
                    const offset = teacherData.stats.studentTypes
                      .slice(0, index)
                      .reduce((sum, t) => sum + (t.count / total) * 100, 0)

                    return (
                      <circle
                        key={index}
                        cx="18"
                        cy="18"
                        r="15.9155"
                        className="teacherstyling-circle-segment"
                        style={{
                          stroke: type.color,
                          strokeDasharray: `${percentage} ${100 - percentage}`,
                          strokeDashoffset: -offset,
                        }}
                      />
                    )
                  })}
                </svg>
                <div className="teacherstyling-chart-legend">
                  {teacherData.stats.studentTypes.map((type, index) => (
                    <div key={index} className="teacherstyling-legend-item">
                      <span className="teacherstyling-legend-color" style={{ backgroundColor: type.color }}></span>
                      <span>{type.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Students Table */}
          <div className="teacherstyling-students-table-container">
            <h3 className="teacherstyling-table-title">{data.isArabic ? "قائمة الطلاب" : "Students List"}</h3>
            <div className="teacherstyling-table-wrapper">
              <table className="teacherstyling-students-table">
                <thead>
                  <tr>
                    <th>{data.isArabic ? "اسم الطالب" : "Student Name"}</th>
                    <th>{data.isArabic ? "كود الطالب" : "Student Code"}</th>
                    <th>{data.isArabic ? "الرقم القومي" : "National ID"}</th>
                    <th>{data.isArabic ? "المجموعة" : "Group"}</th>
                    <th>{data.isArabic ? "رقم الموبايل" : "Mobile Number"}</th>
                    <th>{data.isArabic ? "النوع" : "Type"}</th>
                    <th>{data.isArabic ? "الحالة" : "Status"}</th>
                    <th>{data.isArabic ? "رقم ولي الأمر" : "Guardian Number"}</th>
                    <th>{data.isArabic ? "تحكم" : "Actions"}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="teacherstyling-student-name">{student.name}</td>
                      <td>{student.code}</td>
                      <td>{student.nationalId}</td>
                      <td>{student.group}</td>
                      <td>{student.guardianPhone}</td>
                      <td>{student.type}</td>
                      <td>
                        <span className={`teacherstyling-status-badge ${student.status === "دفع" ? "paid" : "unpaid"}`}>
                          {student.status}
                        </span>
                      </td>
                      <td>{student.guardianPhone}</td>
                      <td className="teacherstyling-actions">
                        <button className="teacherstyling-action-btn delete">
                          <span className="teacherstyling-action-icon">🗑️</span>
                        </button>
                        <button className="teacherstyling-action-btn edit">
                          <span className="teacherstyling-action-icon">✏️</span>
                        </button>
                        <button className="teacherstyling-action-btn view">
                          <span className="teacherstyling-action-icon">👁️</span>
                        </button>
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
      <footer className="teacherstyling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

