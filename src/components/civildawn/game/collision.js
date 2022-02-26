import Phaser from "phaser";
import player, { hurtPlayer } from "./player";
import enemies from "./enemies";
import { getClosestPtTo } from "../cdUtils";
import { DESTRUCTIBLE_TYPES } from "./destructibles";
import { ENEMY_TYPES } from "../data/enemyData";
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
 * Gets collision points between the aim line and destructibles
 * @returns Array of collision points
 */
const getAimLineDestructibleCollisionPts = () => {
  const destHits = [];
  let ptContainer;
  const collectPts = dType => {
    if (ptContainer.length) {
      ptContainer.forEach(pt => {
        pt.destructibleType = dType;
        destHits.push(pt);
      });
    }
  };
  destructibles.sprites.forEach(d => {
    if (d.destructibleType === DESTRUCTIBLE_TYPES.PACKAGE) {
      const circle = new Phaser.Geom.Circle(
        d.body.position.x,
        d.body.position.y,
        d.body.circleRadius
      );
      ptContainer = Phaser.Geom.Intersects.GetLineToCircle(
        pistol.aimLine,
        circle
      );
    }
    collectPts(DESTRUCTIBLE_TYPES.PACKAGE);
  });
  return destHits;
};

/**
 * Gets collision points between the aim line and enemies
 * @returns Array of collision points
 */
const getAimLineEnemyCollisionPts = () => {
  const enemyHits = [];
  let ptContainer;
  const collectPts = (enemyId, speed) => {
    if (ptContainer.length) {
      ptContainer.forEach(pt => {
        pt.enemyId = enemyId;
        pt.enemySpeed = speed;
        enemyHits.push(pt);
      });
    }
  };
  enemies.forEach(e => {
    ptContainer = [];
    if (!e.sprite.body) {
      return;
    }
    if (e.type === ENEMY_TYPES.ROLLER) {
      const circle = new Phaser.Geom.Circle(
        e.sprite.body.position.x,
        e.sprite.body.position.y,
        e.sprite.body.circleRadius
      );
      ptContainer = Phaser.Geom.Intersects.GetLineToCircle(
        pistol.aimLine,
        circle
      );
    } else if (e.type === ENEMY_TYPES.GLIDER) {
      const rect = new Phaser.Geom.Rectangle(
        e.sprite.body.position.x - e.sprite.width / 2,
        e.sprite.body.position.y - e.sprite.height / 2,
        e.sprite.width,
        e.sprite.height
      );
      ptContainer = Phaser.Geom.Intersects.GetLineToRectangle(
        pistol.aimLine,
        rect
      );
    }
    collectPts(e.enemyId, e.speed);
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
  const enemyHits = getAimLineEnemyCollisionPts();
  const groundHits = getAimLineGroundCollisionPts();
  const closestPt = getClosestPtTo(
    player.sprite.body.position.x,
    player.sprite.body.position.y,
    enemyHits.concat(groundHits)
  );
  return {
    closestPt,
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