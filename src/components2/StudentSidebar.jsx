import React, { useContext } from 'react'
import {
  Grid,
  MessageSquare,
  FileText,
  BookOpen,
  Award,
  Settings,
  LogOut,
} from "lucide-react"
import { Link, useLocation } from 'react-router-dom'
import { MainContextObj } from './shared/MainContext'
import "./StudentSidebar.css"

export default function StudentSidebar({ studentName = "yousef ahmed" }) {
  const data = useContext(MainContextObj)
  const location = useLocation();
  const lastEndpoint = location.pathname.split('/').filter(Boolean).pop();
  const { isArabic } = data

  return (
    <>
      {/* Sidebar */}
      <aside className="student-sidebar-styling">
        <div className="student-sidebar-profile">
          <img
            src={"/placeholder.svg"}
            alt="Student Profile"
            className="student-sidebar-profile-image"
          />
          <h3 className="student-sidebar-profile-name">{studentName}</h3>
        </div>

        <nav className="student-sidebar-nav">
          <Link 
            to="/dashboard" 
            className={`${lastEndpoint === "dashboard" ? "active " : ""} student-sidebar-nav-item`}
          >
            <Grid size={20} />
            <span>{isArabic ? "الرئيسية" : "Dashboard"}</span>
          </Link>
          
          <Link 
            to="/curriculum" 
            className={`${lastEndpoint === "curriculum" ? "active " : ""} student-sidebar-nav-item`}
          >
            <BookOpen size={20} />
            <span>{isArabic ? "المنهج" : "Curriculum"}</span>
          </Link>
          
          <Link 
            to="/exams" 
            className={`${lastEndpoint === "exams" ? "active " : ""} student-sidebar-nav-item`}
          >
            <FileText size={20} />
            <span>{isArabic ? "الاختبارات" : "Exams"}</span>
          </Link>
          
          <Link 
            to="/chat" 
            className={`${lastEndpoint === "chat" ? "active " : ""} student-sidebar-nav-item`}
          >
            <MessageSquare size={20} />
            <span>{isArabic ? "المحادثات" : "Chat"}</span>
          </Link>
          
          <Link 
            to="/Revisions" 
            className={`${lastEndpoint === "revisions" ? "active " : ""} student-sidebar-nav-item`}
          >
            <FileText size={20} />
            <span>{isArabic ? "المراجعات" : "Revisions"}</span>
          </Link>
          
          <Link 
            to="/challenges" 
            className={`${lastEndpoint === "challenges" ? "active " : ""} student-sidebar-nav-item`}
          >
            <Award size={20} />
            <span>{isArabic ? "التحديات" : "Challenges"}</span>
          </Link>
          
          <Link 
            to="/settings" 
            className={`${lastEndpoint === "settings" ? "active " : ""} student-sidebar-nav-item`}
          >
            <Settings size={20} />
            <span>{isArabic ? "الإعدادات" : "Settings"}</span>
          </Link>
          <h2 className="text-danger">mocking</h2>
          <Link to="/parent/dashboard">{isArabic ? "الرئيسيه لولي الامر" : "parent dashboard"}</Link>
          <Link to="/parent/login">{isArabic ? "تسجيل دخول ولي الامر" : "parent log in"}</Link>
          <hr />
          <Link to="/teacher">dashboard for teacher</Link>
        </nav>

        <div className="student-sidebar-logout">
          <LogOut size={20} />
          <span>{isArabic ? "تسجيل الخروج" : "Logout"}</span>
        </div>
      </aside>
    </>
  )
}