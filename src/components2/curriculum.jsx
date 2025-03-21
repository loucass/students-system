import React, { useContext, useEffect, useState } from "react"
import { MainContextObj } from "./shared/MainContext"
import StudentSidebar from "./StudentSidebar"

// Sample curriculum data
const curriculumData = {
  totalLessons: 60,
  completedLessons: 45,
  chapters: [
    {
      id: 1,
      title: "الفصل الأول",
      titleEn: "First Chapter",
      lessons: [
        {
          id: 1,
          title: "الدرس الأول",
          titleEn: "First Lesson",
          hasVideo: true,
          hasExam: true,
          hasAttachments: true,
        },
        {
          id: 2,
          title: "الدرس الثاني",
          titleEn: "Second Lesson",
          hasVideo: true,
          hasExam: true,
          hasAttachments: true,
        },
      ],
    },
    {
      id: 2,
      title: "الفصل الثاني",
      titleEn: "Second Chapter",
      lessons: [
        {
          id: 1,
          title: "الدرس الأول",
          titleEn: "First Lesson",
          hasVideo: true,
          hasExam: true,
          hasAttachments: true,
        },
      ],
    },
    {
      id: 3,
      title: "الفصل الثالث",
      titleEn: "Third Chapter",
      lessons: [],
    },
    {
      id: 4,
      title: "الفصل الرابع",
      titleEn: "Fourth Chapter",
      lessons: [],
    },
  ],
}

export default function Curriculum() {
  const data = useContext(MainContextObj)

  const [expandedChapters, setExpandedChapters] = useState([1])

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId],
    )
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="dashboard-container">
        <StudentSidebar />

        {/* Main Content */}
        <main className="main-content">
          <div className="curriculum-header">
            <h1>{data.isArabic ? "المنهج الدراسي" : "Curriculum"}</h1>
            <div className="progress-section">
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${(curriculumData.completedLessons / curriculumData.totalLessons) * 100}%`,
                  }}
                />
              </div>
              <span className="progress-text">
                {curriculumData.completedLessons} {data.isArabic ? "من" : "of"} {curriculumData.totalLessons}
              </span>
            </div>
          </div>

          <div className="chapters-list">
            {curriculumData.chapters.map((chapter) => (
              <div key={chapter.id} className="chapter-card">
                <button
                  className={`chapter-header ${data.isDarkTheme ? "text-light" : ""} ${expandedChapters.includes(chapter.id) ? "expanded" : ""}`}
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <span>{data.isArabic ? chapter.title : chapter.titleEn}</span>
                  <svg
                    className="chapter-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {expandedChapters.includes(chapter.id) && (
                  <div className="chapter-content">
                    {chapter.lessons.map((lesson) => (
                      <div key={lesson.id} className="lesson-item">
                        <div className="lesson-title">{data.isArabic ? lesson.title : lesson.titleEn}</div>
                        <div className="lesson-actions">
                          {lesson.hasVideo && (
                            <button className="btn-lesson video">
                              <svg
                                className="icon"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                              </svg>
                              <span>{data.isArabic ? "فيديو الدرس" : "Lesson Video"}</span>
                            </button>
                          )}
                          {lesson.hasExam && (
                            <button className="btn-lesson exam">
                              <svg
                                className="icon"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                              </svg>
                              <span>{data.isArabic ? "امتحان الدرس" : "Lesson Exam"}</span>
                            </button>
                          )}
                          {lesson.hasAttachments && (
                            <button className="btn-lesson download">
                              <svg
                                className="icon"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                              </svg>
                              <span>{data.isArabic ? "تحميل المرفقات" : "Download Attachments"}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

