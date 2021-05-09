import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    health: 100, //100-75: healthy, 74-50: injured, 49-25: wounded, 24-10: impaired, 9-1: disabled, 0: dead
    sanity: 100, //100-75: sane, 74-50: afraid, 49-25: panicked, 24-10: delusional, 9-1: insane, 0: irrational
    isDelusional: false,
    isIrrational: false,
    temperature: 100, //150-125: heat exhausted, 124-101: overheated, 100-75: normal, 74-50: chilly, 49-25: cold, 24-10: shivering, 9-1: freezing, 0: game over
    isHeatExhausted: false,
    isShivering: false,
    isFreezing: false,
    energy: 100, //100-75: spry, 74-50: calm, 49-25: tired, 24-10: fatigued, 9-1: exhausted, 0: immobile
    isExhausted: false,
    isImmobile: false,
    isExiting: false,
    locale: 'car',
    lastLocale: undefined,
    visited: [],
    inCombat: false,
    lastCombat: 0,
    currentEnemy: undefined,
    items: [],
    equipped: []
  },
  reducers: {

  }
});

export const { increment, decrement, incrementByAmount } = playerSlice.actions;

export default playerSlice.reducer;