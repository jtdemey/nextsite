import game from "./game";
import { addGameEvent } from "./gameEvents";

/**
 * Gets the game camera
 * @returns Game camera object
 */
export const getCamera = () => game.scene.cameras.cameras[0];

/**
 * Resets the game camera back to its initial state
 */
export const resetCamera = () => {
	const camera = getCamera();
	camera.setAngle(0);
	camera.setZoom(1, 1);
};

/**
 * Shakes the camera
 * @param {number} intensity Amount and duration to shake
 */
export const shakeCamera = intensity => {
  const camera = game.scene.cameras.cameras[0];
  const startTick = game.tick;
  const shakeValues = [0];
  camera.setZoom(1.03, 1.03);
  for (let i = 1; i <= intensity; i++) {
    shakeValues.push(i, -i);
  }
  shakeValues.reverse().forEach((shakeAmount, i) => {
    addGameEvent(startTick + (i * 2), () => camera.setAngle(shakeAmount));
  });
  addGameEvent(startTick + (shakeValues.length * 2) + 1, () => camera.setZoom(1, 1));
};