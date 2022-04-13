import { mapInputEvents } from "./controls";
import player, { initPlayerSprite } from "./player";
import game, { loadLevel, setGraphics } from "./game";
import { handleCollisions, initCollisionCats, initCollisionGroups } from "./collision";
import { LEVEL_IDS } from "../data/levelData";
import { initProgressBar } from "./progressBar";
import { initBounds, setExtendedBounds } from "./bounds";
import { initGui } from "./hud";
import { initPistolSprite } from "./pistol";
import { beginSpawningPickups, initPickupLine } from "./pickups";
import { initParticles } from "./particles";

/**
 * Creates the base scene
 */
export default function () {
  //Client dims
  initCollisionCats(this.matter.world);
	initCollisionGroups(this.matter.world);

  //Inputs
  mapInputEvents(this.input);

  //Prep
  player.setScene(this);
  game.setScene(this);
  setExtendedBounds();
  this.matter.world.on("collisionstart", e => handleCollisions(e));

  //Init
  initGui();
  loadLevel(this, LEVEL_IDS.CIVIL_DUSK);
  initPlayerSprite();
	initParticles();
  initPistolSprite();
  setGraphics(this);
  initBounds();
	initPickupLine();
  initProgressBar(this);
	beginSpawningPickups();
}