import React, { createContext, useState } from 'react'

export const MainContextObj = createContext()

export default function MainContext({children}) {
    const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
    })

    const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
    })

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
        }

  return (
    <MainContextObj.Provider value={{
        "isDarkTheme": isDarkTheme,
        "setIsDarkTheme": setIsDarkTheme,
        "isArabic": isArabic,
        "setIsArabic": setIsArabic,
        "toggleSidebar": toggleSidebar,
        "isSidebarOpen": isSidebarOpen,
    }}>
      {children}
    </MainContextObj.Provider>
  )
}
