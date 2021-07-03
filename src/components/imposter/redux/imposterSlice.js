import { createSlice } from '@reduxjs/toolkit';
import { IMPOSTER_VIEWS, MODAL_VIEWS, NOTIFICATIONS, STORAGE_KEYS } from './imposterConstants';
import { socket } from '../socket/socketClient';

export const imposterSlice = createSlice({
  name: 'game',
  initialState: {
		//Game
    castedVotes: [],
    condition: null,
    gameId: null,
    gameInSession: false,
    host: null,
    imposterId: null,
    phase: 0,
    players: [],
    roles: [],
    scenario: null,
    tick: 0,
		//Client
		alertText: null,
		isAccusing: false,
		modal: MODAL_VIEWS.NONE,
		notifications: [],
		extendTimerCt: 3,
		hurryUpCt: 6,
		playerName: 'Some Goon',
		isReady: false,
    scenarioList: [],
    socketId: null,
    socket: null,
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
		appendNotification: (state, action) => {
			state.notifications = state.notifications.concat([action.payload]);
		},
		changeGameView: (state, action) => {
			state.view = action.payload;
		},
		emitSocketMsg: (state, action) => {
			socket.send(JSON.stringify(action.payload));
			state.lastSocketCommand = action.payload.command;
		},
		extendTimer: (state, action) => {
			if(state.extendTimerCt > 0) {
				state.extendTimerCt -= 1;
			} else {
				if(!action.payload.notifications.some(
					n => n.type === NOTIFICATIONS.EXTEND_TIMER_EXCEEDED
				)) {
					state.notifications = state.notifications.concat([{
						text: 'Yer killin me, Smalls.',
						type: NOTIFICATIONS.EXTEND_TIMER_EXCEEDED
					}]);
				}
			}
		},
		hideModal: state => {
			state.modal = MODAL_VIEWS.NONE;
		},
		hurryUp: state => {
			if(state.hurryUpCt > 0) {
				state.hurryUpCt -= 1;
			} else {
				if(!action.payload.notifications.some(
					n => n.type === NOTIFICATIONS.HURRY_UP_EXCEEDED
				)) {
					state.notifications = state.notifications.concat([{
						text: 'Slow your rolls, sweaty.',
						type: NOTIFICATIONS.HURRY_UP_EXCEEDED
					}]);
				}
			}
		},
		initGame: (state, action) => {
			const gs = action.payload;
			state.gameInSession = false;
			state.gameId = gs.gameId;
			state.phase = gs.phase;
			state.players = gs.players;
			state.remainingTime = gs.remainingTime;
			state.tick = gs.tick;
			state.votes = gs.votes;
			state.view = IMPOSTER_VIEWS.LOBBY;
			state.extendTimerCt = 3;
			state.hurryUpCt = 6;
		},
		setSocketId: (state, action) => {
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
			state.playerName = action.payload.playerName;
		},
		submitJoinGame: (state, action) => {
			state.playerName = action.payload.playerName;
		},
		syncGameState: (state, action) => {
			const gs = action.payload;
			state.gameId = gs.gameId;
			state.gameInSession = gs.gameInSession;
			state.phase = gs.phase;
			state.players = gs.players;
			state.remainingTime = gs.remainingTime;
			state.tick = gs.tick;
			state.votes = gs.votes;

		}
  },
  extraReducers: {}
});

export const { alertMessage, appendNotification, changeGameView,
	emitSocketMsg, extendTimer, hideModal, hurryUp, initGame,
	setSocketId, setTheme, showModal, submitHostGame, submitJoinGame,
	syncGameState } = imposterSlice.actions;

export default imposterSlice.reducer;