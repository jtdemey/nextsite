import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import gameReducer from './gameSlice';
import playerReducer from './playerSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  game: gameReducer,
  player: playerReducer
});

export default configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware),
  reducer: reducer
});