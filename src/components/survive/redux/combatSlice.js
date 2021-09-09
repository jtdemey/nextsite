import { createSlice } from '@reduxjs/toolkit';

export const combatSlice = createSlice({
  name: 'combat',
  initialState: {
		combatText: [],
    currentEnemy: undefined
  },
  reducers: {
		handleStartCombat: () => {},
		setCurrentEnemy: (state, action) => {
			state.currentEnemy = action.payload.entityId;
		},
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
	handleStartCombat,
	setCurrentEnemy
} = combatSlice.actions;

export default combatSlice.reducer;