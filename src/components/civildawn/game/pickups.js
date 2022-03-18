import collisionCats, { nonCollidingGroup } from "./collision";
import game from "./game";
import ground from "./ground";

/**
 * Contains state of pickup-related entities
 */
const pickups = {
  pickupLine: undefined,
  sprites: []
};

export default pickups;

export const consumePickup = pickup => {};

/**
 * Creates and returns a pickup sprite at the given position
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @returns Pickup sprite
 */
export const makePickup = (x, y) => {
  const pickup = game.scene.matter.add.sprite(x, y, "pickup");
  pickup.setIgnoreGravity(true);
  pickup.setCollisionCategory(collisionCats.PICKUP);
  pickup.setCollisionGroup(nonCollidingGroup);
  pickup.setScale(0.12, 0.12);
  pickups.sprites.push(pickup);
  // console.log(pickup.x, pickup.y);
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
  });
};

/**
 * Spawns a pickup using the pickup line
 * @param {number} height Distance from the ground to the new pickup
 */
export const spawnPickup = (height = 100) => {
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
  console.log(destinationPoint);
  makePickup(destinationPoint.x, destinationPoint.y - height);
};