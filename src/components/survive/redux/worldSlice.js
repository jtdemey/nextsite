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
      switch(container.containerState) {
        case CONTAINER_STATES.UNLOCKED:
          container.containerState = CONTAINER_STATES.OPEN;
          return;
        case CONTAINER_STATES.LOCKED:
          return;
        case CONTAINER_STATES.OPEN:
          container.containerState = CONTAINER_STATES.UNLOCKED;
          return;
        case CONTAINER_STATES.UNKNOWN:
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
    },
		setEnterPhrase: (state, action) => {
      state[action.payload.localeName].enterPhrase = action.payload.enterPhrase;
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
      locale.containers.forEach(container => {
        container.items = container.items.filter(item => item.itemId !== action.payload.item.itemId);
      });
    }
  }
});

export const { openContainer, setEnterPhrase } = worldSlice.actions;

export default worldSlice.reducer;