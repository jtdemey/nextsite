import { delay, put, select } from 'redux-saga/effects';
import { IMPOSTER_VIEWS } from '../imposterConstants';
import { changeGameView, emitSocketMsg } from '../imposterSlice';

export function* submitHostSaga(action) {
  try {
		yield put(changeGameView(IMPOSTER_VIEWS.LOADING));
		yield put(emitSocketMsg({
			command: 'submitHostGame',
			...action
		}));
  } catch(err) {
    console.error(err);
  }
}