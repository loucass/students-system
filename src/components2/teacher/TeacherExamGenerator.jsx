import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
  Plus,
  Trash2,
  Copy,
  Calendar,
  Clock,
  Save,
  Eye,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
} from "lucide-react"
import "./TeacherExamGenerator.css"
import TeacherSidebar from "./TeacherSidebar"
import { MainContextObj } from "../shared/MainContext"

// Question type options
const QUESTION_TYPES = [
  { id: "multiple_choice", label: "اختيار متعدد", labelEn: "Multiple Choice" },
  { id: "single_choice", label: "اختيار واحد", labelEn: "Single Choice" },
  { id: "text", label: "إجابة نصية", labelEn: "Text Answer" },
]

// Initial empty question template
const getEmptyQuestion = () => ({
  id: Date.now(),
  type: "multiple_choice",
  text: "",
  options: [
    { id: Date.now(), text: "" },
    { id: Date.now() + 1, text: "" },
  ],
  correctAnswers: [],
  points: 1,
})

export default function TeacherExamGenerator() {
  const data = useContext(MainContextObj)
  const navigate = useNavigate()

  // Exam details state
  const [examDetails, setExamDetails] = useState({
    title: "",
    duration: 60,
    totalPoints: 0,
    publishType: "now", // "now" or "scheduled"
    scheduledDate: "",
    scheduledTime: "",
  })

  // Questions state
  const [questions, setQuestions] = useState([getEmptyQuestion()])

  // Current editing question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  // Preview mode
  const [previewMode, setPreviewMode] = useState(false)

  useEffect(() => {
    localStorage.setItem("theme", data.isDarkTheme ? "dark" : "light")
    document.body.className = data.isDarkTheme ? "dark-theme" : "light-theme"
  }, [data.isDarkTheme])

  useEffect(() => {
    localStorage.setItem("lang", data.isArabic ? "ar" : "en")
    document.dir = data.isArabic ? "rtl" : "ltr"
  }, [data.isArabic])

  // Calculate total points whenever questions change
  useEffect(() => {
    const total = questions.reduce((sum, question) => sum + question.points, 0)
    setExamDetails((prev) => ({ ...prev, totalPoints: total }))
  }, [questions])

  // Handle exam details changes
  const handleExamDetailsChange = (e) => {
    const { name, value } = e.target
    setExamDetails((prev) => ({ ...prev, [name]: value }))
  }

  // Add a new question
  const addQuestion = () => {
    const newQuestion = getEmptyQuestion()
    setQuestions((prev) => [...prev, newQuestion])
    setCurrentQuestionIndex(questions.length)
  }

  // Delete a question
  const deleteQuestion = (index) => {
    if (questions.length <= 1) {
      // Don't delete the last question, just reset it
      setQuestions([getEmptyQuestion()])
      setCurrentQuestionIndex(0)
      return
    }

    const newQuestions = questions.filter((_, i) => i !== index)
    setQuestions(newQuestions)

    // Adjust current index if needed
    if (currentQuestionIndex >= newQuestions.length) {
      setCurrentQuestionIndex(newQuestions.length - 1)
    } else if (currentQuestionIndex === index) {
      setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
    }
  }

  // Duplicate a question
  const duplicateQuestion = (index) => {
    const questionToDuplicate = { ...questions[index], id: Date.now() }
    const newQuestions = [...questions]
    newQuestions.splice(index + 1, 0, questionToDuplicate)
    setQuestions(newQuestions)
    setCurrentQuestionIndex(index + 1)
  }

  // Update question text
  const updateQuestionText = (text) => {
    const updatedQuestions = [...questions]
    updatedQuestions[currentQuestionIndex].text = text
    setQuestions(updatedQuestions)
  }

  // Update question type
  const updateQuestionType = (type) => {
    const updatedQuestions = [...questions]
    const currentQuestion = { ...updatedQuestions[currentQuestionIndex] }

    // Reset correct answers when changing type
    currentQuestion.type = type
    currentQuestion.correctAnswers = []

    // If changing to text, remove options
    if (type === "text") {
      currentQuestion.options = []
    }
    // If changing from text to choice, add default options
    else if (updatedQuestions[currentQuestionIndex].type === "text") {
      currentQuestion.options = [
        { id: Date.now(), text: "" },
        { id: Date.now() + 1, text: "" },
      ]
    }

    updatedQuestions[currentQuestionIndex] = currentQuestion
    setQuestions(updatedQuestions)
  }

  // Update question points
  const updateQuestionPoints = (points) => {
    const updatedQuestions = [...questions]
    updatedQuestions[currentQuestionIndex].points = Number(points)
    setQuestions(updatedQuestions)
  }

  // Add an option to multiple/single choice question
  const addOption = () => {
    const updatedQuestions = [...questions]
    updatedQuestions[currentQuestionIndex].options.push({
      id: Date.now(),
      text: "",
    })
    setQuestions(updatedQuestions)
  }

  // Update option text
  const updateOptionText = (optionIndex, text) => {
    const updatedQuestions = [...questions]
    updatedQuestions[currentQuestionIndex].options[optionIndex].text = text
    setQuestions(updatedQuestions)
  }

  // Delete an option
  const deleteOption = (optionIndex) => {
    const updatedQuestions = [...questions]
    const currentOptions = updatedQuestions[currentQuestionIndex].options

    // Don't delete if there are only 2 options
    if (currentOptions.length <= 2) return

    // Remove the option
    updatedQuestions[currentQuestionIndex].options = currentOptions.filter((_, i) => i !== optionIndex)

    // Update correct answers if needed
    const deletedOptionId = currentOptions[optionIndex].id
    updatedQuestions[currentQuestionIndex].correctAnswers = updatedQuestions[
      currentQuestionIndex
    ].correctAnswers.filter((id) => id !== deletedOptionId)

    setQuestions(updatedQuestions)
  }

  // Toggle correct answer for multiple choice
  const toggleCorrectAnswer = (optionId) => {
    const updatedQuestions = [...questions]
    const currentQuestion = updatedQuestions[currentQuestionIndex]

    if (currentQuestion.type === "multiple_choice") {
      // For multiple choice, toggle the option in the array
      if (currentQuestion.correctAnswers.includes(optionId)) {
        currentQuestion.correctAnswers = currentQuestion.correctAnswers.filter((id) => id !== optionId)
      } else {
        currentQuestion.correctAnswers.push(optionId)
      }
    } else if (currentQuestion.type === "single_choice") {
      // For single choice, replace the array with just this option
      currentQuestion.correctAnswers = [optionId]
    }

    setQuestions(updatedQuestions)
  }

  // Navigate to previous/next question
  const navigateQuestion = (direction) => {
    const newIndex = currentQuestionIndex + direction
    if (newIndex >= 0 && newIndex < questions.length) {
      setCurrentQuestionIndex(newIndex)
    }
  }

  // Save the exam
  const saveExam = () => {
    // Validate exam details
    if (!examDetails.title.trim()) {
      alert(data.isArabic ? "يرجى إدخال عنوان الامتحان" : "Please enter an exam title")
      return
    }

    // Validate questions
    const invalidQuestions = questions.filter((q) => !q.text.trim())
    if (invalidQuestions.length > 0) {
      alert(data.isArabic ? "يرجى إدخال نص لجميع الأسئلة" : "Please enter text for all questions")
      return
    }

    // Validate options for multiple/single choice questions
    const invalidOptions = questions.filter(
      (q) =>
        (q.type === "multiple_choice" || q.type === "single_choice") &&
        (q.options.some((opt) => !opt.text.trim()) || q.correctAnswers.length === 0),
    )
    if (invalidOptions.length > 0) {
      alert(
        data.isArabic
          ? "يرجى إدخال نص لجميع الخيارات وتحديد الإجابة الصحيحة لجميع الأسئلة"
          : "Please enter text for all options and select correct answers for all questions",
      )
      return
    }

    // Validate scheduled date and time if publishing is scheduled
    if (examDetails.publishType === "scheduled" && (!examDetails.scheduledDate || !examDetails.scheduledTime)) {
      alert(data.isArabic ? "يرجى تحديد تاريخ ووقت النشر" : "Please select a publish date and time")
      return
    }

    // Prepare exam data for submission
    const examData = {
      id: Date.now(),
      title: examDetails.title,
      duration: Number.parseInt(examDetails.duration),
      totalPoints: examDetails.totalPoints,
      publishType: examDetails.publishType,
      createdAt: new Date().toISOString(),
      status: examDetails.publishType === "now" ? "published" : "scheduled",
      questions: questions.map((q) => ({
        id: q.id,
        type: q.type,
        text: q.text,
        points: q.points,
        // For text questions, we don't need options or correctAnswers
        options:
          q.type === "text"
            ? []
            : q.options.map((opt) => ({
                id: opt.id,
                text: opt.text,
              })),
        correctAnswers: q.type === "text" ? [] : q.correctAnswers,
      })),
    }

    // Add scheduled date and time if applicable
    if (examDetails.publishType === "scheduled") {
      examData.scheduledDate = examDetails.scheduledDate
      examData.scheduledTime = examDetails.scheduledTime
      examData.scheduledDateTime = `${examDetails.scheduledDate}T${examDetails.scheduledTime}`
    }

    // Format JSON with proper indentation for console output
    const formattedJson = JSON.stringify(examData, null, 2)

    // Log the data that would be sent to backend
    console.log("%c Exam Data (would be sent to server)", "color: #7c4dff; font-weight: bold; font-size: 14px")
    console.log(formattedJson)

    // In a real application, this would be an API call
    console.log("%c POST /api/exams", "color: #4caf50; font-weight: bold")

    // Show success message
    alert(data.isArabic ? "تم حفظ الامتحان بنجاح ckeck out the console" : "Exam saved successfully check out the console")

    // Navigate back to exams page
    navigate("/teacher/exams")
  }

  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode)
  }

  // Get current question
  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-exam-generator-styling-dashboard-container">
        <TeacherSidebar teacherName={"احمد حسن"} currentClass={"الصف الاول ثانوي"} currentPage="x" />

        {/* Main Content */}
        <main className="teacher-exam-generator-styling-main">
          <div className="teacher-exam-generator-styling-header">
            <div className="teacher-exam-generator-styling-header-top">
              <h1 className="teacher-exam-generator-styling-title">
                {data.isArabic ? "إنشاء امتحان جديد" : "Create New Exam"}
              </h1>
              <div className="teacher-exam-generator-styling-actions">
                <button className="teacher-exam-generator-styling-preview-btn" onClick={togglePreviewMode}>
                  <Eye size={18} />
                  <span>{data.isArabic ? (previewMode ? "تحرير" : "معاينة") : previewMode ? "Edit" : "Preview"}</span>
                </button>
                <button className="teacher-exam-generator-styling-save-btn" onClick={saveExam}>
                  <Save size={18} />
                  <span>{data.isArabic ? "حفظ" : "Save"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Exam Details Section */}
          <div className="teacher-exam-generator-styling-exam-details">
            <div className="teacher-exam-generator-styling-card">
              <div className="teacher-exam-generator-styling-card-header">
                <h2 className="teacher-exam-generator-styling-card-title">
                  {data.isArabic ? "تفاصيل الامتحان" : "Exam Details"}
                </h2>
              </div>
              <div className="teacher-exam-generator-styling-card-body">
                <div className="teacher-exam-generator-styling-form-group">
                  <label>{data.isArabic ? "عنوان الامتحان" : "Exam Title"}</label>
                  <input
                    type="text"
                    name="title"
                    value={examDetails.title}
                    onChange={handleExamDetailsChange}
                    placeholder={data.isArabic ? "أدخل عنوان الامتحان..." : "Enter exam title..."}
                    className="teacher-exam-generator-styling-form-control"
                    disabled={previewMode}
                  />
                </div>
                <div className="teacher-exam-generator-styling-form-row">
                  <div className="teacher-exam-generator-styling-form-group">
                    <label>{data.isArabic ? "مدة الامتحان (بالدقائق)" : "Duration (minutes)"}</label>
                    <div className="teacher-exam-generator-styling-input-with-icon">
                      <Clock size={18} className="teacher-exam-generator-styling-input-icon" />
                      <input
                        type="number"
                        name="duration"
                        value={examDetails.duration}
                        onChange={handleExamDetailsChange}
                        min="1"
                        className="teacher-exam-generator-styling-form-control"
                        disabled={previewMode}
                      />
                    </div>
                  </div>
                  <div className="teacher-exam-generator-styling-form-group">
                    <label>{data.isArabic ? "مجموع الدرجات" : "Total Points"}</label>
                    <input
                      type="text"
                      value={examDetails.totalPoints}
                      className="teacher-exam-generator-styling-form-control"
                      disabled
                    />
                  </div>
                </div>
                <div className="teacher-exam-generator-styling-form-group">
                  <label>{data.isArabic ? "نشر الامتحان" : "Publish Exam"}</label>
                  <div className="teacher-exam-generator-styling-radio-group">
                    <div className="teacher-exam-generator-styling-radio-option">
                      <input
                        type="radio"
                        id="publish-now"
                        name="publishType"
                        value="now"
                        checked={examDetails.publishType === "now"}
                        onChange={handleExamDetailsChange}
                        disabled={previewMode}
                      />
                      <label htmlFor="publish-now">{data.isArabic ? "نشر الآن" : "Publish Now"}</label>
                    </div>
                    <div className="teacher-exam-generator-styling-radio-option">
                      <input
                        type="radio"
                        id="publish-scheduled"
                        name="publishType"
                        value="scheduled"
                        checked={examDetails.publishType === "scheduled"}
                        onChange={handleExamDetailsChange}
                        disabled={previewMode}
                      />
                      <label htmlFor="publish-scheduled">{data.isArabic ? "جدولة النشر" : "Schedule Publishing"}</label>
                    </div>
                  </div>
                </div>
                {examDetails.publishType === "scheduled" && (
                  <div className="teacher-exam-generator-styling-form-row">
                    <div className="teacher-exam-generator-styling-form-group">
                      <label>{data.isArabic ? "تاريخ النشر" : "Publish Date"}</label>
                      <div className="teacher-exam-generator-styling-input-with-icon">
                        <Calendar size={18} className="teacher-exam-generator-styling-input-icon" />
                        <input
                          type="date"
                          name="scheduledDate"
                          value={examDetails.scheduledDate}
                          onChange={handleExamDetailsChange}
                          className="teacher-exam-generator-styling-form-control"
                          disabled={previewMode}
                        />
                      </div>
                    </div>
                    <div className="teacher-exam-generator-styling-form-group">
                      <label>{data.isArabic ? "وقت النشر" : "Publish Time"}</label>
                      <div className="teacher-exam-generator-styling-input-with-icon">
                        <Clock size={18} className="teacher-exam-generator-styling-input-icon" />
                        <input
                          type="time"
                          name="scheduledTime"
                          value={examDetails.scheduledTime}
                          onChange={handleExamDetailsChange}
                          className="teacher-exam-generator-styling-form-control"
                          disabled={previewMode}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="teacher-exam-generator-styling-questions-section">
            {/* Question Navigation */}
            <div className="teacher-exam-generator-styling-questions-nav">
              <div className="teacher-exam-generator-styling-questions-list">
                {questions.map((question, index) => (
                  <button
                    key={question.id}
                    className={`teacher-exam-generator-styling-question-nav-item ${
                      index === currentQuestionIndex ? "active" : ""
                    }`}
                    onClick={() => setCurrentQuestionIndex(index)}
                    disabled={previewMode}
                  >
                    {index + 1}
                  </button>
                ))}
                {!previewMode && (
                  <button className="teacher-exam-generator-styling-add-question-btn" onClick={addQuestion}>
                    <Plus size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Current Question Editor */}
            <div className="teacher-exam-generator-styling-question-editor">
              <div className="teacher-exam-generator-styling-card">
                <div className="teacher-exam-generator-styling-card-header">
                  <div className="teacher-exam-generator-styling-question-header">
                    <h2 className="teacher-exam-generator-styling-card-title">
                      {data.isArabic ? `السؤال ${currentQuestionIndex + 1}` : `Question ${currentQuestionIndex + 1}`}
                    </h2>
                    {!previewMode && (
                      <div className="teacher-exam-generator-styling-question-actions">
                        <button
                          className="teacher-exam-generator-styling-icon-btn"
                          onClick={() => duplicateQuestion(currentQuestionIndex)}
                          title={data.isArabic ? "نسخ السؤال" : "Duplicate Question"}
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          className="teacher-exam-generator-styling-icon-btn delete"
                          onClick={() => deleteQuestion(currentQuestionIndex)}
                          title={data.isArabic ? "حذف السؤال" : "Delete Question"}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="teacher-exam-generator-styling-card-body">
                  {previewMode ? (
                    // Preview Mode
                    <div className="teacher-exam-generator-styling-question-preview">
                      <div className="teacher-exam-generator-styling-question-text">
                        <h3>{currentQuestion.text || (data.isArabic ? "نص السؤال" : "Question Text")}</h3>
                        <span className="teacher-exam-generator-styling-question-points">
                          {currentQuestion.points} {data.isArabic ? "نقطة" : "point"}
                          {currentQuestion.points !== 1 && "s"}
                        </span>
                      </div>

                      {currentQuestion.type === "text" ? (
                        <div className="teacher-exam-generator-styling-text-answer">
                          <textarea
                            className="teacher-exam-generator-styling-form-control"
                            placeholder={data.isArabic ? "أدخل إجابتك هنا..." : "Enter your answer here..."}
                            rows={3}
                            disabled
                          ></textarea>
                        </div>
                      ) : (
                        <div className="teacher-exam-generator-styling-options-list preview">
                          {currentQuestion.options.map((option) => (
                            <div key={option.id} className="teacher-exam-generator-styling-option-item preview">
                              <div className="teacher-exam-generator-styling-option-input">
                                {currentQuestion.type === "multiple_choice" ? (
                                  <input
                                    type="checkbox"
                                    disabled
                                    checked={currentQuestion.correctAnswers.includes(option.id)}
                                  />
                                ) : (
                                  <input
                                    type="radio"
                                    disabled
                                    checked={currentQuestion.correctAnswers.includes(option.id)}
                                  />
                                )}
                              </div>
                              <div className="teacher-exam-generator-styling-option-text">
                                {option.text || (data.isArabic ? "نص الخيار" : "Option text")}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Edit Mode
                    <>
                      <div className="teacher-exam-generator-styling-form-row">
                        <div className="teacher-exam-generator-styling-form-group flex-grow">
                          <label>{data.isArabic ? "نص السؤال" : "Question Text"}</label>
                          <textarea
                            value={currentQuestion.text}
                            onChange={(e) => updateQuestionText(e.target.value)}
                            placeholder={data.isArabic ? "أدخل نص السؤال..." : "Enter question text..."}
                            className="teacher-exam-generator-styling-form-control"
                            rows={2}
                          ></textarea>
                        </div>
                        <div className="teacher-exam-generator-styling-form-group points">
                          <label>{data.isArabic ? "النقاط" : "Points"}</label>
                          <input
                            type="number"
                            value={currentQuestion.points}
                            onChange={(e) => updateQuestionPoints(e.target.value)}
                            min="1"
                            className="teacher-exam-generator-styling-form-control"
                          />
                        </div>
                      </div>
                      <div className="teacher-exam-generator-styling-form-group">
                        <label>{data.isArabic ? "نوع السؤال" : "Question Type"}</label>
                        <div className="teacher-exam-generator-styling-question-types">
                          {QUESTION_TYPES.map((type) => (
                            <button
                              key={type.id}
                              className={`teacher-exam-generator-styling-question-type-btn ${
                                currentQuestion.type === type.id ? "active" : ""
                              }`}
                              onClick={() => updateQuestionType(type.id)}
                            >
                              {data.isArabic ? type.label : type.labelEn}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Options for multiple/single choice questions */}
                      {currentQuestion.type !== "text" && (
                        <div className="teacher-exam-generator-styling-options-section">
                          <div className="teacher-exam-generator-styling-options-header">
                            <label>
                              {data.isArabic ? "الخيارات" : "Options"}
                              {currentQuestion.type === "multiple_choice" && (
                                <span className="teacher-exam-generator-styling-hint">
                                  {data.isArabic ? "(يمكن اختيار أكثر من إجابة)" : "(Multiple answers allowed)"}
                                </span>
                              )}
                              {currentQuestion.type === "single_choice" && (
                                <span className="teacher-exam-generator-styling-hint">
                                  {data.isArabic ? "(إجابة واحدة فقط)" : "(Single answer only)"}
                                </span>
                              )}
                            </label>
                            <button className="teacher-exam-generator-styling-add-option-btn" onClick={addOption}>
                              <Plus size={14} />
                              <span>{data.isArabic ? "إضافة خيار" : "Add Option"}</span>
                            </button>
                          </div>
                          <div className="teacher-exam-generator-styling-options-list">
                            {currentQuestion.options.map((option, optionIndex) => (
                              <div key={option.id} className="teacher-exam-generator-styling-option-item">
                                <div className="teacher-exam-generator-styling-option-input">
                                  {currentQuestion.type === "multiple_choice" ? (
                                    <input
                                      type="checkbox"
                                      checked={currentQuestion.correctAnswers.includes(option.id)}
                                      onChange={() => toggleCorrectAnswer(option.id)}
                                    />
                                  ) : (
                                    <input
                                      type="radio"
                                      checked={currentQuestion.correctAnswers.includes(option.id)}
                                      onChange={() => toggleCorrectAnswer(option.id)}
                                    />
                                  )}
                                </div>
                                <div className="teacher-exam-generator-styling-option-content">
                                  <input
                                    type="text"
                                    value={option.text}
                                    onChange={(e) => updateOptionText(optionIndex, e.target.value)}
                                    placeholder={data.isArabic ? "نص الخيار..." : "Option text..."}
                                    className="teacher-exam-generator-styling-form-control"
                                  />
                                </div>
                                <button
                                  className="teacher-exam-generator-styling-delete-option-btn"
                                  onClick={() => deleteOption(optionIndex)}
                                  disabled={currentQuestion.options.length <= 2}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Text answer type */}
                      {currentQuestion.type === "text" && (
                        <div className="teacher-exam-generator-styling-text-answer-preview">
                          <label>{data.isArabic ? "معاينة حقل الإجابة" : "Answer Field Preview"}</label>
                          <textarea
                            className="teacher-exam-generator-styling-form-control"
                            placeholder={data.isArabic ? "هنا سيكتب الطالب إجابته..." : "Student will type answer here..."}
                            rows={3}
                            disabled
                          ></textarea>
                        </div>
                      )}
                    </>
                  )}
                </div>
                <div className="teacher-exam-generator-styling-card-footer">
                  <div className="teacher-exam-generator-styling-navigation-buttons">
                    <button
                      className="teacher-exam-generator-styling-nav-btn"
                      onClick={() => navigateQuestion(-1)}
                      disabled={currentQuestionIndex === 0}
                    >
                      <ArrowLeft size={16} />
                      <span>{data.isArabic ? "السابق" : "Previous"}</span>
                    </button>
                    <span className="teacher-exam-generator-styling-question-counter">
                      {currentQuestionIndex + 1} / {questions.length}
                    </span>
                    <button
                      className="teacher-exam-generator-styling-nav-btn"
                      onClick={() => navigateQuestion(1)}
                      disabled={currentQuestionIndex === questions.length - 1}
                    >
                      <span>{data.isArabic ? "التالي" : "Next"}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="teacher-exam-generator-styling-help-section">
            <div className="teacher-exam-generator-styling-help-card">
              <div className="teacher-exam-generator-styling-help-icon">
                <HelpCircle size={20} />
              </div>
              <div className="teacher-exam-generator-styling-help-content">
                <h3>{data.isArabic ? "تلميحات مفيدة" : "Helpful Tips"}</h3>
                <ul>
                  <li>
                    {data.isArabic
                      ? "يمكنك إضافة أكثر من سؤال بالضغط على زر + في شريط الأسئلة"
                      : "Add more questions by clicking the + button in the question bar"}
                  </li>
                  <li>
                    {data.isArabic
                      ? "استخدم زر المعاينة لرؤية الامتحان كما سيراه الطلاب"
                      : "Use the preview button to see how students will view the exam"}
                  </li>
                  <li>
                    {data.isArabic
                      ? "يمكنك تحديد أكثر من إجابة صحيحة في أسئلة الاختيار المتعدد"
                      : "You can select multiple correct answers for multiple choice questions"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-exam-generator-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}

