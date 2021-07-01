import { SOCKET_COMMANDS } from '../redux/imposterConstants';
import { alertMessage, initGame, setSocketId } from '../redux/imposterSlice';

export let socket = null;

const initImposter = dispatch => {
  //Socket client
  const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URI || 3000;
  socket = new WebSocket(socketUrl);
  let socketId;

  socket.onopen = () => {
    console.log(`Socket connection established.`);
    socket.send(JSON.stringify({
      command: SOCKET_COMMANDS.LAUNCHED_IMPOSTER
    }));
  };

  socket.onerror = error => {
    dispatch(alertMessage('Error 69: your browser sucks :(', 5000));
    console.log('Error 69: no websocket support found :(');
    console.error(error);
  };

  socket.onmessage = e => {
    let msg;
    try {
      msg = JSON.parse(e.data);
    } catch(e) {
      console.log('Unable to parse incoming socket message.', e);
    }
    if(msg.command !== 'gameTick') {
      console.debug(`\tGot command "${msg.command}"`);
    }
    switch(msg.command) {
      case SOCKET_COMMANDS.ACCEPT_IMPOSTER_LAUNCH:
				console.log(`Successful handshake with GameSuite - welcome, player ${msg.socketId}.`);
        dispatch(setSocketId({ socketId: msg.socketId }));
        break;
      case 'initGame':
        dispatch(initGame(msg.gameState));
        break;
      // case 'gameTick':
      //   dispatch(gameTick(msg.gameState));
      //   break;
      // case 'imposterError':
      //   console.error(msg.text);
      //   dispatch(alertMessage(msg.text, 5000));
      //   break;
      // case 'refreshVotes':
      //   dispatch(refreshVotes(msg.votes));
      //   break;
      default:
        console.log(`Unrecognized socket message '${msg.command}'.`);
        break;
    }
  };

  socket.onclose = () => {
    dispatch(alertMessage('Lost connection; try refreshing.', 999999));
  };

  window.onbeforeunload = () => {
    socket.send(JSON.stringify({
      command: SOCKET_COMMANDS.SOCKET_DISONNECT,
      socketId: socketId
    }));
    return null;
  };
};

export default initImposter;