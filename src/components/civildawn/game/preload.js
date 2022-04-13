import { LEVEL_DATA } from "../data/levelData";
import { POWERUP_NAMES } from "./powerups";

/**
 * Preloads game assets
 */
export default function () {
  const bg = str => `civildawn/assets/bg/${str}.png`;
  const pa = str => `civildawn/assets/particles/${str}.png`;
  const png = str => `civildawn/assets/${str}.png`;
  const pu = str => `civildawn/assets/powerups/${str}.png`;
  const d = str => `civildawn/assets/destructibles/${str}.png`;
  //Backgrounds
  LEVEL_DATA.forEach(lvl => this.load.image(lvl.name, bg(lvl.name)));
  //Sprites
  this.load.spritesheet("player", png("playersprite"), {
    frameWidth: 32,
    frameHeight: 32
  });
  this.load.image("pistol", png("pistol"));
  this.load.image("bullet", png("bullet"));
  this.load.image("gunshot", png("gunshot"));
  this.load.spritesheet("roller", png("rollerspriteV2"), {
    frameWidth: 64,
    frameHeight: 64
  });
  this.load.spritesheet("glider", png("glidersprite"), {
    frameWidth: 80,
    frameHeight: 40
  });
	//Particles
  this.load.image("dust", pa("dust"));
	//Pickups
  this.load.image("pickup", png("pickup"));
  //Powerups
  POWERUP_NAMES.forEach(n => this.load.image(n, pu(n)));
  //Destructibles
  this.load.image("destructibleMissile", d("destructibleMissile"));
  this.load.image("destructiblePackage", d("destructiblePackage"));
  //Pause
  this.load.image("pausedHeader", png("pausedHeader"));
  this.load.image("resumeBtn", png("resumeBtn"));
  this.load.image("optionsBtn", png("optionsBtn"));
  this.load.image("quitBtn", png("quitBtn"));
}