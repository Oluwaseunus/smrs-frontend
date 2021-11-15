import logger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const enhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), enhancers())
);

export type RootState = ReturnType<typeof store.getState>;
