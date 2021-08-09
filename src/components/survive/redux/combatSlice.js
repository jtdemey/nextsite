import { createSlice } from '@reduxjs/toolkit';

export const combatSlice = createSlice({
  name: 'combat',
  initialState: {
    inCombat: false,
    lastCombat: 0,
    currentEnemy: undefined
  },
  reducers: {

  },
  extraReducers: {
    'game/saveGame': state => {
      const clone = {};
      Object.keys(state).forEach(k => clone[k] = state[k]);
      window.localStorage['JTD_SURVIVE_CS_SAVE'] = clone;
    }
  }
});

export const {} = combatSlice.actions;

export default combatSlice.reducer;
