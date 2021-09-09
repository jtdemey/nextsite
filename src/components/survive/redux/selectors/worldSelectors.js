import { createSelector } from 'reselect';

const getLocaleEnemies = state => JSON.stringify({
	enemies: state.world[state.player.locale].enemies
});

export const getEnemies = createSelector([getLocaleEnemies], enemies => JSON.parse(enemies));