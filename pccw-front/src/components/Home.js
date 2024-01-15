import React from 'react';
import './styles/Home.css';  
 
import MainChat from './MainChat';  

import Conversations from './Conversations';  

function Home() {

 const handleConversationClick = (conversationId) => {
  console.log("Conversation clicked:", conversationId);

  // Construct the URL
  const url = `http://localhost:3000/?currentUserId=1&userID1=1&userID2=${conversationId}`;
  
  // Redirect to the URL
  window.location.href = url;
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
