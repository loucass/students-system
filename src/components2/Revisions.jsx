import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FileIcon as FilePdf, Download } from "lucide-react"
import Navbar from "./Navbar"
import AllLinks from "./Links"

// Sample revisions data
const revisionsData = {
  materials: [
    { id: 1, titleAr: "مراجعة الفصل الأول", titleEn: "First Chapter Review", price: 200 },
    { id: 2, titleAr: "مراجعة الفصل الثاني", titleEn: "Second Chapter Review", price: 250 },
    { id: 3, titleAr: "مراجعة الفصل الثالث", titleEn: "Third Chapter Review", price: 300 },
    { id: 4, titleAr: "مراجعة الفصل الرابع", titleEn: "Fourth Chapter Review", price: 350 },
    { id: 5, titleAr: "مراجعة الفصل الخامس", titleEn: "Fifth Chapter Review", price: 400 },
  ],
  requests: [
    {
      id: 1,
      titleAr: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      date: "2024/6/20",
      status: "مقبول",
      statusEn: "Accepted",
    },
    {
      id: 2,
      titleAr: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      date: "2024/6/25",
      status: "قيد التنفيذ",
      statusEn: "Pending",
    },
    {
      id: 3,
      titleAr: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      date: "2024/6/22",
      status: "مقبول",
      statusEn: "Accepted",
    },
    {
      id: 4,
      titleAr: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      date: "2024/6/22",
      status: "مقبول",
      statusEn: "Accepted",
    },
    {
      id: 5,
      titleAr: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      date: "2024/6/15",
      status: "مرفوض",
      statusEn: "Rejected",
    },
    {
      id: 6,
      titleAr: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      date: "2024/6/15",
      status: "مرفوض",
      statusEn: "Rejected",
    },
    {
      id: 7,
      titleAr: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      date: "2024/6/17",
      status: "مقبول",
      statusEn: "Accepted",
    },
    {
      id: 8,
      titleAr: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      date: "2024/6/17",
      status: "مقبول",
      statusEn: "Accepted",
    },
    {
      id: 9,
      titleAr: "مراجعة الفصل الأول",
      titleEn: "First Chapter Review",
      date: "2024/6/17",
      status: "مقبول",
      statusEn: "Accepted",
    },
  ],
}

export default function Revisions() {
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
          <div className="revisions-container">
            <h1>{isArabic ? "المراجعات" : "Revisions"}</h1>

            {/* Revision Materials */}
            <div className="materials-grid">
              {revisionsData.materials.map((material) => (
                <div key={material.id} className="material-card">
                  <div className="material-icon">
                    <FilePdf size={40} />
                  </div>
                  <h3>{isArabic ? material.titleAr : material.titleEn}</h3>
                  <div className="material-price">
                    {material.price} {isArabic ? "جنيه" : "EGP"}
                  </div>
                  <button className="btn-purchase">
                    <Download size={16} />
                    <span>{isArabic ? "رابط الشراء" : "Purchase Link"}</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Purchase Requests */}
            <div className="requests-section">
              <h2>{isArabic ? "طلباتي" : "My Requests"}</h2>
              <div className="table-responsive">
                <table className="requests-table">
                  <thead>
                    <tr>
                      <th>{isArabic ? "الاسم" : "Name"}</th>
                      <th>{isArabic ? "الحالة" : "Status"}</th>
                      <th>{isArabic ? "التاريخ" : "Date"}</th>
                      <th>{isArabic ? "عرض" : "View"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revisionsData.requests.map((request) => (
                      <tr key={request.id}>
                        <td>{isArabic ? request.titleAr : request.titleEn}</td>
                        <td>
                          <span
                            className={`status-badge ${request.status === "مقبول" ? "success" : request.status === "مرفوض" ? "error" : "pending"}`}
                          >
                            {isArabic ? request.status : request.statusEn}
                          </span>
                        </td>
                        <td>{request.date}</td>
                        <td>
                          <button className="btn-view">{isArabic ? "عرض" : "View"}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

