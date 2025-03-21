import { Sun, Moon, Languages } from "lucide-react"
import { useContext } from "react"
import { MainContextObj } from "./shared/MainContext"

export default function Navbar() {
  const data = useContext(MainContextObj)
  return (
    <nav className={`navbar navbar-expand-lg ${data.isDarkTheme ? "navbar-dark bg-dark" : "navbar-light bg-light"}`}>
      <div className="container-fluid">
        <div className="ms-auto d-flex gap-3">
          <button
            className="btn btn-icon"
            onClick={() => data.setIsDarkTheme(!data.isDarkTheme)}
            aria-label={data.isArabic ? "تبديل المظهر" : "Toggle theme"}
          >
            {data.isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="btn btn-icon"
            onClick={() => data.setIsArabic(!data.isArabic)}
            aria-label={data.isArabic ? "تغيير اللغة" : "Change language"}
          >
            <Languages size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export function Navbar2() {
  const data = useContext(MainContextObj)
  console.log(data);
  
  return (
    <></>
  )
}

