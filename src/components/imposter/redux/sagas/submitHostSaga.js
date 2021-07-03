import { delay, put, select } from 'redux-saga/effects';
import { IMPOSTER_VIEWS } from '../imposterConstants';
import { changeGameView, emitSocketMsg } from '../imposterSlice';

export function* submitHostSaga(action) {
  try {
		console.log(action)
		yield put(changeGameView(IMPOSTER_VIEWS.LOADING));
		yield put(emitSocketMsg({
			command: 'submitHostGame',
			socketId: action.payload.socketId,
			...action
		}));
  } catch(err) {
    console.error(err);
  }
}