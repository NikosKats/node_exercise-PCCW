import React, { useState, useEffect } from 'react';
import './styles/Conversations.css';

import { useLocation } from 'react-router-dom';

import withProps from '../withProps';
import { fetchConversations, fetchMessagesExchange } from '../models/actions';
import { selectConversations, selectMessagesExchange } from '../models/selectors';


const Conversations = ({ fetchConversations, fetchMessagesExchange, selectConversations, selectMessagesExchange, onConversationClick }) => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const currentUserId = parseInt(queryParams.get('currentUserId')) || 1;
  const userID1 = parseInt(queryParams.get('userID1')) || 1;
  const userID2 = parseInt(queryParams.get('userID2')) || 3;

  const conversationsPayload = {
    currentUserId
  }

  const messagesExchangePayload = {
    userID1,
    userID2
  }

  const [users, setUsers] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [messagesExchange, setMessagesExchange] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchConversationsAsync = async () => {
      try {
        await fetchConversations(conversationsPayload);
      } catch (e) {
        setError('Error fetching data: ' + e.toString());
      } finally {
        setLoading(false);
      }
    };

    const fetchMessagesExchangeAsync = async () => {
      try {
        await fetchMessagesExchange(messagesExchangePayload);
      } catch (e) {
        setError('Error fetching data: ' + e.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchConversationsAsync();

    fetchMessagesExchangeAsync();

  }, [fetchConversations, fetchMessagesExchange]);

  useEffect(() => {
    // Set users to selectConversations or default to an empty array
    setUsers(selectConversations || []);
    // Set messagesExchange to selectMessagesExchange or default to an empty array
    setMessagesExchange(selectMessagesExchange || []);
  }, [selectConversations, selectMessagesExchange]);

  console.log("Users = ", users)

  console.log("messagesExchange = ", messagesExchange)

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

export default withProps({ fetchConversations, fetchMessagesExchange, selectConversations, selectMessagesExchange })(Conversations);
