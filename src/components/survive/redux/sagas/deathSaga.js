import { put } from 'redux-saga/effects';
import { GAME_STATES } from '../gameConstants';
import { setGameState } from '../gameSlice';

export function* deathSaga() {
  try {
		yield put(setGameState(GAME_STATES.DEATH));
  } catch(err) {
    console.error(err);
  }
}