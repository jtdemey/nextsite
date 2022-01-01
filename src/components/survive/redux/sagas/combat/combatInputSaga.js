import { all, put } from 'redux-saga/effects';
import { combatParse } from '../../../parser/CombatParser';

export function* combatInputSaga(action) {
  try {
    const actions = combatParse(action.payload);
    yield all(actions.map(act => put(act)));
  } catch(err) {
    console.error(err);
  }
}