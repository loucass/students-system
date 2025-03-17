import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MainContextObj } from "./shared/MainContext"

export default function Login() {
  const data = useContext(MainContextObj)
  let navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

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
    <div className={data.isDarkTheme ? "dark-theme" : "light-theme"}>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-form-section">

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>{data.isArabic ? "البريد الالكتروني / كود الطالب" : "Email / Student Code"}</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={data.isArabic ? "البريد الالكتروني / كود الطالب" : "Email / Student Code"}
                  required
                />
              </div>

              <div className="form-group">
                <label>{data.isArabic ? "كلمة السر" : "Password"}</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={data.isArabic ? "كلمة السر" : "Password"}
                  required
                />
              </div>

              <Link to="/forgot-password" className="forgot-password-link">
                {data.isArabic ? "هل نسيت كلمة السر؟" : "Forgot password?"}
              </Link>

              <button type="submit" className="auth-button">
                {data.isArabic ? "تسجيل الدخول" : "Login"}
              </button>
            </form>

            <p className="auth-link">
              {data.isArabic ? "لا يوجد لديك حساب؟" : "Don't have an account?"}{" "}
              <Link to="/register">{data.isArabic ? "انشئ حسابك الآن!" : "Create your account!"}</Link>
            </p>

            <p className="auth-link">
              {data.isArabic ? "تسجيل الدخول ك ولي امر" : "log in as parent"}{" "}
              <Link to="/parent/login">{data.isArabic ? "سجل الدخول ك ولي امر" : "log in as parent"}</Link>
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

