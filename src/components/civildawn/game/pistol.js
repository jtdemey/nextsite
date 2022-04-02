import Phaser from "phaser";
import {
  getLineLength,
  getHypotenuseAngle,
  getDistBetweenPts,
  getPhaserColorFromHex,
  xPos,
  yPos,
	getRandBetween
} from "../cdUtils";
import controls from "./controls";
import game from "./game";
import collisionCats, { detectAimLineHits } from "./collision";
import { addShell, addTracer, addHit } from "./bullets";
import { hurtEnemy } from "./enemies";
import player from "./player";
import { refreshAmmoCt } from "./hud";
import { damageDestructible } from "./destructibles";

/**
 * Pistol entity and related data
 */
const pistol = {
  aimLine: null,
  currentAmmo: 10,
  damage: 40,
  maxAmmo: 10,
  position: null,
  range: 600,
  reloadBar: null,
  reloadFill: null,
  reloadTween: null,
  sprite: null
};

export default pistol;

/**
 * Initializes the pistol sprite
 */
export const initPistolSprite = () => {
  pistol.sprite = game.scene.matter.add.image(60, 190, "pistol");
  pistol.sprite.setScale(0.15, 0.15);
  pistol.sprite.setIgnoreGravity(true);
  pistol.sprite.body.collisionFilter.mask = 0;
  pistol.aimLine = new Phaser.Geom.Line(
    pistol.sprite.body.position.x,
    pistol.sprite.body.position.y,
    500,
    500
  );
};

/**
 * Reloads the pistol
 */
export const reloadPistol = () => {
  if (player.isReloading === true) return;
  pistol.currentAmmo = 0;
  player.isReloading = true;
  refreshAmmoCt();
  pistol.reloadBar = player.scene.add.rectangle(
    player.sprite.body.position.x,
    player.sprite.body.position.y + 9,
    120,
    18,
    getPhaserColorFromHex("#000000")
  );
  pistol.reloadFill = player.scene.add.rectangle(
    player.sprite.body.position.x - 60,
    player.sprite.body.position.y + 11,
    1,
    16,
    getPhaserColorFromHex("#00e600")
  );
  tossMag();
  pistol.reloadTween = player.scene.tweens.add({
    targets: pistol.reloadFill,
    width: 120,
    ease: "Linear",
    duration: player.reloadSpeed,
    repeat: 0,
    onComplete: () => {
      pistol.currentAmmo = pistol.maxAmmo;
      player.isReloading = false;
      pistol.reloadBar.destroy();
      pistol.reloadFill.destroy();
      refreshAmmoCt();
      pistol.reloadTween = null;
    }
  });
};

/**
 * Fires a bullet from the pistol where the player is aiming
 */
export const shoot = () => {
  if (player.hasControl === false) return;
  if (pistol.currentAmmo < 1) {
    if (player.isReloading === false) {
      reloadPistol();
    }
    return;
  }
  const hits = detectAimLineHits();
  addShell();
  if (!hits.closestPt) {
    addTracer(800);
  } else {
    addHit(hits.closestPt);
    const dist = getDistBetweenPts(
      hits.closestPt.x,
      hits.closestPt.y,
      pistol.sprite.body.position.x,
      pistol.sprite.body.position.y
    );
    if (dist > 400) {
      addTracer(dist);
    }
		if (hits.closestPt.destructibleType) {
			damageDestructible(hits.closestPt.destructibleId);
		}
    if (hits.closestPt.enemyId) {
      hurtEnemy(hits.closestPt.enemyId, pistol.damage);
    }
  }
  if (pistol.currentAmmo > 0) {
    pistol.currentAmmo--;
  }
  refreshAmmoCt();
};

/**
 * Tosses the pistol magazine behind the player
 */
const tossMag = () => {
  const mag = game.scene.matter.add.image(
    xPos(pistol.sprite),
    yPos(pistol.sprite) - 5,
    "bullet"
  );
  mag.setScale(3, 2);
  mag.setVelocity(getRandBetween(-5, -2), getRandBetween(-6, -8));
  mag.body.collisionFilter.category = collisionCats.BULLET;
  setTimeout(() => mag.destroy(), 750);
};

/**
 * Updates the line between the pistol and the player's cursor position
 */
export const updateAimLine = () => {
  pistol.aimLine.x1 = player.sprite.body.position.x;
  pistol.aimLine.y1 = player.sprite.body.position.y;
  pistol.aimLine.x2 = controls.mouseX;
  pistol.aimLine.y2 = controls.mouseY;
};

/**
 * Updates the gun sprite
 */
export const updateGunSprite = () => {
  pistol.position = pistol.aimLine.getPoint(
    24 / getLineLength(pistol.aimLine),
    pistol.sprite.body
  );
  if (controls.mouseX - pistol.sprite.body.position.x < 0) {
    pistol.sprite.angle =
      Math.floor(
        100 *
          getHypotenuseAngle(
            controls.mouseY - pistol.sprite.body.position.y,
            controls.mouseX - pistol.sprite.body.position.x
          )
      ) /
        2 -
      180;
  } else {
    pistol.sprite.angle =
      Math.floor(
        100 *
          getHypotenuseAngle(
            controls.mouseY - pistol.sprite.body.position.y,
            controls.mouseX - pistol.sprite.body.position.x
          )
      ) / 2;
  }
  pistol.sprite.setPosition(pistol.position.x, pistol.position.y);

  if (player.isReloading) {
    pistol.reloadBar.x = player.sprite.body.position.x;
    pistol.reloadBar.y = player.sprite.body.position.y - 52;
    pistol.reloadFill.x = player.sprite.body.position.x - 60;
    pistol.reloadFill.y = player.sprite.body.position.y - 52;
  }
};