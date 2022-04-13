import { getRandBetween } from "../cdUtils";
import game from "./game";
import collisionCats from "./collision";
import { nanoid } from "nanoid";

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
 * @param {string} destructibleId Destructible ID
 * @param {number} damage Damage amount
 */
export const damageDestructible = (destructibleId, damage) => {
  destructibles.forEach(destructible => {
    if (destructible.destructibleId === destructibleId) {
      destructible.hp -= damage;
			if (destructible.hp < 1) {
				destroyDestructible(destructible.destructibleId);
			}
    }
  });
};

/**
 * Destroys the specified destructible
 * @param {number} destructibleId Destructible ID
 */
const destroyDestructible = destructibleId => {
	const d = getDestructible(destructibleId);
	if (!d) return;
	if (d.onDestroy) {
		d.onDestroy();
	}
	deleteDestructible(d.sprite.body.id);
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
 * Gets a destructible by its Destructible ID
 * @param {number} destructibleId Destructible ID
 * @returns Destructible with specified ID or undefined if not found
 */
const getDestructible = destructibleId => destructibles.filter(d => d.destructibleId === destructibleId)[0] ?? undefined;

/**
 * Creates a destructible of the given type
 * @param {string} destructibleType Destructible type sprite asset key
 * @returns Created destructible
 */
export const makeDestructible = destructibleType => {
  let destructible;
  let sprite = game.scene.matter.add.sprite(
    game.width + 270,
    100,
    destructibleType
  );
  switch (destructibleType) {
    case DESTRUCTIBLE_TYPES.MISSILE:
      destructible = makeMissileDestructible(sprite);
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
 * Creates a base destructible
 * @param {object} param0 Object representing a destructible
 * @returns Destructible object
 */
const makeBaseDestructible = ({ destructibleId, destructibleType, hp, onTick, speed, sprite }) => ({
  destructibleId,
	destructibleType,
  hp,
  onTick,
  speed,
  sprite
});

/**
 * Adds a missile destructible at the given position that drops a powerup when destroyed
 * @param {Phaser.Physics.Matter.Sprite} sprite Base destructible sprite
 * @returns {object} Missile destructible
 */
const makeMissileDestructible = sprite => {
  sprite.setBody({
    type: "rectangle",
    width: 120,
    height: 20
  });
  sprite.setIgnoreGravity(true);
  sprite.setCollisionCategory(collisionCats.DESTRUCTIBLE);
  sprite.setPosition(game.width + 270, getRandBetween(70, 200));
  sprite.body.collisionFilter.mask =
    collisionCats.PLAYER & collisionCats.BOUNDARY;
  sprite.body.mass = 0.01;
  const velocity = getRandBetween(-7, -11);
  const onTick = () => {
    sprite.rotation = 0;
    sprite.setVelocityX(velocity);
    if (sprite.x < 0 - sprite.width) {
      deleteDestructible(sprite.body.id);
    }
  };
  return makeBaseDestructible({
		destructibleId: nanoid(16),
		destructibleType: DESTRUCTIBLE_TYPES.MISSILE,
		hp: 1,
		onTick,
		speed: velocity,
		sprite
	});
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