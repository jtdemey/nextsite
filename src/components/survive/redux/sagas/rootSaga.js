import { takeEvery, takeLatest } from 'redux-saga/effects';
import { handleStartCombat } from '../combatSlice';
import {
  gameTick,
  handleEndCinematic,
  submitExploreCommand
} from '../gameSlice';
import {
  handleConsumeItem,
  handleDeath,
  handleExamineEntity,
  handleExamineLocale,
  handleExitLocale
} from '../playerSlice';
import { startCombatSaga } from './combat/startCombatSaga';
import { consumeItemSaga } from './consumeItemSaga';
import { deathSaga } from './deathSaga';
import { endCinematicSaga } from './endCinematicSaga';
import { examineEntitySaga } from './examineEntitySaga';
import { examineLocaleSaga } from './examineLocaleSaga';
import { gameTickSaga } from './gameTickSaga';
import { inputSubmitSaga } from './inputSaga';
import { moveSaga } from './moveSaga';

export function* watcherSaga() {
  yield takeEvery(gameTick.type, gameTickSaga);
  yield takeEvery(handleExamineEntity.type, examineEntitySaga);
  yield takeEvery(handleExamineLocale.type, examineLocaleSaga);
  yield takeEvery(submitExploreCommand.type, inputSubmitSaga);
  yield takeLatest(handleConsumeItem.type, consumeItemSaga);
  yield takeLatest(handleDeath.type, deathSaga);
  yield takeLatest(handleExitLocale.type, moveSaga);
  yield takeLatest(handleEndCinematic.type, endCinematicSaga);
  yield takeLatest(handleStartCombat.type, startCombatSaga);
}