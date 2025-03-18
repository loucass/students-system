import { useState, useEffect, useContext } from "react"
import {
  Eye,
  EyeOff,
  Upload,
  Save,
} from "lucide-react"
import "./TeacherSettings.css"
import TeacherSidebar from "./TeacherSidebar"
import { MainContextObj } from "../shared/MainContext"

// Mock teacher data
const mockTeacherData = {
  id: "T12345",
  firstName: "أحمد",
  lastName: "حسن",
  email: "ahmed.hassan@example.com",
  phone: "01234567890",
  alternatePhone: "01098765432",
  nationalId: "29912345678901",
  role: "مدرس رياضيات",
  avatar: "/placeholder.svg?height=80&width=80",
  notifications: {
    email: true,
    sms: true,
    app: true,
  },
  classes: ["الصف الأول الثانوي", "الصف الثاني الثانوي", "الصف الثالث الثانوي"],
  currentClass: "الصف الأول الثانوي",
}

export default function TeacherSettings() {
  const data = useContext(MainContextObj)

  const [teacherData, setTeacherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    nationalId: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: false,
    sms: false,
    app: false,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  // Simulate API fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setTeacherData(mockTeacherData)

        // Initialize form data with teacher data
        setFormData({
          firstName: mockTeacherData.firstName,
          lastName: mockTeacherData.lastName,
          email: mockTeacherData.email,
          phone: mockTeacherData.phone,
          alternatePhone: mockTeacherData.alternatePhone || "",
          nationalId: mockTeacherData.nationalId,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })

        // Initialize notification preferences
        setNotificationPreferences(mockTeacherData.notifications)
      } catch (error) {
        console.error("Error fetching teacher data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationPreferences((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.nationalId) {
      alert(data.isArabic ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert(data.isArabic ? "يرجى إدخال بريد إلكتروني صحيح" : "Please enter a valid email address")
      return
    }

    // Validate password if changing
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        alert(data.isArabic ? "يرجى إدخال كلمة المرور الحالية" : "Please enter your current password")
        return
      }

      if (formData.newPassword.length < 8) {
        alert(
          data.isArabic ? "يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل" : "New password must be at least 8 characters",
        )
        return
      }

      if (formData.newPassword !== formData.confirmPassword) {
        alert(
          data.isArabic
            ? "كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقين"
            : "New password and confirm password do not match",
        )
        return
      }
    }

    // Simulate API call
    setIsSaving(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Log the data that would be sent to backend
      console.log("Saving teacher settings:", {
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          alternatePhone: formData.alternatePhone,
          nationalId: formData.nationalId,
        },
        passwordChange: formData.newPassword
          ? {
              currentPassword: "********", // Don't log actual password
              newPassword: "********", // Don't log actual password
            }
          : null,
        notificationPreferences,
      })

      // Show success message
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)

      // Update teacher data in state
      setTeacherData((prev) => ({
        ...prev,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        alternatePhone: formData.alternatePhone,
        nationalId: formData.nationalId,
        notifications: notificationPreferences,
      }))

      // Reset password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error) {
      console.error("Error saving teacher data:", error)
      alert(data.isArabic ? "حدث خطأ أثناء حفظ البيانات" : "Error saving data")
    } finally {
      setIsSaving(false)
    }
  }
  
  if (loading) {
    return <div className="teacher-exam-styling-loading">{data.isArabic ? "جاري التحميل..." : "loading..."}</div>
  }

  if (!teacherData) {
    return <div className="teacher-exam-styling-error">{data.isArabic ? "حدث خطأ في تحميل البيانات" : "error loading the data"}</div>
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-settings-styling-dashboard-container">
        <TeacherSidebar teacherName={mockTeacherData.firstName + " " + mockTeacherData.lastName} currentClass={mockTeacherData.currentClass} currentPage="settings" />

        {/* Main Content */}
        <main className="teacher-settings-styling-main">
          <div className="teacher-settings-styling-header">
            <h1 className="teacher-settings-styling-title">{data.isArabic ? "الإعدادات" : "Settings"}</h1>
          </div>

          {saveSuccess && (
            <div className="teacher-settings-styling-success-message">
              {data.isArabic ? "تم حفظ التغييرات بنجاح" : "Changes saved successfully"}
            </div>
          )}

          <form onSubmit={handleSubmit} className="teacher-settings-styling-form">
            {/* Profile Section */}
            <div className="teacher-settings-styling-card">
              <div className="teacher-settings-styling-card-header">
                <h2 className="teacher-settings-styling-card-title">{data.isArabic ? "الملف الشخصي" : "Profile"}</h2>
              </div>
              <div className="teacher-settings-styling-card-body">
                <div className="teacher-settings-styling-profile-section">
                  <div className="teacher-settings-styling-profile-image-container">
                    <img
                      src={teacherData.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="teacher-settings-styling-profile-image-large"
                    />
                    <div className="teacher-settings-styling-profile-image-overlay">
                      <Upload size={20} />
                      <span>{data.isArabic ? "تغيير الصورة" : "Change Photo"}</span>
                    </div>
                  </div>
                  <div className="teacher-settings-styling-profile-info">
                    <h3>{`${teacherData.firstName} ${teacherData.lastName}`}</h3>
                    <p>{teacherData.role}</p>
                    <p>{teacherData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="teacher-settings-styling-card">
              <div className="teacher-settings-styling-card-header">
                <h2 className="teacher-settings-styling-card-title">
                  {data.isArabic ? "المعلومات الشخصية" : "Personal Information"}
                </h2>
              </div>
              <div className="teacher-settings-styling-card-body">
                <div className="teacher-settings-styling-form-row">
                  <div className="teacher-settings-styling-form-group">
                    <label>{data.isArabic ? "الاسم الأول" : "First Name"}</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="teacher-settings-styling-form-control"
                      required
                    />
                  </div>
                  <div className="teacher-settings-styling-form-group">
                    <label>{data.isArabic ? "الاسم الأخير" : "Last Name"}</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="teacher-settings-styling-form-control"
                      required
                    />
                  </div>
                </div>

                <div className="teacher-settings-styling-form-row">
                  <div className="teacher-settings-styling-form-group">
                    <label>{data.isArabic ? "البريد الإلكتروني" : "Email"}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="teacher-settings-styling-form-control"
                      required
                    />
                  </div>
                  <div className="teacher-settings-styling-form-group">
                    <label>{data.isArabic ? "الرقم القومي" : "National ID"}</label>
                    <input
                      type="text"
                      name="nationalId"
                      value={formData.nationalId}
                      onChange={handleInputChange}
                      className="teacher-settings-styling-form-control"
                      required
                    />
                  </div>
                </div>

                <div className="teacher-settings-styling-form-row">
                  <div className="teacher-settings-styling-form-group">
                    <label>{data.isArabic ? "رقم الهاتف" : "Phone Number"}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="teacher-settings-styling-form-control"
                      required
                    />
                  </div>
                  <div className="teacher-settings-styling-form-group">
                    <label>{data.isArabic ? "رقم هاتف بديل" : "Alternate Phone"}</label>
                    <input
                      type="tel"
                      name="alternatePhone"
                      value={formData.alternatePhone}
                      onChange={handleInputChange}
                      className="teacher-settings-styling-form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Password Section */}
            <div className="teacher-settings-styling-card">
              <div className="teacher-settings-styling-card-header">
                <h2 className="teacher-settings-styling-card-title">
                  {data.isArabic ? "تغيير كلمة المرور" : "Change Password"}
                </h2>
              </div>
              <div className="teacher-settings-styling-card-body">
                <div className="teacher-settings-styling-form-group">
                  <label>{data.isArabic ? "كلمة المرور الحالية" : "Current Password"}</label>
                  <div className="teacher-settings-styling-password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="teacher-settings-styling-form-control"
                    />
                    <button
                      type="button"
                      className="teacher-settings-styling-password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="teacher-settings-styling-form-row">
                  <div className="teacher-settings-styling-form-group">
                    <label>{data.isArabic ? "كلمة المرور الجديدة" : "New Password"}</label>
                    <div className="teacher-settings-styling-password-input">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="teacher-settings-styling-form-control"
                      />
                      <button
                        type="button"
                        className="teacher-settings-styling-password-toggle"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="teacher-settings-styling-form-group">
                    <label>{data.isArabic ? "تأكيد كلمة المرور" : "Confirm Password"}</label>
                    <div className="teacher-settings-styling-password-input">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="teacher-settings-styling-form-control"
                      />
                      <button
                        type="button"
                        className="teacher-settings-styling-password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="teacher-settings-styling-card">
              <div className="teacher-settings-styling-card-header">
                <h2 className="teacher-settings-styling-card-title">
                  {data.isArabic ? "إعدادات الإشعارات" : "Notification Settings"}
                </h2>
              </div>
              <div className="teacher-settings-styling-card-body">
                <div className="teacher-settings-styling-notification-options">
                  <div className="teacher-settings-styling-notification-option">
                    <input
                      type="checkbox"
                      id="email-notifications"
                      name="email"
                      checked={notificationPreferences.email}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="email-notifications">
                      {data.isArabic ? "إشعارات البريد الإلكتروني" : "Email Notifications"}
                    </label>
                  </div>
                  <div className="teacher-settings-styling-notification-option">
                    <input
                      type="checkbox"
                      id="sms-notifications"
                      name="sms"
                      checked={notificationPreferences.sms}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="sms-notifications">
                      {data.isArabic ? "إشعارات الرسائل النصية" : "SMS Notifications"}
                    </label>
                  </div>
                  <div className="teacher-settings-styling-notification-option">
                    <input
                      type="checkbox"
                      id="app-notifications"
                      name="app"
                      checked={notificationPreferences.app}
                      onChange={handleNotificationChange}
                    />
                    <label htmlFor="app-notifications">{data.isArabic ? "إشعارات التطبيق" : "App Notifications"}</label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="teacher-settings-styling-form-actions">
              <button type="submit" className="teacher-settings-styling-save-btn" disabled={isSaving}>
                {isSaving ? (
                  <span>{data.isArabic ? "جاري الحفظ..." : "Saving..."}</span>
                ) : (
                  <>
                    <Save size={18} />
                    <span>{data.isArabic ? "حفظ التغييرات" : "Save Changes"}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-settings-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

