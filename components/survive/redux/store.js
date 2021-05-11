import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import gameReducer from './gameSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  game: gameReducer
});

export default configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
  reducer: reducer
});