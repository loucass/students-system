import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "./NavBar"

export default function Login() {
    let navigate = useNavigate()
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
                <label>{isArabic ? "البريد الالكتروني / كود الطالب" : "Email / Student Code"}</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={isArabic ? "البريد الالكتروني / كود الطالب" : "Email / Student Code"}
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

              <Link to="/forgot-password" className="forgot-password-link">
                {isArabic ? "هل نسيت كلمة السر؟" : "Forgot password?"}
              </Link>

              <button type="submit" className="auth-button">
                {isArabic ? "تسجيل الدخول" : "Login"}
              </button>
            </form>

            <p className="auth-link">
              {isArabic ? "لا يوجد لديك حساب؟" : "Don't have an account?"}{" "}
              <Link to="/register">{isArabic ? "انشئ حسابك الآن!" : "Create your account!"}</Link>
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

