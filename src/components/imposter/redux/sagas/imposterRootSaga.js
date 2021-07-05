import { takeEvery, takeLatest } from 'redux-saga/effects';
import { gameTick, submitHostGame } from '../imposterSlice';
import { gameTickSaga } from './gameTickSaga';
import { submitHostSaga } from './submitHostSaga';

export function* watcherSaga() {
	yield takeEvery(gameTick.type, gameTickSaga);
  yield takeLatest(submitHostGame.type, submitHostSaga);
}