import { mapInputEvents } from "./controls";
import player, { initPlayerSprite } from "./player";
import game, { loadLevel, setGraphics, setOverlaps } from "./game";
import { handleCollisions, initCollisionCats } from "./collision";
import { LEVEL_IDS } from "../data/levelData";
import { initProgressBar } from "./progressBar";
import { initBounds, setExtendedBounds } from "./bounds";
import { initGui } from "./hud";
import { initPistolSprite } from "./pistol";

/**
 * Creates the base scene
 */
export default function () {
  //Client dims
  initCollisionCats(this.matter.world);
	console.log(this.matter)

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
  initPistolSprite();
  setGraphics(this);
	setOverlaps(this.matter);
  initBounds();
  initProgressBar(this);
}