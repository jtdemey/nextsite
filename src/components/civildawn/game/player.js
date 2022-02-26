import { collidingGroup, nonCollidingGroup } from "./collision";
import { gameOver } from "./game";
import { refreshHealthCt } from "./hud";
import { updateGunSprite, updateAimLine } from "./pistol";

/**
 * Player entity and related data
 */
const player = {
  hasControl: true,
  hitCooldown: 0,
  hp: 100,
  isEnteringLevel: false,
  isInvulnerable: false,
  isJumping: false,
  isMovingLeft: false,
  isMovingRight: false,
  isReloading: false,
  jumps: 0,
  jumpHeight: -9,
  maxJumps: 1,
  maxSpeed: 2.5,
  reloadSpeed: 1000,
  scene: null,
  sprite: null,
  velocityModifier: 0.24
};

/**
 * Makes the player jump
 */
player.jump = () => {
  if (player.jumps < player.maxJumps) {
    player.jumps++;
    player.sprite.setVelocityY(player.jumpHeight);
  }
};

/**
 * Player tick update
 */
player.onTick = () => {
  player.sprite.rotation = 0;
  if (player.isMovingLeft) {
    if (player.sprite.body.velocity.x > -(player.maxSpeed + 1)) {
      player.sprite.setVelocityX(
        player.sprite.body.velocity.x - player.velocityModifier
      );
    }
  }
  if (player.isMovingRight) {
    if (player.sprite.body.velocity.x < player.maxSpeed) {
      player.sprite.setVelocityX(
        player.sprite.body.velocity.x + player.velocityModifier
      );
    }
  }
  if (player.isEnteringLevel) {
    player.sprite.setVelocityX(player.sprite.body.velocity.x + 0.15);
    if (player.sprite.x > 100) {
      player.isEnteringLevel = false;
    }
  }
  updateAimLine();
  updateGunSprite();
  if (player.hitCooldown > 0) {
    player.hitCooldown -= 1;
  }
};

/**
 * Associates a reference to the given scene with the player
 * @param {Scene} scene Phaser game scene
 */
player.setScene = scene => {
  player.scene = scene;
};

/**
 * Stops all player movement
 */
player.stopMoving = () => {
  player.isJumping = false;
  player.isMovingLeft = false;
  player.isMovingRight = false;
};

/**
 * Disables player collision
 */
export const disablePlayerCollision = () => {
  player.sprite.body.collisionFilter.mask = 0;
};

/**
 * Creates a fading text alert above the player
 * @param {string} msg Text alert content
 * @param {string} color Hex color
 */
export const fadingPlayerAlert = (msg, color = "#fff") => {
  const text = player.scene.add.text(
    player.sprite.x - player.sprite.width,
    player.sprite.y - 10,
    msg,
    {
      color: color,
      fontFamily: `Coda`,
      fontSize: "1.5rem"
    }
  );
  text.setX(player.sprite.x - text.width / 2);
  player.scene.tweens.add({
    targets: text,
    alpha: 0,
    y: player.sprite.y - 100,
    ease: "Sine.easeOut",
    duration: 1000,
    repeat: 0
  });
};

/**
 * Subtracts the specified amount of HP from the player
 * @param {number} amt Amount to hurt
 */
export const hurtPlayer = amt => {
  if (player.hitCooldown < 1 && player.isInvulnerable === false) {
    player.hitCooldown = 120;
    player.hp = player.hp - amt < 0 ? 0 : player.hp - amt;
    if (player.hp === 0) {
      gameOver();
    }
    fadingPlayerAlert(`-${amt}`, "#b30000");
    refreshHealthCt();
  }
};

/**
 * Initializes the player sprite
 */
export const initPlayerSprite = () => {
  player.sprite = player.scene.matter.add.sprite(50, 190, "player");
  player.sprite.setBody({
    type: "circle",
    radius: 16
  });
  player.sprite.setBounce(0);
  player.scene.anims.create({
    key: "walk",
    frames: player.scene.anims.generateFrameNumbers("player"),
    frameRate: 10,
    yoyo: true,
    repeat: -1
  });
  player.sprite.anims.load("walk");
  player.sprite.anims.play("walk");
	player.sprite.setCollisionGroup(nonCollidingGroup);
};

/**
 * Uses a Phaser Tween to ease the player's X coordinate
 * @param {any} target Target X coordinate for the tween
 * @param {number} time Duration
 * @param {Function} cb Optional callback function
 */
export const tweenPlayerVelocityX = (target, time, cb = undefined) => {
  let velocityModifer = { x: 1 };
  player.scene.tweens.add({
    targets: velocityModifer,
    x: target,
    ease: "Sine.easeInOut",
    duration: time,
    repeat: 0,
    onUpdate: () => player.sprite.setVelocityX(velocityModifer.x),
    onComplete:
      cb === undefined
        ? () => {
            return;
          }
        : cb
  });
};

export default player;