import { useEffect, useState, useContext } from "react"
import { Bell } from "lucide-react"
import { MainContextObj } from "./shared/MainContext"
import StudentSidebar from "./StudentSidebar"

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
  {
    id: 4,
    time: "14:00",
    type: "واجب منزلي",
    title: "تم إضافة واجب جديد",
    isNew: true,
  },
  {
    id: 5,
    time: "15:00",
    type: "تذكير",
    title: "موعد المحاضرة القادمة",
    isNew: false,
  },
]

export default function Dashboard() {
  const data = useContext(MainContextObj)

  const [gradesProgress , setGradesProgress] = useState(90)
  const [attendanceProgress , setAttendanceProgress] = useState(85)

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="dashboard-container w-100">
        <StudentSidebar />

        {/* Main Content */}
        <main className="main-content w-100">
          <div className="welcome-banner">
          <div className="welcome-content">
            <h1>{data.isArabic ? "اهلاً يوسف" : "Welcome Yousef"}</h1>
            <p>
              {data.isArabic ? "كن على اطلاع دائم لكل جديد في منصتنا" : "Stay updated with everything new on our platform"}
            </p>
            </div>
            <div className="notifications-container">
              <div className="notifications-icon">
                <Bell size={24} />
                <span className="notifications-count">{notifications.filter((n) => n.isNew).length}</span>
              </div>
              <div className="notifications-popover">
                <h4 className="notifications-title">{data.isArabic ? "التنبيهات" : "Notifications"}</h4>
                <div className="notifications-list">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`notification-item ${notification.isNew ? "new" : ""}`}>
                      <div className="notification-time">{notification.time}</div>
                      <div className="notification-content">
                        <div className="notification-type">{notification.type}</div>
                        <div className="notification-title">{notification.title}</div>
                      </div>
                      {notification.isNew && <span className="notification-badge">{data.isArabic ? "جديد" : "New"}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="stats-container">
            <div className="stat-card">
              <h4>{data.isArabic ? "لوحة الشرف" : "Honor Board"}</h4>
              <div className="medal-icon">🏅</div>
              <p className="stat-value">550</p>
              <p className="stat-total">/600</p>
            </div>
            <div className="stat-card">
              <h4>{data.isArabic ? "الدرجات" : "Grades"}</h4>
              <div className="progress-circle" style={{ "--progress": gradesProgress }}>
                <svg>
                  <circle className="progress-background" cx="60" cy="60" r="54"></circle>
                  <circle className="progress-bar" cx="60" cy="60" r="54"></circle>
                </svg>
                <span className="progress-percentage">{gradesProgress}%</span>
              </div>
              <p className="stat-description">{data.isArabic ? "الدرجات المحصلة" : "Achieved Grades"}</p>
            </div>
            <div className="stat-card">
              <h4>{data.isArabic ? "الحضور" : "Attendance"}</h4>
              <div className="progress-circle" style={{ "--progress": attendanceProgress }}>
                <svg>
                  <circle className="progress-background" cx="60" cy="60" r="54"></circle>
                  <circle className="progress-bar" cx="60" cy="60" r="54"></circle>
                </svg>
                <span className="progress-percentage">{attendanceProgress}%</span>
              </div>
              <p className="stat-description">{data.isArabic ? "نسبة الحضور" : "Attendance Rate"}</p>
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
            <h3>{data.isArabic ? "تحدي اليوم" : "Daily Challenge"}</h3>
            <div className="challenge-content">
              <div className="challenge-icon">🚀</div>
              <div className="challenge-info">
                <p>{data.isArabic ? "قم بحل 5 تمارين في الرياضيات" : "Solve 5 Math Exercises"}</p>
                <div className="challenge-progress">
                  <div className="progress-bar" style={{ width: "60%" }}></div>
                </div>
                <p className="challenge-status">3/5 {data.isArabic ? "مكتمل" : "Completed"}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

