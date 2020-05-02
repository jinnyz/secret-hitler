import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const promiseableSaga = () => next => action => {
  if (!action.promise) return next(action);

  const promise = new Promise((resolve, reject) => {
    next({
      ...action,
      promise: { resolve, reject }
    });
  });

  return promise;
};

const saga = createSagaMiddleware();

const store = createStore(reducer, composeEnhancers(
  applyMiddleware(
    promiseableSaga,
    saga
  )
));

saga.run(rootSaga);

export default store;
