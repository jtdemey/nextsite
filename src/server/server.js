import express from 'express';
import logger from './logger';
import morgan from 'morgan';
import next from 'next';
import router from './routes';
import { createWebSocketServer } from './socketServer';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.SERVER_PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const expressApp = express();
		expressApp.use(morgan('short'));
    expressApp.use('/', router);
    expressApp.all('*', (req, res) => handle(req, res));
		process.on('SIGINT', () => process.exit());
    const httpServer = expressApp.listen(port, (err) => {
      if (err) throw err;
      logger.info(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
		const wsServer = createWebSocketServer(expressApp);
		httpServer.on('upgrade', (req, socket, head) => {
			wsServer.handleUpgrade(req, socket, head, ws => wsServer.emit('connection', ws, req));
		});
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
})();
