import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import gameReducer from './gameSlice';
import playerReducer from './playerSlice';
import { watcherSaga } from './sagas/rootSaga';
import worldReducer from './worldSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  game: gameReducer,
  player: playerReducer,
  world: worldReducer
});

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  reducer: reducer
});

sagaMiddleware.run(watcherSaga);

export default store;