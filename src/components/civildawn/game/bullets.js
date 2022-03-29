import Phaser from "phaser";
import game from "./game";
import { getPhaserColorFromHex, xPos, yPos } from "../cdUtils";
import collisionCats from "./collision";
import pistol from "./pistol";

/**
 * Sprite data for bullet tracers and hits
 */
const bullets = {
  hits: [],
  shells: []
};

export default bullets;

/**
 * Adds a hit effect sprite to the given position
 * @param {Vec2} pt Phaser position
 */
export const addHit = pt => {
  const hit = new Phaser.Geom.Circle(pt.x - 8, pt.y, 2.5);
  if (pt.enemyId) {
    hit.enemyId = pt.enemyId;
    hit.enemySpeed = pt.enemySpeed;
  }
  game.scene.tweens.add({
    targets: hit,
    radius: 16,
    ease: "Sine.easeOut",
    duration: 240,
    repeat: 0
  });
  bullets.hits.push(hit);
};

/**
 * Adds a bullet casing which leaves the pistol and falls to the ground
 */
export const addShell = () => {
  const shell = game.scene.matter.add.image(
    xPos(pistol.sprite),
    yPos(pistol.sprite) - 5,
    "bullet"
  );
	if (!shell) {
		console.error("Error creating shell");
	}
	shell.setScale(1.1, 1.1);
  shell.setVelocity(-3, -4);
  shell.body.collisionFilter.category = collisionCats.BULLET;
  setTimeout(() => shell.destroy(), 500);
  bullets.shells.push(shell);
};

/**
 * Gets the Phaser.Display.Align value corresponding to the given angle
 * @param {number} a The angle in degrees of a tracer sprite
 * @returns Phaser.Display.Align value
 */
const getTracerAlignment = a => {
  if (a > -89 && a < 0) {
    return Phaser.Display.Align.BOTTOM_LEFT;
  } else if (a >= 0 && a < 90) {
    return Phaser.Display.Align.TOP_LEFT;
  } else if (a >= 90 && a < 180) {
    return Phaser.Display.Align.TOP_RIGHT;
  } else {
    return Phaser.Display.Align.BOTTOM_RIGHT;
  }
};

/**
 * Adds a tracer sprite that starts from the pistol and quickly fades
 * @param {number} distance The distance between the pistol and the target
 */
export const addTracer = distance => {
  const anchor = pistol.aimLine.getPoint(0.01);
  const gunshot = game.scene.matter.add.image(
    pistol.sprite.x,
    pistol.sprite.y,
    "gunshot"
  );
  gunshot.setScale(distance * 0.0065, 1);
  gunshot.setCollisionCategory(0);
  gunshot.setIgnoreGravity(true);
  gunshot.angle = Phaser.Math.RadToDeg(Phaser.Geom.Line.Angle(pistol.aimLine));
  game.scene.matter.alignBody(
    gunshot.body,
    anchor.x,
    anchor.y,
    getTracerAlignment(gunshot.angle)
  );
  game.scene.tweens.add({
    targets: gunshot,
    alpha: 0,
    ease: "Sine.easeOut",
    duration: 200,
    repeat: 0,
    onComplete: () => gunshot.destroy()
  });
};

/**
 * Updates bullet sprites
 */
export const updateBullets = () => {
  game.graphics.fillStyle(getPhaserColorFromHex("#fff280"));
  bullets.hits.forEach((hit, i) => {
    if (hit.enemyId) {
      hit.x -= hit.enemySpeed;
    } else {
      hit.x -= game.speed;
    }
    game.graphics.fillCircle(hit.x, hit.y, hit.radius);
    if (hit.radius > 15) {
      bullets.hits.splice(i, 1);
      i -= 1;
    }
  });
};