import React from 'react';
import './styles/Conversations.css';  

const Conversations = ({onConversationClick}) => {
   
  const conversations = [
    { id: 1, name: 'Alice', latestMessage: 'Hi there!', avatar: 'path/to/avatar1.jpg' },
    { id: 2, name: 'Bob', latestMessage: 'How are you?', avatar: 'path/to/avatar2.jpg' },
 
  ];

  return (
    <div className="conversations-list">
      {conversations.map(convo => (
        <div key={convo.id} className="conversation" onClick={() => onConversationClick(convo.id)}>
          <img src={convo.avatar} alt={convo.name} className="avatar" />
          <div className="conversation-info">
            <h5>{convo.name}</h5>
            <p>{convo.latestMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Conversations;
