import { ignoreElements, map, filter, tap, mergeMap, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';

import { combineEpics, ofType } from 'redux-observable'; // contains methods for injecting rxjs to redux
import { fetchMessagesExchange } from './actions'; // to call an epic dispatch an action

import { effect } from '../effect';
import * as services from './services';

const fetchMessagesExchangeEpic = (action$) =>
  action$.pipe(
    ofType(fetchMessagesExchange.type),
    effect(fetchMessagesExchange, services.fetchMessagesExchange, {})
  );

// const fetchMessagesExchangeEpic = (action$) =>
//   action$.pipe(
//     // we use action with which we want to call the epic
//     ofType(fetchMessagesExchange.type), // takes a string as a parameter which is an action, instead of using filter
//     mergeMap(() => {
//       return ajax.getJSON(`http://localhost:8000/api/products`);
//     }), // wait to resolve request with mergeMap, on response move to pipe
//     // tap((res) => console.log(res)),
//     map((res) => fetchMessagesExchange.succeeded(res)) // returns action setBoard
//   );

export default combineEpics(fetchMessagesExchangeEpic); // combine multiple epics
