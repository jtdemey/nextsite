import { delay, put } from 'redux-saga/effects';
import { appendLine, resumeGame } from '../gameSlice';

export function* endCinematicSaga(action) {
  try {
    yield put(resumeGame());
    yield delay(100);
    yield put(appendLine({ text: `You sit in the driver's seat.` }));
  } catch(err) {
    console.error(err);
  }
}