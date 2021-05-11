import { createSlice } from '@reduxjs/toolkit';
import { getTimeFromTick } from '../SurviveUtils';

export const GAME_STATES = {
  MAINMENU: 0,
  EXPLORE: 1,
  COMBAT: 2,
  PAUSEMENU: 3,
  OPTIONSMENU: 4,
  DIALOGUE: 5
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    tick: 0,
    gameState: GAME_STATES.MAINMENU,
    gameTime: new Date(1987, 11, 12, 9, 44, 0, 0).toString(),
    gameClock: undefined,
    paused: true 
  },
  reducers: {
    gameTick: state => {
      let t = state.tick + 1;
      state.tick = t;
      state.gameTime = getTimeFromTick(t);
    },
    initGame: state => {
      console.log('a')
      state.paused = false;
      state.gameState = GAME_STATES.EXPLORE;
    },
    loadGame: (state, action) => {

    },
    pauseGame: state => {
      state.paused = true;
      state.gameState = GAME_STATES.PAUSEMENU;
    },
    resumeGame: state => {
      state.paused = false;
      state.gameState = GAME_STATES.EXPLORE;
    },
    showOptions: state => {
      state.paused = true;
      state.gameState = GAME_STATES.OPTIONSMENU;
    }
  },
  extraReducers: {}
});

export const { gameTick, initGame, loadGame, pauseGame, resumeGame, showOptions } = gameSlice.actions;

export default gameSlice.reducer;