import { useState, useEffect, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Grid,
  User,
  MessageSquare,
  FileText,
  BookOpen,
  Award,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  Plus,
  Trophy,
  Star,
  Users,
} from "lucide-react"
import "./TeacherChallenges.css"
import { MainContextObj } from "../shared/MainContext"
import TeacherSidebar from "./TeacherSidebar"

// Mock challenges data
const mockChallengesData = {
  leaderboard: [
    { id: 1, name: "يوسف احمد", nameEn: "Yousef Ahmed", grade: "الأول", gradeEn: "First", score: 550, total: 600 },
    { id: 2, name: "احمد ابراهيم", nameEn: "Ahmed Ibrahim", grade: "الثالث", gradeEn: "Third", score: 530, total: 600 },
    {
      id: 3,
      name: "مريم عبدالله",
      nameEn: "Mariam Abdullah",
      grade: "الثاني",
      gradeEn: "Second",
      score: 520,
      total: 600,
    },
    { id: 4, name: "محمد محمود", nameEn: "Mohamed Mahmoud", grade: "الأول", gradeEn: "First", score: 510, total: 600 },
    { id: 5, name: "علي عادل", nameEn: "Ali Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 6, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 7, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 8, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 9, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 10, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 11, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 12, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 13, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 14, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 15, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 16, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 17, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
    { id: 18, name: "فتحي عادل", nameEn: "Fathy Adel", grade: "الأول", gradeEn: "First", score: 490, total: 600 },
  ],
  dailyChallenges: [
    {
      id: 1,
      titleAr: "قم بمشاهدة درسين على الأقل",
      titleEn: "Watch at least two lessons",
      progress: 50,
      icon: "🎯",
    },
    {
      id: 2,
      titleAr: "قم بحل اختبار واحد على الأقل",
      titleEn: "Complete at least one exam",
      progress: 100,
      icon: "📚",
    },
  ],
  seasonChallenges: [
    {
      id: 1,
      titleAr: "تحدي المعرفة",
      titleEn: "Knowledge Challenge",
      descAr: "قم بإتمام درس واحد من كل وحدة",
      descEn: "Complete one lesson from each unit",
      progress: 80,
      icon: "🧠",
    },
    {
      id: 2,
      titleAr: "تحدي الحماسي",
      titleEn: "Enthusiasm Challenge",
      descAr: "واصل التعلم لمدة 30 يوم متتالي",
      descEn: "Continue learning for 30 consecutive days",
      progress: 20,
      icon: "🔥",
    },
    {
      id: 3,
      titleAr: "تحدي الحماسي",
      titleEn: "Enthusiasm Challenge",
      descAr: "واصل التعلم لمدة 30 يوم متتالي",
      descEn: "Continue learning for 30 consecutive days",
      progress: 20,
      icon: "🔥",
    },
  ],
}

export default function TeacherChallenges() {
  const data = useContext(MainContextObj)
  const navigate = useNavigate()

  const [challengesData, setChallengesData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("rank")
  const [sortOrder, setSortOrder] = useState("asc")
  const [activeTab, setActiveTab] = useState("leaderboard") // "leaderboard", "daily", or "season"

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
        setChallengesData(mockChallengesData)
      } catch (error) {
        console.error("Error fetching challenges data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const getSortedLeaderboard = () => {
    if (!challengesData) return []

    const filtered = challengesData.leaderboard.filter((student) => {
      const searchLower = searchQuery.toLowerCase()
      const nameToSearch = data.isArabic ? student.name : student.nameEn
      const gradeToSearch = data.isArabic ? student.grade : student.gradeEn
      return (
        nameToSearch.toLowerCase().includes(searchLower) ||
        gradeToSearch.toLowerCase().includes(searchLower) ||
        student.score.toString().includes(searchLower)
      )
    })

    return [...filtered].sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "name":
          aValue = data.isArabic ? a.name : a.nameEn
          bValue = data.isArabic ? b.name : b.nameEn
          break
        case "grade":
          aValue = data.isArabic ? a.grade : a.gradeEn
          bValue = data.isArabic ? b.grade : b.gradeEn
          break
        case "score":
          aValue = a.score
          bValue = b.score
          break
        case "rank":
        default:
          return 0 // Rank is already determined by the order in the array
      }

      if (typeof aValue === "string") {
        const comparison = aValue.localeCompare(bValue)
        return sortOrder === "asc" ? comparison : -comparison
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }
    })
  }

  const handleAddChallenge = () => {
    // This will be implemented later
    alert(data.isArabic ? "سيتم تنفيذ هذه الميزة لاحقًا" : "This feature will be implemented later")
  }

  if (loading) {
    return <div className="teacher-exam-styling-loading">{data.isArabic ? "جاري التحميل..." : "loading..."}</div>
  }

  if (!challengesData) {
    return <div className="teacher-exam-styling-error">{data.isArabic ? "حدث خطأ في تحميل البيانات" : "error loading the data"}</div>
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-challenges-styling-dashboard-container">
      <TeacherSidebar teacherName={"احمد حسن"} currentClass={"الصف الاول ثانوي"} currentPage="challenges" />

        {/* Main Content */}
        <main className="teacher-challenges-styling-main">
          <div className="teacher-challenges-styling-challenges-container">
            <div className="teacher-challenges-styling-header">
              <h1 className="teacher-challenges-styling-title">{data.isArabic ? "التحديات" : "Challenges"}</h1>
              <button className="teacher-challenges-styling-add-challenge-btn" onClick={handleAddChallenge}>
                <Plus size={18} />
                <span>{data.isArabic ? "إضافة تحدي" : "Add Challenge"}</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="teacher-challenges-styling-tabs">
              <button
                className={`teacher-challenges-styling-tab ${activeTab === "leaderboard" ? "active" : ""}`}
                onClick={() => setActiveTab("leaderboard")}
              >
                <Trophy size={16} />
                <span>{data.isArabic ? "لوحة البطولة" : "Leaderboard"}</span>
              </button>
              <button
                className={`teacher-challenges-styling-tab ${activeTab === "daily" ? "active" : ""}`}
                onClick={() => setActiveTab("daily")}
              >
                <Star size={16} />
                <span>{data.isArabic ? "تحديات اليوم" : "Daily Challenges"}</span>
              </button>
              <button
                className={`teacher-challenges-styling-tab ${activeTab === "season" ? "active" : ""}`}
                onClick={() => setActiveTab("season")}
              >
                <Award size={16} />
                <span>{data.isArabic ? "تحديات الموسم" : "Season Challenges"}</span>
              </button>
            </div>

            {/* Leaderboard */}
            {activeTab === "leaderboard" && (
              <div className="teacher-challenges-styling-leaderboard-container">
                <div className="teacher-challenges-styling-table-header">
                  <h2 className="teacher-challenges-styling-table-title">
                    {data.isArabic ? "لوحة البطولة" : "Leaderboard"}
                  </h2>
                  <div className="teacher-challenges-styling-sort-controls">
                    <span className="teacher-challenges-styling-sort-label">{data.isArabic ? "ترتيب حسب" : "Sort by"}</span>
                    <select
                      className="teacher-challenges-styling-sort-select"
                      value={sortBy}
                      onChange={(e) => handleSort(e.target.value)}
                    >
                      <option value="rank">{data.isArabic ? "الترتيب" : "Rank"}</option>
                      <option value="name">{data.isArabic ? "الاسم" : "Name"}</option>
                      <option value="grade">{data.isArabic ? "الصف" : "Grade"}</option>
                      <option value="score">{data.isArabic ? "الدرجة" : "Score"}</option>
                    </select>
                    <button
                      className="teacher-challenges-styling-sort-direction"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    >
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </button>
                  </div>
                </div>

                <div className="teacher-challenges-styling-table-wrapper">
                  <table className="teacher-challenges-styling-table">
                    <thead>
                      <tr>
                        <th>{data.isArabic ? "الترتيب" : "Rank"}</th>
                        <th onClick={() => handleSort("name")} className="teacher-challenges-styling-sortable">
                          {data.isArabic ? "اسم الطالب" : "Student Name"}
                          {sortBy === "name" && (
                            <span className="teacher-challenges-styling-sort-indicator">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th onClick={() => handleSort("grade")} className="teacher-challenges-styling-sortable">
                          {data.isArabic ? "الصف" : "Grade"}
                          {sortBy === "grade" && (
                            <span className="teacher-challenges-styling-sort-indicator">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th onClick={() => handleSort("score")} className="teacher-challenges-styling-sortable">
                          {data.isArabic ? "الدرجة" : "Score"}
                          {sortBy === "score" && (
                            <span className="teacher-challenges-styling-sort-indicator">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSortedLeaderboard().map((student, index) => (
                        <tr key={student.id}>
                          <td className="teacher-challenges-styling-rank">
                            <div className={`teacher-challenges-styling-rank-badge rank-${index + 1}`}>{index + 1}</div>
                          </td>
                          <td>{data.isArabic ? student.name : student.nameEn}</td>
                          <td>{data.isArabic ? student.grade : student.gradeEn}</td>
                          <td>
                            <div className="teacher-challenges-styling-score">
                              <div className="teacher-challenges-styling-score-value">
                                {student.score}/{student.total}
                              </div>
                              <div className="teacher-challenges-styling-score-bar">
                                <div
                                  className="teacher-challenges-styling-score-progress"
                                  style={{ width: `${(student.score / student.total) * 100}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Daily Challenges */}
            {activeTab === "daily" && (
              <div className="teacher-challenges-styling-challenges-section">
                <div className="teacher-challenges-styling-section-header">
                  <h2 className="teacher-challenges-styling-section-title">
                    {data.isArabic ? "تحديات اليوم" : "Daily Challenges"}
                  </h2>
                </div>

                <div className="teacher-challenges-styling-challenges-grid">
                  {challengesData.dailyChallenges.map((challenge) => (
                    <div key={challenge.id} className="teacher-challenges-styling-challenge-card">
                      <div className="teacher-challenges-styling-challenge-icon">{challenge.icon}</div>
                      <div className="teacher-challenges-styling-challenge-content">
                        <h3 className="teacher-challenges-styling-challenge-title">
                          {data.isArabic ? challenge.titleAr : challenge.titleEn}
                        </h3>
                        <div className="teacher-challenges-styling-challenge-progress-container">
                          <div className="teacher-challenges-styling-challenge-progress-bar">
                            <div
                              className="teacher-challenges-styling-challenge-progress"
                              style={{ width: `${challenge.progress}%` }}
                            ></div>
                          </div>
                          <span className="teacher-challenges-styling-challenge-percentage">{challenge.progress}%</span>
                        </div>
                        <div className="teacher-challenges-styling-challenge-stats">
                          <div className="teacher-challenges-styling-challenge-stat">
                            <Users size={14} />
                            <span>
                              {data.isArabic
                                ? `${challenge.progress}% من الطلاب قاموا بإنهاء التحدي`
                                : `${challenge.progress}% of students completed this challenge`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Season Challenges */}
            {activeTab === "season" && (
              <div className="teacher-challenges-styling-challenges-section">
                <div className="teacher-challenges-styling-section-header">
                  <h2 className="teacher-challenges-styling-section-title">
                    {data.isArabic ? "تحديات الموسم" : "Season Challenges"}
                  </h2>
                </div>

                <div className="teacher-challenges-styling-challenges-grid">
                  {challengesData.seasonChallenges.map((challenge) => (
                    <div key={challenge.id} className="teacher-challenges-styling-challenge-card">
                      <div className="teacher-challenges-styling-challenge-icon">{challenge.icon}</div>
                      <div className="teacher-challenges-styling-challenge-content">
                        <h3 className="teacher-challenges-styling-challenge-title">
                          {data.isArabic ? challenge.titleAr : challenge.titleEn}
                        </h3>
                        <p className="teacher-challenges-styling-challenge-description">
                          {data.isArabic ? challenge.descAr : challenge.descEn}
                        </p>
                        <div className="teacher-challenges-styling-challenge-progress-container">
                          <div className="teacher-challenges-styling-challenge-progress-bar">
                            <div
                              className="teacher-challenges-styling-challenge-progress"
                              style={{ width: `${challenge.progress}%` }}
                            ></div>
                          </div>
                          <span className="teacher-challenges-styling-challenge-percentage">{challenge.progress}%</span>
                        </div>
                        <div className="teacher-challenges-styling-challenge-stats">
                          <div className="teacher-challenges-styling-challenge-stat">
                            <Users size={14} />
                            <span>
                              {data.isArabic
                                ? `${challenge.progress}% من الطلاب قاموا بإنهاء التحدي`
                                : `${challenge.progress}% of students completed this challenge`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-challenges-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

