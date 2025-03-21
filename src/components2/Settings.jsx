import { useState, useEffect, useRef, useContext } from "react"
import { Eye, EyeOff } from "lucide-react"
import { MainContextObj } from "./shared/MainContext"
import StudentSidebar from "./StudentSidebar"

export default function Settings() {
  const data = useContext(MainContextObj)

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const sidebarRef = useRef(null)

  const [formData, setFormData] = useState({
    firstName: "يوسف",
    lastName: "احمد",
    nationalId: "01234567890123",
    password: "••••••••••••",
    confirmPassword: "••••••••••••",
    phone: "01234567890",
    alternatePhone: "01234567890",
  })

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="dashboard-container">
        <StudentSidebar />

        {/* Main Content */}
        <main className="main-content">
          <div className="settings-container">
            <div className="settings-header">
              <h1>{data.isArabic ? "الإعدادات" : "Settings"}</h1>
              <div className="theme-toggle">
                <span>{data.isArabic ? "الوضع الليلي" : "Dark Mode"}</span>
                <label className="switch">
                  <input type="checkbox" checked={data.isDarkTheme} onChange={() => data.setIsDarkTheme(!data.isDarkTheme)} />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>

            <div className="user-profile">
              <img src="/placeholder.svg?height=80&width=80" alt="Profile" className="profile-image" />
              <div className="user-info">
                <h2>{data.isArabic ? "يوسف احمد" : "Yousef Ahmed"}</h2>
                <p>{data.isArabic ? "الصف الثاني" : "Second Grade"}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>{data.isArabic ? "الاسم الأول" : "First Name"}</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>{data.isArabic ? "الاسم الثاني" : "Last Name"}</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group">
                <label>{data.isArabic ? "الرقم القومي" : "National ID"}</label>
                <input type="text" name="nationalId" value={formData.nationalId} onChange={handleInputChange} />
              </div>

              <div className="form-group password-group">
                <label>{data.isArabic ? "كلمة المرور" : "Password"}</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group password-group">
                <label>{data.isArabic ? "تأكيد كلمة المرور" : "Confirm Password"}</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{data.isArabic ? "رقم الهاتف" : "Phone Number"}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>{data.isArabic ? "رقم هاتف آخر" : "Alternate Phone"}</label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <button type="submit" className="save-button">
                {data.isArabic ? "حفظ التغييرات" : "Save Changes"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

