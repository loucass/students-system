import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Check } from "lucide-react"
import { MainContextObj } from "./shared/MainContext"

export default function ResetPassword() {
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
    password: "",
    confirmPassword: "",
  })

  const [passwordStrength, setPasswordStrength] = useState("")

  const checkPasswordStrength = (password) => {
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    const isLongEnough = password.length >= 8

    const strength = [hasLower, hasUpper, hasNumber, hasSpecial, isLongEnough].filter(Boolean).length

    if (strength < 3) return "weak"
    if (strength < 5) return "medium"
    return "strong"
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (name === "password") {
      setPasswordStrength(checkPasswordStrength(value))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.password.value !== formData.confirmPassword.value) {
      alert(data.isArabic ? "كلمات المرور غير متطابقة" : "Passwords do not match")
      return
    }
    console.log("Password reset:", formData)
    navigate("/dashboard")
  }

  const requirements = [
    { text: data.isArabic ? "ثمانية أحرف على الأقل" : "At least 8 characters", met: formData.password.length >= 8 },
    { text: data.isArabic ? "حرف كبير واحد" : "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: data.isArabic ? "حرف صغير واحد" : "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: data.isArabic ? "رقم واحد" : "One number", met: /\d/.test(formData.password) },
    {
      text: data.isArabic ? "رمز خاص واحد" : "One special character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
    },
  ]

  return (
    <div className={data.isDarkTheme ? "dark-theme" : "light-theme"}>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-form-section">
            <div className="register-header">
              {/* <img src="/placeholder.svg?height=40&width=40" alt="Logo" /> */}
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>{data.isArabic ? "كلمة السر الجديدة" : "New Password"}</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {formData.password && (
                  <div className={`password-strength ${passwordStrength}`}>
                    {data.isArabic ? "قوة كلمة المرور: " : "Password strength: "}
                    {passwordStrength === "weak" && (data.isArabic ? "ضعيفة" : "Weak")}
                    {passwordStrength === "medium" && (data.isArabic ? "متوسطة" : "Medium")}
                    {passwordStrength === "strong" && (data.isArabic ? "قوية" : "Strong")}
                  </div>
                )}
                <div className="password-requirements">
                  <ul>
                    {requirements.map((req, index) => (
                      <li key={index} className={req.met ? "met" : ""}>
                        {req.met && <Check size={16} />}
                        {req.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="form-group">
                <label>{data.isArabic ? "تأكيد كلمة السر" : "Confirm Password"}</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className="auth-button">
                {data.isArabic ? "حفظ" : "Save"}
              </button>
            </form>

            <p className="auth-link">
              <Link to="/login">{data.isArabic ? "العودة إلى تسجيل الدخول" : "Back to Login"}</Link>
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

