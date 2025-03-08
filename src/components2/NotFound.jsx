import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Home } from "lucide-react"

export default function NotFound() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light")
    document.body.className = isDarkTheme ? "dark-theme" : "light-theme"
  }, [isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", isArabic ? "ar" : "en")
    document.dir = isArabic ? "rtl" : "ltr"
  }, [isArabic])

  return (
    <div className={`not-found-container ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <div className="theme-language-controls">
        <button className="theme-toggle" onClick={() => setIsDarkTheme(!isDarkTheme)}>
          {isDarkTheme ? "☀️" : "🌙"}
        </button>
        <button className="language-toggle" onClick={() => setIsArabic(!isArabic)}>
          {isArabic ? "English" : "عربي"}
        </button>
      </div>

      <div className="not-found-content">
        <div className="error-code">
          <div className="digit">4</div>
          <div className="digit zero">
            <div className="astronaut">
              <img src="/placeholder.svg?height=120&width=120" alt="Floating astronaut" className="astronaut-img" />
            </div>
          </div>
          <div className="digit">4</div>
        </div>

        <h1 className="error-title">{isArabic ? "عفواً، الصفحة غير موجودة" : "Oops! Page Not Found"}</h1>

        <p className="error-message">
          {isArabic
            ? "الصفحة التي تبحث عنها قد تكون تم نقلها أو حذفها أو ربما لم تكن موجودة من الأساس."
            : "The page you are looking for might have been moved, deleted, or possibly never existed."}
        </p>

        <div className="planets">
          <div className="planet planet-1"></div>
          <div className="planet planet-2"></div>
          <div className="planet planet-3"></div>
          <div className="planet planet-4"></div>
        </div>

        <Link to="/dashboard" className="home-button">
          <Home size={20} />
          <span>{isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}</span>
        </Link>
      </div>

      <div className="stars"></div>
    </div>
  )
}

