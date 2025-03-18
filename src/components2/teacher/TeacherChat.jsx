import { useState, useEffect, useRef, useContext } from "react"
import { Link } from "react-router-dom"
import {
  Grid,
  User,
  MessageSquare,
  FileText,
  BookOpen,
  Award,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  MoreVertical,
  Send,
  Globe,
} from "lucide-react"
import "./TeacherChat.css"
import { MainContextObj } from "../shared/MainContext"
import TeacherSidebar from "./TeacherSidebar"

// Mock data for chat
const mockChatData = {
  teacher: {
    id: "T12345",
    name: "م/أحمد حسن",
    role: "مدرس رياضيات",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  notifications: 1,
  currentClass: {
    name: "الصف الأول الثانوي",
  },
  currentChat: {
    id: 1,
    name: "مجتمع طلاب الصف الاول الثانوي",
    type: "group",
    avatar: "/placeholder.svg?height=40&width=40",
    messages: [
      {
        id: 1,
        sender: {
          id: "S001",
          name: "اسماء ابراهيم",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "ايه الاخبار يا شباب كنت عايز اسأل على الامتحان الشامل مش خلاص ؟",
        time: "1:15 مساء",
        isTeacher: false,
      },
      {
        id: 2,
        sender: {
          id: "T12345",
          name: "م/أحمد حسن",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "ايه الاخبار يا شباب كنت عايز اسأل على الامتحان الشامل مش خلاص ؟",
        time: "1:35 مساء",
        isTeacher: true,
      },
      {
        id: 3,
        sender: {
          id: "S002",
          name: "أحمد محمود",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "ايه الاخبار يا شباب كنت عايز اسأل على الامتحان الشامل مش خلاص ؟",
        time: "2:40 مساء",
        isTeacher: false,
      },
      {
        id: 4,
        sender: {
          id: "S003",
          name: "علي سامح",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "ايه الاخبار يا شباب كنت عايز اسأل على الامتحان الشامل مش خلاص ؟",
        time: "2:44 مساء",
        isTeacher: false,
      },
      {
        id: 5,
        sender: {
          id: "S004",
          name: "حسين خالد",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "ايه الاخبار يا شباب كنت عايز اسأل على الامتحان الشامل مش خلاص ؟",
        time: "2:45 مساء",
        isTeacher: false,
      },
      {
        id: 6,
        sender: {
          id: "T12345",
          name: "م/أحمد حسن",
          avatar: "/placeholder.svg?height=40&width=40",
        },
        content: "ايه الاخبار يا شباب كنت عايز اسأل على الامتحان الشامل مش خلاص ؟",
        time: "3:15 مساء",
        isTeacher: true,
      },
    ],
  },
  chats: [
    {
      id: 1,
      name: "المساعد الخاص",
      type: "assistant",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "كيف يمكنني مساعدتك؟",
      time: "10:00 مساء",
      unread: 0,
    },
    {
      id: 2,
      name: "طلاب 1 ثانوي",
      type: "group",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "بدء الحصة يا شباب",
      time: "12:00 مساء",
      unread: 0,
    },
    {
      id: 3,
      name: "طلاب 2 ثانوي",
      type: "group",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "بدء الحصة يا شباب",
      time: "02:00 مساء",
      unread: 0,
    },
    {
      id: 4,
      name: "طلاب 3 ثانوي",
      type: "group",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "بدء الحصة يا شباب",
      time: "02:00 مساء",
      unread: 0,
    },
    {
      id: 5,
      name: "يوسف أحمد",
      type: "student",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "شكرا استاذ",
      time: "10:00 مساء",
      unread: 1,
    },
    {
      id: 6,
      name: "يوسف أحمد",
      type: "student",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "شكرا استاذ",
      time: "10:00 مساء",
      unread: 1,
    },
    {
      id: 7,
      name: "يوسف أحمد",
      type: "student",
      avatar: "/placeholder.svg?height=40&width=40",
      lastMessage: "شكرا استاذ",
      time: "10:00 مساء",
      unread: 1,
    },
  ],
}

export default function TeacherChat() {
  const data = useContext(MainContextObj)


  const [chatData, setChatData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [messageInput, setMessageInput] = useState("")
  const [filteredChats, setFilteredChats] = useState([])
  const [activeChat, setActiveChat] = useState(null)

  const messagesEndRef = useRef(null)

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
        setChatData(mockChatData)
        setActiveChat(mockChatData.currentChat)
      } catch (error) {
        console.error("Error fetching chat data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter chats based on search query
  useEffect(() => {
    if (chatData) {
      if (!searchQuery) {
        setFilteredChats(chatData.chats)
      } else {
        const filtered = chatData.chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))
        setFilteredChats(filtered)
      }
    }
  }, [searchQuery, chatData])

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeChat])

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!messageInput.trim()) return

    // In a real app, you would send this to an API
    console.log("Sending message:", messageInput)

    // Simulate adding the message to the current chat
    if (activeChat) {
      const newMessage = {
        id: Date.now(),
        sender: {
          id: chatData.teacher.id,
          name: chatData.teacher.name,
          avatar: chatData.teacher.avatar,
        },
        content: messageInput,
        time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
        isTeacher: true,
      }

      setActiveChat({
        ...activeChat,
        messages: [...activeChat.messages, newMessage],
      })
    }

    setMessageInput("")
  }

  const handleChatSelect = (chat) => {
    // In a real app, you would fetch the chat messages from an API
    setActiveChat({
      ...chat,
      messages: activeChat ? activeChat.messages : [],
    })
  }

  if (loading) {
    return <div className="teacher-chat-styling-loading">{data.isArabic ? "جاري التحميل..." : "loading..."}</div>
  }

  if (!chatData) {
    return <div className="teacher-chat-styling-error">{data.isArabic ? "حدث خطأ في تحميل البيانات" : "error loading the data"}</div>
  }

  return (
    <div className={`dashboard ${data.isDarkTheme ? "dark-theme" : "light-theme"}`}>

      <div className="teacher-chat-styling-dashboard-container">
        {/* Sidebar */}
        <TeacherSidebar currentPage="chat" currentClass={chatData.currentClass.name} teacherName={chatData.teacher.name} />

        {/* Main Content */}
        <main className="teacher-chat-styling-main">
          <div className="teacher-chat-styling-header">
            <h1 className="teacher-chat-styling-title">{data.isArabic ? "المحادثات" : "Conversations"}</h1>
          </div>

          <div className="teacher-chat-styling-chat-container">
            {/* Chat List */}
            <div className="teacher-chat-styling-chat-list">
              <div className="teacher-chat-styling-chat-list-search">
                <Search className="teacher-chat-styling-chat-search-icon" />
                <input
                  type="text"
                  className="teacher-chat-styling-chat-search-input"
                  placeholder={data.isArabic ? "بحث في الرسائل" : "Search in messages"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="teacher-chat-styling-chat-list-items">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`teacher-chat-styling-chat-item ${activeChat && activeChat.id === chat.id ? "active" : ""}`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="teacher-chat-styling-chat-avatar">
                      {chat.type === "group" ? (
                        <div className="teacher-chat-styling-group-avatar">
                          <Globe size={16} />
                        </div>
                      ) : (
                        <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                      )}
                    </div>
                    <div className="teacher-chat-styling-chat-info">
                      <div className="teacher-chat-styling-chat-name-time">
                        <h3 className="teacher-chat-styling-chat-name">{chat.name}</h3>
                        <span className="teacher-chat-styling-chat-time">{chat.time}</span>
                      </div>
                      <div className="teacher-chat-styling-chat-message">
                        <p className="teacher-chat-styling-chat-last-message">{chat.lastMessage}</p>
                        {chat.unread > 0 && <span className="teacher-chat-styling-chat-unread">{chat.unread}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="teacher-chat-styling-chat-messages">
              {activeChat ? (
                <>
                  <div className="teacher-chat-styling-chat-header">
                    <div className="teacher-chat-styling-chat-header-info">
                      {activeChat.type === "group" ? (
                        <div className="teacher-chat-styling-group-avatar">
                          <Globe size={20} />
                        </div>
                      ) : (
                        <img
                          src={activeChat.avatar || "/placeholder.svg"}
                          alt={activeChat.name}
                          className="teacher-chat-styling-chat-header-avatar"
                        />
                      )}
                      <h2 className="teacher-chat-styling-chat-header-name">{activeChat.name}</h2>
                    </div>
                    <button className="teacher-chat-styling-chat-header-more">
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  <div className="teacher-chat-styling-messages-container">
                    {activeChat.messages &&
                      activeChat.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`teacher-chat-styling-message ${message.isTeacher ? "teacher" : "student"}`}
                        >
                          <div className="teacher-chat-styling-message-avatar">
                            <img src={message.sender.avatar || "/placeholder.svg"} alt={message.sender.name} />
                          </div>
                          <div className="teacher-chat-styling-message-content">
                            <div className="teacher-chat-styling-message-sender">
                              <span className="teacher-chat-styling-message-name">{message.sender.name}</span>
                              <span className="teacher-chat-styling-message-time">{message.time}</span>
                            </div>
                            <p className="teacher-chat-styling-message-text">{message.content}</p>
                          </div>
                        </div>
                      ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <form className="teacher-chat-styling-message-form" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      className="teacher-chat-styling-message-input"
                      placeholder={data.isArabic ? "اكتب رسالتك" : "Type your message"}
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button type="submit" className="teacher-chat-styling-send-button">
                      <Send size={20} />
                    </button>
                  </form>
                </>
              ) : (
                <div className="teacher-chat-styling-no-chat-selected">
                  <MessageSquare size={48} />
                  <p>{data.isArabic ? "اختر محادثة للبدء" : "Select a conversation to start"}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="teacher-chat-styling-footer">
        <p>
          {data.isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"} &copy; {new Date().getFullYear()}
        </p>
        <p>Powered by Dream Gate</p>
      </footer>
    </div>
  )
}
