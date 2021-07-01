import { takeEvery, takeLatest } from 'redux-saga/effects';
import { submitHostGame } from '../imposterSlice';
import { submitHostSaga } from './submitHostSaga';

export function* watcherSaga() {
  yield takeLatest(submitHostGame.type, submitHostSaga);
}