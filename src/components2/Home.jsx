import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { GraduationCap, Book, Trophy, Check, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Zap, Users, BookOpen, BarChart, StarsIcon, Rocket, Target, Award } from 'lucide-react'
import Navbar from "./NavBar"

export default function LandingPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    return localStorage.getItem("theme") === "dark"
  })

  const [isArabic, setIsArabic] = useState(() => {
    return localStorage.getItem("lang") === "ar"
  })

  const offers = [
    {
      icon: <GraduationCap />,
      title: isArabic ? "الباقة الأساسية" : "Basic Package",
      price: "199",
      period: isArabic ? "شهريا" : "/month",
      features: [
        isArabic ? "جميع المواد الأساسية" : "All core subjects",
        isArabic ? "اختبارات أسبوعية" : "Weekly tests",
        isArabic ? "دعم محدود" : "Limited support",
        isArabic ? "تقارير تقدم شهرية" : "Monthly progress reports",
      ],
    },
    {
      icon: <Book />,
      title: isArabic ? "الباقة المتقدمة" : "Premium Package",
      price: "299",
      period: isArabic ? "شهريا" : "/month",
      features: [
        isArabic ? "جميع مميزات الباقة الأساسية" : "All Basic features",
        isArabic ? "دروس خصوصية" : "Private tutoring",
        isArabic ? "دعم على مدار الساعة" : "24/7 support",
        isArabic ? "مراجعات مخصصة" : "Personalized reviews",
      ],
    },
    {
      icon: <Trophy />,
      title: isArabic ? "الباقة الاحترافية" : "Pro Package",
      price: "499",
      period: isArabic ? "شهريا" : "/month",
      features: [
        isArabic ? "جميع مميزات الباقة المتقدمة" : "All Premium features",
        isArabic ? "جلسات مع خبراء" : "Expert sessions",
        isArabic ? "مواد إضافية" : "Additional materials",
        isArabic ? "تحضير للامتحانات" : "Exam preparation",
      ],
    },
  ]
  const features = [
    {
      icon: <Rocket />,
      title: isArabic ? "تعلم سريع" : "Fast Learning",
      description: isArabic
        ? "منهج مكثف ومصمم بعناية لتسريع عملية التعلم وتحقيق نتائج ملموسة في وقت أقصر"
        : "Intensive and carefully designed curriculum to accelerate the learning process and achieve tangible results in less time",
    },
    {
      icon: <Users />,
      title: isArabic ? "تعلم تفاعلي" : "Interactive Learning",
      description: isArabic
        ? "دروس تفاعلية وتمارين عملية لتعزيز الفهم وتحسين الاحتفاظ بالمعلومات"
        : "Interactive lessons and practical exercises to enhance understanding and improve information retention",
    },
    {
      icon: <BookOpen />,
      title: isArabic ? "محتوى شامل" : "Comprehensive Content",
      description: isArabic
        ? "تغطية شاملة لجميع المواد الدراسية مع التركيز على المفاهيم الأساسية والتطبيقات العملية"
        : "Comprehensive coverage of all subjects with a focus on core concepts and practical applications",
    },
    {
      icon: <BarChart />,
      title: isArabic ? "تتبع التقدم" : "Progress Tracking",
      description: isArabic
        ? "أدوات متقدمة لتتبع تقدم الطالب وتحليل الأداء لتحديد مجالات التحسين"
        : "Advanced tools to track student progress and analyze performance to identify areas for improvement",
    },
    {
      icon: <Target />,
      title: isArabic ? "أهداف مخصصة" : "Personalized Goals",
      description: isArabic
        ? "تحديد أهداف تعليمية مخصصة لكل طالب بناءً على احتياجاته وقدراته الفردية"
        : "Set personalized learning goals for each student based on their individual needs and abilities",
    },
    {
      icon: <Award />,
      title: isArabic ? "شهادات معتمدة" : "Certified Achievements",
      description: isArabic
        ? "الحصول على شهادات معتمدة عند إكمال الدورات والبرامج التعليمية"
        : "Earn certified credentials upon completion of courses and educational programs",
    },
  ]

  const featureRefs = useRef([])

  useEffect(() => {
    const observers = []

    featureRefs.current.forEach((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            ref.classList.add("animate")
            observer.unobserve(ref)
          }
        },
        { threshold: 0.5 },
      )

      if (ref) {
        observer.observe(ref)
        observers.push(observer)
      }
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <Navbar
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        isArabic={isArabic}
        setIsArabic={setIsArabic}
        toggleSidebar={() => {}}
        isSidebarOpen={false}
      />

      <div className="landing-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>

          <div className="hero-content">
            <div className="hero-text">
              <h1>
                {isArabic ? "تعلم بطريقة أفضل مع منصتنا التعليمية" : "Learn Better with Our Educational Platform"}
              </h1>
              <p>
                {isArabic
                  ? "انضم إلى آلاف الطلاب الذين يحققون أحلامهم من خلال منصتنا التعليمية المتطورة"
                  : "Join thousands of students achieving their dreams through our advanced learning platform"}
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="auth-button">
                  {isArabic ? "ابدأ الآن" : "Get Started"}
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="placeholder.jpg"
                alt="Education Platform"
                crossOrigin="anonymous"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>{isArabic ? "مميزات منصتنا" : "Our Platform Features"}</h2>
            <p>
              {isArabic
                ? "اكتشف الميزات الفريدة التي تجعل منصتنا الخيار الأمثل لتعليمك"
                : "Discover the unique features that make our platform the best choice for your education"}
            </p>
          </div>
          <div className="features-slider">
            <div className="features-track">
              <div className="feature-card">
                <Zap className="feature-icon" />
                <h3>{isArabic ? "تعلم سريع" : "Fast Learning"}</h3>
                <p>{isArabic ? "منهج مكثف لتسريع عملية التعلم" : "Intensive curriculum to accelerate learning"}</p>
              </div>
              <div className="feature-card">
                <Users className="feature-icon" />
                <h3>{isArabic ? "تعلم تفاعلي" : "Interactive Learning"}</h3>
                <p>{isArabic ? "دروس تفاعلية لتحسين الفهم" : "Interactive lessons to enhance understanding"}</p>
              </div>
              <div className="feature-card">
                <BookOpen className="feature-icon" />
                <h3>{isArabic ? "محتوى شامل" : "Comprehensive Content"}</h3>
                <p>{isArabic ? "تغطية شاملة لجميع المواد الدراسية" : "Thorough coverage of all subjects"}</p>
              </div>
              <div className="feature-card">
                <BarChart className="feature-icon" />
                <h3>{isArabic ? "تتبع التقدم" : "Progress Tracking"}</h3>
                <p>{isArabic ? "أدوات متقدمة لتتبع تقدم الطالب" : "Advanced tools to monitor student progress"}</p>
              </div>
              {/* Duplicate cards for infinite loop effect */}
              <div className="feature-card">
                <Zap className="feature-icon" />
                <h3>{isArabic ? "تعلم سريع" : "Fast Learning"}</h3>
                <p>{isArabic ? "منهج مكثف لتسريع عملية التعلم" : "Intensive curriculum to accelerate learning"}</p>
              </div>
              <div className="feature-card">
                <Users className="feature-icon" />
                <h3>{isArabic ? "تعلم تفاعلي" : "Interactive Learning"}</h3>
                <p>{isArabic ? "دروس تفاعلية لتحسين الفهم" : "Interactive lessons to enhance understanding"}</p>
              </div>
              <div className="feature-card">
                <BookOpen className="feature-icon" />
                <h3>{isArabic ? "محتوى شامل" : "Comprehensive Content"}</h3>
                <p>{isArabic ? "تغطية شاملة لجميع المواد الدراسية" : "Thorough coverage of all subjects"}</p>
              </div>
              <div className="feature-card">
                <BarChart className="feature-icon" />
                <h3>{isArabic ? "تتبع التقدم" : "Progress Tracking"}</h3>
                <p>{isArabic ? "أدوات متقدمة لتتبع تقدم الطالب" : "Advanced tools to monitor student progress"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>{isArabic ? "مميزات منصتنا" : "Our Platform Features"}</h2>
            <p>
              {isArabic
                ? "اكتشف الميزات الفريدة التي تجعل منصتنا الخيار الأمثل لتعليمك"
                : "Discover the unique features that make our platform the best choice for your education"}
            </p>
          </div>
          <div className="features-container">
            {features.map((feature, index) => (
              <div
                key={index}
                ref={(el) => (featureRefs.current[index] = el)}
                className={`feature-item ${index % 2 === 0 ? "feature-left" : "feature-right"}`}
              >
                <div className="feature-icon-wrapper">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-brand">
              {/* <img src="placeholder.jpg" alt="Logo" /> */}
              <StarsIcon color="white" />
              <p>
                {isArabic
                  ? "منصة تعليمية رائدة تهدف إلى تقديم أفضل تجربة تعلم لطلابنا"
                  : "A leading educational platform aimed at providing the best learning experience for our students"}
              </p>
              <div className="footer-social">
                <a href="#" className="social-link">
                  <Facebook />
                </a>
                <a href="#" className="social-link">
                  <Twitter />
                </a>
                <a href="#" className="social-link">
                  <Instagram />
                </a>
                <a href="#" className="social-link">
                  <Youtube />
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h3>{isArabic ? "روابط سريعة" : "Quick Links"}</h3>
              <ul>
                <li>
                  <Link to="/#">{isArabic ? "عن المنصة" : "About Us"}</Link>
                </li>
                <li>
                  <Link to="/#">{isArabic ? "الدورات" : "Courses"}</Link>
                </li>
                <li>
                  <Link to="/#">{isArabic ? "المعلمون" : "Teachers"}</Link>
                </li>
                <li>
                  <Link to="/#">{isArabic ? "اتصل بنا" : "Contact Us"}</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h3>{isArabic ? "الدعم" : "Support"}</h3>
              <ul>
                <li>
                  <Link to="/#">{isArabic ? "الأسئلة الشائعة" : "FAQ"}</Link>
                </li>
                <li>
                  <Link to="/#">{isArabic ? "سياسة الخصوصية" : "Privacy Policy"}</Link>
                </li>
                <li>
                  <Link to="/#">{isArabic ? "الشروط والأحكام" : "Terms & Conditions"}</Link>
                </li>
                <li>
                  <Link to="/#">{isArabic ? "مركز المساعدة" : "Help Center"}</Link>
                </li>
              </ul>
            </div>

            <div className="footer-links">
              <h3>{isArabic ? "تواصل معنا" : "Contact"}</h3>
              <ul>
                <li>
                  <Phone size={16} />
                  <span>+20 123 456 789</span>
                </li>
                <li>
                  <Mail size={16} />
                  <span>support@example.com</span>
                </li>
                <li>
                  <MapPin size={16} />
                  <span>{isArabic ? "القاهرة، مصر" : "Cairo, Egypt"}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} {isArabic ? "جميع الحقوق محفوظة" : "All rights reserved"}
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
