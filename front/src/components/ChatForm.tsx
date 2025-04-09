import React, { useRef } from 'react';

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = inputRef.current?.value.trim() || '';
    if (!userMessage) return;

    setChatHistory((history) => [...history, { role: 'user', text: userMessage }]);
    if(inputRef.current) {
        inputRef.current.value = '';
    }

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from server');
      }

      const data = await response.json();
      const botMessage = data.response;

      setChatHistory((history) => [...history, { role: 'model', text: botMessage }]);
    } catch (error) {
      console.error('Error fetching bot response:', error.message);
      setChatHistory((history) => [...history, { role: 'model', text: 'Error: Unable to fetch response.' }]);
    }
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input ref={inputRef} type="text" placeholder="Ecrire un message..." className="message-input" required />
      <button className="send-button">Envoyer</button>
    </form>
  );
};

export default ChatForm;