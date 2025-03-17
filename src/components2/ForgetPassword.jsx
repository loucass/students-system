import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { MainContextObj } from "./shared/MainContext"

export default function ForgotPassword() {
  const data = useContext(MainContextObj)

  let navigate = useNavigate()

  const [phoneNumber, setPhoneNumber] = useState("")

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Phone number submitted:", phoneNumber)
    navigate("/otp-verification")
  }

  return (
    <div className={data.isDarkTheme ? "dark-theme" : "light-theme"}>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-form-section">

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>{data.isArabic ? "ادخل رقم هاتفك" : "Enter your phone number"}</label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder={data.isArabic ? "ادخل رقم الهاتف الخاص بك" : "Enter your phone number"}
                  required
                />
              </div>

              <button type="submit" className="auth-button">
                {data.isArabic ? "ارسال الكود" : "Send Code"}
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

