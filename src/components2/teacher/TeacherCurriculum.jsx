import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
  FileText,
  ChevronDown,
  ChevronUp,
  Plus,
  Video,
  File,
  Edit,
} from "lucide-react"
import "./TeacherCurriculum.css"
import TeacherSidebar from "./TeacherSidebar"
import { MainContextObj } from "../shared/MainContext"

// Mock curriculum data
const mockCurriculumData = {
  chapters: [
    {
      id: 1,
      title: {
        ar: "الفصل الأول",
        en: "First Chapter",
      },
      lessons: [
        {
          id: 1,
          title: {
            ar: "الدرس الأول",
            en: "First Lesson",
          },
          hasVideo: true,
          hasExam: true,
          hasAttachments: true,
        },
        {
          id: 2,
          title: {
            ar: "الدرس الثاني",
            en: "Second Lesson",
          },
          hasVideo: true,
          hasExam: true,
          hasAttachments: true,
        },
      ],
    },
    {
      id: 2,
      title: {
        ar: "الفصل الثاني",
        en: "Second Chapter",
      },
      lessons: [
        {
          id: 1,
          title: {
            ar: "الدرس الأول",
            en: "First Lesson",
          },
          hasVideo: true,
          hasExam: true,
          hasAttachments: true,
        },
      ],
    },
    {
      id: 3,
      title: {
        ar: "الفصل الثالث",
        en: "Third Chapter",
      },
      lessons: [],
    },
  ],
}

export default function TeacherCurriculum() {
  const data = useContext(MainContextObj)
  const navigate = useNavigate()

  const [curriculumData, setCurriculumData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedChapters, setExpandedChapters] = useState([1])
  const [searchQuery, setSearchQuery] = useState("")

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
        setCurriculumData(mockCurriculumData)
      } catch (error) {
        console.error("Error fetching curriculum data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId],
    )
  }

  const handleAddChapter = () => {
    navigate("/teacher/curriculum/add-chapter")
  }
  
  if (loading) {
    return <div className="teacher-exam-styling-loading">{data.isArabic ? "جاري التحميل..." : "loading..."}</div>
  }

  if (!curriculumData) {
    return <div className="teacher-exam-styling-error">{data.isArabic ? "حدث خطأ في تحميل البيانات" : "error loading the data"}</div>
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-curriculum-styling-dashboard-container">
      <TeacherSidebar teacherName={"احمد حسن"} currentClass={"الصف الاول ثانوي"} currentPage="x" />

        {/* Main Content */}
        <main className="teacher-curriculum-styling-main">
          <div className="teacher-curriculum-styling-curriculum-container">
            <div className="teacher-curriculum-styling-header">
              <h1 className="teacher-curriculum-styling-title">{data.isArabic ? "المنهج الدراسي" : "Curriculum"}</h1>
              <button className="teacher-curriculum-styling-add-chapter-btn" onClick={handleAddChapter}>
                <Plus size={18} />
                <span>{data.isArabic ? "اضف فصل جديد" : "Add New Chapter"}</span>
              </button>
            </div>

            {/* Chapters List */}
            <div className="teacher-curriculum-styling-chapters-list">
              {curriculumData.chapters.map((chapter) => (
                <div key={chapter.id} className="teacher-curriculum-styling-chapter-card">
                  <div
                    className={`teacher-curriculum-styling-chapter-header ${
                      expandedChapters.includes(chapter.id) ? "expanded" : ""
                    }`}
                    onClick={() => toggleChapter(chapter.id)}
                  >
                    <h2>{data.isArabic ? chapter.title.ar : chapter.title.en}</h2>
                    {expandedChapters.includes(chapter.id) ? (
                      <ChevronUp className="teacher-curriculum-styling-chapter-icon" />
                    ) : (
                      <ChevronDown className="teacher-curriculum-styling-chapter-icon" />
                    )}
                  </div>

                  {expandedChapters.includes(chapter.id) && (
                    <div className="teacher-curriculum-styling-chapter-content">
                      {chapter.lessons.length > 0 ? (
                        chapter.lessons.map((lesson) => (
                          <div key={lesson.id} className="teacher-curriculum-styling-lesson-item">
                            <div className="teacher-curriculum-styling-lesson-info">
                              <h3>{data.isArabic ? lesson.title.ar : lesson.title.en}</h3>
                            </div>
                            <div className="teacher-curriculum-styling-lesson-actions">
                              {lesson.hasVideo && (
                                <div className="teacher-curriculum-styling-action-btn video">
                                  <Video size={18} />
                                  <span>{data.isArabic ? "فيديو الدرس" : "Lesson Video"}</span>
                                </div>
                              )}
                              {lesson.hasExam && (
                                <div className="teacher-curriculum-styling-action-btn exam">
                                  <FileText size={18} />
                                  <span>{data.isArabic ? "تقرير الامتحان" : "Exam Report"}</span>
                                </div>
                              )}
                              {lesson.hasAttachments && (
                                <div className="teacher-curriculum-styling-action-btn attachment">
                                  <File size={18} />
                                  <span>{data.isArabic ? "عرض المرفقات" : "View Attachments"}</span>
                                </div>
                              )}
                              <div className="teacher-curriculum-styling-action-btn edit">
                                <Edit size={18} />
                                <span>{data.isArabic ? "تعديل الدرس" : "Edit Lesson"}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="teacher-curriculum-styling-empty-lessons">
                          <p>{data.isArabic ? "لا توجد دروس في هذا الفصل" : "No lessons in this chapter"}</p>
                          <button className="teacher-curriculum-styling-add-lesson-btn" onClick={handleAddChapter}>
                            <Plus size={16} />
                            <span>{data.isArabic ? "اضف درس" : "Add Lesson"}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-curriculum-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

