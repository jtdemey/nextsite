import * as Three from '../../lib/three.module.js';
import { getDegree } from '../sceneUtils.js';

const meshes = [];
export default meshes;

const textureLoader = new Three.TextureLoader();

const addHorizontalPlanes = (scene, roomGeom) => {
  const material = new Three.MeshStandardMaterial({
    color: new Three.Color('#847A71')
  });
  const floor = createMesh(scene, roomGeom, material);
  const roof = createMesh(scene, roomGeom, material);
  roof.position.set(0, 20, 0);
};

export const addMeshes = (scene, roomGeom, material) => {
  addHorizontalPlanes(scene, roomGeom);
  const left = createMesh(scene, roomGeom, material);
  left.position.set(-20, 10, 0);
  left.rotation.z = getDegree(90);
  left.scale.x = 0.5;
  const right = createMesh(scene, roomGeom, material);
  right.position.set(20, 10, 0);
  right.rotation.z = getDegree(90);
  right.scale.x = 0.506;
  const back = createMesh(scene, roomGeom, material);
  back.position.set(0, 10, -20);
  back.rotation.x = getDegree(90);
  // back.scale.x = 0.506;
};

export const createMesh = (scene, roomGeom, material) => {
  const mesh = new Three.Mesh(roomGeom, material);
  mesh.receiveShadow = true;
  //const texture = textureLoader.load('./assets/wall.png');
  scene.add(mesh);
  meshes.push(mesh);
  return mesh;
};

export const initMeshes = scene => {
  const roomGeom = new Three.BoxGeometry(40, 0.25, 40);
  const material = new Three.MeshStandardMaterial({
    color: new Three.Color('#2D2926')
  });
  addMeshes(scene, roomGeom, material);
};

export const updateMeshes = () => {
  meshes.forEach(m => {
    return;
  });
};