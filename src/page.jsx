import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "./main.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
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
import TeacherExamReport from './components2/teacher/TeacherExamReport'
import TeacherChat from './components2/teacher/TeacherChat'
import TeacherExamGenerator from './components2/teacher/TeacherExamGenerator'
import TeacherSettings from './components2/teacher/TeacherSettings'
import TeacherSupport from './components2/teacher/TeacherSupport'
import TeacherCurriculum from './components2/teacher/TeacherCurriculum'
import TeacherAddChapter from './components2/teacher/TeacherAddChapter'
import TeacherRevision from './components2/teacher/TeacherRevision'
import TeacherAddRevision from './components2/teacher/TeacherAddRevision'
import TeacherChallenges from './components2/teacher/TeacherChallenges'

export default function Home() {

  const MainRoutes = createBrowserRouter([
    // Public Routes
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/",
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "otp-verification",
          element: <OtpVerification />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
  
    // Student Routes
    {
      path: "/",
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "curriculum",
          element: <Curriculum />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "exams",
          children: [
            {
              index: true,
              element: <Exams />,
            },
            {
              path: ":examID",
              element: <ExamPage />,
            },
          ],
        },
        {
          path: "challenges",
          element: <Challenges />,
        },
        {
          path: "revisions",
          element: <Revisions />,
        },
        {
          path: "chat",
          element: <TeacherChat />,
        },
      ],
    },
  
    // Parent Routes
    {
      path: "/parent",
      children: [
        {
          path: "dashboard",
          element: <ParentHome />,
        },
        {
          path: "login",
          element: <ParentLogin />,
        },
      ],
    },
  
    // Teacher Routes
    {
      path: "/teacher",
      children: [
        {
          index: true,
          element: <TeacherHome />,
        },
        {
          path: "exams",
          children: [
            {
              index: true,
              element: <TeacherExam />,
            },
            {
              path: "questions",
              element: <TeacherExamGenerator />,
            },
          ],
        },
        {
          path: "exams-report",
          element: <TeacherExamReport />,
        },
        {
          path: "chat",
          element: <TeacherChat />,
        },
        {
          path: "settings",
          element: <TeacherSettings />,
        },
        {
          path: "help",
          element: <TeacherSupport />,
        },
        {
          path: "challenges",
          element: <TeacherChallenges />,
        },
        {
          path: "curriculum",
          children: [
            {
              index: true,
              element: <TeacherCurriculum />,
            },
            {
              path: "add-chapter",
              element: <TeacherAddChapter />,
            },
          ],
        },
        {
          path: "revisions",
          children: [
            {
              index: true,
              element: <TeacherRevision />,
            },
            {
              path: "add",
              element: <TeacherAddRevision />,
            },
          ],
        },
      ],
    },
  
    // Fallback Route
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  
  return (
    <MainContext >
      <Navbar />
      <RouterProvider router={MainRoutes} />
    </MainContext>
  )
}

