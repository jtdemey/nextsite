import * as Three from '../../lib/three.module.js';
import camera from './camera.js';
import tiles, { TILE_COLORS } from './tiles.js';
import { getHexNum } from '../sceneUtils.js';

const mouse = new Three.Vector2();
export default mouse;

const raycaster = new Three.Raycaster();

export const onMouseMove = (e, renderer) => {
  mouse.x = ( e.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = -( e.clientY / renderer.domElement.clientHeight ) * 2 + 1;
  updateMouseIntersects();
};

const updateMouseIntersects = () => {
  raycaster.setFromCamera(mouse, camera);
  tiles.forEach((tile, i) => {
    const intersection = raycaster.intersectObject(tile);
    if(tile.hoverEffect === true && intersection.length < 1) {
      tile.hoverEffect = false;
      tile.material.color.set(getHexNum(TILE_COLORS[i].primary));
    } else if(intersection.length > 0) {
      tile.hoverEffect = true;
      tile.material.color.set(getHexNum(TILE_COLORS[i].highlight));
    }
  });
};