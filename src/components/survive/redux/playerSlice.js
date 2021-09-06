import { createSlice } from '@reduxjs/toolkit';
import * as Factory from '../world/LocaleFactory';
import { REGIONS } from '../world/LocaleConstants';
import { isStackable } from '../world/Items';
import { between } from '../SurviveUtils';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    health: 100, //100-75: healthy, 74-50: injured, 49-25: wounded, 24-10: impaired, 9-1: disabled, 0: dead
    sanity: 100, //100-75: sane, 74-50: afraid, 49-25: panicked, 24-10: delusional, 9-1: insane, 0: irrational
    temperature: 100, //150-125: heat exhausted, 124-101: overheated, 100-75: normal, 74-50: chilly, 49-25: cold, 24-10: shivering, 9-1: freezing, 0: game over
    energy: 100, //100-75: spry, 74-50: calm, 49-25: tired, 24-10: fatigued, 9-1: exhausted, 0: immobile
    isExiting: false,
		effectFlags: [],
    locale: 'car',
    lastLocale: undefined,
    inCombat: false,
    lastCombat: 0,
    currentEnemy: undefined,
    items: [Factory.createItem('handwarmers', 1)],
    equipped: [],
    region: REGIONS.FOREST
  },
  reducers: {
    handleConsumeItem: () => {},
    handleDeath: () => {},
    handleEquipEntity: () => {},
    handleExamineEntity: () => {},
    handleExamineLocale: () => {},
    handleExitLocale: () => {},
    affectPlayerTemperature: (state, action) => {
			const newTemp = state.temperature + action.payload.temperature;
      state.temperature = newTemp < 0 ? 0 : newTemp;
    },
    changeLocale: (state, action) => {
      state.locale = action.payload;
    },
    dropItem: (state, action) => {
      if (action.payload.item.amount > 1) {
        state.items.forEach(item => {
          if (item.entityId === action.payload.item.entityId) {
            item.amount -= 1;
          }
        });
        return;
      }
      state.items = state.items.filter(
        item => item.entityId !== action.payload.item.entityId
      );
    },
    equipItem: (state, action) => {
      state.equipped = state.equipped.concat([action.payload.entityId]);
    },
		hurt: (state, action) => {
			state.health -= action.payload.damage;
		},
		hurtBetween: (state, action) => {
			const dmg = between(action.payload.min, action.payload.max);
			state.health -= dmg;
		},
    removeItem: (state, action) => {
      state.items.forEach(item => {
        if (item.entityId === action.payload.entityId) {
          if (item.amount > 1) {
            item.amount -= 1;
          } else {
            state.items = state.items.filter(i => i.entityId !== action.payload.entityId);
          }
        }
      });
    },
    setPlayerTemperature: (state, action) => {
      state.temperature = action.payload.temperature;
    },
    takeItem: (state, action) => {
      if (
        isStackable(action.payload.item.name) &&
        state.items.some(item => item.name === action.payload.item.name)
      ) {
        state.items.forEach(item => {
          if (item.name === action.payload.item.name) {
            item.amount += action.payload.item.amount;
            return;
          }
        });
        return;
      }
      state.items = state.items.concat([action.payload.item]);
    },
    unequipItem: (state, action) => {
      state.equipped = state.equipped.filter(e => e !== action.payload.entityId);
    }
  },
  extraReducers: {
    'game/saveGame': state => {
      const clone = {};
      Object.keys(state).forEach(k => (clone[k] = state[k]));
      window.localStorage['JTD_SURVIVE_PS_SAVE'] = clone;
    }
  }
});

export const {
  changeLocale,
  dropItem,
  equipItem,
  handleConsumeItem,
	handleDeath,
  handleExamineLocale,
  handleEquipEntity,
  handleExamineEntity,
  handleExitLocale,
	hurt,
	hurtBetween,
  affectPlayerTemperature,
  removeItem,
  setPlayerTemperature,
  takeItem,
  unequipItem
} = playerSlice.actions;

export default playerSlice.reducer;