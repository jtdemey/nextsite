const { createServer } = require('http');
const express = require('express');
const path = require('path');
const url = require('native-url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = 3000;

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.get('/', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'pages/home.html'));
    });
    server.get('/about', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'pages/about.html'));
    });
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