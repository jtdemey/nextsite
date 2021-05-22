import { createSlice } from '@reduxjs/toolkit';
import world from '../world/World';

export const worldSlice = createSlice({
  name: 'world',
  initialState: world,
  reducers: {

  },
  extraReducers: {
    'game/initGame': (state, action) => {

    },
    'game/saveGame': state => {
      const clone = {};
      Object.keys(state).forEach(k => clone[k] = state[k]);
      window.localStorage['JTD_SURVIVE_WS_SAVE'] = clone;
    },
    'player/takeItem': (state, action) => {
      const locale = state[action.payload.localeName];
      locale.items = locale.items.filter(item => item.itemId !== action.payload.item.itemId);
    }
  }
});

export const { } = worldSlice.actions;

export default worldSlice.reducer;