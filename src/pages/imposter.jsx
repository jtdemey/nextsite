import 'regenerator-runtime/runtime';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import PageHead from '../components/PageHead';
import imposterStore from '../components/imposter/redux/imposterStore';
import { alertMessage, setPlayerSocket } from '../components/imposter/redux/imposterSlice';
import ImposterApp from '../components/imposter/ImposterApp';

const initImposter = dispatch => {
  //Socket client
  const socketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URI || 3000;
  const socket = new WebSocket(socketUrl);
  let socketId;

  const genSocketId = () => {
    const abc =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let id = '';
    for (let i = 0; i < 16; i++) {
      const cInd = Math.floor(Math.random() * abc.length);
      const c = abc.charAt(cInd);
      id += c;
    }
    return id;
  };

  socket.onopen = () => {
    socketId = genSocketId();
    dispatch(setSocketId(socketId));
    console.log(`Socket connection established, generated socket ID ${socketId}`);
    socket.send(JSON.stringify({
      command: 'launchedImposter',
      socketId: socketId
    }));
  };
  socket.onerror = error => {
    dispatch(alertMessage('Error 69: your browser sucks :(', 5000));
    console.log('Error 69: no socket for you :(');
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
      case 'acceptImposterLaunch':
        dispatch(setPlayerSocket(socket));
        break;
      // case 'initGame': //Params: game
      //   dispatch(initGame(msg.gameState));
      //   break;
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
        console.log(`Unrecognized socket message '${msg.command}'`);
        break;
    }
  };
  socket.onclose = () => {
    dispatch(alertMessage('Lost connection; try refreshing', 999999));
  };
  window.onbeforeunload = () => {
    socket.send(JSON.stringify({
      command: 'socketDisconnect',
      socketId: socketId
    }));
    return null;
  };
};

const ImposterPage = () => {
  return (
    <div>
      <PageHead
        title="Imposter!"
        styleLinks={[
          'https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap'
        ]}
      />
      <Provider store={imposterStore}>
				<ImposterApp />
			</Provider>
    </div>
  );
};

export default ImposterPage;
