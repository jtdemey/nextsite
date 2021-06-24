import { createSlice } from '@reduxjs/toolkit';
import { IMPOSTER_VIEWS, MODAL_VIEWS } from './imposterConstants';

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
		hideModal: state => {
			state.modal = MODAL_VIEWS.NONE;
		},
		setPlayerSocket: (state, action) => {
			state.socketId = action.payload.socketId;
			state.socket = action.payload.socket;
		},
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
		showModal: (state, action) => {
			state.modal = action.payload;
		}
  },
  extraReducers: {}
});

export const { alertMessage, changeGameView, hideModal, setPlayerSocket, setTheme, showModal } = imposterSlice.actions;

export default imposterSlice.reducer;