import { combineReducers, configureStore } from '@reduxjs/toolkit';
import imposterReducer from './imposterSlice';

const reducer = combineReducers({
  game: imposterReducer 
});

const imposterStore = configureStore({
  reducer: reducer
});

export default imposterStore;