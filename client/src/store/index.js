import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import mySaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the store
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
//then run the saga
sagaMiddleware.run(mySaga);

//render the application
export default store;
