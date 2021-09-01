import { put, select } from 'redux-saga/effects';
import { getFahrenheitFromTemperature } from '../../SurviveUtils';
import { getAffectedBodyTemperature, fluxTemperature } from '../../world/World';
import {
	setEnvironmentTemperature,
	setTemperatureFlux
} from '../gameSlice';
import { affectPlayerTemperature } from '../playerSlice';

export function* gameTickSaga(action) {
  try {
		const gameState = parseInt(yield select(state => state.game.gameState));
		if(!(gameState > 0 && gameState < 3)) return;
		const tick = parseInt(yield select(state => state.game.tick));
		//Temperature
		if(tick % 16 === 0) {
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
		}
  } catch(err) {
    console.error(err);
  }
}