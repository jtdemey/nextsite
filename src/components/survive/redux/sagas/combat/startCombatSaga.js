import { put, select } from 'redux-saga/effects';
import { setCurrentEnemy } from '../../combatSlice';
import { GAME_STATES } from '../../gameConstants';
import { setGameState } from '../../gameSlice';

export function* startCombatSaga() {
  try {
		const enemies = yield select(state => state.world[state.player.locale].enemies);
		if(enemies.length < 1) {
			return;
		}
		yield put(setCurrentEnemy({ entityId: enemies[0].entityId }));
		yield put(setGameState(GAME_STATES.COMBAT));
  } catch(err) {
    console.error(err);
  }
}