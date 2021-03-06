import { call, delay, put, select } from 'redux-saga/effects';
import { EVENT_TRIGGERS, executeWorldEvents } from '../../world/WorldEvents';
import { handleStartCombat } from '../combatSlice';
import { appendLine } from '../gameSlice';
import { changeLocale } from '../playerSlice';
import { spawnEnemies } from '../worldSlice';

export function* moveSaga(action) {
  try {
    const localeName = yield select(state => state.player.locale);
    const locale = yield select(state => state.world[localeName]);
    const validExits = locale.exits.filter(e => e.direction && e.direction === action.payload.exitDirection);
    if(validExits.length < 1) {
      yield put(appendLine({ text: `You can't go that way.` }));
      return;
    }
    const exit = validExits[0];
    yield put(appendLine({ text: exit.exitPhrase || locale.exitPhrase || `You trudge onwards.` }));
    yield delay(exit.duration);
    yield put(changeLocale(exit.destination));
    const destination = yield select(state => state.world[exit.destination]);
    yield put(appendLine({ text: destination.enterPhrase || `You enter the location.` }));
		yield call(executeWorldEvents, destination.name, EVENT_TRIGGERS.ON_ENTER);
		if(destination.spawns && destination.spawns.length > 0) {
			yield put(spawnEnemies({
				localeName: destination.name,
				spawns: destination.spawns
			}));
		}
		const enemies = yield select(state => state.world[exit.destination].enemies);
		if(enemies && enemies.length > 0) {
			yield put(handleStartCombat());
		}
  } catch(err) {
    console.error(err);
  }
}