const WebSocket = require('ws');
import { makeGameSuite } from './gameSuite';

export const createWebSocketServer = server => {
  const wss = new WebSocket.Server({
    perMessageDeflate: false,
    server: server
  });
  wss.gs = makeGameSuite();
  wss.gs.startIdleClock();
  wss.on('connection', ws => {
    ws.on('message', e => {
      wss.gs.handleSocketMsg(wss, ws, e);
    });
  });
  return wss;
};