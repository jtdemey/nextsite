import { delay, put, select } from 'redux-saga/effects';
import { getRandomFrom } from '../../../SurviveUtils';
import CombatMoves from '../../../world/CombatMoves';
import { appendCombatLine, setEnemyCooldown } from '../../combatSlice';
import { getCurrentEnemy } from '../../selectors/combatSelectors';

export function* enemyAttackSaga() {
  try {
    const currentEnemy = yield select(state => getCurrentEnemy(state));
    const enemyMoves = CombatMoves[currentEnemy.name];
    if (!enemyMoves || enemyMoves.length < 1) {
      console.error(`No moves found for ${currentEnemy.name}`);
    }
    const currentMove =
      enemyMoves.length === 1
        ? enemyMoves[0]
        : enemyMoves[Math.floor(Math.random() * enemyMoves.length)];
		let hitLands = true;
    if (currentMove.attack < 1) {
      const hitRoll = Math.random();
      if (hitRoll > currentMove.attack) {
				hitLands = false;
      }
    }
		if(hitLands) {
			yield put(currentMove.action());
			yield put(appendCombatLine({ text: getRandomFrom(currentMove.hitPhrase) }));
		} else {
			yield put(
				appendCombatLine({
					text: getRandomFrom(currentMove.whiffPhrase) || 'Missed.'
				})
			);
		}
    yield put(setEnemyCooldown({ enemyCooldown: currentMove.cooldown }));
    yield delay(currentMove.cooldown * 500);
    yield put(setEnemyCooldown({ enemyCooldown: 0 }));
  } catch (err) {
    console.error(err);
  }
}