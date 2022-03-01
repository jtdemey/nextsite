import collisionCats from "./collision";
import game from "./game";
import pickups, { consumePickup } from "./pickups";
import player from "./player";
import powerups, { consumePowerup } from "./powerups";

/**
 * Checks for overlaps between the player's sprite and pickup sprites
 */
const checkPlayerPickupOverlap = () => {
  game.scene.matter.overlap(
    player.sprite.body,
    pickups.sprites.map(sprite => sprite.body),
    (bodyA, bodyB) =>
      consumePickup(
        bodyA.collisionFilter.category === collisionCats.PICKUP
          ? bodyA.id
          : bodyB.id
      )
  );
};

/**
 * Checks for overlaps between the player's sprite and powerup sprites
 */
const checkPlayerPowerupOverlap = () => {
  game.scene.matter.overlap(
    player.sprite.body,
    powerups.sprites.map(sprite => sprite.body),
    (bodyA, bodyB) =>
      consumePowerup(
        bodyA.collisionFilter.category === collisionCats.POWERUP
          ? bodyA.id
          : bodyB.id
      )
  );
};

/**
 * Checks for all overlaps and invokes listeners upon overlap
 */
export const updateOverlaps = () => {
	checkPlayerPickupOverlap();
  checkPlayerPowerupOverlap();
};