import player from "./player";
import { togglePause } from "./game";
import { reloadPistol, shoot } from "./pistol";

const controls = {
  mouseX: 0,
  mouseY: 0
};

export default controls;

/**
 * Sets position of controls to the given coordinate 
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 */
export const setMousePos = (x, y) => {
  controls.mouseX = x;
  controls.mouseY = y;
};

/**
 * Handles click event
 */
export const handleClick = () => {
  if (!player.hasControl) {
    return;
  }
  shoot();
};

/**
 * Handles key down event
 * @param {Event} e Key down event
 */
export const handleKeyDown = e => {
  if (e.key === "Escape") {
    togglePause();
  }
  if (!player.hasControl) {
    return;
  }
  switch (e.key) {
    case "a":
    case "ArrowLeft":
      player.isMovingLeft = true;
      break;
    case "d":
    case "ArrowRight":
      player.isMovingRight = true;
      break;
    case "w":
    case "ArrowUp":
    case " ":
      player.jump();
      break;
    case "f":
    case "j":
      shoot();
      break;
		case "r":
			reloadPistol();
			break;
    default:
      break;
  }
};

/**
 * Handles key up event
 * @param {Event} e Key up event
 */
export const handleKeyUp = e => {
  if (!player.hasControl) {
    return;
  }
  switch (e.key) {
    case "a":
    case "ArrowLeft":
      player.isMovingLeft = false;
      break;
    case "d":
    case "ArrowRight":
      player.isMovingRight = false;
      break;
    case "w":
    case "ArrowUp":
    case " ":
      break;
    default:
      break;
  }
};

/**
 * Maps input events to their respective handlers
 * @param {Input} input Phaser input object
 */
export const mapInputEvents = input => {
  input.keyboard.on("keydown", e => handleKeyDown(e));
  input.keyboard.on("keyup", e => handleKeyUp(e));
  input.on("pointerdown", e => handleClick(e));
};