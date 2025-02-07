import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Moon, Sun } from "lucide-react"
import Navbar from "./NavBar"

export default function Register() {
  let navigate = useNavigate()
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    email: "",
    phone: "",
    guardianPhone: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    navigate("/dashboard")
  }

  return (
    <>
    <Navbar
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        toggleSidebar={null}
        isSidebarOpen={null}
    />
    <div className={`register-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <div className="register-card">
        <div className="register-form-section">

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group full-width">
              <label>{isArabic ? "الاسم بالكامل" : "Full Name"}</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder={isArabic ? "ادخل اسمك" : "Enter your name"}
                required
              />
            </div>

            <div className="form-group">
              <label>{isArabic ? "الرقم القومي" : "National ID"}</label>
              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={handleInputChange}
                placeholder={isArabic ? "مكون من 14 رقم" : "14 digits"}
                required
              />
            </div>

            <div className="form-group">
              <label>{isArabic ? "البريد الالكتروني" : "Email"}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={isArabic ? "بريدك الالكتروني" : "Your email"}
                required
              />
            </div>

            <div className="form-group">
              <label>{isArabic ? "رقم الهاتف" : "Phone Number"}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={isArabic ? "رقم هاتفك" : "Your phone number"}
                required
              />
            </div>

            <div className="form-group">
              <label>{isArabic ? "رقم ولي الامر" : "Guardian's Number"}</label>
              <input
                type="tel"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleInputChange}
                placeholder={isArabic ? "رقم ولي الامر" : "Guardian's number"}
                required
              />
            </div>

            <div className="form-group">
              <label>{isArabic ? "كلمة السر" : "Password"}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder={isArabic ? "كلمة السر" : "Password"}
                required
              />
            </div>

            <div className="form-group">
              <label>{isArabic ? "تأكيد كلمة السر" : "Confirm Password"}</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={isArabic ? "تأكيد كلمة السر" : "Confirm password"}
                required
              />
            </div>

            <button type="submit" className="register-button">
              {isArabic ? "تسجيل الحساب" : "Register Account"}
            </button>
          </form>

          <p className="login-link">
            {isArabic ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
            <Link to="/login">{isArabic ? "تسجيل الدخول" : "Login"}</Link>
          </p>
        </div>

        <div className="register-image-section">
          <div className="profile-circle">
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

