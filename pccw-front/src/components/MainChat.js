import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './styles/MainChat.css';

import withProps from '../withProps';
import { fetchMessagesExchange } from '../models/actions';
import { selectMessagesExchange } from '../models/selectors';

const MainChat = ({ fetchMessagesExchange, selectMessagesExchange }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Extracting parameters from the URL
  const currentUserId = queryParams.get('currentUserId') || '1';
  const userID1 = queryParams.get('userID1') || '1';
  const userID2 = queryParams.get('userID2') || '3';

  const payload = {
    userID1,
    userID2
  };

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [messagesExchange, setMessagesExchange] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchMessagesExchangeAsync = async () => {
      try {
        await fetchMessagesExchange(payload);
      } catch (e) {
        setError('Error fetching data: ' + e.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchMessagesExchangeAsync();
  }, [fetchMessagesExchange]);

  useEffect(() => {
    // Set messagesExchange to selectMessagesExchange or default to an empty array
    setMessagesExchange(selectMessagesExchange || []);
  }, [selectMessagesExchange]);


  const handleSendMessage = () => {
    console.log("Message to send:", message);
    setMessage('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="main-chat">

      <div className="message-container">
        {messagesExchange && messagesExchange.map(message => (
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

export default withProps({ fetchMessagesExchange, selectMessagesExchange })(MainChat);
