import React, { useState } from 'react';
import './styles/MainChat.css';  
const MainChat = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log("Message to send:", message); 
    setMessage('');  
  };

  return (
    <div className="main-chat">
      <div className="message-container">
      
        <div className="message bubble other">Hello!</div>
        <div className="message bubble self">Hi there!</div>
        
      </div>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default MainChat;
