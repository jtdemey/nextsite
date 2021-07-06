import { delay, put, select } from 'redux-saga/effects';
import { IMPOSTER_VIEWS } from '../imposterConstants';
import { changeGameView, clearTempPhaseData, emitSocketMsg, syncGameState, updatePlayers } from '../imposterSlice';

const detectPlayersDelta = (ogPlayers, newPlayers) => {
  if(ogPlayers.length !== newPlayers.length) {
    return true;
  }
  let diff = false;
  ogPlayers.forEach((p, i) => {
    const n = newPlayers[i];
    for(let [key, val] of Object.entries(p)) {
      if(key === 'socket') continue;
      if(n[key] !== val) {
        diff = true;
      }
    }
  });
  return diff;
};

export function* gameTickSaga(action) {
  try {
		const gs = action.payload;
		const deltas = yield select(state => ({
			phase: state.game.phase !== gs.phase,
			players: detectPlayersDelta(state.game.players, gs.players),
			scenario: state.game.scenario !== gs.scenario
		}));
		yield put(syncGameState(gs));
		if(deltas.phase) {
			yield put(clearTempPhaseData());
			yield put(changeGameView(gs.phase));
		}
		if(deltas.players) {
			yield put(updatePlayers(gs.players));
		}
		if(deltas.scenario) {
			yield put(assignScenario({
				condition: gs.condition,
				imposterId: gs.imposterId,
				roles: gs.roles,
				scenario: gs.scenario,
				scenarioList: gs.scenarioList
			}));
		}
  } catch(err) {
    console.error(err);
  }
}