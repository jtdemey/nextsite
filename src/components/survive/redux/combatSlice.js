import { createSlice } from '@reduxjs/toolkit';
import { CONSOLE_COLORS } from './gameConstants';
import { createConsoleLine } from '../SurviveUtils';

export const combatSlice = createSlice({
  name: 'combat',
  initialState: {
		combatLineIndex: 0,
		combatText: [],
    currentEnemy: undefined,
		enemyCooldown: 0
  },
  reducers: {
		handlePerformCombatMove: () => {},
		handleStartCombat: () => {},
		appendCombatLine: (state, action) => {
      state.combatText = state.combatText.concat([
        createConsoleLine(
          state.combatLineIndex,
          action.payload.text,
          CONSOLE_COLORS.BLACK
        )
      ]);
      state.combatLineIndex++;
		},
		setCurrentEnemy: (state, action) => {
			state.currentEnemy = action.payload.entityId;
		},
		setEnemyCooldown: (state, action) => {
			state.enemyCooldown = action.payload.enemyCooldown;
		}
  },
  extraReducers: {
    'game/saveGame': state => {
      const clone = {};
      Object.keys(state).forEach(k => clone[k] = state[k]);
      window.localStorage['JTD_SURVIVE_CS_SAVE'] = clone;
    }
  }
});

export const {
	appendCombatLine,
	handlePerformCombatMove,
	handleStartCombat,
	setCurrentEnemy,
	setEnemyCooldown
} = combatSlice.actions;

export default combatSlice.reducer;