import * as Three from '../../lib/three.module.js';
import camera from './camera.js';
import tiles from './tiles.js';

const mouse = new Three.Vector2();
export default mouse;

const raycaster = new Three.Raycaster();

const hx = window.innerWidth / 2;
const hy = window.innerHeight / 2;
export const onMouseMove = e => {
  mouse.x = e.clientX - hx;
  mouse.y = e.clientY - hy;
};

export const updateMouseIntersects = () => {
  raycaster.setFromCamera(mouse, camera);
  tiles.forEach(tile => {
    const intersection = raycaster.intersectObject(tile);
    if(intersection.length > 0) {
      console.log('b')
    }
  });
};