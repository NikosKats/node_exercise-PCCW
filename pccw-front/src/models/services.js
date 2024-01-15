export const fetchMessagesExchange = ({ payload }) => {
console.log("🚀 ~ fetchMessagesExchange ~ payload:", payload)

  const {
    userID1,
    userID2
  } = payload;

  return fetch(`http://localhost:3001/api/v1/messages/exchange?userID1=${userID1}&userID2=${userID2}`, {
    method: 'GET'
  }).then((res) => res.json());
};


export const fetchConversations = ({ payload }) => {
  console.log("🚀 ~ fetchConversations ~ payload:", payload)
  
    const {
      conversationId
    } = payload;
  
    return fetch(`http://localhost:3001/api/v1/users/sorted/${conversationId}`, {
      method: 'GET'
    }).then((res) => res.json());
  };
  