import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import Navbar from "./NavBar"

export default function OtpVerification() {
  let navigate = useNavigate()
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs[index + 1].current.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const otpValue = otp.join("")
    console.log("OTP submitted:", otpValue)
    navigate("/reset-password")
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
            <div className="register-header">
              <img src="/placeholder.svg?height=40&width=40" alt="Logo" />
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>{isArabic ? "ادخل الكود المرسل اليك" : "Enter the verification code"}</label>
                <div className="otp-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={inputRefs[index]}
                      type="number"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="otp-input"
                      required
                    />
                  ))}
                </div>
              </div>

              <button type="submit" className="auth-button">
                {isArabic ? "استرداد" : "Verify"}
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

