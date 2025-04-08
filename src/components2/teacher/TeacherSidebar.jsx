import React, { useContext } from 'react'
import {
  Grid,
  User,
  MessageSquare,
  FileText,
  BookOpen,
  Award,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { MainContextObj } from '../shared/MainContext'
import { Link, useLocation } from 'react-router-dom'
import "./TeacherSidebar.css"

export default function TeacherSidebar({teacherName , currentClass}) {
  const data = useContext(MainContextObj)
  const location = useLocation();
  const lastEndpoint = location.pathname.split('/').filter(Boolean).pop();
  return (
    <>
        {/* Sidebar */}
        <aside className="teacher-sidebar">
          <div className="teacher-profile">
            <img
              src={"/placeholder.svg"}
              alt="Teacher Profile"
              className="teacher-profile-image"
            />
            <h3 className="teacher-profile-name">{teacherName}</h3>
          </div>

          <div className="teacher-class-selector">
            <span>{currentClass}</span>
            <ChevronDown />
          </div>

          <nav className="teacher-nav">
            <Link to="/teacher" className={`${lastEndpoint=="teacher"? "active ": ""} teacher-nav-item`}>
              <Grid size={20} />
              <span>{data.isArabic ? "الرئيسية" : "Dashboard"}</span>
            </Link>
            <Link to="/teacher/exams-report" className={`${lastEndpoint=="exams-report"? "active ": ""} teacher-nav-item`}>
              <MessageSquare size={20} />
              <span>{data.isArabic ? "تقارير الامتحانات" : "Exams Reports"}</span>
            </Link>
            <Link to="/teacher/exams" className={`${lastEndpoint=="exams"? "active ": ""} teacher-nav-item`}>
              <FileText size={20} />
              <span>{data.isArabic ? "الاختبارات" : "Exams"}</span>
            </Link>
            <Link to="/teacher/curriculum" className={`${lastEndpoint=="curriculum"? "active ": ""} teacher-nav-item`}>
              <BookOpen size={20} />
              <span>{data.isArabic ? "المنهج" : "Curriculum"}</span>
            </Link>
            <Link to="/teacher/revisions" className={`${lastEndpoint=="revisions"? "active ": ""} teacher-nav-item`}>
              <FileText size={20} />
              <span>{data.isArabic ? "المراجعات" : "Revisions"}</span>
            </Link>
            <Link to="/teacher/challenges" className={`${lastEndpoint=="challenges"? "active ": ""} teacher-nav-item`}>
              <Award size={20} />
              <span>{data.isArabic ? "التحديات" : "Challenges"}</span>
            </Link>
            <Link to="/teacher/chat" className={`${lastEndpoint=="chat"? "active ": ""} teacher-nav-item`}>
              <MessageSquare size={20} />
              <span>{data.isArabic ? "المحادثات" : "Chat"}</span>
            </Link>
            <Link to="/teacher/help" className={`${lastEndpoint=="help"? "active ": ""} teacher-nav-item`}>
              <User size={20} />
              <span>{data.isArabic ? "المساعدة" : "Help"}</span>
            </Link>
            <Link to="/teacher/settings" className={`${lastEndpoint=="settings"? "active ": ""} teacher-nav-item`}>
              <Settings size={20} />
              <span>{data.isArabic ? "الإعدادات" : "Settings"}</span>
            </Link>
          </nav>

          <div className="teacher-logout">
            <LogOut size={20} />
            <span>{data.isArabic ? "تسجيل الخروج" : "Logout"}</span>
          </div>
        </aside>
    </>
  )
}
