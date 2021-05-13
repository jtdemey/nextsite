import { createSlice } from '@reduxjs/toolkit';
import { getTimeFromTick } from '../SurviveUtils';
import { CINEMATICS, GAME_STATES, GAME_PANEL_VIEWS } from './gameConstants';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    //Cinematics
    cinematicId: 0,
    cinematicStartTick: 0,
    gameState: GAME_STATES.MAINMENU,
    gameClock: undefined,
    gameTime: new Date(1987, 11, 12, 9, 44, 0, 0).toString(),
    gamePanelView: GAME_PANEL_VIEWS.CONSOLE,
    tick: 0
  },
  reducers: {
    gameTick: state => {
      if(!(state.gameState > 0 && state.gameState < 3)) return;
      let t = state.tick + 1;
      state.tick = t;
      state.gameTime = getTimeFromTick(t);
    },
    initGame: state => {
      state.gameState = GAME_STATES.EXPLORE;
    },
    loadGame: (state, action) => {

    },
    pauseGame: state => {
      state.gameState = GAME_STATES.PAUSEMENU;
    },
    resumeGame: state => {
      state.gameState = GAME_STATES.EXPLORE;
    },
    saveGame: state => {
      const clone = {};
      Object.keys(state).forEach(k => clone[k] = state[k]);
      window.localStorage['JTD_SURVIVE_GS_SAVE_TS'] = new Date().toISOString();
      window.localStorage['JTD_SURVIVE_GS_SAVE'] = clone;
    },
    showOptions: state => {
      state.gameState = GAME_STATES.OPTIONSMENU;
    },
    setGamePanelView: (state, action) => {
      state.gamePanelView = action.payload;
    },
    startCinematic: (state, action) => {
      state.gameState = GAME_STATES.CINEMATIC;
      state.cinematicId = action.cinematicId;
      state.cinematicStartTick = state.tick;
    }
  },
  extraReducers: {}
});

export const { gameTick, initGame, loadGame, pauseGame, resumeGame, setGamePanelView, showOptions, startCinematic } = gameSlice.actions;

export default gameSlice.reducer;