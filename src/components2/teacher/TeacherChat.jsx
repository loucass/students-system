import { useState, useEffect, useRef, useContext } from "react"
import { Search, Send, MoreVertical, Globe } from "lucide-react"
import "./TeacherChat.css"
import { MainContextObj } from "../shared/MainContext"

  // Conversations data
  const CONVERSATIONS = [
    {
      id: 1,
      name: "طلاب الصف الأول الثانوي",
      lastMessage: "بدء الحصة يا شباب",
      time: "02:00 مساء",
      isGroup: true,
      unread: 0,
      avatar: null,
    },
    {
      id: 2,
      name: "طلاب 3 ثانوي",
      lastMessage: "بدء الحصة يا شباب",
      time: "02:00 مساء",
      isGroup: true,
      unread: 0,
      avatar: null,
    },
    {
      id: 3,
      name: "يوسف أحمد",
      lastMessage: "شكرا استاذ",
      time: "10:00 مساء",
      isGroup: false,
      unread: 1,
      avatar: null,
    },
    {
      id: 4,
      name: "مريم عبدالله",
      lastMessage: "شكرا استاذ",
      time: "10:00 مساء",
      isGroup: false,
      unread: 1,
      avatar: null,
    },
    {
      id: 5,
      name: "أحمد إبراهيم",
      lastMessage: "شكرا استاذ",
      time: "10:00 مساء",
      isGroup: false,
      unread: 1,
      avatar: null,
    },
  ]

  // Initial messages data
  const INITIAL_MESSAGES = {
    1: [
      {
        id: 1,
        sender: "أسماء إبراهيم",
        content: "ايه الاخبار يا شباب كنت عايز اسأل على الامتحان الشامل متى خلاص ؟",
        time: "1:15 مساء",
        isMe: false,
        avatar: null,
      },
      {
        id: 2,
        sender: "م/أحمد حسن",
        content: "ايه الاخبار يا شباب كنت عايز اسأل على الامتحان الشامل مش خلاص ؟",
        time: "1:35 مساء",
        isMe: true,
        avatar: null,
      },
      {
        id: 3,
        sender: "أحمد محمود",
        content: "ايه الاخبار يا شباب كنت عايز اسأل على الامتحان الشامل مش خلاص ؟",
        time: "2:40 مساء",
        isMe: false,
        avatar: null,
      },
    ],
    2: [
      {
        id: 1,
        sender: "محمد علي",
        content: "متى موعد الامتحان القادم يا استاذ؟",
        time: "3:20 مساء",
        isMe: false,
        avatar: null,
      },
    ],
    3: [
      {
        id: 1,
        sender: "يوسف أحمد",
        content: "شكرا استاذ على المساعدة",
        time: "10:00 مساء",
        isMe: false,
        avatar: null,
      },
    ],
    4: [
      {
        id: 1,
        sender: "مريم عبدالله",
        content: "هل يمكنني تسليم الواجب غدا؟",
        time: "9:45 مساء",
        isMe: false,
        avatar: null,
      },
    ],
    5: [
      {
        id: 1,
        sender: "أحمد إبراهيم",
        content: "استاذ، هل يمكنني الحصول على مراجعة إضافية؟",
        time: "8:30 مساء",
        isMe: false,
        avatar: null,
      },
    ],
  }

export default function TeacherChat () {
  const data = useContext(MainContextObj)
  // State for conversations list
  const [conversations, setConversations] = useState(CONVERSATIONS)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)

  // State for active conversation and messages
  const [activeConversation, setActiveConversation] = useState(1)

  // State for new message
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Ref for message container to auto-scroll
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, activeConversation])

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    // Create new message object
    const newMsg = {
      id: messages[activeConversation].length + 1,
      sender: "م/أحمد حسن",
      content: newMessage,
      time:
        new Date().toLocaleTimeString(data.isArabic ? "ar-EG" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }) + (data.isArabic ? " مساء" : " PM"),
      isMe: true,
      avatar: null,
    }

    // Update messages state
    setMessages((prevMessages) => ({
      ...prevMessages,
      [activeConversation]: [...prevMessages[activeConversation], newMsg],
    }))

    // Update last message in conversations list
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.id === activeConversation ? { ...conv, lastMessage: newMessage, time: newMsg.time } : conv,
      ),
    )

    // Clear input field
    setNewMessage("")

    // Simulate sending to backend
    sendMessageToBackend(activeConversation, newMessage)
  }

  // Simulate sending message to backend
  const sendMessageToBackend = (conversationId, messageContent) => {
    // This would be an API call in a real application
    console.log(`Sending message to conversation ${conversationId}: ${messageContent}`)

    // Simulate API call with fetch
    /*
    fetch('https://example.com/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationId,
        content: messageContent,
        senderId: 'teacher-id',
        timestamp: new Date().toISOString()
      }),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Error:', error));
    */
  }

  // Handle key press in message input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className={`teacher-chat-container ${data.isDarkTheme ? "dark-theme" : "light-theme"} ${data.isArabic ? "rtl" : "ltr"}`}>

      <div className="teacher-layout">

        {/* Main Content */}
        <div className="teacher-main-content">
          <div className="teacher-header">
            <h1>{data.isArabic ? "المحادثات" : "Conversations"}</h1>
          </div>

          <div className="chat-container">
            <div className={`conversations-sidebar ${data.isDarkTheme ? "dark" : "light"}`}>
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder={data.isArabic ? "البحث في الرسائل" : "Search in messages"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="conversations-list">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`conversation-item ${activeConversation === conversation.id ? "active" : ""}`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="conversation-avatar">
                      {conversation.isGroup ? (
                        <div className="group-avatar">
                          <Globe size={24} />
                        </div>
                      ) : (
                        <div className="user-avatar"></div>
                      )}
                    </div>
                    <div className="conversation-details">
                      <div className="conversation-header">
                        <span className="conversation-name">{conversation.name}</span>
                        <span className="conversation-time">{conversation.time}</span>
                      </div>
                      <div className="conversation-message">{conversation.lastMessage}</div>
                    </div>
                    {conversation.unread > 0 && <div className="unread-badge">{conversation.unread}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className={`chat-main ${data.isDarkTheme ? "dark" : "light"}`}>
              {activeConversation && (
                <>
                  <div className="chat-header">
                    <div className="chat-header-info">
                      <div className="chat-avatar">
                        {conversations.find((c) => c.id === activeConversation)?.isGroup ? (
                          <div className="group-avatar">
                            <Globe size={24} />
                          </div>
                        ) : (
                          <div className="user-avatar"></div>
                        )}
                      </div>
                      <div className="chat-title">{conversations.find((c) => c.id === activeConversation)?.name}</div>
                    </div>
                    <div className="chat-actions">
                      <button className="action-button">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="messages-container">
                    {messages[activeConversation]?.map((message) => (
                      <div key={message.id} className={`message ${message.isMe ? "message-sent" : "message-received"}`}>
                        {!message.isMe && <div className="message-avatar"></div>}
                        <div className="message-content">
                          {!message.isMe && <div className="message-sender">{message.sender}</div>}
                          <div className="message-bubble">
                            <div className="message-text">{message.content}</div>
                            <div className="message-time">{message.time}</div>
                          </div>
                        </div>
                        {message.isMe && <div className="message-avatar teacher-avatar"></div>}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="message-input-container">
                    <input
                      type="text"
                      placeholder={data.isArabic ? "اكتب رسالتك هنا" : "Type your message here"}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="message-input"
                    />
                    <button className="send-button" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                      <Send size={20} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
