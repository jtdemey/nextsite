import { getRandBetween } from "../cdUtils";
import game from "./game";
import collisionCats from "./collision";

/**
 * Destructible type constants
 */
export const DESTRUCTIBLE_TYPES = {
  MISSILE: "powerupMissile",
  PACKAGE: "powerupPackage"
};

/**
 * Destructible entity data
 */
const destructibles = {
  sprites: []
};

export default destructibles;

/**
 * Adds a missile destructible at the given position that drops a powerup when destroyed
 * @param {number} x X position
 * @param {number} y Y position
 * @param {number} powerupId Civil Dawn powerup ID of contained powerup
 */
export const addMissileDestructible = (x, y, powerupId) => {
  const item = game.scene.matter.add.sprite(x, y, DESTRUCTIBLE_TYPES.PACKAGE);
  item.setBody({
    type: "circle",
    radius: 16
  });
  item.destructibleType = DESTRUCTIBLE_TYPES.PACKAGE;
  item.powerupId = powerupId;
  item.damage = 0;
  item.scale = 1.25;
  item.setIgnoreGravity(true);
  item.setCollisionCategory(collisionCats.DESTRUCTIBLE);
  item.body.collisionFilter.mask =
    collisionCats.PLAYER & collisionCats.BOUNDARY;
  item.body.mass = 0.01;
  item.onTick = () => {
    item.rotation = 0;
    item.setVelocityX(getRandBetween(-4, -6));
    if (item.x < 0 - item.width) {
      deleteDestructible(item.body.id);
    }
  };
  console.log(item);
  destructibles.sprites.push(item);
};

/**
 * Adds a package destructible at the given position
 * @param {number} x X position
 * @param {number} y Y position
 * @param {number} powerupId Civil Dawn powerup ID
 */
export const addPackageDestructible = (x, y, powerupId) => {
  const item = game.scene.matter.add.sprite(x, y, DESTRUCTIBLE_TYPES.PACKAGE);
  item.setBody({
    type: "circle",
    radius: 16
  });
  item.destructibleType = DESTRUCTIBLE_TYPES.PACKAGE;
  item.powerupId = powerupId;
  item.damage = 0;
  item.scale = 1.25;
  item.setIgnoreGravity(true);
  item.setCollisionCategory(collisionCats.DESTRUCTIBLE);
  item.body.collisionFilter.mask =
    collisionCats.PLAYER & collisionCats.BOUNDARY;
  item.body.mass = 0.01;
  item.onTick = () => {
    item.rotation = 0;
    item.setVelocityX(getRandBetween(-4, -6));
    if (item.x < 0 - item.width) {
      deleteDestructible(item.body.id);
    }
  };
  console.log(item);
  destructibles.sprites.push(item);
};

/**
 * Deletes the destructible with the given body ID
 * @param {number} bodyId Phaser body ID for entity
 */
export const deleteDestructible = bodyId => {
  destructibles.sprites.forEach((sprite, i) => {
    if (sprite.body.id === bodyId) {
      sprite.destroy();
      destructibles.sprites.splice(i, 1);
      i -= 1;
    }
  });
};

/**
 * Updates destructible entities on tick
 */
export const updateDestructibles = () =>
  destructibles.sprites.forEach(d => d.onTick());