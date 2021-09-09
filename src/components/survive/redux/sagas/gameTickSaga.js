import { put, select, spawn } from 'redux-saga/effects';
import { getFahrenheitFromTemperature } from '../../SurviveUtils';
import { getAffectedBodyTemperature, fluxTemperature } from '../../world/World';
import { GAME_STATES } from '../gameConstants';
import {
	setEnvironmentTemperature,
	setTemperatureFlux
} from '../gameSlice';
import { affectPlayerTemperature, handleDeath, hurt } from '../playerSlice';

export function* gameTickSaga() {
  try {
		const gameState = parseInt(yield select(state => state.game.gameState));
		if(!(gameState > 0 && gameState < 3)) return;
		const tick = parseInt(yield select(state => state.game.tick));
		yield spawn(playerTick);
		if(tick % 16 === 0) {
			yield spawn(temperatureTick);
		}
  } catch(err) {
    console.error(err);
  }
}

function* playerTick() {
	try {
		const playerData = yield select(state => ({
			gameState: state.game.gameState,
			hp: state.player.health,
			temperature: state.player.temperature
		}));
		if(playerData.hp < 1) {
			yield put(handleDeath());
		}
		if(playerData.temperature < 1 && playerData.gameState !== GAME_STATES.COMBAT) {
			yield put(hurt({ damage: 1 }));
		}
  } catch(err) {
    console.error(err);
  }
}

function* temperatureTick() {
	try {
		const temperatureData = yield select(state => ({
			temperatureFlux: state.game.temperatureFlux,
			environmentTemperature: state.game.environmentTemperature - state.game.temperatureFlux,
			localeTemperature: getFahrenheitFromTemperature(state.world[state.player.locale].temperature),
			playerTemperature: state.player.temperature
		}));
		const flux = fluxTemperature(temperatureData.temperatureFlux);
		if(flux !== temperatureData.temperatureFlux) {
			yield put(setTemperatureFlux({
				temperatureFlux: flux
			}));
		}
		const temperature = 
			(temperatureData.localeTemperature + temperatureData.environmentTemperature)
				/ 2 + flux;
		yield put(setEnvironmentTemperature({
			environmentTemperature: temperature
		}));
		const bodyTempChange = getAffectedBodyTemperature(temperatureData.environmentTemperature);
		yield put(affectPlayerTemperature({
			temperature: bodyTempChange
		}));
  } catch(err) {
    console.error(err);
  }
}