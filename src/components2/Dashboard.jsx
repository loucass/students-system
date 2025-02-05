import { useEffect, useState, useRef } from "react"
import { Menu, X } from "lucide-react"
import Navbar from "./NavBar"
import AllLinks from "./Links"

// Sample notifications data
const notifications = [
  {
    id: 1,
    time: "11:00",
    type: "محاضرة مباشرة",
    title: "محاضرة مسجلة جديدة",
    isNew: true,
  },
  {
    id: 2,
    time: "12:00",
    type: "اختبار الفصل الأول",
    title: "اختبار الفصل الأول",
    isNew: true,
  },
  {
    id: 3,
    time: "13:00",
    type: "تحدي جديد",
    title: "تحدي جديد",
    isNew: false,
  },
]

export default function Dashboard() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef(null)

  const [gradesProgress, setGradesProgress] = useState(90)
  const [attendanceProgress, setAttendanceProgress] = useState(85)

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

          {/* Notifications Section */}
          <div className="notifications-section">
            <h4 className="notifications-title">{isArabic ? "تحديثات" : "Updates"}</h4>
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div key={notification.id} className={`notification-item ${notification.isNew ? "new" : ""}`}>
                  <div className="notification-time">{notification.time}</div>
                  <div className="notification-content">
                    <div className="notification-type">{notification.type}</div>
                    <div className="notification-title">{notification.title}</div>
                  </div>
                  {notification.isNew && <span className="notification-badge">{isArabic ? "جديد" : "New"}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-links">
            <AllLinks isArabic={isArabic} />
          </div>
        </div>

        {/* Main Content */}
        <main className="main-content">
          <div className="welcome-banner">
            <h1>{isArabic ? "اهلاً يوسف" : "Welcome Yousef"}</h1>
            <p>
              {isArabic ? "كن على اطلاع دائم لكل جديد في منصتنا" : "Stay updated with everything new on our platform"}
            </p>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <h4>{isArabic ? "لوحة الشرف" : "Honor Board"}</h4>
              <div className="medal-icon">🏅</div>
              <p className="stat-value">550</p>
              <p className="stat-total">/600</p>
            </div>
            <div className="stat-card">
              <h4>{isArabic ? "الدرجات" : "Grades"}</h4>
              <div className="progress-circle" style={{ "--progress": gradesProgress }}>
                <svg>
                  <circle className="progress-background" cx="60" cy="60" r="54"></circle>
                  <circle className="progress-bar" cx="60" cy="60" r="54"></circle>
                </svg>
                <span className="progress-percentage">{gradesProgress}%</span>
              </div>
              <p className="stat-description">{isArabic ? "الدرجات المحصلة" : "Achieved Grades"}</p>
            </div>
            <div className="stat-card">
              <h4>{isArabic ? "الحضور" : "Attendance"}</h4>
              <div className="progress-circle" style={{ "--progress": attendanceProgress }}>
                <svg>
                  <circle className="progress-background" cx="60" cy="60" r="54"></circle>
                  <circle className="progress-bar" cx="60" cy="60" r="54"></circle>
                </svg>
                <span className="progress-percentage">{attendanceProgress}%</span>
              </div>
              <p className="stat-description">{isArabic ? "نسبة الحضور" : "Attendance Rate"}</p>
            </div>
          </div>

          {/* <div className="test-buttons">
            <button onClick={() => setGradesProgress(Math.max(0, gradesProgress - 10))}>Decrease Grades</button>
            <button onClick={() => setGradesProgress(Math.min(100, gradesProgress + 10))}>Increase Grades</button>
            <button onClick={() => setAttendanceProgress(Math.max(0, attendanceProgress - 10))}>
              Decrease Attendance
            </button>
            <button onClick={() => setAttendanceProgress(Math.min(100, attendanceProgress + 10))}>
              Increase Attendance
            </button>
          </div> */}

          <div className="daily-challenge">
            <h3>{isArabic ? "تحدي اليوم" : "Daily Challenge"}</h3>
            <div className="challenge-content">
              <div className="challenge-icon">🚀</div>
              <div className="challenge-info">
                <p>{isArabic ? "قم بحل 5 تمارين في الرياضيات" : "Solve 5 Math Exercises"}</p>
                <div className="challenge-progress">
                  <div className="progress-bar" style={{ width: "60%" }}></div>
                </div>
                <p className="challenge-status">3/5 {isArabic ? "مكتمل" : "Completed"}</p>
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

