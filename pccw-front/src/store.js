import { createStore, applyMiddleware } from 'redux'; // inject rxjs middleware to store in order to watch the action stream
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();
const enhancers = composeWithDevTools(applyMiddleware(epicMiddleware));

export const configureStore = (rootReducer, rootEpic) => {
  const store = createStore(rootReducer, {}, enhancers);
  epicMiddleware.run(rootEpic);

  return store;
};
