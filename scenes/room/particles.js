import * as Three from '../../lib/three.module.js';
import { between } from '../sceneUtils.js';

const particleCt = 2000;

let particleMesh;

export const initParticles = scene => {
  const geometry = new Three.BufferGeometry();
  const material = new Three.PointsMaterial({ size: 0.02 });
  const posArray = new Float32Array(particleCt * 3);
  for(let i = 0; i < particleCt * 3; i++) {
    posArray[i] = Math.random() * 30;
  }
  geometry.setAttribute('position', new Three.BufferAttribute(posArray, 3));
  particleMesh = new Three.Points(geometry, material);
  particleMesh.position.set(-10, 8, -10);
  scene.add(particleMesh);
};

export const updateParticles = () => {
  particleMesh.rotation.x += 0.001;
};