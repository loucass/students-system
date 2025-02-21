import { Link } from "react-router-dom";

export default function AllLinks({isArabic}) {
  return (
    <>
    <Link to="/dashboard">{isArabic ? "الرئيسية" : "Dashboard"}</Link>
    <Link to="/curriculum">{isArabic ? "المنهج" : "Curriculum"}</Link>
    <Link to="/exams">{isArabic ? "الاختبارات" : "exams"}</Link>
    <Link to="/chat">{isArabic ? "المحادثات" : "Chat"}</Link>
    <Link to="/Revisions">{isArabic ? "المراجعات" : "Revisions"}</Link>
    <Link to="/challenges">{isArabic ? "التحديات" : "challenges"}</Link>
  </>
  )
}
