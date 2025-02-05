import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import Navbar from "./NavBar"
import AllLinks from "./Links"

// Sample challenges data
const challengesData = {
  completed: 7,
  total: 20,
  leaderboard: [
    { id: 1, nameAr: "انت", nameEn: "You", points: 550, total: 600 },
    { id: 2, nameAr: "احمد ابراهيم", nameEn: "Ahmed Ibrahim", points: 530, total: 600 },
    { id: 3, nameAr: "مريم عبدالله", nameEn: "Mariam Abdullah", points: 520, total: 600 },
    { id: 4, nameAr: "محمد محمود", nameEn: "Mohamed Mahmoud", points: 510, total: 600 },
    { id: 5, nameAr: "علي عادل", nameEn: "Ali Adel", points: 490, total: 600 },
  ],
  todayChallenges: [
    {
      id: 1,
      titleAr: "قم بمشاهدة درسين من الأمس",
      titleEn: "Watch two lessons from yesterday",
      progress: 50,
      icon: "🎯",
    },
    {
      id: 2,
      titleAr: "حل كل احداث واجب من فصل",
      titleEn: "Complete all homework from chapter",
      progress: 75,
      icon: "📚",
    },
  ],
  seasonChallenges: [
    {
      id: 1,
      titleAr: "تحدي المعرفة",
      titleEn: "Knowledge Challenge",
      descAr: "اجب على كل وحدة من كل درس",
      descEn: "Answer every unit from each lesson",
      progress: 70,
      icon: "🧠",
    },
    {
      id: 2,
      titleAr: "تحدي المتفوق",
      titleEn: "Excellence Challenge",
      descAr: "احصل على اعلى درجة ممكنة في امتحان تفاعلي",
      descEn: "Get the highest possible score in an interactive exam",
      progress: 45,
      icon: "🌟",
    },
    {
      id: 3,
      titleAr: "تحدي البطل",
      titleEn: "Champion Challenge",
      descAr: "اكمل 30 درس متتالي",
      descEn: "Complete 30 consecutive lessons",
      progress: 90,
      icon: "🏆",
    },
  ],
}

export default function Challenges() {
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
          <div className="challenges-container">
            {/* Completed Challenges Progress */}
            <div className="completed-challenges">
              <h2>{isArabic ? "تحديات مكتملة" : "Completed Challenges"}</h2>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${(challengesData.completed / challengesData.total) * 100}%` }}
                />
                <span className="progress-text">
                  {challengesData.completed} {isArabic ? "من" : "of"} {challengesData.total}
                </span>
              </div>
            </div>

            <div className="challenges-content">
              {/* Leaderboard */}
              <div className="leaderboard-section">
                <h3>{isArabic ? "لوحة البطولة" : "Leaderboard"}</h3>
                <div className="leaderboard-table">
                  <table>
                    <thead>
                      <tr>
                        <th>{isArabic ? "الترتيب" : "Rank"}</th>
                        <th>{isArabic ? "اسم الطالب" : "Student Name"}</th>
                        <th>{isArabic ? "الدرجة" : "Points"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {challengesData.leaderboard.map((student, index) => (
                        <tr key={student.id} className={index === 0 ? "current-user" : ""}>
                          <td>{index + 1}</td>
                          <td>{isArabic ? student.nameAr : student.nameEn}</td>
                          <td>
                            {student.points}/{student.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Challenges Sections */}
              <div className="challenges-sections">
                {/* Today's Challenges */}
                <section className="challenges-section">
                  <h3>{isArabic ? "تحديات اليوم" : "Today's Challenges"}</h3>
                  <div className="challenges-grid">
                    {challengesData.todayChallenges.map((challenge) => (
                      <div key={challenge.id} className="challenge-card">
                        <div className="challenge-icon">{challenge.icon}</div>
                        <div className="challenge-info">
                          <h4>{isArabic ? challenge.titleAr : challenge.titleEn}</h4>
                          <div className="challenge-progress">
                            <div className="progress-bar" style={{ width: `${challenge.progress}%` }} />
                            <span className="progress-text">{challenge.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Season Challenges */}
                <section className="challenges-section">
                  <h3>{isArabic ? "تحديات الموسم" : "Season Challenges"}</h3>
                  <div className="challenges-grid">
                    {challengesData.seasonChallenges.map((challenge) => (
                      <div key={challenge.id} className="challenge-card">
                        <div className="challenge-icon">{challenge.icon}</div>
                        <div className="challenge-info">
                          <h4>{isArabic ? challenge.titleAr : challenge.titleEn}</h4>
                          <p>{isArabic ? challenge.descAr : challenge.descEn}</p>
                          <div className="challenge-progress">
                            <div className="progress-bar" style={{ width: `${challenge.progress}%` }} />
                            <span className="progress-text">{challenge.progress}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
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

