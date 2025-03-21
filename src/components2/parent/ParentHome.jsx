import { useState, useEffect, useContext } from "react"
import { Download, FileText, Phone, Mail, HelpCircle } from "lucide-react"
import "./parentstyle.css"
import { MainContextObj } from "../shared/MainContext"

// Mock API data
const mockStudentData = {
  student: {
    id: "ST12345",
    nameAr: "يوسف احمد",
    nameEn: "Yousef Ahmed",
    grade: "الصف الثاني",
    gradeEn: "Second Grade",
    email: "ahmed.hassan@gmail.com",
    phone: "0123456789",
    guardianPhone: "0123456890",
  },
  notes: {
    teacher: [],
    guardian: [],
  },
  progress: {
    honorBoard: {
      current: 550,
      total: 600,
    },
    homework: {
      completed: 50,
      total: 100,
    },
    attendance: {
      present: 30,
      total: 100,
    },
    exams: {
      score: 10,
      total: 100,
    },
  },
  attendance: [
    {
      id: 1,
      dateAr: "١٥ مارس",
      dateEn: "March 15",
      statusAr: "حاضر",
      statusEn: "Present",
      subjectAr: "الرياضيات",
      subjectEn: "Mathematics",
      timeAr: "٩:٠٠ ص",
      timeEn: "9:00 AM",
    },
    {
      id: 2,
      dateAr: "١٤ مارس",
      dateEn: "March 14",
      statusAr: "غائب",
      statusEn: "Absent",
      subjectAr: "العلوم",
      subjectEn: "Science",
      timeAr: "١٠:٣٠ ص",
      timeEn: "10:30 AM",
    },
    {
      id: 3,
      dateAr: "١٣ مارس",
      dateEn: "March 13",
      statusAr: "حاضر",
      statusEn: "Present",
      subjectAr: "اللغة العربية",
      subjectEn: "Arabic",
      timeAr: "٨:٠٠ ص",
      timeEn: "8:00 AM",
    },
  ],
  performance: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    data: [75, 82, 88, 85, 90, 88],
  },
  documents: [
    {
      id: 1,
      titleAr: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      size: "2MB",
    },
    {
      id: 2,
      titleAr: "مراجعة الفصل الثاني",
      titleEn: "Second Chapter Review",
      size: "3MB",
    },
    {
      id: 3,
      titleAr: "مراجعة الفصل الثالث",
      titleEn: "Third Chapter Review",
      size: "2.5MB",
    },
    {
      id: 4,
      titleAr: "مراجعة الفصل الرابع",
      titleEn: "Fourth Chapter Review",
      size: "1.8MB",
    },
    {
      id: 5,
      titleAr: "مراجعة الفصل الخامس",
      titleEn: "Fifth Chapter Review",
      size: "2.2MB",
    },
  ],
  support: {
    phoneAr: "٠١٢٣٤٥٦٧٨٩٠",
    phoneEn: "01234567890",
    emailAr: "support@school.com",
    emailEn: "support@school.com",
  },
}

export default function StudentProfile() {
  const data = useContext(MainContextObj)

  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)

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
        setStudentData(mockStudentData)
      } catch (error) {
        console.error("Error fetching student data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="loading-spinner">Loading...</div>
  }

  if (!studentData) {
    return <div className="error-message">Error loading student data</div>
  }

  return (
    <div className="dashboard student-profile-page">

      <div className="dashboard-container">
        <div className="student-profile-content">
          {/* Header Section */}
          <div className="profile-header">
            <div className="profile-info">
              <img src="/placeholder.svg?height=100&width=100" alt="Profile" className="profile-image" />
              <div className="profile-details">
                <h1>{data.isArabic ? studentData.student.nameAr : studentData.student.nameEn}</h1>
                <p>{data.isArabic ? studentData.student.grade : studentData.student.gradeEn}</p>
              </div>
            </div>
            <div className="contact-info">
              <div className="info-item">
                <label>{data.isArabic ? "البريد الإلكتروني" : "Email"}</label>
                <p>{studentData.student.email}</p>
              </div>
              <div className="info-item">
                <label>{data.isArabic ? "رقم ولي الأمر" : "Guardian Phone"}</label>
                <p>{studentData.student.guardianPhone}</p>
              </div>
              <div className="info-item">
                <label>{data.isArabic ? "رقم الطالب" : "Student ID"}</label>
                <p>{studentData.student.id}</p>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="notes-section">
            <div className="notes-container">
              <h3>{data.isArabic ? "ملاحظات المدرس" : "Teacher Notes"}</h3>
              <textarea
                placeholder={data.isArabic ? "اكتب ملاحظات المدرس هنا..." : "Write teacher notes here..."}
                rows={4}
              />
            </div>
            <div className="notes-container">
              <h3>{data.isArabic ? "ملاحظات ولي الأمر" : "Guardian Notes"}</h3>
              <textarea
                placeholder={data.isArabic ? "اكتب ملاحظات ولي الأمر هنا..." : "Write guardian notes here..."}
                rows={4}
              />
            </div>
          </div>

          {/* Progress Cards */}
          <div className="progress-cards">
            <div className="progress-card">
              <div className="card-icon">🏆</div>
              <h4>{data.isArabic ? "لوحة الشرف" : "Honor Board"}</h4>
              <div
                className="progress-circle"
                style={{
                  "--progress": (studentData.progress.honorBoard.current / studentData.progress.honorBoard.total) * 100,
                }}
              >
                <svg>
                  <circle className="progress-background" cx="60" cy="60" r="54"></circle>
                  <circle className="progress-bar" cx="60" cy="60" r="54"></circle>
                </svg>
                <span className="progress-percentage">
                  {studentData.progress.honorBoard.current}/{studentData.progress.honorBoard.total}
                </span>
              </div>
            </div>
            <div className="progress-card">
              <div className="card-icon">📚</div>
              <h4>{data.isArabic ? "الواجبات" : "Homework"}</h4>
              <div
                className="progress-circle"
                style={{
                  "--progress": (studentData.progress.homework.completed / studentData.progress.homework.total) * 100,
                }}
              >
                <svg>
                  <circle className="progress-background" cx="60" cy="60" r="54"></circle>
                  <circle className="progress-bar" cx="60" cy="60" r="54"></circle>
                </svg>
                <span className="progress-percentage">{studentData.progress.homework.completed}%</span>
              </div>
            </div>
            <div className="progress-card">
              <div className="card-icon">📅</div>
              <h4>{data.isArabic ? "الحضور" : "Attendance"}</h4>
              <div
                className="progress-circle"
                style={{
                  "--progress": (studentData.progress.attendance.present / studentData.progress.attendance.total) * 100,
                }}
              >
                <svg>
                  <circle className="progress-background" cx="60" cy="60" r="54"></circle>
                  <circle className="progress-bar" cx="60" cy="60" r="54"></circle>
                </svg>
                <span className="progress-percentage">{studentData.progress.attendance.present}%</span>
              </div>
            </div>
            <div className="progress-card">
              <div className="card-icon">📝</div>
              <h4>{data.isArabic ? "الاختبارات" : "Exams"}</h4>
              <div
                className="progress-circle"
                style={{ "--progress": (studentData.progress.exams.score / studentData.progress.exams.total) * 100 }}
              >
                <svg>
                  <circle className="progress-background" cx="60" cy="60" r="54"></circle>
                  <circle className="progress-bar" cx="60" cy="60" r="54"></circle>
                </svg>
                <span className="progress-percentage">{studentData.progress.exams.score}%</span>
              </div>
            </div>
          </div>

          {/* Main Content Layout for Wide Screens */}
          <div className="main-content-layout">
            <div className="main-content-left">
              {/* Performance Graph */}
              <div className="performance-section">
                <h3>{data.isArabic ? "الأداء الأكاديمي" : "Academic Performance"}</h3>
                <div className="performance-graph">
                  <div className="graph-container">
                    <div
                      className="graph-line"
                      style={{
                        "--points": studentData.performance.data.join(" "),
                      }}
                    ></div>
                    <div className="graph-labels">
                      {studentData.performance.labels.map((label, index) => (
                        <span key={label}>{label}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="main-content-right">
              {/* Attendance Table */}
              <div className="attendance-section">
                <h3>{data.isArabic ? "سجل الحضور" : "Attendance Record"}</h3>
                <div className="table-responsive">
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>{data.isArabic ? "التاريخ" : "Date"}</th>
                        <th>{data.isArabic ? "المادة" : "Subject"}</th>
                        <th>{data.isArabic ? "الوقت" : "Time"}</th>
                        <th>{data.isArabic ? "الحالة" : "Status"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.attendance.map((record) => (
                        <tr key={record.id}>
                          <td>{data.isArabic ? record.dateAr : record.dateEn}</td>
                          <td>{data.isArabic ? record.subjectAr : record.subjectEn}</td>
                          <td>{data.isArabic ? record.timeAr : record.timeEn}</td>
                          <td>
                            <span className={`status-badge ${record.statusEn.toLowerCase()}`}>
                              {data.isArabic ? record.statusAr : record.statusEn}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="documents-section">
            <h3>{data.isArabic ? "الملفات المستندة" : "Documents"}</h3>
            <div className="documents-grid">
              {studentData.documents.map((doc) => (
                <div key={doc.id} className="document-card">
                  <FileText className="doc-icon" />
                  <div className="doc-info">
                    <h4>{data.isArabic ? doc.titleAr : doc.titleEn}</h4>
                    <p>{doc.size}</p>
                  </div>
                  <button className="download-btn">
                    <Download size={16} />
                    <span>{data.isArabic ? "تحميل" : "Download"}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Support Section */}
          <div className="support-section">
            <div className="support-icon">
              <HelpCircle size={24} />
            </div>
            <div className="support-content">
              <h3>{data.isArabic ? "هل تواجه مشكلة؟" : "Having an issue?"}</h3>
              <p>
                {data.isArabic
                  ? "إذا كنت تواجه أي مشكلة مع الطالب، يرجى التواصل مع فريق الدعم الفني:"
                  : "If you're experiencing any issues with the student, please contact our support team:"}
              </p>
              <div className="support-contacts">
                <div className="support-contact">
                  <Phone size={16} />
                  <span>{data.isArabic ? studentData.support.phoneAr : studentData.support.phoneEn}</span>
                </div>
                <div className="support-contact">
                  <Mail size={16} />
                  <span>{data.isArabic ? studentData.support.emailAr : studentData.support.emailEn}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

