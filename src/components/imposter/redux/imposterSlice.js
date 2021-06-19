import { createSlice } from '@reduxjs/toolkit';

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
		modal: 0,
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
		view: 0,
    votes: []
  },
  reducers: {
		alertMessage: (state, action) => {
			state.alertText = action.payload;
		},
		setPlayerSocket: (state, action) => {
			state.socketId = action.payload.socketId;
			state.socket = action.payload.socket;
		},
  },
  extraReducers: {}
});

export const { alertMessage, setPlayerSocket } = imposterSlice.actions;

export default imposterSlice.reducer;