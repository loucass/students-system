import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
  FileText,
  Plus,
  Trash2,
  Upload,
  Video,
  Save,
  ArrowLeft,
} from "lucide-react"
import "./TeacherAddChapter.css"
import { MainContextObj } from "../shared/MainContext"
import TeacherSidebar from "./TeacherSidebar"

export default function TeacherAddChapter() {
  const data = useContext(MainContextObj)
  const navigate = useNavigate()

  // Update the chapterData state to include videoUrl field and change examFile to examUrl
  const [chapterData, setChapterData] = useState({
    title: "",
    lessons: [
      {
        id: Date.now(),
        title: "",
        chapter: "",
        homework: "",
        hasVideo: false,
        hasExam: false,
        hasAttachments: false,
        videoFile: null,
        videoUrl: "",
        examUrl: "",
        attachmentFiles: [],
      },
    ],
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  const handleChapterTitleChange = (e) => {
    setChapterData((prev) => ({
      ...prev,
      title: e.target.value,
    }))
  }

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...chapterData.lessons]
    updatedLessons[index] = {
      ...updatedLessons[index],
      [field]: value,
    }
    setChapterData((prev) => ({
      ...prev,
      lessons: updatedLessons,
    }))
  }

  // Update the handleFileChange function to handle only attachments and video files
  const handleFileChange = (index, field, files) => {
    const updatedLessons = [...chapterData.lessons]

    if (field === "attachmentFiles") {
      // For multiple files (attachments)
      updatedLessons[index] = {
        ...updatedLessons[index],
        [field]: [...updatedLessons[index][field], ...Array.from(files)],
        hasAttachments: true,
      }
    } else if (field === "videoFile") {
      // For video file
      updatedLessons[index] = {
        ...updatedLessons[index],
        [field]: files[0],
        hasVideo: true,
        videoUrl: "", // Clear URL when file is selected
      }
    }

    setChapterData((prev) => ({
      ...prev,
      lessons: updatedLessons,
    }))
  }

  // Add a new function to handle URL inputs
  const handleUrlChange = (index, field, value) => {
    const updatedLessons = [...chapterData.lessons]

    if (field === "videoUrl" && value) {
      updatedLessons[index] = {
        ...updatedLessons[index],
        [field]: value,
        hasVideo: true,
        videoFile: null, // Clear file when URL is entered
      }
    } else if (field === "examUrl" && value) {
      updatedLessons[index] = {
        ...updatedLessons[index],
        [field]: value,
        hasExam: true,
      }
    } else {
      updatedLessons[index] = {
        ...updatedLessons[index],
        [field]: value,
        [field === "videoUrl" ? "hasVideo" : "hasExam"]: value.trim().length > 0,
      }
    }

    setChapterData((prev) => ({
      ...prev,
      lessons: updatedLessons,
    }))
  }

  // Update the handleSubmit function to format and log the data as pretty JSON
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!chapterData.title.trim()) {
      alert(data.isArabic ? "يرجى إدخال عنوان الفصل" : "Please enter a chapter title")
      return
    }

    const invalidLessons = chapterData.lessons.filter((lesson) => !lesson.title.trim())
    if (invalidLessons.length > 0) {
      alert(data.isArabic ? "يرجى إدخال عنوان لكل درس" : "Please enter a title for each lesson")
      return
    }

    // Simulate API call
    setIsSaving(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Prepare data for submission
      const formattedData = {
        title: chapterData.title,
        lessons: chapterData.lessons.map((lesson) => ({
          title: lesson.title,
          homework: lesson.homework,
          hasVideo: lesson.hasVideo,
          hasExam: lesson.hasExam,
          hasAttachments: lesson.hasAttachments,
          videoSource: lesson.videoFile ? "file" : "url",
          videoDetails: lesson.videoFile
            ? { fileName: lesson.videoFile.name, fileSize: lesson.videoFile.size }
            : { url: lesson.videoUrl },
          examUrl: lesson.examUrl,
          attachments: lesson.attachmentFiles.map((file) => ({
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
          })),
        })),
      }

      // Format and log the data as pretty JSON
      console.log("%c Chapter Data (JSON Format)", "color: #7c4dff; font-weight: bold; font-size: 14px")
      console.log(JSON.stringify(formattedData, null, 2))

      // Show success message
      alert(data.isArabic ? "تم حفظ الفصل بنجاح" : "Chapter saved successfully")

      // Navigate back to curriculum page
      navigate("/teacher/curriculum")
    } catch (error) {
      console.error("Error saving chapter data:", error)
      alert(data.isArabic ? "حدث خطأ أثناء حفظ البيانات" : "Error saving data")
    } finally {
      setIsSaving(false)
    }
  }

  const addLesson = () => {
    setChapterData((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        {
          id: Date.now(),
          title: "",
          chapter: "",
          homework: "",
          hasVideo: false,
          hasExam: false,
          hasAttachments: false,
          videoFile: null,
          videoUrl: "",
          examUrl: "",
          attachmentFiles: [],
        },
      ],
    }))
  }

  const removeLesson = (index) => {
    const updatedLessons = [...chapterData.lessons]
    updatedLessons.splice(index, 1)
    setChapterData((prev) => ({
      ...prev,
      lessons: updatedLessons,
    }))
  }

  const removeAttachment = (lessonIndex, fileIndex) => {
    const updatedLessons = [...chapterData.lessons]
    const updatedAttachments = [...updatedLessons[lessonIndex].attachmentFiles]
    updatedAttachments.splice(fileIndex, 1)
    updatedLessons[lessonIndex] = {
      ...updatedLessons[lessonIndex],
      attachmentFiles: updatedAttachments,
      hasAttachments: updatedAttachments.length > 0,
    }
    setChapterData((prev) => ({
      ...prev,
      lessons: updatedLessons,
    }))
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-add-chapter-styling-dashboard-container">
      <TeacherSidebar teacherName={"احمد حسن"} currentClass={"الصف الاول ثانوي"} currentPage="x" />

        {/* Main Content */}
        <main className="teacher-add-chapter-styling-main">
          <div className="teacher-add-chapter-styling-container">
            <div className="teacher-add-chapter-styling-header">
              <button className="teacher-add-chapter-styling-back-btn" onClick={() => navigate("/teacher/curriculum")}>
                <ArrowLeft size={18} />
                <span>{data.isArabic ? "العودة إلى المنهج" : "Back to Curriculum"}</span>
              </button>
              <h1 className="teacher-add-chapter-styling-title">{data.isArabic ? "إضافة فصل جديد" : "Add New Chapter"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="teacher-add-chapter-styling-form">
              {/* Chapter Title */}
              <div className="teacher-add-chapter-styling-card">
                <div className="teacher-add-chapter-styling-card-header">
                  <h2 className="teacher-add-chapter-styling-card-title">
                    {data.isArabic ? "معلومات الفصل" : "Chapter Information"}
                  </h2>
                </div>
                <div className="teacher-add-chapter-styling-card-body">
                  <div className="teacher-add-chapter-styling-form-group">
                    <label>{data.isArabic ? "عنوان الفصل" : "Chapter Title"}</label>
                    <input
                      type="text"
                      value={chapterData.title}
                      onChange={handleChapterTitleChange}
                      className="teacher-add-chapter-styling-form-control"
                      placeholder={data.isArabic ? "أدخل عنوان الفصل..." : "Enter chapter title..."}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Lessons */}
              <div className="teacher-add-chapter-styling-lessons-container">
                <div className="teacher-add-chapter-styling-lessons-header">
                  <h2 className="teacher-add-chapter-styling-lessons-title">{data.isArabic ? "الدروس" : "Lessons"}</h2>
                  <button type="button" className="teacher-add-chapter-styling-add-lesson-btn" onClick={addLesson}>
                    <Plus size={18} />
                    <span>{data.isArabic ? "إضافة درس" : "Add Lesson"}</span>
                  </button>
                </div>

                {chapterData.lessons.map((lesson, index) => (
                  <div key={lesson.id} className="teacher-add-chapter-styling-lesson-card">
                    <div className="teacher-add-chapter-styling-lesson-header">
                      <h3 className="teacher-add-chapter-styling-lesson-title">
                        {data.isArabic ? `الدرس ${index + 1}` : `Lesson ${index + 1}`}
                      </h3>
                      {chapterData.lessons.length > 1 && (
                        <button
                          type="button"
                          className="teacher-add-chapter-styling-remove-lesson-btn"
                          onClick={() => removeLesson(index)}
                        >
                          <Trash2 size={18} />
                          <span>{data.isArabic ? "حذف الدرس" : "Remove Lesson"}</span>
                        </button>
                      )}
                    </div>
                    <div className="teacher-add-chapter-styling-lesson-body">
                      <div className="teacher-add-chapter-styling-form-row">
                        <div className="teacher-add-chapter-styling-form-group">
                          <label>{data.isArabic ? "عنوان الدرس" : "Lesson Title"}</label>
                          <input
                            type="text"
                            value={lesson.title}
                            onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                            className="teacher-add-chapter-styling-form-control"
                            placeholder={data.isArabic ? "أدخل عنوان الدرس..." : "Enter lesson title..."}
                            required
                          />
                        </div>
                        <div className="teacher-add-chapter-styling-form-group">
                          <label>{data.isArabic ? "الواجب المطلوب" : "Required Homework"}</label>
                          <input
                            type="text"
                            value={lesson.homework}
                            onChange={(e) => handleLessonChange(index, "homework", e.target.value)}
                            className="teacher-add-chapter-styling-form-control"
                            placeholder={data.isArabic ? "أدخل الواجب المطلوب..." : "Enter required homework..."}
                          />
                        </div>
                      </div>

                      <div className="teacher-add-chapter-styling-lesson-content">
                        {/* Video Upload */}
                        <div className="teacher-add-chapter-styling-content-section">
                          <div className="teacher-add-chapter-styling-content-header">
                            <h4>
                              <Video size={18} />
                              <span>{data.isArabic ? "فيديو الدرس" : "Lesson Video"}</span>
                            </h4>
                          </div>
                          <div className="teacher-add-chapter-styling-upload-container">
                            <div className="teacher-add-chapter-styling-form-group">
                              <label>{data.isArabic ? "رابط الفيديو" : "Video URL"}</label>
                              <input
                                type="text"
                                value={lesson.videoUrl}
                                onChange={(e) => handleUrlChange(index, "videoUrl", e.target.value)}
                                className="teacher-add-chapter-styling-form-control"
                                placeholder={data.isArabic ? "أدخل رابط الفيديو..." : "Enter video URL..."}
                                disabled={lesson.videoFile !== null}
                              />
                            </div>
                            <div className="teacher-add-chapter-styling-form-group">
                              <label>{data.isArabic ? "أو تحميل ملف فيديو" : "Or Upload Video File"}</label>
                              <input
                                type="file"
                                id={`video-upload-${lesson.id}`}
                                className="teacher-add-chapter-styling-file-input"
                                accept="video/*"
                                onChange={(e) => handleFileChange(index, "videoFile", e.target.files)}
                                disabled={lesson.videoUrl !== ""}
                              />
                              <label
                                htmlFor={`video-upload-${lesson.id}`}
                                className={`teacher-add-chapter-styling-upload-label ${lesson.videoUrl !== "" ? "disabled" : ""}`}
                              >
                                <Upload size={18} />
                                <span>
                                  {lesson.videoFile
                                    ? lesson.videoFile.name
                                    : data.isArabic
                                      ? "اختر ملف الفيديو..."
                                      : "Choose video file..."}
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Exam Upload */}
                        <div className="teacher-add-chapter-styling-content-section">
                          <div className="teacher-add-chapter-styling-content-header">
                            <h4>
                              <FileText size={18} />
                              <span>{data.isArabic ? "امتحان الدرس" : "Lesson Exam"}</span>
                            </h4>
                          </div>
                          <div className="teacher-add-chapter-styling-upload-container">
                            <div className="teacher-add-chapter-styling-form-group">
                              <label>{data.isArabic ? "رابط الامتحان" : "Exam URL"}</label>
                              <input
                                type="text"
                                value={lesson.examUrl}
                                onChange={(e) => handleUrlChange(index, "examUrl", e.target.value)}
                                className="teacher-add-chapter-styling-form-control"
                                placeholder={data.isArabic ? "أدخل رابط الامتحان..." : "Enter exam URL..."}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Attachments Upload */}
                        <div className="teacher-add-chapter-styling-content-section">
                          <div className="teacher-add-chapter-styling-content-header">
                            <h4>
                              <FileText size={18} />
                              <span>{data.isArabic ? "مرفقات الدرس" : "Lesson Attachments"}</span>
                            </h4>
                          </div>
                          <div className="teacher-add-chapter-styling-upload-container">
                            <input
                              type="file"
                              id={`attachments-upload-${lesson.id}`}
                              className="teacher-add-chapter-styling-file-input"
                              multiple
                              onChange={(e) => handleFileChange(index, "attachmentFiles", e.target.files)}
                            />
                            <label
                              htmlFor={`attachments-upload-${lesson.id}`}
                              className="teacher-add-chapter-styling-upload-label"
                            >
                              <Upload size={18} />
                              <span>{data.isArabic ? "اختر المرفقات..." : "Choose attachments..."}</span>
                            </label>
                          </div>

                          {/* Attachment Files List */}
                          {lesson.attachmentFiles.length > 0 && (
                            <div className="teacher-add-chapter-styling-attachments-list">
                              <h5>{data.isArabic ? "المرفقات المختارة" : "Selected Attachments"}</h5>
                              <ul>
                                {lesson.attachmentFiles.map((file, fileIndex) => (
                                  <li key={fileIndex} className="teacher-add-chapter-styling-attachment-item">
                                    <span className="teacher-add-chapter-styling-attachment-name">{file.name}</span>
                                    <button
                                      type="button"
                                      className="teacher-add-chapter-styling-remove-attachment-btn"
                                      onClick={() => removeAttachment(index, fileIndex)}
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="teacher-add-chapter-styling-form-actions">
                <button type="submit" className="teacher-add-chapter-styling-submit-btn" disabled={isSaving}>
                  {isSaving ? (
                    <span>{data.isArabic ? "جاري الحفظ..." : "Saving..."}</span>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>{data.isArabic ? "حفظ الفصل" : "Save Chapter"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-add-chapter-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

