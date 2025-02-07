import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "./NavBar"

export default function ForgotPassword() {
  let navigate = useNavigate()
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  const [phoneNumber, setPhoneNumber] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Phone number submitted:", phoneNumber)
    navigate("/otp-verification")
  }

  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <Navbar
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        toggleSidebar={() => {}}
        isSidebarOpen={false}
      />

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-form-section">

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>{isArabic ? "ادخل رقم هاتفك" : "Enter your phone number"}</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={isArabic ? "ادخل رقم الهاتف الخاص بك" : "Enter your phone number"}
                  required
                />
              </div>

              <button type="submit" className="auth-button">
                {isArabic ? "ارسال الكود" : "Send Code"}
              </button>
            </form>

            <p className="auth-link">
              <Link to="/login">{isArabic ? "العودة إلى تسجيل الدخول" : "Back to Login"}</Link>
            </p>
          </div>

          <div className="auth-image-section">
            <div className="profile-circle">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

