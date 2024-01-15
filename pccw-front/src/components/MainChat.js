import React, { useState, useEffect } from 'react';
import './styles/MainChat.css';

import withProps from '../withProps';
import { fetchMessagesExchange } from '../models/actions';
import { selectMessagesExchange } from '../models/selectors';

const MainChat = ({ fetchMessagesExchange, selectMessagesExchange }) => {
  const currentUserId = 1;
  const userID1 = 1;
  const userID2 = 3;

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
    // This effect will now only run when selectMessagesExchange changes
    setMessagesExchange(selectMessagesExchange);
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

export default withProps({ fetchMessagesExchange, selectMessagesExchange })(MainChat);
