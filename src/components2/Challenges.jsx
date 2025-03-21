import { useEffect, useContext } from "react"
import { MainContextObj } from "./shared/MainContext"
import StudentSidebar from "./StudentSidebar"

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
  const data = useContext(MainContextObj)


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

      <div className="dashboard-container">
        <StudentSidebar />

        {/* Main Content */}
        <main className="main-content" style={{ overflowX: "auto" }}>
          <div className="challenges-container">
            {/* Completed Challenges Progress */}
            <div className="completed-challenges">
              <h2>{data.isArabic ? "تحديات مكتملة" : "Completed Challenges"}</h2>
              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: `${(challengesData.completed / challengesData.total) * 100}%` }}
                />
                <span className="progress-text">
                  {challengesData.completed} {data.isArabic ? "من" : "of"} {challengesData.total}
                </span>
              </div>
            </div>

            <div className="challenges-content" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}>
              {/* Leaderboard */}
              <div className="leaderboard-section">
                <h3>{data.isArabic ? "لوحة البطولة" : "Leaderboard"}</h3>
                <div className="leaderboard-table" style={{ overflowX: "auto", width: "100%" }}>
                  <table>
                    <thead>
                      <tr>
                        <th>{data.isArabic ? "الترتيب" : "Rank"}</th>
                        <th>{data.isArabic ? "اسم الطالب" : "Student Name"}</th>
                        <th>{data.isArabic ? "الدرجة" : "Points"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {challengesData.leaderboard.map((student, index) => (
                        <tr key={student.id} className={index === 0 ? "current-user" : ""}>
                          <td>{index + 1}</td>
                          <td>{data.isArabic ? student.nameAr : student.nameEn}</td>
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
                  <h3>{data.isArabic ? "تحديات اليوم" : "Today's Challenges"}</h3>
                  <div className="challenges-grid">
                    {challengesData.todayChallenges.map((challenge) => (
                      <div key={challenge.id} className="challenge-card">
                        <div className="challenge-icon">{challenge.icon}</div>
                        <div className="challenge-info">
                          <h4>{data.isArabic ? challenge.titleAr : challenge.titleEn}</h4>
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
                  <h3>{data.isArabic ? "تحديات الموسم" : "Season Challenges"}</h3>
                  <div className="challenges-grid">
                    {challengesData.seasonChallenges.map((challenge) => (
                      <div key={challenge.id} className="challenge-card">
                        <div className="challenge-icon">{challenge.icon}</div>
                        <div className="challenge-info">
                          <h4>{data.isArabic ? challenge.titleAr : challenge.titleEn}</h4>
                          <p>{data.isArabic ? challenge.descAr : challenge.descEn}</p>
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
      </div>
    </div>
  )
}

