import { useState } from 'react'
import './App.css'
import React from 'react'
import ChatboxBubble from './components/ChatboxBubble'
import { LuBotMessageSquare } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import ChatForm from './components/ChatForm';
import ChatMessage from './components/ChatMessage';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  const generateBotResponse = async (history) => {
    history = history.map(({role, text}) => ({ role, parts: [{text}]}));

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: history }),
    }

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Ajouter la réponse de l'IA au chatHistory
      setChatHistory(prevHistory => [
        ...prevHistory,
        { role: "model", text: data.response }
      ]);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={`container ${showChatbot ? 'show-chatbot' : ''}`}>
        <button onClick={() => setShowChatbot(prev => !prev)} id='chatbot-toggle'>
          <ChatboxBubble />
          <IoClose className='close-button'/>
        </button>
        <div className='chatbot-popup'>
          <div className='chat-header'>
            <div className='header-info'>
              <LuBotMessageSquare className='chat-icon-header' />
              <h2 className='logo-text'>Chatbot</h2>
            </div>
            <button onClick={() => setShowChatbot(prev => !prev)}><IoIosArrowDown className='arrow-icon' /></button>
          </div>

          <div className='chat-body'>
            <div className='message bot-message'>
              <LuBotMessageSquare className='chat-icon' />
              <p className="message-text">
                Bonjour, je suis votre assistant virtuel! Comment puis-je vous aider aujourd'hui?
              </p>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}
        </div>
        <div className="chat-footer">
          <ChatForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse} />  
        </div>
      </div>
    </div>
    </>
  )
}

export default App
