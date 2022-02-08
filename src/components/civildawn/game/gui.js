import game from "./game";
import player from "./player";
import { LEVEL_DISPLAYS } from "../constants";
import pistol from "./pistol";

const COUNT_COLOR = "#1a0f00";
const LABEL_COLOR = "#120e07";

//Hp bar gradient: [gui color], #384A30, #574d13, #3e7c1f, #29a329
const gui = {
  labels: {},
  counts: {}
};

export default gui;

/**
 * Adds static text to the GUI
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {string} text Text content
 * @param {string} color Hex color
 * @param {number} size Font size
 * @returns 
 */
const addText = (x, y, text, color, size) =>
  game.scene.add.text(x, y, text, {
    color: color,
    fontFamily: `Coda`,
    fontSize: size,
    shadowOffsetX: 8,
    shadowOffsetY: 12,
    shadowBlur: 2,
    shadowColor: "#000"
  });

/**
 * Initializes the GUI
 */
export const initGui = () => {
  initLabels();
  initCounts();
};

/**
 * Initializes numerical GUI values
 */
export const initCounts = () => {
  const hpCt = addText(58, -2, "100", COUNT_COLOR, "3rem");
  gui.counts.health = hpCt;
  const ammoCt = addText(252, -2, "10", COUNT_COLOR, "3rem");
  gui.counts.ammo = ammoCt;
  const scoreCt = addText(416, -2, "0", COUNT_COLOR, "3rem");
  gui.counts.score = scoreCt;
};

/**
 * Initializes GUI labels
 */
export const initLabels = () => {
  const hpLabel = addText(20, 12, "HP", LABEL_COLOR, "1.5rem");
  gui.labels.health = hpLabel;
  const ammoLabel = addText(170, 12, "AMMO", LABEL_COLOR, "1.5rem");
  gui.labels.ammo = ammoLabel;
  const scoreLabel = addText(330, 12, "SCORE", LABEL_COLOR, "1.5rem");
  gui.labels.score = scoreLabel;
  const lvlLabel = addText(
    game.width - 320,
    12,
    "1: CIVIL DUSK",
    LABEL_COLOR,
    "1.5rem"
  );
  lvlLabel.x = game.width - lvlLabel.width - 20;
  gui.labels.lvl = lvlLabel;
};

/**
 * Gets the appropriate color given the player's current health
 * @param {number} hp Current health points
 * @returns Hex color
 */
const getHpColor = hp => {
  let color;
  if (hp > 80) {
    color = "#556F49";
  } else if (hp > 60) {
    color = "#384A30";
  } else if (hp > 40) {
    color = "#574d13";
  } else if (hp > 20) {
    color = "#6c2509";
  } else if (hp > 0) {
    color = "#800000";
  } else {
    color = "#000000";
  }
  return color;
};

/**
 * Refreshes the GUI
 */
export const refreshGui = () => {
	refreshAmmoCt();
  refreshHealthCt();
  refreshLvlLabel();
  refreshScoreCt();
};

/**
 * Refreshes ammo count
 */
export const refreshAmmoCt = () => {
  gui.counts.ammo.setText(pistol.currentAmmo);
};

/**
 * Refreshes HP count
 */
export const refreshHealthCt = () => {
  gui.counts.health.setText(player.hp);
  gui.counts.health.setColor(getHpColor(player.hp));
};

/**
 * Refreshes the level label
 */
export const refreshLvlLabel = () => {
  gui.labels.lvl.setText(LEVEL_DISPLAYS[game.level - 1]);
  gui.labels.lvl.x = game.width - gui.labels.lvl.width - 20;
};

/**
 * Refreshes the score count
 */
export const refreshScoreCt = () => {
  gui.counts.score.setText(`$${game.score}`);
};