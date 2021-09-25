import { delay, put, select } from 'redux-saga/effects';
import { setCurrentEnemy, setEnemyCooldown } from '../../combatSlice';
import { GAME_STATES } from '../../gameConstants';
import { setGameState } from '../../gameSlice';

export function* startCombatSaga() {
  try {
		const enemies = yield select(state => state.world[state.player.locale].enemies);
		if(enemies.length < 1) {
			return;
		}
		yield put(setCurrentEnemy({ entityId: enemies[0].entityId }));
		yield put(setEnemyCooldown({ enemyCooldown: 4 }));
		yield put(setGameState(GAME_STATES.COMBAT));
		yield delay(2000);
		yield put(setEnemyCooldown({ enemyCooldown: 0 }));
  } catch(err) {
    console.error(err);
  }
}