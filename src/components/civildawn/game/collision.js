import Phaser from "phaser";
import player, { hurtPlayer } from "./player";
import enemies from "./enemies";
import { getClosestPtTo } from "../cdUtils";
import { DESTRUCTIBLE_TYPES } from "./destructibles";
import ground from "./ground";
import { consumePowerup } from "./powerups";
import pistol from "./pistol";
import destructibles from "./destructibles";

const COLLISION_CAT_NAMES = [
  "PLAYER",
  "GROUND",
  "ENEMY",
  "CONSUMABLE",
  "BULLET",
  "BOUNDARY",
  "DESTRUCTIBLE",
  "PICKUP"
];

const collisionCats = {};

export default collisionCats;

export let collidingGroup;

export let nonCollidingGroup;

/**
 * Detects collisions between the player and enemies
 * @param {CollisionPair} pair Phaser collision pair
 */
const checkPlayerEnemyColl = pair => {
  if (
    detectCatColl(
      pair.bodyA,
      pair.bodyB,
      collisionCats.PLAYER,
      collisionCats.ENEMY
    )
  ) {
    const enemy =
      pair.bodyA.collisionFilter.category === collisionCats.ENEMY
        ? pair.bodyA
        : pair.bodyB;
    hurtPlayer(enemy.damage);
  }
};

/**
 * Detects collisions between the player and the ground
 * @param {CollisionPair} pair Phaser collision pair
 */
const checkPlayerGroundColl = pair => {
  if (
    (pair.bodyA.id === player.sprite.body.id &&
      pair.bodyB.collisionFilter.category === collisionCats.GROUND) ||
    (pair.bodyB.id === player.sprite.body.id &&
      pair.bodyA.collisionFilter.category === collisionCats.GROUND)
  ) {
    if (player.jumps > 0) {
      player.jumps = 0;
    }
  }
};

/**
 * Detects collisions between the player and powerups
 * @param {CollisionPair} pair Phaser collision pair
 * @returns
 */
const checkPlayerPowerupColl = pair => {
  if (
    detectCatColl(
      pair.bodyA,
      pair.bodyB,
      collisionCats.PLAYER,
      collisionCats.CONSUMABLE
    )
  ) {
    if (
      !(
        pair.bodyA.label === "Circle Body" && pair.bodyB.label === "Circle Body"
      )
    ) {
      return;
    }
    const powerupBody =
      pair.bodyA.collisionFilter.category === collisionCats.PLAYER
        ? pair.bodyB
        : pair.bodyA;
    consumePowerup(powerupBody.id);
  }
};

/**
 * Detects if the given sprite body has the given collision category
 * @param {Body} body Phaser sprite body
 * @param {number} cat Collision category
 * @returns True if body's collision category matches, false otherwise
 */
const isCollCat = (body, cat) => body.collisionFilter.category === cat;

/**
 * Detects if two bodies have the two provided collision categories
 * @param {Body} bodyA Phaser sprite body A
 * @param {Body} bodyB Phaser sprite body B
 * @param {number} catA Collision category A
 * @param {number} catB Collision category B
 * @returns True if the one of the provided bodies has catA and the other has catB or vice versa
 */
const detectCatColl = (bodyA, bodyB, catA, catB) =>
  (isCollCat(bodyA, catA) && isCollCat(bodyB, catB)) ||
  (isCollCat(bodyA, catB) && isCollCat(bodyB, catA));

/**
 * Gets an array of intersection points between a game entity and a line
 * @param {object} entity Game entity containing a sprite property
 * @param {Phaser.Geom.Line} line Line to check for intersections along
 */
const getLineAndShapeIntersections = (entity, line) => {
  if (entity.sprite.body.label === "Circle Body") {
    const circle = new Phaser.Geom.Circle(
      entity.sprite.body.position.x,
      entity.sprite.body.position.y,
      entity.sprite.body.circleRadius
    );
    return Phaser.Geom.Intersects.GetLineToCircle(line, circle);
  } else if (entity.sprite.body.label === "Rectangle Body") {
    const rect = new Phaser.Geom.Rectangle(
      entity.sprite.body.position.x - entity.sprite.width / 2,
      entity.sprite.body.position.y - entity.sprite.height / 2,
      entity.sprite.width,
      entity.sprite.height
    );
    return Phaser.Geom.Intersects.GetLineToRectangle(line, rect);
  }
};

/**
 * Gets collision points between the aim line and destructibles
 * @returns Array of collision points
 */
const getAimLineDestructibleCollisionPts = () => {
  if (destructibles.length < 1) return [];
  const destHits = [];
  const collectPts = (pts, dId) => {
    if (pts.length) {
      pts.forEach(pt => {
        pt.destructibleId = dId;
        destHits.push(pt);
      });
    }
  };
  destructibles.forEach(d => {
    if (!d.sprite.body) {
      return;
    }
    const intersections = getLineAndShapeIntersections(d, pistol.aimLine);
    collectPts(intersections, d.destructibleId);
  });
  return destHits;
};

/**
 * Gets collision points between the aim line and enemies
 * @returns Array of collision points
 */
const getAimLineEnemyCollisionPts = () => {
  if (enemies.length < 1) return [];
  const enemyHits = [];
  const collectPts = (pts, enemyId, speed) => {
    if (pts.length) {
      pts.forEach(pt => {
        pt.enemyId = enemyId;
        pt.enemySpeed = speed;
        enemyHits.push(pt);
      });
    }
  };
  enemies.forEach(e => {
    if (!e.sprite.body) {
      return;
    }
    const intersections = getLineAndShapeIntersections(e, pistol.aimLine);
    collectPts(intersections, e.enemyId, e.speed);
  });
  return enemyHits;
};

/**
 * Gets collision points between the aim line and the ground
 * @returns Array of collision points
 */
const getAimLineGroundCollisionPts = () => {
  const pts = [];
  let outPt = new Phaser.Geom.Point(0, 0);
  ground.paths.forEach(path => {
    path.forEach((pt, i) => {
      if (!path[i + 1]) return;
      if (
        Phaser.Geom.Intersects.LineToLine(
          new Phaser.Geom.Line(pt.x, pt.y, path[i + 1].x, path[i + 1].y),
          pistol.aimLine,
          outPt
        )
      ) {
        pts.push(new Phaser.Geom.Point(outPt.x, outPt.y));
      }
    });
  });
  return pts;
};

/**
 * Detects collisions when the player shoots
 * @returns Object with closest point, enemy hits, and ground hits
 */
export const detectAimLineHits = () => {
  const destructibleHits = getAimLineDestructibleCollisionPts();
  const enemyHits = getAimLineEnemyCollisionPts();
  const groundHits = getAimLineGroundCollisionPts();
  return {
    closestPt: getClosestPtTo(
      player.sprite.body.position.x,
      player.sprite.body.position.y,
      destructibleHits.concat(enemyHits).concat(groundHits)
    ),
    enemyHits,
    groundHits
  };
};

/**
 * Handles collision events globally
 * @param {Event} event Phaser event
 */
export const handleCollisions = event => {
  event.pairs.forEach(pair => {
    checkPlayerEnemyColl(pair);
    checkPlayerGroundColl(pair);
    checkPlayerPowerupColl(pair);
  });
};

/**
 * Initializes collision categories
 * @param {World} world Phaser world object
 */
export const initCollisionCats = world => {
  const next = () => world.nextCategory();
  COLLISION_CAT_NAMES.forEach((n, i) => {
    if (i === 0) {
      collisionCats[n] = 0x0001;
    } else {
      collisionCats[n] = next();
    }
  });
};

/**
 * Initializes the collision categories with the value found in COLLISION_CAT_NAMES
 * @param {World} world Phaser matter world
 */
export const initCollisionGroups = world => {
  collidingGroup = world.nextGroup();
  nonCollidingGroup = world.nextGroup(true);
};