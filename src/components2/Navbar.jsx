import { Menu, X, Sun, Moon, Languages } from "lucide-react"

export default function Navbar({ isDarkTheme, setIsDarkTheme, isArabic, setIsArabic, toggleSidebar, isSidebarOpen }) {
  return (
    <nav className={`navbar navbar-expand-lg ${isDarkTheme ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleSidebar}
          aria-label={isArabic ? "تبديل القائمة" : "Toggle navigation"}
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="ms-auto d-flex gap-3">
          <button
            className="btn btn-icon"
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            aria-label={isArabic ? "تبديل المظهر" : "Toggle theme"}
          >
            {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="btn btn-icon"
            onClick={() => setIsArabic(!isArabic)}
            aria-label={isArabic ? "تغيير اللغة" : "Change language"}
          >
            <Languages size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}

