import { put, select, spawn } from 'redux-saga/effects';
import { getFahrenheitFromTemperature } from '../../SurviveUtils';
import { getAffectedBodyTemperature, fluxTemperature } from '../../world/World';
import { GAME_STATES } from '../gameConstants';
import { setEnvironmentTemperature, setTemperatureFlux } from '../gameSlice';
import { affectPlayerTemperature, handleDeath, hurt } from '../playerSlice';
import { enemyAttackSaga } from './combat/enemyAttackSaga';

export function* gameTickSaga() {
  try {
    const gameState = parseInt(yield select(state => state.game.gameState));
    if (gameState !== GAME_STATES.EXPLORE && gameState !== GAME_STATES.COMBAT) {
      return;
    }
    const tick = parseInt(yield select(state => state.game.tick));
    yield spawn(playerTick);
    if (gameState !== GAME_STATES.COMBAT && tick % 16 === 0) {
      yield spawn(temperatureTick);
    }
    if (gameState === GAME_STATES.COMBAT) {
      yield spawn(combatTick);
    }
  } catch (err) {
    console.error(err);
  }
}

function* combatTick() {
  try {
    const combatData = yield select(state => ({
      enemyCooldown: state.combat.enemyCooldown
    }));
    if (combatData.enemyCooldown <= 0) {
			yield spawn(enemyAttackSaga);
    }
  } catch (err) {
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
    if (playerData.hp < 1) {
      yield put(handleDeath());
    }
    if (
      playerData.temperature < 1 &&
      playerData.gameState !== GAME_STATES.COMBAT
    ) {
      yield put(hurt({ damage: 1 }));
    }
  } catch (err) {
    console.error(err);
  }
}

function* temperatureTick() {
  try {
    const temperatureData = yield select(state => ({
      temperatureFlux: state.game.temperatureFlux,
      environmentTemperature:
        state.game.environmentTemperature - state.game.temperatureFlux,
      localeTemperature: getFahrenheitFromTemperature(
        state.world[state.player.locale].temperature
      ),
      playerTemperature: state.player.temperature
    }));
    const flux = fluxTemperature(temperatureData.temperatureFlux);
    if (flux !== temperatureData.temperatureFlux) {
      yield put(
        setTemperatureFlux({
          temperatureFlux: flux
        })
      );
    }
    const temperature =
      (temperatureData.localeTemperature +
        temperatureData.environmentTemperature) /
        2 +
      flux;
    yield put(
      setEnvironmentTemperature({
        environmentTemperature: temperature
      })
    );
    const bodyTempChange = getAffectedBodyTemperature(
      temperatureData.environmentTemperature
    );
    yield put(
      affectPlayerTemperature({
        temperature: bodyTempChange
      })
    );
  } catch (err) {
    console.error(err);
  }
}