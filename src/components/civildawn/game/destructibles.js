import { getRandBetween } from "../cdUtils";
import game from "./game";
import collisionCats from "./collision";

/**
 * Destructible type constants
 */
export const DESTRUCTIBLE_TYPES = {
  MISSILE: "destructibleMissile",
  PACKAGE: "destructiblePackage"
};

/**
 * Destructible entity data
 */
const destructibles = [];

export default destructibles;

/**
 * Damages the designated destructible by the given amount
 * @param {string} bodyId Phaser physics body ID
 * @param {number} damage Damage amount
 */
export const damageDestructible = (bodyId, damage) => {
  destructibles.forEach((destructible, i) => {
    if (destructible.sprite.body && destructible.sprite.body.id === bodyId) {
      destructible.hp -= damage;
    }
  });
};

/**
 * Deletes the destructible with the given body ID
 * @param {number} bodyId Phaser body ID for entity
 */
export const deleteDestructible = bodyId => {
  destructibles.forEach((destructible, i) => {
    if (destructible.sprite.body && destructible.sprite.body.id === bodyId) {
      destructible.sprite.destroy();
      destructibles.splice(i, 1);
      i -= 1;
    }
  });
};

/**
 * Creates a destructible of the given type
 * @param {string} destructibleType Destructible type sprite asset key
 * @param {number} powerupId Powerup ID of contained powerup
 * @returns Created destructible
 */
export const makeDestructible = (destructibleType, powerupId) => {
  let destructible;
  let sprite = game.scene.matter.add.sprite(
    game.width + 270,
    100,
    destructibleType
  );
  switch (destructibleType) {
    case DESTRUCTIBLE_TYPES.MISSILE:
      destructible = makeMissileDestructible(sprite, powerupId);
      break;
    case DESTRUCTIBLE_TYPES.PACKAGE:
      destructible = makePackageDestructible(sprite);
      break;
    default:
      break;
  }
  destructibles.push(destructible);
	return destructible;
};

/**
 * Adds a missile destructible at the given position that drops a powerup when destroyed
 * @param {Phaser.Physics.Matter.Sprite} sprite Base destructible sprite
 * @param {number} powerupId Powerup ID of contained powerup
 * @returns {object} Missile destructible
 */
const makeMissileDestructible = (sprite, powerupId) => {
  sprite.setBody({
    type: "rectangle",
    width: 120,
    height: 20
  });
  sprite.setIgnoreGravity(true);
  sprite.setCollisionCategory(collisionCats.DESTRUCTIBLE);
  sprite.setPosition(game.width + 270, getRandBetween(70, 200));
  sprite.destructibleType = DESTRUCTIBLE_TYPES.MISSILE;
  sprite.powerupId = powerupId;
  sprite.body.collisionFilter.mask =
    collisionCats.PLAYER & collisionCats.BOUNDARY;
  sprite.body.mass = 0.01;
  const velocity = getRandBetween(-4, -6);
  sprite.onTick = () => {
    sprite.rotation = 0;
    sprite.setVelocityX(velocity);
    if (sprite.x < 0 - sprite.width) {
      deleteDestructible(sprite.body.id);
    }
  };
  console.log(sprite);
  return sprite;
};

/**
 * Adds a package destructible at the given position
 * @param {Phaser.Physics.Matter.Sprite} sprite Base destructible sprite
 * @returns {object} Missile destructible
 */
const makePackageDestructible = sprite => {
  sprite.setBody({
    type: "circle",
    radius: 16
  });
  sprite.destructibleType = DESTRUCTIBLE_TYPES.PACKAGE;
  sprite.powerupId = powerupId;
  sprite.damage = 0;
  sprite.scale = 1.25;
  sprite.setIgnoreGravity(true);
  sprite.setCollisionCategory(collisionCats.DESTRUCTIBLE);
  sprite.body.collisionFilter.mask =
    collisionCats.PLAYER & collisionCats.BOUNDARY;
  sprite.body.mass = 0.01;
  const velocity = getRandBetween(-4, -6);
  sprite.onTick = () => {
    sprite.rotation = 0;
    sprite.setVelocityX(velocity);
    if (sprite.x < 0 - sprite.width) {
      deleteDestructible(sprite.body.id);
    }
  };
  console.log(sprite);
  return sprite;
};

/**
 * Updates destructible entities on tick
 */
export const updateDestructibles = () => destructibles.forEach(d => d.onTick());