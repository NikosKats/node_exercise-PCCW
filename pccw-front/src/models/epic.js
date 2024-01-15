import { combineEpics, ofType } from 'redux-observable'; // contains methods for injecting rxjs to redux
import { fetchMessagesExchange, fetchConversations } from './actions'; // to call an epic dispatch an action

import { effect } from '../effect';
import * as services from './services';

const fetchMessagesExchangeEpic = (action$) =>
  action$.pipe(
    ofType(fetchMessagesExchange.type),
    effect(fetchMessagesExchange, services.fetchMessagesExchange, {})
  );
 
  const fetchConversationsEpic = (action$) =>
  action$.pipe(
    ofType(fetchConversations.type),
    effect(fetchConversations, services.fetchConversations, {})
  );
 
export default combineEpics(fetchMessagesExchangeEpic, fetchConversationsEpic); // combine multiple epics
