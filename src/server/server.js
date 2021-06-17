import express from 'express';
import logger from './logger';
import morgan from 'morgan';
import next from 'next';
import router from './routes';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.SERVER_PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
		server.use(morgan('short'));
    server.use('/', router);
    server.all('*', (req, res) => handle(req, res));
    server.listen(port, (err) => {
      if (err) throw err;
      logger.info(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
})();
