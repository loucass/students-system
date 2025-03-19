import { useState, useEffect, useContext } from "react"
import {
  Search,
  ChevronDown,
  ChevronUp,
  Send,
} from "lucide-react"
import "./TeacherSupport.css"
import TeacherSidebar from "./TeacherSidebar"
import { MainContextObj } from "../shared/MainContext"

// FAQ data
const faqData = [
  {
    id: 1,
    question: {
      ar: "السؤال الأول",
      en: "First Question",
    },
    answer: {
      ar: "إجابة السؤال الأول إجابة السؤال الأول إجابة السؤال الأول إجابة السؤال الأول إجابة السؤال الأول إجابة السؤال الأول إجابة السؤال الأول",
      en: "Answer to the first question. Answer to the first question. Answer to the first question. Answer to the first question. Answer to the first question.",
    },
  },
  {
    id: 2,
    question: {
      ar: "السؤال الثاني",
      en: "Second Question",
    },
    answer: {
      ar: "إجابة السؤال الثاني إجابة السؤال الثاني إجابة السؤال الثاني إجابة السؤال الثاني إجابة السؤال الثاني إجابة السؤال الثاني إجابة السؤال الثاني",
      en: "Answer to the second question. Answer to the second question. Answer to the second question. Answer to the second question. Answer to the second question.",
    },
  },
  {
    id: 3,
    question: {
      ar: "السؤال الثالث",
      en: "Third Question",
    },
    answer: {
      ar: "إجابة السؤال الثالث إجابة السؤال الثالث إجابة السؤال الثالث إجابة السؤال الثالث إجابة السؤال الثالث إجابة السؤال الثالث إجابة السؤال الثالث",
      en: "Answer to the third question. Answer to the third question. Answer to the third question. Answer to the third question. Answer to the third question.",
    },
  },
  {
    id: 4,
    question: {
      ar: "السؤال الرابع",
      en: "Fourth Question",
    },
    answer: {
      ar: "إجابة السؤال الرابع إجابة السؤال الرابع إجابة السؤال الرابع إجابة السؤال الرابع إجابة السؤال الرابع إجابة السؤال الرابع إجابة السؤال الرابع",
      en: "Answer to the fourth question. Answer to the fourth question. Answer to the fourth question. Answer to the fourth question. Answer to the fourth question.",
    },
  },
]

export default function TeacherSupport() {
  const data = useContext(MainContextObj)

  const [expandedFaqs, setExpandedFaqs] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  const toggleFaq = (id) => {
    setExpandedFaqs((prev) => (prev.includes(id) ? prev.filter((faqId) => faqId !== id) : [...prev, id]))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
      alert(data.isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields")
      return
    }

    // Simulate API call
    setIsSubmitting(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Log the data that would be sent to backend
      console.log("Submitting contact form:", contactForm)

      // Show success message
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)

      // Reset form
      setContactForm({
        name: "",
        phone: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting contact form:", error)
      alert(data.isArabic ? "حدث خطأ أثناء إرسال الرسالة" : "Error sending message")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-help-styling-dashboard-container">
      <TeacherSidebar teacherName={"احمد حسن"} currentClass={"الصف الاول ثانوي"} currentPage="help" />

        {/* Main Content */}
        <main className="teacher-help-styling-main">
          <div className="teacher-help-styling-help-center">
            <div className="teacher-help-styling-help-header">
              <h1>{data.isArabic ? "مركز المساعدة" : "Help Center"}</h1>
            </div>

            {/* Search Section */}
            <div className="teacher-help-styling-search-section">
              <h2>{data.isArabic ? "كيف يمكننا مساعدتك ؟" : "How can we help you?"}</h2>
              <p>
                {data.isArabic
                  ? "يمكنك البحث عن ما تريد وإيجاده بكل سهولة"
                  : "You can search for what you need and find it easily"}
              </p>
              <div className="teacher-help-styling-search-box">
                <Search className="teacher-help-styling-search-box-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={data.isArabic ? "بحث" : "Search"}
                  className="teacher-help-styling-search-box-input"
                />
              </div>
            </div>

            <div className="teacher-help-styling-content-container">
              {/* FAQ Section */}
              <div className="teacher-help-styling-faq-section">
                {faqData.map((faq) => (
                  <div key={faq.id} className="teacher-help-styling-faq-item">
                    <div
                      className={`teacher-help-styling-faq-question ${expandedFaqs.includes(faq.id) ? "expanded" : ""}`}
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <h3>{data.isArabic ? faq.question.ar : faq.question.en}</h3>
                      {expandedFaqs.includes(faq.id) ? (
                        <ChevronUp className="teacher-help-styling-faq-icon" />
                      ) : (
                        <ChevronDown className="teacher-help-styling-faq-icon" />
                      )}
                    </div>
                    {expandedFaqs.includes(faq.id) && (
                      <div className="teacher-help-styling-faq-answer">
                        <p>{data.isArabic ? faq.answer.ar : faq.answer.en}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="teacher-help-styling-contact-section">
                <h2>{data.isArabic ? "تواصل معنا" : "Contact Us"}</h2>
                {submitSuccess && (
                  <div className="teacher-help-styling-success-message">
                    {data.isArabic ? "تم إرسال رسالتك بنجاح" : "Your message has been sent successfully"}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="teacher-help-styling-contact-form">
                  <div className="teacher-help-styling-form-group">
                    <label>{data.isArabic ? "الاسم" : "Name"}</label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      className="teacher-help-styling-form-control"
                      placeholder={data.isArabic ? "أحمد حسن" : "Ahmed Hassan"}
                      required
                    />
                  </div>
                  <div className="teacher-help-styling-form-group">
                    <label>{data.isArabic ? "رقم الهاتف" : "Phone Number"}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={contactForm.phone}
                      onChange={handleInputChange}
                      className="teacher-help-styling-form-control"
                      placeholder="01234567890"
                      required
                    />
                  </div>
                  <div className="teacher-help-styling-form-group">
                    <label>{data.isArabic ? "الرسالة" : "Message"}</label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      className="teacher-help-styling-form-control"
                      placeholder={data.isArabic ? "اترك رسالتك هنا" : "Leave your message here"}
                      rows={5}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="teacher-help-styling-submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <span>{data.isArabic ? "جاري الإرسال..." : "Sending..."}</span>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>{data.isArabic ? "ارسل الرسالة" : "Send Message"}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-help-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

