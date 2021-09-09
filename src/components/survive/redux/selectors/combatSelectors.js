import { createSelector } from 'reselect';

const getCurrentEnemyId = state => state.combat.currentEnemy;

const getLocaleEnemies = state => {
	return state.world[state.player.locale].enemies;
};

export const getCurrentEnemy = createSelector(
  [getLocaleEnemies, getCurrentEnemyId],
  (enemies, enemyId) => {
		return enemies.filter(e => e.entityId === enemyId)[0];
	}
);