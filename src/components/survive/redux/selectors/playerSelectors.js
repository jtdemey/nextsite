import { createSelector } from 'reselect';

const getStats = state =>
  JSON.stringify({
    health: state.player.health,
    sanity: state.player.sanity,
    energy: state.player.energy
  });

export const getPlayerStats = createSelector([getStats], stats =>
  JSON.parse(stats)
);

const getCombatStats = state =>
  JSON.stringify({
    health: state.player.health,
		maxHealth: state.player.maxHealth,
    cooldown: state.player.cooldown
  });

export const getPlayerCombatStats = createSelector([getCombatStats], stats =>
  JSON.parse(stats)
);