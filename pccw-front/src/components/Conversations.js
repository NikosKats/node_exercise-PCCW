import React from 'react';
import './styles/Conversations.css';  

import withProps from '../withProps';
import { fetchConversations } from '../models/actions';
import { selectConversations } from '../models/selectors';


const Conversations = ({fetchConversations,selectConversations,onConversationClick}) => {
   
  const conversations = [
    { id: 1, name: 'Alice', latestMessage: 'Hi there!', avatar: 'path/to/avatar1.jpg' },
    { id: 2, name: 'Bob', latestMessage: 'How are you?', avatar: 'path/to/avatar2.jpg' },
 
  ];

  return (
    <div className="conversations-list">
      {conversations.map(conversation => (
        <div key={conversation.id} className="conversation" onClick={() => onConversationClick(conversation.id)}>
          <img src={conversation.avatar} alt={conversation.name} className="avatar" />
          <div className="conversation-info">
            <h5>{conversation.name}</h5>
            <p>{conversation.latestMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default withProps({fetchConversations,selectConversations})(Conversations);
