import Phaser from 'phaser';
import createScene from './game/createScene';
import preload from './game/preload';
import update from './game/updateGame';
import game from './game/game';

const getConfig = (width = 800, height = 600) => {
	game.width = width;
	game.height = height;
  return {
    type: Phaser.AUTO,
    width: width,
    height: height,
    parent: 'site-wrapper',
    physics: {
      default: 'matter',
      matter: {
        // debug: true,
        gravity: {
          x: 0,
          y: 0.6
        }
      }
    },
    scene: {
      create: createScene,
      preload: preload,
      update: update
    }
  };
};

export const initGame = (width, height) => new Phaser.Game(getConfig(width, height));

window.onload = () => {
	const wrapper = document.querySelector("#site-wrapper");
	setTimeout(() => initGame(wrapper.clientWidth, wrapper.clientHeight), 500);
};