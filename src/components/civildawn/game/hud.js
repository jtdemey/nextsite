import game from "./game";
import player from "./player";
import { LEVEL_DATA } from "../data/levelData";
import pistol from "./pistol";

const CONDITION_COLORS = [
	"#660000",
	"#800000",
	"#6c2509",
	"#574d13",
	"#384A30",
	"#556F49"
];
const COUNT_COLOR = "#556F49";
const LABEL_COLOR = "#ffffff";

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
const addText = (x, y, text, color, size) => {
  const textEntity = game.scene.add.text(x, y, text, {
    color: color,
		depth: 2,
    fontFamily: `Coda`,
    fontSize: size,
    shadowOffsetX: 8,
    shadowOffsetY: 12,
    shadowBlur: 2,
    shadowColor: "#000",
		z: 2
  });
	textEntity.setDepth(1);
	return textEntity;
};

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
  gui.counts.health = addText(58, game.height - 60, "100", CONDITION_COLORS[5], "3rem");
  gui.counts.ammo = addText(272, game.height - 60, "10", CONDITION_COLORS[5], "3rem");
  gui.counts.score = addText(456, game.height - 60, "$0", COUNT_COLOR, "3rem");
};

/**
 * Initializes GUI labels
 */
export const initLabels = () => {
  gui.labels.health = addText(20, game.height - 45, "HP", LABEL_COLOR, "1.5rem");
  gui.labels.ammo = addText(190, game.height - 45, "AMMO", LABEL_COLOR, "1.5rem");
  gui.labels.score = addText(370, game.height - 45, "SCORE", LABEL_COLOR, "1.5rem");
  const lvlLabel = addText(
    game.width - 320,
    12,
    "1: CIVIL DUSK",
    "#000000",
    "1.5rem"
  );
  lvlLabel.x = game.width - lvlLabel.width - 20;
  gui.labels.lvl = lvlLabel;
};

/**
 * Gets the appropriate color given the player's current ammo 
 * @param {number} currentAmmo Current ammunition 
 * @param {number} maxAmmo Maximum ammunition
 * @returns Hex color
 */
const getAmmoColor = (currentAmmo, maxAmmo) => CONDITION_COLORS[Math.floor(currentAmmo / (maxAmmo / 5))];

/**
 * Gets the appropriate color given the player's current health
 * @param {number} hp Current health points
 * @returns Hex color
 */
const getHpColor = hp => CONDITION_COLORS[Math.floor(hp / 20)];

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
	gui.counts.ammo.setColor(getAmmoColor(pistol.currentAmmo, pistol.maxAmmo));
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
  gui.labels.lvl.setText(LEVEL_DATA[game.level - 1].display);
  gui.labels.lvl.x = game.width - gui.labels.lvl.width - 20;
};

/**
 * Refreshes the score count
 */
export const refreshScoreCt = () => {
  gui.counts.score.setText(`$${game.score}`);
};