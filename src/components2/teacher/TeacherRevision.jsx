"use client"

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
  Download,
  Trash2,
  Edit,
  DollarSign,
  BarChart2,
  Users,
  File,
} from "lucide-react"
import "./TeacherRevision.css"
import { MainContextObj } from "../shared/MainContext"
import TeacherSidebar from "./TeacherSidebar"

// Mock revisions data
const mockRevisionsData = {
  stats: {
    subscribedStudents: 100,
    totalFiles: 200,
    totalSales: 16000,
  },
  revisions: [
    {
      id: 1,
      title: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      price: 200,
      downloads: 45,
      createdAt: "2024/5/15",
      fileSize: "2.5MB",
    },
    {
      id: 2,
      title: "مراجعة الفصل الثاني",
      titleEn: "Second Chapter Review",
      price: 250,
      downloads: 38,
      createdAt: "2024/5/20",
      fileSize: "3.2MB",
    },
    {
      id: 3,
      title: "مراجعة الفصل الثالث",
      titleEn: "Third Chapter Review",
      price: 300,
      downloads: 27,
      createdAt: "2024/6/1",
      fileSize: "4.1MB",
    },
    {
      id: 4,
      title: "مراجعة الفصل الرابع",
      titleEn: "Fourth Chapter Review",
      price: 350,
      downloads: 19,
      createdAt: "2024/6/10",
      fileSize: "3.8MB",
    },
  ],
  requests: [
    {
      id: 1,
      studentName: "يوسف احمد محمد",
      studentNameEn: "Yousef Ahmed Mohamed",
      studentId: "01023456789",
      studentCode: "MK001",
      date: "2024/6/20",
      status: "approved",
    },
    {
      id: 2,
      studentName: "علي خالد احمد",
      studentNameEn: "Ali Khaled Ahmed",
      studentId: "01023456789",
      studentCode: "MK002",
      date: "2024/7/20",
      status: "approved",
    },
    {
      id: 3,
      studentName: "محمد احمد خالد",
      studentNameEn: "Mohamed Ahmed Khaled",
      studentId: "01023456789",
      studentCode: "MK003",
      date: "2024/8/20",
      status: "approved",
    },
    {
      id: 4,
      studentName: "احمد محمد خالد",
      studentNameEn: "Ahmed Mohamed Khaled",
      studentId: "01023456789",
      studentCode: "MK004",
      date: "2024/9/20",
      status: "approved",
    },
    {
      id: 5,
      studentName: "خالد محمد احمد",
      studentNameEn: "Khaled Mohamed Ahmed",
      studentId: "01023456789",
      studentCode: "MK005",
      date: "2024/6/20",
      status: "approved",
    },
    {
      id: 6,
      studentName: "احمد خالد محمد",
      studentNameEn: "Ahmed Khaled Mohamed",
      studentId: "01023456789",
      studentCode: "MK006",
      date: "2024/6/20",
      status: "approved",
    },
    {
      id: 7,
      studentName: "خالد احمد محمد",
      studentNameEn: "Khaled Ahmed Mohamed",
      studentId: "01023456789",
      studentCode: "MK007",
      date: "2024/6/20",
      status: "approved",
    },
    {
      id: 8,
      studentName: "محمد خالد احمد",
      studentNameEn: "Mohamed Khaled Ahmed",
      studentId: "01023456789",
      studentCode: "MK008",
      date: "2024/6/20",
      status: "approved",
    },
    {
      id: 9,
      studentName: "محمد خالد احمد",
      studentNameEn: "Mohamed Khaled Ahmed",
      studentId: "01023456789",
      studentCode: "MK009",
      date: "2024/6/20",
      status: "approved",
    },
    {
      id: 10,
      studentName: "علي محمد احمد",
      studentNameEn: "Ali Mohamed Ahmed",
      studentId: "01023456789",
      studentCode: "MK010",
      date: "2024/9/20",
      status: "approved",
    },
    {
      id: 11,
      studentName: "يوسف خالد احمد",
      studentNameEn: "Yousef Khaled Ahmed",
      studentId: "01023456789",
      studentCode: "MK011",
      date: "2024/9/20",
      status: "approved",
    },
  ],
}

export default function TeacherRevision() {
  const data = useContext(MainContextObj)
  const navigate = useNavigate()

  const [revisionsData, setRevisionsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date")
  const [sortOrder, setSortOrder] = useState("desc")
  const [activeTab, setActiveTab] = useState("revisions") // "revisions" or "requests"

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
        setRevisionsData(mockRevisionsData)
      } catch (error) {
        console.error("Error fetching revisions data:", error)
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

  const getSortedRevisions = () => {
    if (!revisionsData) return []

    const filtered = revisionsData.revisions.filter((revision) => {
      const searchLower = searchQuery.toLowerCase()
      const titleToSearch = data.isArabic ? revision.title : revision.titleEn
      return titleToSearch.toLowerCase().includes(searchLower)
    })

    return [...filtered].sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "title":
          aValue = data.isArabic ? a.title : a.titleEn
          bValue = data.isArabic ? b.title : b.titleEn
          break
        case "price":
          aValue = a.price
          bValue = b.price
          break
        case "downloads":
          aValue = a.downloads
          bValue = b.downloads
          break
        case "date":
        default:
          aValue = a.createdAt
          bValue = b.createdAt
          break
      }

      if (typeof aValue === "string") {
        const comparison = aValue.localeCompare(bValue)
        return sortOrder === "asc" ? comparison : -comparison
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }
    })
  }

  const getSortedRequests = () => {
    if (!revisionsData) return []

    const filtered = revisionsData.requests.filter((request) => {
      const searchLower = searchQuery.toLowerCase()
      const nameToSearch = data.isArabic ? request.studentName : request.studentNameEn
      return (
        nameToSearch.toLowerCase().includes(searchLower) ||
        request.studentId.includes(searchLower) ||
        request.studentCode.toLowerCase().includes(searchLower)
      )
    })

    return [...filtered].sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "name":
          aValue = data.isArabic ? a.studentName : a.studentNameEn
          bValue = data.isArabic ? b.studentName : b.studentNameEn
          break
        case "code":
          aValue = a.studentCode
          bValue = b.studentCode
          break
        case "date":
        default:
          aValue = a.date
          bValue = b.date
          break
      }

      if (typeof aValue === "string") {
        const comparison = aValue.localeCompare(bValue)
        return sortOrder === "asc" ? comparison : -comparison
      } else {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue
      }
    })
  }

  const handleAddRevision = () => {
    navigate("/teacher/revisions/add")
  }

  const handleDeleteRevision = (id) => {
    // In a real app, this would call an API to delete the revision
    setRevisionsData((prev) => ({
      ...prev,
      revisions: prev.revisions.filter((revision) => revision.id !== id),
    }))
  }

  const handleEditRevision = (id) => {
    // In a real app, this would navigate to an edit page with the revision ID
    navigate(`/teacher/revisions/edit/${id}`)
  }

  if (loading) {
    return <div className="teacher-exam-styling-loading">{data.isArabic ? "جاري التحميل..." : "loading..."}</div>
  }

  if (!revisionsData) {
    return <div className="teacher-exam-styling-error">{data.isArabic ? "حدث خطأ في تحميل البيانات" : "error loading the data"}</div>
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-revisions-styling-dashboard-container">
      <TeacherSidebar teacherName={"احمد حسن"} currentClass={"الصف الاول ثانوي"} currentPage="revisions" />

        {/* Main Content */}
        <main className="teacher-revisions-styling-main">
          <div className="teacher-revisions-styling-revisions-container">
            <div className="teacher-revisions-styling-header">
              <h1 className="teacher-revisions-styling-title">{data.isArabic ? "المراجعات" : "Revisions"}</h1>
              <button className="teacher-revisions-styling-add-revision-btn" onClick={handleAddRevision}>
                <Plus size={18} />
                <span>{data.isArabic ? "إضافة مراجعة" : "Add Revision"}</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="teacher-revisions-styling-stats-container">
              <div className="teacher-revisions-styling-stats-card">
                <div className="teacher-revisions-styling-stats-icon">
                  <Users size={24} />
                </div>
                <div className="teacher-revisions-styling-stats-content">
                  <h3 className="teacher-revisions-styling-stats-title">
                    {data.isArabic ? "الطلاب المشتركين" : "Subscribed Students"}
                  </h3>
                  <p className="teacher-revisions-styling-stats-value">{revisionsData.stats.subscribedStudents} طالب</p>
                </div>
              </div>

              <div className="teacher-revisions-styling-stats-card">
                <div className="teacher-revisions-styling-stats-icon">
                  <File size={24} />
                </div>
                <div className="teacher-revisions-styling-stats-content">
                  <h3 className="teacher-revisions-styling-stats-title">{data.isArabic ? "عدد المبيعات" : "Total Files"}</h3>
                  <p className="teacher-revisions-styling-stats-value">{revisionsData.stats.totalFiles} ملف</p>
                </div>
              </div>

              <div className="teacher-revisions-styling-stats-card">
                <div className="teacher-revisions-styling-stats-icon">
                  <DollarSign size={24} />
                </div>
                <div className="teacher-revisions-styling-stats-content">
                  <h3 className="teacher-revisions-styling-stats-title">
                    {data.isArabic ? "إجمالي المبيعات" : "Total Sales"}
                  </h3>
                  <p className="teacher-revisions-styling-stats-value">{revisionsData.stats.totalSales} جنية</p>
                </div>
              </div>
            </div>

            {/* Sales Chart */}
            <div className="teacher-revisions-styling-chart-container">
              <h2 className="teacher-revisions-styling-chart-title">{data.isArabic ? "المبيعات" : "Sales"}</h2>
              <div className="teacher-revisions-styling-chart">
                {/* This would be a real chart in a production app */}
                <div className="teacher-revisions-styling-chart-placeholder">
                  <BarChart2 size={24} />
                  <span>{data.isArabic ? "رسم بياني للمبيعات" : "Sales Chart"}</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="teacher-revisions-styling-tabs">
              <button
                className={`teacher-revisions-styling-tab ${activeTab === "revisions" ? "active" : ""}`}
                onClick={() => setActiveTab("revisions")}
              >
                {data.isArabic ? "المراجعات" : "Revisions"}
              </button>
              <button
                className={`teacher-revisions-styling-tab ${activeTab === "requests" ? "active" : ""}`}
                onClick={() => setActiveTab("requests")}
              >
                {data.isArabic ? "الطلبات" : "Requests"}
              </button>
            </div>

            {/* Revisions Table */}
            {activeTab === "revisions" && (
              <div className="teacher-revisions-styling-table-container">
                <div className="teacher-revisions-styling-table-header">
                  <h2 className="teacher-revisions-styling-table-title">
                    {data.isArabic ? "قائمة المراجعات" : "Revisions List"}
                  </h2>
                  <div className="teacher-revisions-styling-sort-controls">
                    <span className="teacher-revisions-styling-sort-label">{data.isArabic ? "ترتيب حسب" : "Sort by"}</span>
                    <select
                      className="teacher-revisions-styling-sort-select"
                      value={sortBy}
                      onChange={(e) => handleSort(e.target.value)}
                    >
                      <option value="title">{data.isArabic ? "العنوان" : "Title"}</option>
                      <option value="price">{data.isArabic ? "السعر" : "Price"}</option>
                      <option value="downloads">{data.isArabic ? "التنزيلات" : "Downloads"}</option>
                      <option value="date">{data.isArabic ? "التاريخ" : "Date"}</option>
                    </select>
                    <button
                      className="teacher-revisions-styling-sort-direction"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    >
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </button>
                  </div>
                </div>

                <div className="teacher-revisions-styling-table-wrapper">
                  <table className="teacher-revisions-styling-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort("title")} className="teacher-revisions-styling-sortable">
                          {data.isArabic ? "عنوان المراجعة" : "Revision Title"}
                          {sortBy === "title" && (
                            <span className="teacher-revisions-styling-sort-indicator">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th onClick={() => handleSort("price")} className="teacher-revisions-styling-sortable">
                          {data.isArabic ? "السعر" : "Price"}
                          {sortBy === "price" && (
                            <span className="teacher-revisions-styling-sort-indicator">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th onClick={() => handleSort("downloads")} className="teacher-revisions-styling-sortable">
                          {data.isArabic ? "التنزيلات" : "Downloads"}
                          {sortBy === "downloads" && (
                            <span className="teacher-revisions-styling-sort-indicator">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th onClick={() => handleSort("date")} className="teacher-revisions-styling-sortable">
                          {data.isArabic ? "تاريخ الإنشاء" : "Created Date"}
                          {sortBy === "date" && (
                            <span className="teacher-revisions-styling-sort-indicator">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th>{data.isArabic ? "حجم الملف" : "File Size"}</th>
                        <th>{data.isArabic ? "الإجراءات" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSortedRevisions().map((revision) => (
                        <tr key={revision.id}>
                          <td>{data.isArabic ? revision.title : revision.titleEn}</td>
                          <td>{revision.price} EGP</td>
                          <td>{revision.downloads}</td>
                          <td>{revision.createdAt}</td>
                          <td>{revision.fileSize}</td>
                          <td className="teacher-revisions-styling-actions">
                            <button
                              className="teacher-revisions-styling-action-btn download"
                              title={data.isArabic ? "تنزيل" : "Download"}
                            >
                              <Download size={16} />
                            </button>
                            <button
                              className="teacher-revisions-styling-action-btn edit"
                              onClick={() => handleEditRevision(revision.id)}
                              title={data.isArabic ? "تعديل" : "Edit"}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              className="teacher-revisions-styling-action-btn delete"
                              onClick={() => handleDeleteRevision(revision.id)}
                              title={data.isArabic ? "حذف" : "Delete"}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Requests Table */}
            {activeTab === "requests" && (
              <div className="teacher-revisions-styling-table-container">
                <div className="teacher-revisions-styling-table-header">
                  <h2 className="teacher-revisions-styling-table-title">{data.isArabic ? "الطلبات" : "Requests"}</h2>
                  <div className="teacher-revisions-styling-sort-controls">
                    <span className="teacher-revisions-styling-sort-label">{data.isArabic ? "ترتيب حسب" : "Sort by"}</span>
                    <select
                      className="teacher-revisions-styling-sort-select"
                      value={sortBy}
                      onChange={(e) => handleSort(e.target.value)}
                    >
                      <option value="name">{data.isArabic ? "اسم الطالب" : "Student Name"}</option>
                      <option value="code">{data.isArabic ? "كود الطالب" : "Student Code"}</option>
                      <option value="date">{data.isArabic ? "التاريخ" : "Date"}</option>
                    </select>
                    <button
                      className="teacher-revisions-styling-sort-direction"
                      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    >
                      {sortOrder === "asc" ? "↑" : "↓"}
                    </button>
                  </div>
                </div>

                <div className="teacher-revisions-styling-table-wrapper">
                  <table className="teacher-revisions-styling-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort("name")} className="teacher-revisions-styling-sortable">
                          {data.isArabic ? "اسم الطالب" : "Student Name"}
                          {sortBy === "name" && (
                            <span className="teacher-revisions-styling-sort-indicator">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th>{data.isArabic ? "رقم الطالب" : "Student ID"}</th>
                        <th onClick={() => handleSort("code")} className="teacher-revisions-styling-sortable">
                          {data.isArabic ? "كود الطالب" : "Student Code"}
                          {sortBy === "code" && (
                            <span className="teacher-revisions-styling-sort-indicator">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th onClick={() => handleSort("date")} className="teacher-revisions-styling-sortable">
                          {data.isArabic ? "التاريخ" : "Date"}
                          {sortBy === "date" && (
                            <span className="teacher-revisions-styling-sort-indicator">
                              {sortOrder === "asc" ? "↑" : "↓"}
                            </span>
                          )}
                        </th>
                        <th>{data.isArabic ? "تحكم" : "Control"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSortedRequests().map((request) => (
                        <tr key={request.id}>
                          <td>{data.isArabic ? request.studentName : request.studentNameEn}</td>
                          <td>{request.studentId}</td>
                          <td>{request.studentCode}</td>
                          <td>{request.date}</td>
                          <td className="teacher-revisions-styling-status-controls">
                            <button
                              className={`teacher-revisions-styling-status-btn reject ${
                                request.status === "rejected" ? "active" : ""
                              }`}
                            >
                              ✕
                            </button>
                            <button
                              className={`teacher-revisions-styling-status-btn approve ${
                                request.status === "approved" ? "active" : ""
                              }`}
                            >
                              ✓
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-revisions-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

