const actionCreator = (type) => {
  const creator = (payload) => ({ type, payload }); // action
  creator.type = type; //type

  // effect creator needs action and type
  creator.succeeded = (payload) => ({ type: `success/${type}`, payload }); // type changes to success - succeed action
  creator.succeeded.type = `success/${type}`; //succeed type

  creator.failed = (payload) => ({ type: `failed/${type}`, payload }); // failed action
  creator.failed.type = `failed/${type}`; //failed type

  return creator;
};

// we have to call actions always in order to be created

export const fetchMessagesExchange = actionCreator('FETCH_MESSAGES_EXCHANGE');

export const fetchConversations = actionCreator('FETCH_CONVERSATIONS');


