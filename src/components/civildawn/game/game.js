import { disableBoundCollision, enableBoundCollision } from "./bounds";
import ground, { makeGroundSegments } from "./ground";
import { LEVEL_IDS, LEVEL_DATA } from "../data/levelData";
import { spawnCheck, killAllEnemies } from "./enemies";
import { getRandBetween } from "../cdUtils";
import player, { tweenPlayerVelocityX, fadingPlayerAlert } from "./player";
import { showPauseMenu, hidePauseMenu } from "../pausemenu/pauseMenu";
import { refreshLvlLabel, refreshGui } from "./hud";
import { attemptPowerupSpawn, deleteAllPowerups } from "./powerups";
import pistol, { reloadPistol } from "./pistol";
import { addGameEvent, executeGameEvents } from "./gameEvents";
import { attemptSpawningPickups } from "./pickups";
import { resetCamera } from "./camera";

/**
 * Civil Dawn game object
 */
const game = {
  background: null,
  enemySpawnDist: null,
  enemySpawnRange: 100,
  graphics: null,
  width: 800,
  height: 600,
  isTransitioningLevels: false,
  level: LEVEL_IDS.DUSK,
  levelStartTick: 0,
  nextLevelTick: 0,
	pauseCooldown: 0,
  paused: false,
  scene: null,
  score: 0,
  speed: 2,
  tick: 0
};

/**
 * Game tick function
 */
game.onTick = () => {
  game.graphics.clear();
  game.tick += 1;
	if (game.pauseCooldown > 0) {
		game.pauseCooldown -= 1;
	}
  if (game.tick % 10 === 0) {
    spawnCheck();
  }
  if (game.tick % 500 === 0) {
    attemptPowerupSpawn();
    //const newTint = game.background.tintTopLeft - (game.tick - game.levelStartTick);
    //game.background.setTint(newTint, newTint, newTint, newTint);
  }
  if (game.tick % 800 === 0) {
    attemptSpawningPickups();
  }
  executeGameEvents();

  //Debug
  //game.graphics.strokeLineShape(pistol.aimLine);
};

/**
 * Sets the game scene
 * @param {Scene} scene Phaser Scene object
 */
game.setScene = scene => {
  game.scene = scene;
};

export default game;

/**
 * Advances the game to the next level
 */
export const advanceLevel = () => {
  const currentSpeed = game.speed;
	const lvlScore = 100 * game.level;
  increaseScore(lvlScore);
  fadingPlayerAlert(`$${lvlScore}`);
  game.isTransitioningLevels = true;
  player.hasControl = false;
  player.isInvulnerable = true;
  disableBoundCollision();
  killAllEnemies();
  deleteAllPowerups();
  tweenPlayerVelocityX(-10, 2000, () => {
    player.sprite.visible = false;
    pistol.sprite.visible = false;
  });
  reloadPistol();

  game.scene.tweens.add({
    targets: game,
    ease: "Sine.easeInOut",
    duration: 3000,
    repeat: 0,
    speed: 8,
    onComplete: () => {
      loadLevel(game.scene, game.level + 1);
      player.sprite.visible = true;
      pistol.sprite.visible = true;
      player.sprite.x = -100;
      game.scene.tweens.add({
        targets: player.sprite,
        x: 100,
        ease: "Sine.easeInOut",
        duration: 2000,
        repeat: 0,
        speed: 1
      });
      game.scene.tweens.add({
        targets: game,
        ease: "Sine.easeInOut",
        duration: 2000,
        repeat: 0,
        speed: currentSpeed + game.level * 0.25,
        onComplete: () => {
          player.stopMoving();
          player.hasControl = true;
          player.isInvulnerable = false;
          enableBoundCollision();
          setTimeout(() => {
            game.isTransitioningLevels = false;
          }, 3000);
        }
      });
    }
  });
};

/**
 * Triggers "Game Over" state
 */
export const gameOver = () => {
  resetCamera();
  player.hasControl = false;
  pistol.sprite.setIgnoreGravity(false);
  pistol.sprite.setVelocityX(3);
  pistol.sprite.setVelocityY(-10);
  addGameEvent(game.tick + 50, () => {
    game.paused = true;
  });
};

/**
 * Increases the player's score by the given money amount
 * @param {number} amt Money amount
 */
export const increaseScore = amt => {
  game.score += amt;
  refreshGui();
};

/**
 * Loads the given level
 * @param {Scene} scene Current Phaser scene
 * @param {number} lvlId Civil Dawn level ID
 */
export const loadLevel = (scene, lvlId) => {
  const lvlData = LEVEL_DATA[lvlId - 1];
  game.level = lvlId;
  refreshLvlLabel();
  game.levelStartTick = game.tick;
  game.nextLevelTick = game.tick + 2000;
  game.enemySpawnRange = lvlData.enemySpawnRange;
  ground.widthRange = lvlData.groundWidthRange;
  ground.altRange = [
    game.height - lvlData.groundAltRange[0],
    game.height - lvlData.groundAltRange[1]
  ];
  setBackground(scene, lvlId);
  makeGroundSegments(10);
};

/**
 * Gets the given level's level data
 * @param {number} level Game level
 * @returns Level data object for the provided level
 */
export const getLevelData = level =>
  LEVEL_DATA[level - 1] ?? undefined;

/**
 * Pauses the game
 */
export const pauseGame = () => {
  game.paused = true;
  player.hasControl = false;
  game.scene.matter.world.pause();
  pistol.reloadTween?.pause();
  game.scene.tweens.pauseAll();
  showPauseMenu();
};

/**
 * Selects a new random spawn distance for the next spawned enemy
 */
export const rollNextEnemySpawnDist = () => {
  game.enemySpawnDist = getRandBetween(
    game.enemySpawnRange[0],
    game.enemySpawnRange[1]
  );
};

let initialBgTint;
/**
 * Sets the background image of the game
 * @param {Scene} scene Current Phaser scene
 * @param {number} lvlId Civil Dawn level ID
 */
export const setBackground = (scene, lvlId) => {
  game.background = scene.add
    .image(0, 0, LEVEL_DATA[lvlId - 1].name)
    .setOrigin(0);
  game.background.width = game.width;
  game.background.height = game.height;
  game.background.setDepth(-1);
};

/**
 * Adds a Phaser Graphics object to the given scene
 * @param {Scene} scene Current Phaser scene
 */
export const setGraphics = scene => {
  game.graphics = scene.add.graphics({
    fillStyle: {
      color: 0x000000
    },
    lineStyle: {
      width: 2,
      color: "#000"
    }
  });
};

/**
 * Toggles game pause state
 */
export const togglePause = () => {
	if (game.pauseCooldown > 0) return;
  if (game.paused === true) {
    unpauseGame();
		game.pauseCooldown = 200;
		return;
  }
	pauseGame();
};

/**
 * Unpauses the game
 */
export const unpauseGame = () => {
  game.paused = false;
  player.hasControl = true;
  game.scene.matter.world.resume();
  pistol.reloadTween?.resume();
  game.scene.tweens.resumeAll();
  hidePauseMenu();
};