import { useState, useEffect, useRef, useContext } from "react"
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
  ArrowLeft,
  Upload,
  Plus,
  Trash2,
  Save,
  DollarSign,
  File,
} from "lucide-react"
import "./TeacherAddRevision.css"
import { MainContextObj } from "../shared/MainContext"
import TeacherSidebar from "./TeacherSidebar"

export default function TeacherAddRevision() {
  const data = useContext(MainContextObj)
  const navigate = useNavigate()

  // State for revisions
  const [revisions, setRevisions] = useState([
    {
      id: Date.now(),
      title: "",
      price: "",
      file: null,
    },
  ])
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRefs = useRef({})

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  const handleRevisionChange = (index, field, value) => {
    const updatedRevisions = [...revisions]
    updatedRevisions[index] = {
      ...updatedRevisions[index],
      [field]: value,
    }
    setRevisions(updatedRevisions)
  }

  const handleFileChange = (index, e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      handleRevisionChange(index, "file", file)
    }
  }

  const addRevision = () => {
    setRevisions([
      ...revisions,
      {
        id: Date.now(),
        title: "",
        price: "",
        file: null,
      },
    ])
  }

  const removeRevision = (index) => {
    if (revisions.length <= 1) {
      // Don't remove the last revision
      return
    }
    const updatedRevisions = [...revisions]
    updatedRevisions.splice(index, 1)
    setRevisions(updatedRevisions)
  }

  const triggerFileInput = (id) => {
    if (fileInputRefs.current[id]) {
      fileInputRefs.current[id].click()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const invalidRevisions = revisions.filter(
      (revision) => !revision.title.trim() || !revision.price.trim() || !revision.file,
    )
    if (invalidRevisions.length > 0) {
      alert(
        data.isArabic ? "يرجى إدخال عنوان وسعر وملف لكل مراجعة" : "Please enter a title, price, and file for each revision",
      )
      return
    }

    // Simulate API call
    setIsSaving(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Format data for submission
      const formattedData = revisions.map((revision) => ({
        title: revision.title,
        price: Number.parseFloat(revision.price),
        fileName: revision.file.name,
        fileSize: revision.file.size,
        fileType: revision.file.type,
      }))

      // Log the data that would be sent to backend
      console.log("%c Revision Data (JSON Format)", "color: #7c4dff; font-weight: bold; font-size: 14px")
      console.log(JSON.stringify(formattedData, null, 2))

      // Show success message
      alert(data.isArabic ? "تم حفظ المراجعات بنجاح" : "Revisions saved successfully")

      // Navigate back to revisions page
      navigate("/teacher/revisions")
    } catch (error) {
      console.error("Error saving revisions:", error)
      alert(data.isArabic ? "حدث خطأ أثناء حفظ البيانات" : "Error saving data")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-add-revision-styling-dashboard-container">
      <TeacherSidebar teacherName={"احمد حسن"} currentClass={"الصف الاول ثانوي"} currentPage="x" />

        {/* Main Content */}
        <main className="teacher-add-revision-styling-main">
          <div className="teacher-add-revision-styling-container">
            <div className="teacher-add-revision-styling-header">
              <button className="teacher-add-revision-styling-back-btn" onClick={() => navigate("/teacher/revisions")}>
                <ArrowLeft size={18} />
                <span>{data.isArabic ? "العودة إلى المراجعات" : "Back to Revisions"}</span>
              </button>
              <h1 className="teacher-add-revision-styling-title">
                {data.isArabic ? "إضافة مراجعة جديدة" : "Add New Revision"}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="teacher-add-revision-styling-form">
              <div className="teacher-add-revision-styling-revisions-container">
                <div className="teacher-add-revision-styling-revisions-header">
                  <h2 className="teacher-add-revision-styling-revisions-title">
                    {data.isArabic ? "المراجعات" : "Revisions"}
                  </h2>
                  <button type="button" className="teacher-add-revision-styling-add-revision-btn" onClick={addRevision}>
                    <Plus size={18} />
                    <span>{data.isArabic ? "إضافة مراجعة" : "Add Revision"}</span>
                  </button>
                </div>

                {revisions.map((revision, index) => (
                  <div key={revision.id} className="teacher-add-revision-styling-revision-card">
                    <div className="teacher-add-revision-styling-revision-header">
                      <h3 className="teacher-add-revision-styling-revision-title">
                        {data.isArabic ? `المراجعة ${index + 1}` : `Revision ${index + 1}`}
                      </h3>
                      {revisions.length > 1 && (
                        <button
                          type="button"
                          className="teacher-add-revision-styling-remove-revision-btn"
                          onClick={() => removeRevision(index)}
                        >
                          <Trash2 size={18} />
                          <span>{data.isArabic ? "حذف المراجعة" : "Remove Revision"}</span>
                        </button>
                      )}
                    </div>
                    <div className="teacher-add-revision-styling-revision-body">
                      <div className="teacher-add-revision-styling-form-row">
                        <div className="teacher-add-revision-styling-form-group">
                          <label>{data.isArabic ? "عنوان المراجعة" : "Revision Title"}</label>
                          <input
                            type="text"
                            value={revision.title}
                            onChange={(e) => handleRevisionChange(index, "title", e.target.value)}
                            className="teacher-add-revision-styling-form-control"
                            placeholder={data.isArabic ? "أدخل عنوان المراجعة..." : "Enter revision title..."}
                            required
                          />
                        </div>
                        <div className="teacher-add-revision-styling-form-group">
                          <label>{data.isArabic ? "السعر (جنيه)" : "Price (EGP)"}</label>
                          <div className="teacher-add-revision-styling-price-input">
                            <DollarSign size={18} className="teacher-add-revision-styling-price-icon" />
                            <input
                              type="number"
                              value={revision.price}
                              onChange={(e) => handleRevisionChange(index, "price", e.target.value)}
                              className="teacher-add-revision-styling-form-control"
                              placeholder={data.isArabic ? "أدخل السعر..." : "Enter price..."}
                              min="0"
                              step="0.01"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="teacher-add-revision-styling-file-upload">
                        <label>{data.isArabic ? "ملف المراجعة" : "Revision File"}</label>
                        <input
                          type="file"
                          id={`file-upload-${revision.id}`}
                          className="teacher-add-revision-styling-file-input"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          onChange={(e) => handleFileChange(index, e)}
                          ref={(el) => (fileInputRefs.current[revision.id] = el)}
                        />
                        <div
                          className="teacher-add-revision-styling-upload-area"
                          onClick={() => triggerFileInput(revision.id)}
                        >
                          {revision.file ? (
                            <div className="teacher-add-revision-styling-file-info">
                              <File size={24} />
                              <div className="teacher-add-revision-styling-file-details">
                                <span className="teacher-add-revision-styling-file-name">{revision.file.name}</span>
                                <span className="teacher-add-revision-styling-file-size">
                                  {(revision.file.size / (1024 * 1024)).toFixed(2)} MB
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="teacher-add-revision-styling-upload-placeholder">
                              <Upload size={24} />
                              <span>
                                {data.isArabic
                                  ? "اسحب وأفلت الملف هنا أو انقر للتصفح"
                                  : "Drag and drop file here or click to browse"}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="teacher-add-revision-styling-form-actions">
                <button type="submit" className="teacher-add-revision-styling-submit-btn" disabled={isSaving}>
                  {isSaving ? (
                    <span>{data.isArabic ? "جاري الحفظ..." : "Saving..."}</span>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>{data.isArabic ? "حفظ المراجعات" : "Save Revisions"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-add-revision-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

