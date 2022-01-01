import { createSlice } from '@reduxjs/toolkit';
import { CONSOLE_COLORS } from './gameConstants';
import { createConsoleLine } from '../SurviveUtils';

export const combatSlice = createSlice({
  name: 'combat',
  initialState: {
    combatLineIndex: 0,
    combatText: [],
    lastCombatInput: null,
    currentEnemy: undefined,
    enemyCooldown: 0,
    playerCooldown: 0
  },
  reducers: {
    handleStartCombat: () => {},
    handleSubmitCombatInput: (state, action) => {
      state.lastCombatInput = action.payload;
    },
    appendCombatLine: (state, action) => {
      state.combatText = state.combatText
        .concat([
          createConsoleLine(
            state.combatLineIndex,
            action.payload.text,
            CONSOLE_COLORS.BLACK
          )
        ])
        .filter(line => line.index < state.combatLineIndex + 10);
      state.combatLineIndex++;
    },
    setCurrentEnemy: (state, action) => {
      state.currentEnemy = action.payload.entityId;
    },
    setEnemyCooldown: (state, action) => {
      state.enemyCooldown = action.payload.enemyCooldown;
    },
    setPlayerCooldown: (state, action) => {
      state.playerCooldown = action.payload.playerCooldown;
    }
  },
  extraReducers: {
    'game/saveGame': state => {
      const clone = {};
      Object.keys(state).forEach(k => (clone[k] = state[k]));
      window.localStorage['JTD_SURVIVE_CS_SAVE'] = clone;
    }
  }
});

export const {
  handleStartCombat,
  handleSubmitCombatInput,
  appendCombatLine,
  setCurrentEnemy,
  setEnemyCooldown,
  setPlayerCooldown
} = combatSlice.actions;

export default combatSlice.reducer;
