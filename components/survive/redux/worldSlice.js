import { createSlice } from '@reduxjs/toolkit';
import world, { rollLoot } from '../world/World';
import { CONTAINER_STATES } from './gameConstants';

export const worldSlice = createSlice({
  name: 'world',
  initialState: world,
  reducers: {
    openContainer: (state, action) => {
      const locale = state[action.payload.localeName];
      const container = locale.containers
        .filter(container => container.containerId === action.payload.container.containerId)[0];
      if(container.containerState === CONTAINER_STATES.UNKNOWN) {
        if(container.lock) {
          container.containerState = CONTAINER_STATES.LOCKED;
          return;
        }
        if(container.loot) {
          container.items = container.items.concat(rollLoot(container.loot));
        }
        container.containerState = CONTAINER_STATES.OPEN;
        return;
      }
      if(container.containerState === CONTAINER_STATES.LOCKED) {
        return;
      }
    }
  },
  extraReducers: {
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

export const { openContainer } = worldSlice.actions;

export default worldSlice.reducer;