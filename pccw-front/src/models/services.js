export const fetchMessagesExchange = ({ payload }) => {

  console.log("🚀 ~ fetchMessages ~ payload:", payload)
  
  return fetch('http://localhost:3001/api/v1/messages/exchange?userID1=1&userID2=3', {
    method: 'GET'
  }).then((res) => res.json());
};
