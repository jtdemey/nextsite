import { combineReducers, configureStore } from '@reduxjs/toolkit';
import gameReducer from './gameSlice';

const reducer = combineReducers({
  game: gameReducer
});

export default configureStore({
  reducer: reducer
});