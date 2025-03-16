import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { Home } from "lucide-react"
import { MainContextObj } from "./shared/MainContext"

export default function NotFound() {
  const data = useContext(MainContextObj)

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  return (
    <div className={`not-found-container ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

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

        <h1 className="error-title">{data.isArabic ? "عفواً، الصفحة غير موجودة" : "Oops! Page Not Found"}</h1>

        <p className="error-message">
          {data.isArabic
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
          <span>{data.isArabic ? "العودة إلى الصفحة الرئيسية" : "Back to Home"}</span>
        </Link>
      </div>

      <div className="stars"></div>
    </div>
  )
}

