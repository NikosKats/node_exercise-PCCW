import React from 'react';
import './styles/Home.css';  
 
import MainChat from './MainChat';  

import Conversations from './Conversations';  

function Home() {

 const handleConversationClick = (userID1,userID2) => {
  console.log("🚀 ~ handleConversationClick ~ userID1:", userID1)
  console.log("🚀 ~ handleConversationClick ~ userID2:", userID2) 

  // Construct the URL
  const url = `http://localhost:3000/?currentUserId=${userID1}&userID1=${userID1}&userID2=${userID2}`;
  
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
