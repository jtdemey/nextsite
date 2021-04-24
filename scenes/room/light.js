import * as Three from '../../lib/three.module.js';
import { getHexNum } from '../sceneUtils.js';

const lights = [];
export default lights;

const sphereGeom = new Three.SphereGeometry(0.5, 16, 8);

const addLightToScene = (scene, light, x, y, z) => {
  if(x !== undefined) {
    light.position.set(x, y, z);
  }
  scene.add(light);
  lights.push(light);
};

const addAmbientLight = (scene, color, intensity, x, y, z) => {
  const light = new Three.AmbientLight(color, intensity);
  addLightToScene(scene, light, x, y, z);
};

const addDirectionalLight = (scene, color, intensity, x, y, z) => {
  const light = new Three.DirectionalLight(color, intensity);
  addLightToScene(scene, light, x, y, z);
};

const addLightBulb = (scene, color, intensity, x, y, z) => {
  const light = new Three.PointLight(color, intensity, 100, 2);
  light.castShadow = true;
  light.ascending = true;
  light.add(new Three.Mesh(sphereGeom, new Three.MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0x000000
  })));
  addLightToScene(scene, light, x, y, z);
};

export const initLights = scene => {
  addAmbientLight(scene, getHexNum('#ccffff'), 0.05);
  // addDirectionalLight(scene, 0xffffff, 1, 0, 8, 4);
  addLightBulb(scene, getHexNum('#e6ffff'), 50, -4, 8, 4);
};

export const updateLights = () => {
  lights.forEach(light => {
    if(light.ascending) {
      light.position.y += 0.01;
      if(light.position.y > 15) {
        light.ascending = false;
      }
    } else {
      light.position.y -= 0.01;
      if(light.position.y < 10) {
        light.ascending = true;
      }
    }
  });
};