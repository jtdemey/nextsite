import { takeEvery, takeLatest } from 'redux-saga/effects';
import { handleEndCinematic, submitExploreCommand } from '../gameSlice';
import { handleExamineEntity, handleExamineLocale, handleExitLocale } from '../playerSlice';
import { endCinematicSaga } from './endCinematicSaga';
import { examineEntitySaga } from './examineEntitySaga';
import { examineLocaleSaga } from './examineLocaleSaga';
import { inputSubmitSaga } from './inputSaga';
import { moveSaga } from './moveSaga';

export function* watcherSaga() {
  yield takeEvery(handleExamineEntity.type, examineEntitySaga);
  yield takeEvery(handleExamineLocale.type, examineLocaleSaga);
  yield takeEvery(submitExploreCommand.type, inputSubmitSaga);
  yield takeLatest(handleExitLocale.type, moveSaga);
  yield takeLatest(handleEndCinematic.type, endCinematicSaga);
}
