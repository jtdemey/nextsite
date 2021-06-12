import { delay, put, select } from 'redux-saga/effects';
import { appendLine } from '../gameSlice';
import { changeLocale } from '../playerSlice';

export function* moveSaga(action) {
  try {
    const localeName = yield select(state => state.player.locale);
    const locale = yield select(state => state.world[localeName]);
    console.log(action, locale.exits[0].direction);
    const validExits = locale.exits.filter(e => e.direction && e.direction === action.payload.exitDirection);
    if(validExits.length < 1) {
      yield put(appendLine({ text: `You can't go that way.` }));
      return;
    }
    const exit = validExits[0];
    yield put(appendLine({ text: exit.exitPhrase || locale.exitPhrase || `You trudge onwards.` }));
    yield delay(exit.duration);
    yield put(changeLocale(exit.destination));
    const destination = yield select(state => state.world[exit.destination])
    yield put(appendLine({ text: destination.enterPhrase || `You enter the location.` }));
  } catch(err) {
    console.error(err);
  }
}