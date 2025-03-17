import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    let navigate = useNavigate()
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  const [formData, setFormData] = useState({
    StudentCode: "",
    nationalId: "",
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
    navigate("/parent/dashboard")
  }

  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-form-section">

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>{isArabic ? "كود الطالب" : "Student Code"}</label>
                <input
                  type="text"
                  name="StudentCode"
                  value={formData.StudentCode}
                  onChange={handleInputChange}
                  placeholder={isArabic ? "كود الطالب" : "Student Code"}
                  required
                />
              </div>

              <div className="form-group">
                <label>{isArabic ? "الرقم القومي" : "nationalId"}</label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  placeholder={isArabic ? "كلمة السر" : "nationalId"}
                  required
                />
              </div>

              <button type="submit" className="auth-button">
                {isArabic ? "تسجيل الدخول" : "Login"}
              </button>
            </form>
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

