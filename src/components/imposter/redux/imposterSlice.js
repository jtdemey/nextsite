import { createSlice } from '@reduxjs/toolkit';
import { IMPOSTER_VIEWS, MODAL_VIEWS, STORAGE_KEYS } from './imposterConstants';
import { socket } from '../socket/socketClient';

export const imposterSlice = createSlice({
  name: 'game',
  initialState: {
		alertText: null,
    castedVotes: [],
    gameId: null,
    gameInSession: false,
    gameOverReason: null,
    host: null,
    imposterId: null,
		isAccusing: false,
		modal: MODAL_VIEWS.NONE,
		notifications: [],
    phase: 0,
    player: {
      extendTimerCt: 0,
      hurryUpCt: 0,
      name: 'Some Goon',
      isReady: false
    },
    players: [],
    scenario: null,
    scenarioList: [],
    condition: null,
    roles: [],
    socketId: null,
    socket: null,
    tick: 0,
		theme: 0,
    remainingTime: 60,
    lastSocketCommand: null,
    isPaused: false,
		view: IMPOSTER_VIEWS.MAIN_MENU,
    votes: []
  },
  reducers: {
		alertMessage: (state, action) => {
			state.alertText = action.payload;
		},
		changeGameView: (state, action) => {
			state.view = action.payload;
		},
		emitSocketMsg: (state, action) => {
			socket.send(JSON.stringify(action.payload));
			state.lastSocketCommand = action.payload.command;
		},
		hideModal: state => {
			state.modal = MODAL_VIEWS.NONE;
		},
		initGame: (state, action) => {

		},
		setSocketId: (state, action) => {
			state.socketId = action.payload.socketId;
		},
		setTheme: (state, action) => {
			window.localStorage.setItem(STORAGE_KEYS.THEME, action.payload);
			state.theme = action.payload;
		},
		showModal: (state, action) => {
			state.modal = action.payload;
		},
		submitHostGame: (state, action) => {
			state.player.name = action.payload.playerName;
		}
  },
  extraReducers: {}
});

export const { alertMessage, changeGameView, emitSocketMsg,
	hideModal, initGame, setSocketId, setTheme, showModal,
	submitHostGame } = imposterSlice.actions;

export default imposterSlice.reducer;