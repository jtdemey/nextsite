import { createSlice } from '@reduxjs/toolkit';
import { IMPOSTER_VIEWS, MODAL_VIEWS, STORAGE_KEYS } from './imposterConstants';
import { socket } from '../socket/socketClient';
import { parseDateStr } from '../ImposterUtils';

export const imposterSlice = createSlice({
  name: 'game',
  initialState: {
		alertText: null,
    castedVotes: [],
    gameId: null,
    gameInSession: false,
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
			state.gameInSession = true;
		},
		setSocketId: (state, action) => {
			const storedId = window.localStorage.getItem('JTD_imposterSocketId');
			if(storedId) {
				const lastSeen = parseDateStr(window.localStorage.getItem('JTD_imposterHourLastSeen'));
				if(storedId !== undefined && Math.abs(new Date().getTime() - lastSeen.getTime()) < 3600000) {
					console.log(`Welcome back, ${storedId}`);
				}
			}
			window.localStorage.setItem('JTD_imposterSocketId', action.payload.socketId);
			window.localStorage.setItem('JTD_imposterHourLastSeen', new Date().toISOString());
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
		},
		syncGameState: (state, action) => {
			state.gameId = action.gameId;

		}
  },
  extraReducers: {}
});

export const { alertMessage, changeGameView, emitSocketMsg,
	hideModal, initGame, setSocketId, setTheme, showModal,
	submitHostGame, syncGameState } = imposterSlice.actions;

export default imposterSlice.reducer;