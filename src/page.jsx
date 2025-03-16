import 'bootstrap/dist/css/bootstrap.min.css'
import "./main.css"
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import Dashboard from "./components2/Dashboard"
import Curriculum from "./components2/curriculum"
import Settings from "./components2/Settings"
import Exams from "./components2/Exams"
import Challenges from "./components2/Challenges"
import Revisions from "./components2/Revisions"
import NotFound from "./components2/NotFound"
import Register from './components2/Register'
import Login from './components2/Login'
import ForgotPassword from './components2/ForgetPassword'
import OtpVerification from './components2/OTP'
import ResetPassword from './components2/ResetPassword'
import LandingPage from './components2/Home'
import ExamPage from './components2/ExamPage'
import ParentHome from './components2/parent/ParentHome'
import ParentLogin from './components2/parent/ParentLogin'
import MainContext from './components2/shared/MainContext'
import Navbar from './components2/NavBar'
import TeacherHome from './components2/teacher/TeacherHome'
import TeacherExam from './components2/teacher/TeacherExam'

export default function Home() {

  const MainRoutes = createBrowserRouter(
    [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/curriculum",
        element: <Curriculum />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/exams",
        element: <Exams />,
      },
      {
        path: "/examPage/:examID",
        element: <ExamPage />,
      },
      {
        path: "/challenges",
        element: <Challenges />,
      },
      {
        path: "/Revisions",
        element: <Revisions />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/otp-verification",
        element: <OtpVerification />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/parent/dashboard",
        element: <ParentHome />,
      },
      {
        path: "/parent/login",
        element: <ParentLogin />,
      },
      {
        path: "/teacher/dashboard",
        element: <TeacherHome />,
      },
      {
        path: "/teacher/exams",
        element: <TeacherExam />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ]
    
  )

  return (
    <MainContext >
      <Navbar />
      <RouterProvider router={MainRoutes} />
    </MainContext>
  )
}

