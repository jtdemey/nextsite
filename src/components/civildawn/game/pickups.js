import { getRandBetween, getRandomProperty } from "../cdUtils";
import collisionCats, { nonCollidingGroup } from "./collision";
import game from "./game";
import { addGameEvent } from "./gameEvents";
import ground from "./ground";
import { fadingPlayerAlert } from "./player";

/**
 * Creates a pickup pattern object
 * @param {number[] || number} amount Amount of pickups in pattern or range of amounts
 * @param {number[] || number} stagger Duration between spawning each pickup in pattern or range of stagger amounts
 * @param {number[] || number} heights Either an array of length {amount} or a single number specifying heights to spawn pickups
 * @returns Pickup pattern object
 */
const genPickupPattern = (amount, stagger, heights) => ({
  amount,
  stagger,
  heights
});

/**
 * Different pickup spawn patterns
 */
const PICKUP_PATTERNS = {
  GROUND_LINE: genPickupPattern([3, 9], [40, 90], 30),
  MID_LINE: genPickupPattern([3, 8], [40, 90], 90),
  HIGH_LINE: genPickupPattern([3, 7], [40, 90], 140),
  SHORT_ARC: genPickupPattern(3, 60, [70, 120, 70]),
  MID_ARC: genPickupPattern(5, [60, 80], [100, 140, 160, 140, 100]),
  LONG_ARC: genPickupPattern(7, [60, 90], [100, 140, 170, 190, 170, 140, 100]),
  TRIPLET: genPickupPattern(3, [40, 50], 120),
  COLUMN: genPickupPattern(3, 0, [60, 100, 140]) 
};

/**
 * Contains state of pickup-related entities
 */
const pickups = {
  isSpawningPickups: false,
	isSpawningQueued: false,
  pickupLine: undefined,
	spawnDelay: 0,
  sprites: []
};

export default pickups;

/**
 * Begins spawning pickups
 * @param {object} pattern Optional pickup pattern object, randomly chooses one if not provided
 */
export const beginSpawningPickups = (pattern = undefined) => {
  pickups.isSpawningPickups = true;
  const selectedPattern =
    pattern ??
    getRandomProperty(PICKUP_PATTERNS);
  const selectedStagger = Array.isArray(selectedPattern.stagger)
		? getRandBetween(selectedPattern.stagger[0], selectedPattern.stagger[1])
		: selectedPattern.stagger;
  const spawnCount = Array.isArray(selectedPattern.amount)
		?	getRandBetween(selectedPattern.amount[0], selectedPattern.amount[1])
		: selectedPattern.amount;
  const currentTick = game.tick;
  for (let i = 0; i < spawnCount; i++) {
		const currentHeight = Array.isArray(selectedPattern.heights)
			? selectedPattern.heights[i]
			: selectedPattern.heights;
    addGameEvent(currentTick + (i + 1) * selectedStagger, () =>
      spawnPickup(currentHeight)
    );
  }
  addGameEvent(currentTick + (spawnCount + 1) * selectedStagger, () => {
    pickups.isSpawningPickups = false;
  });
};

/**
 * Consumes the pickup specified by the given body ID
 * @param {number} pickupBodyId Phaser Matter physics body ID
 */
export const consumePickup = pickupBodyId => {
	const collectedPickup = pickups.sprites.filter(sprite => sprite.body.id === pickupBodyId)[0];
	if (!collectedPickup || collectedPickup.isConsumed === true) return;
	collectedPickup.isConsumed = true;
	const score = 10;
	game.score += score;
	fadingPlayerAlert(`+${score}`);
  game.scene.tweens.add({
    targets: collectedPickup,
    alpha: 0,
    scaleX: 0.5,
    scaleY: 0.5,
    ease: "Sine.easeOut",
    duration: 360,
    repeat: 0,
    onComplete: () => deletePickup(pickupBodyId)
  });
};

/**
 * Deletes the pickup specified by the provided body ID
 * @param {number} bodyId Phaser physics body ID
 */
export const deletePickup = bodyId => {
  pickups.sprites.forEach((pickup, i) => {
    if (pickup.body.id === bodyId) {
      pickup.destroy();
      pickups.sprites.splice(i, 1);
      i -= 1;
    }
  });
};

/**
 * Creates and returns a pickup sprite at the given position
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @returns Pickup sprite
 */
export const makePickup = (x, y) => {
  const pickup = game.scene.matter.add.sprite(x, y, "pickup");
	pickup.isConsumed = false;
  pickup.setIgnoreGravity(true);
  pickup.setCollisionCategory(collisionCats.PICKUP);
  pickup.setCollisionGroup(nonCollidingGroup);
  pickup.setScale(0.12, 0.12);
  pickups.sprites.push(pickup);
  return pickup;
};

/**
 * Initializes the vertical line on which pickups are spawned
 */
export const initPickupLine = () => {
  pickups.pickupLine = new Phaser.Geom.Line(
    game.width + 50,
    0,
    game.width + 50,
    game.height
  );
};

/**
 * Translates each pickup left by the given speed
 * @param {number} speed Speed at which to scroll
 */
export const scrollPickups = speed => {
  pickups.sprites.forEach(pickup => {
    pickup.x -= speed;
		if (pickup.x < -50) {
			deletePickup(pickup.body.id);
		}
  });
};

/**
 * Spawns a pickup using the pickup line
 * @param {number} height Distance from the ground to the new pickup
 * @param {boolean} isLarge Spawns a larger, more valuable pickup if true
 */
export const spawnPickup = (height = 100, isLarge = false) => {
  if (game.isTransitioningLevels === true) return;
  let outPt = new Phaser.Geom.Point(0, 0);
  const intersectingPoints = [];
  ground.paths.forEach(path => {
    path.forEach((pt, i) => {
      if (!path[i + 1]) return;
      if (
        Phaser.Geom.Intersects.LineToLine(
          new Phaser.Geom.Line(pt.x, pt.y, path[i + 1].x, path[i + 1].y),
          pickups.pickupLine,
          outPt
        )
      ) {
        intersectingPoints.push(outPt);
      }
    });
  });
  if (intersectingPoints.length < 1) return;
  const destinationPoint = intersectingPoints.sort((a, b) => a.y + b.y)[0];
  makePickup(destinationPoint.x, destinationPoint.y - height);
};