import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({
  silent: true
});

const router = express.Router();
const isProd = process.env.NODE_ENV === 'production';

const sendHtmlFile = (res, fileName) => {
  if(isProd) {
    res.sendFile(path.join(process.cwd(), 'public', 'static', fileName));
	return;
  }
  res.sendFile(path.join(process.cwd(), 'src', 'pages', fileName));
};

router.route('/')
  .get((req, res) => {
    sendHtmlFile(res, 'home.html');
  });

router.route('/about')
  .get((req, res) => {
    sendHtmlFile(res, 'about.html');
  });

router.route('/doodles')
  .get((req, res) => {
    sendHtmlFile(res, 'doodles.html');
  });

/*
router.route('/imposter')
  .get((req, res) => {
    sendHtmlFile(res, 'imposter.html');
  });

router.route('/imposter/:gameCode')
  .get((req, res) => {
    sendHtmlFile(res, 'imposter.html');
  });

router.route('/meyhemn')
  .get((req, res) => {
    sendHtmlFile(res, 'meyhemn.html');
  });

router.route('/pistolwhip')
  .get((req, res) => {
    sendHtmlFile(res, 'pistolwhip.html');
  });

router.route('/rollfighter')
  .get((req, res) => {
    sendHtmlFile(res, 'rollfighter.html');
  });

router.route('/sandbox')
  .get((req, res) => {
    sendHtmlFile(res, 'sandbox.html');
  });

router.route('/devtut')
  .get((req, res) => {
    sendHtmlFile(res, 'tut.html');
  });
*/

export default router;