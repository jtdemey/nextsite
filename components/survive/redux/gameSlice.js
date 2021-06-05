import { createSlice } from '@reduxjs/toolkit';
import { createConsoleLine, getTimeFromTick } from '../SurviveUtils';
import { CINEMATICS, GAME_STATES, GAME_PANEL_VIEWS, CONSOLE_COLORS } from './gameConstants';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    //Base
    gameState: GAME_STATES.MAINMENU,
    gameClock: undefined,
    gameTime: new Date(1987, 11, 12, 9, 44, 0, 0).toString(),
    gamePanelView: GAME_PANEL_VIEWS.CONSOLE,
    tick: 0,
    //Cinematics
    cinematicId: 0,
    cinematicStartTick: 0,
    //Console
    lastInput: '',
    //Notifications
    notificationText: '',
    //UI elements
    consoleLineIndex: 0,
    consoleText: []
  },
  reducers: {
    appendLine: (state, action) => {
      state.consoleText = state.consoleText.concat([createConsoleLine(state.consoleLineIndex, action.payload.text, CONSOLE_COLORS.WHITE)]);
      state.consoleLineIndex++;
    },
    gameTick: state => {
      if(!(state.gameState > 0 && state.gameState < 3)) return;
      let t = state.tick + 1;
      state.tick = t;
      state.gameTime = getTimeFromTick(t);
    },
    initGame: state => {
      state.gameState = GAME_STATES.CINEMATIC;
      state.cinematicId = CINEMATICS.INTRO;
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
      window.localStorage['JTD_SURVIVE_SAVE_TS'] = new Date().toISOString();
      window.localStorage['JTD_SURVIVE_GS_SAVE'] = clone;
      state.notificationText = 'Game saved to local storage.';
    },
    showOptions: state => {
      state.gameState = GAME_STATES.OPTIONSMENU;
    },
    setGamePanelView: (state, action) => {
      state.gamePanelView = action.payload;
    },
    skipCinematic: state => {
      state.gameState = GAME_STATES.EXPLORE;
    },
    startCinematic: (state, action) => {
      state.gameState = GAME_STATES.CINEMATIC;
      state.cinematicId = action.cinematicId;
      state.cinematicStartTick = state.tick;
    },
    submitExploreCommand: (state, action) => {
      console.log(action);
      state.lastInput = action.payload;
    }
  },
  extraReducers: {}
});

export const { appendLine, gameTick, initGame, loadGame, pauseGame, resumeGame, saveGame, setGamePanelView, showOptions,
  skipCinematic, startCinematic, submitExploreCommand } = gameSlice.actions;

export default gameSlice.reducer;