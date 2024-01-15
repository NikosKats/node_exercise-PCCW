import React from 'react';
import './styles/Home.css';  
 
import MainChat from './MainChat';  

import Conversations from './Conversations';  

function Home() {

  const handleConversationClick = (conversationId) => { 
    console.log("Conversation clicked:", conversationId); 
  };

  return (
    <div className="home-container">
      <div className="chat-area">
        <h2>Main Chat</h2> 
        <MainChat />
      </div>
      <div className="conversations-list">
        <h3>Conversations</h3> 
        <Conversations onConversationClick={handleConversationClick} />
      </div>
    </div>
  );
}

export default Home;
