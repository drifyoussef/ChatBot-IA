import React from 'react'
import { LuBotMessageSquare } from 'react-icons/lu'

const ChatMessage = ({chat}) => {
  return (
    <div className={`message ${chat.role === "model" ? 'bot' : 'user' }-message`}>
      {chat.role === "model" && <LuBotMessageSquare className='chat-icon' />}
      <p className="message-text">
        {chat.text}
      </p>
    </div>
  )
}

export default ChatMessage