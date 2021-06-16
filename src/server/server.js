const express = require('express');
const next = require('next');
const { default: router } = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.SERVER_PORT || 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
	server.use('/', router);
    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();