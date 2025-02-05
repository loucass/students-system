import 'bootstrap/dist/css/bootstrap.min.css'
import "./main.css"
import React from "react"
import Dashboard from "./components2/Dashboard"
import Curriculum from "./components2/curriculum"
import Settings from "./components2/Settings"
import Exams from "./components2/Exams"
import Challenges from "./components2/Challenges"
import Revisions from "./components2/Revisions"
import { Route, Routes } from "react-router-dom"
import NotFound from "./components2/NotFound"

export default function Home() {
  return (
    <Routes>
      { /* <Navigation />
      <main>
        <Hero />
        <FeaturedProducts />
        <Solutions />
        <CustomerReviews />
      </main> */}
      {/* <Dashboard /> */}
      {/* <Curriculum /> */}
      {/* <Settings /> */}
      {/* <Exams /> */}
      {/* <Challenges /> */}
      {/* <Revisions /> */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/curriculum" element={<Curriculum />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/exams" element={<Exams />} />
      <Route path="/challenges" element={<Challenges />} />
      <Route path="/Revisions" element={<Revisions />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

