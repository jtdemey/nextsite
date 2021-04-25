import * as Three from '../../lib/three.module.js';
import { createMesh } from "./meshes";
import { addText } from "./text";
import { getDegree, getHexNum } from "../sceneUtils";
import ResourcePaths from '../ResourcePaths.js';

const tiles = [];
export default tiles;

export const TILE_COLORS = [
  {
    primary: '#BA0C2F',
    highlight: '#F01944'
  },
  {
    primary: '#653165',
    highlight: '#974997'
  },
  {
    primary: '#AF272F',
    highlight: '#D74751'
  },
  {
    primary: '#7474C1',
    highlight: '#ABABD9'
  },
];

const addTile = (scene, geom, c) => {
  const tile = createMesh(scene, geom, new Three.MeshStandardMaterial({
    color: new Three.Color(c.color)
  }));
  tile.position.set(c.x || 0, c.y || 0 , c.z || 0);
  tile.rotation.set(getDegree(90), 0, 0);
  tile.scale.set(0.6, 0.01, 0.1);
  tile.hoverEffect = false;
  tiles.push(tile);
  addText(scene, c.text, ResourcePaths.FONT_HELVETIKER, {
    x: c.tx, y: c.ty, z: c.tz, scale: 0.015 
  });
};

export const initTiles = scene => {
  const roomGeom = new Three.BoxGeometry(40, 0.25, 40);
  addTile(scene, roomGeom, {
    text: 'software',
    color: TILE_COLORS[0].primary,
    x: -6.7, y: 17.15, z: -19.5,
    tx: -17.9, ty: 15.8, tz: -19.3
  });
  addTile(scene, roomGeom, {
    text: 'music',
    color: TILE_COLORS[1].primary,
    x: -4.7, y: 12.35, z: -19.5,
    tx: -15.9, ty: 11, tz: -19.3
  });
  addTile(scene, roomGeom, {
    text: 'art',
    color: TILE_COLORS[2].primary,
    x: -2.7, y: 7.55, z: -19.5,
    tx: -13.9, ty: 6.2, tz: -19.3
  });
  addTile(scene, roomGeom, {
    text: 'about',
    color: TILE_COLORS[3].primary,
    x: -0.7, y: 2.75, z: -19.5,
    tx: -11.9, ty: 1.4, tz: -19.3
  });
};