import 'bootstrap/dist/css/bootstrap.min.css'
import "./main.css"
import Dashboard from "./components2/Dashboard"
import Curriculum from "./components2/curriculum"
import Settings from "./components2/Settings"
import Exams from "./components2/Exams"
import Challenges from "./components2/Challenges"
import Revisions from "./components2/Revisions"
import { Route, Routes } from "react-router-dom"
import NotFound from "./components2/NotFound"
import Register from './components2/Register'
import Login from './components2/Login'
import ForgotPassword from './components2/ForgetPassword'
import OtpVerification from './components2/OTP'
import ResetPassword from './components2/ResetPassword'
import LandingPage from './components2/Home'
import ExamPage from './components2/ExamPage'

export default function Home() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/curriculum" element={<Curriculum />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/exams" element={<Exams />} />
      <Route path="/examPage/:examID" element={<ExamPage />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/Revisions" element={<Revisions />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verification" element={<OtpVerification />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

