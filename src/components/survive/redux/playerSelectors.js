import { createSelector } from 'reselect';

const getStats = state => JSON.stringify({
  health: state.player.health,
  sanity: state.player.sanity,
  energy: state.player.energy
});

export const getPlayerStats = createSelector([getStats], stats => JSON.parse(stats));
