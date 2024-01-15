import React, { useState, useEffect } from 'react';
import './styles/MainChat.css';

import withProps from '../withProps';
import { fetchMessagesExchange } from '../models/actions';
import { selectMessagesExchange } from '../models/selectors';

const MainChat = ({fetchMessagesExchange, selectMessagesExchange}) => {



  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(() => {
    
    const fetchMessagesExchangeAsync = async () => {
      try {
        await fetchMessagesExchange();
      } catch (e) {
        setError('Error fetching data: ' + e.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchMessagesExchangeAsync();

  }, [fetchMessagesExchange]);

  console.log("🚀 ~ MainChat ~ selectMessagesExchange:", selectMessagesExchange)

  const currentUserId = 1;
   
  const messagesExchange = [
    {
      id: 77,
      content: "Please review the proposal.",
      senderId: 3,
      receiverId: 1,
      seen: true,
      timestampSent: "2023-08-07T13:55:00.000Z",
      createdAt: "2024-01-13T16:01:05.138Z",
      updatedAt: "2024-01-13T16:01:05.138Z"
    },
    {
      id: 74,
      content: "Did you have a good weekend?",
      senderId: 1,
      receiverId: 3,
      seen: true,
      timestampSent: "2023-08-07T10:25:00.000Z",
      createdAt: "2024-01-13T16:01:05.136Z",
      updatedAt: "2024-01-13T16:01:05.136Z"
    },
    {
      id: 36,
      content: "Have a safe trip!",
      senderId: 3,
      receiverId: 1,
      seen: true,
      timestampSent: "2023-08-03T20:55:00.000Z",
      createdAt: "2024-01-13T16:01:05.115Z",
      updatedAt: "2024-01-13T16:01:05.115Z"
    },
    {
      id: 23,
      content: "Did you watch the movie?",
      senderId: 1,
      receiverId: 3,
      seen: true,
      timestampSent: "2023-08-02T19:30:00.000Z",
      createdAt: "2024-01-13T16:01:05.108Z",
      updatedAt: "2024-01-13T16:01:05.108Z"
    },
    {
      id: 1,
      content: "Lorem ipsum 1",
      senderId: 1,
      receiverId: 3,
      seen: true,
      timestampSent: "2023-08-01T10:00:00.000Z",
      createdAt: "2024-01-13T16:01:05.095Z",
      updatedAt: "2024-01-13T16:01:05.095Z"
    }
  ];



  const handleSendMessage = () => {
    console.log("Message to send:", message);
    setMessage('');
  };

  return (
    <div className="main-chat">

      <div className="message-container">
        {messagesExchange.map(message => (
          <div
            key={message.id}
            className={`message bubble ${message.senderId === currentUserId ? 'self' : 'other'}`}>
            {message.content}
          </div>
        ))}

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

export default withProps({fetchMessagesExchange, selectMessagesExchange})(MainChat);
