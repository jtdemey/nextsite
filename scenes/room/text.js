import * as Three from '../../lib/three.module.js';
import ResourcePaths from '../ResourcePaths.js';
import { getDegree } from '../sceneUtils.js';

export const addText = (scene, text, fontPath, config) => {
  const loader = new Three.FontLoader();
  const onSuccess = font => {
    const lineMaterial = new Three.LineBasicMaterial({
      color: new Three.Color('#bfbfbf'),
      side: Three.DoubleSide
    });
    const shapes = font.generateShapes(text, 100);
    const geom = new Three.ShapeBufferGeometry(shapes);
    geom.computeBoundingBox();
    const textMesh = new Three.Mesh(geom, lineMaterial);
    textMesh.position.set(config.x || 0, config.y || 0, config.z || 0);
    const s = config.scale || 0.0015;
    textMesh.scale.set(s, s, s);
    textMesh.rotation.set(config.rx || 0, config.ry || 0, config.rz || 0);
    textMesh.castShadow = true;
    scene.add(textMesh);
  };
  const onError = err => console.error(err);
  loader.load(fontPath, onSuccess, null, onError);
};

export const initText = scene => {
  addText(scene, 'John', ResourcePaths.FONT_HELVETIKER, {
    x: -19, y: 14, z: -4, scale: 0.02, ry: getDegree(90) 
  });
  addText(scene, 'Torsten', ResourcePaths.FONT_HELVETIKER, {
    x: -19, y: 11, z: -5, scale: 0.02, ry: getDegree(90)
  });
  addText(scene, 'Maker of Things', ResourcePaths.FONT_HELVETIKER, {
    x: -19, y: 6, z: -6, scale: 0.01, ry: getDegree(90) 
  });
};