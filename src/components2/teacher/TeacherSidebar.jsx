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
  ChevronLeft,
  FileText as FileIcon,
} from "lucide-react"
import { MainContextObj } from '../shared/MainContext'
import { Link } from 'react-router-dom'

export default function TeacherSidebar({teacherName , currentClass , currentPage = "chat"}) {
  const data = useContext(MainContextObj)
  return (
    <>
        {/* Sidebar */}
        <aside className="teacher-chat-styling-sidebar">
          <div className="teacher-chat-styling-profile">
            <img
              src={"/placeholder.svg"}
              alt="Teacher Profile"
              className="teacher-chat-styling-profile-image"
            />
            <h3 className="teacher-chat-styling-profile-name">{teacherName}</h3>
          </div>

          <div className="teacher-chat-styling-class-selector">
            <span>{currentClass}</span>
            <ChevronDown />
          </div>

          <nav className="teacher-chat-styling-nav">
            <Link to="/teacher" className={`${currentPage=="dashboard"? "active ": ""} teacher-chat-styling-nav-item`}>
              <Grid size={20} />
              <span>{data.isArabic ? "الرئيسية" : "Dashboard"}</span>
            </Link>
            <Link to="/teacher/students" className={`${currentPage=="students"? "active ": ""} teacher-chat-styling-nav-item`}>
              <User size={20} />
              <span>{data.isArabic ? "الطلاب" : "Students"}</span>
            </Link>
            <Link to="/teacher/exams-report" className={`${currentPage=="reports"? "active ": ""} teacher-chat-styling-nav-item`}>
              <MessageSquare size={20} />
              <span>{data.isArabic ? "تقارير الامتحانات" : "Exams Reports"}</span>
            </Link>
            <Link to="/teacher/exams" className={`${currentPage=="exams"? "active ": ""} teacher-chat-styling-nav-item`}>
              <FileText size={20} />
              <span>{data.isArabic ? "الاختبارات" : "Exams"}</span>
            </Link>
            <Link to="/teacher/curriculum" className={`${currentPage=="curriculum"? "active ": ""} teacher-chat-styling-nav-item`}>
              <BookOpen size={20} />
              <span>{data.isArabic ? "المنهج" : "Curriculum"}</span>
            </Link>
            <Link to="/teacher/revisions" className={`${currentPage=="revisions"? "active ": ""} teacher-chat-styling-nav-item`}>
              <FileText size={20} />
              <span>{data.isArabic ? "المراجعات" : "Revisions"}</span>
            </Link>
            <Link to="/teacher/challenges" className={`${currentPage=="challenges"? "active ": ""} teacher-chat-styling-nav-item`}>
              <Award size={20} />
              <span>{data.isArabic ? "التحديات" : "Challenges"}</span>
            </Link>
            <Link to="/teacher/chat" className={`${currentPage=="chat"? "active ": ""} teacher-chat-styling-nav-item`}>
              <MessageSquare size={20} />
              <span>{data.isArabic ? "المحادثات" : "Chat"}</span>
            </Link>
            <Link to="/teacher/help" className={`${currentPage=="help"? "active ": ""} teacher-chat-styling-nav-item`}>
              <User size={20} />
              <span>{data.isArabic ? "المساعدة" : "Help"}</span>
            </Link>
            <Link to="/teacher/settings" className={`${currentPage=="settings"? "active ": ""} teacher-chat-styling-nav-item`}>
              <Settings size={20} />
              <span>{data.isArabic ? "الإعدادات" : "Settings"}</span>
            </Link>
          </nav>

          <div className="teacher-chat-styling-logout">
            <LogOut size={20} />
            <span>{data.isArabic ? "تسجيل الخروج" : "Logout"}</span>
          </div>
        </aside>
    </>
  )
}
