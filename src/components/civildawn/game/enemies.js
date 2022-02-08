import game, { rollNextEnemySpawnDist, increaseScore } from './game';
import { ENEMY_TYPES, LEVEL_IDS, ENEMY_TYPE_NAMES, ENEMY_SCORES } from '../constants';
import collisionCats from './collision';
import { genId, getRandBetween } from '../pwUtils';

/**
 * Enemy entity data
 */
const enemies = [];

export default enemies;

/**
 * Deletes the enemy with the given enemy ID
 * @param {number} enemyId Enemy ID
 */
const deleteEnemy = enemyId => {
  enemies.forEach((e, i) => {
    if(e.enemyId === enemyId) {
      e.sprite.destroy();
      enemies.splice(i, 1);
      i -= 1;
    }
  });
};

/**
 * Clears all enemies from the game
 */
export const clearEnemies = () => {
  while(enemies.length) {
    enemies.pop().sprite.destroy();
  }
};

/**
 * Triggers a fading text alert above an enemy entity
 * @param {number} enemyId Enemy ID
 * @param {string} msg Alert text
 */
export const fadingEnemyAlert = (enemyId, msg) => {
  enemies.map(e => {
    if(e.enemyId === enemyId) {
      const text = game.scene.add.text(e.sprite.x - e.sprite.width, e.sprite.y - 10, msg, {
        color: '#fff',
        fontFamily: `Coda`,
        fontSize: '1.5rem' 
      });
      text.setX(e.sprite.x - text.width / 2);
      game.scene.tweens.add({
        targets: text,
        alpha: 0,
        y: e.sprite.y - 100,
        ease: 'Sine.easeOut',
        duration: 1000,
        repeat: 0
      });
    }
  });
};

/**
 * Gets the enemy with the given enemy ID
 * @param {number} enemyId Enemy ID
 * @returns Enemy entity
 */
export const getEnemy = enemyId => {
  const enemy = enemies.map(e => e.enemyId === enemyId)[0];
  if(!enemy) {
    console.error(`Enemy ${enemyId} not found`);
  }
  return enemy;
};

/**
 * Gets the enemy with the given Phaser physics body ID
 * @param {number} bodyId Phaser phyics body ID
 * @returns Enemy entity
 */
export const getEnemyFromBodyId = bodyId => {
  enemies.forEach((goon, i) => {
    if(goon.sprite.body !== undefined) {
      console.error(`Enemy sprite ${goon.enemyId} contains no defined body`);
    }
    if(goon.sprite.body && goon.sprite.body.id === bodyId) {
      return enemies[i];
    }
  });
  return false;
};

/**
 * Gets a list of applicable enemies for the current level
 * @returns Array of enemy type IDs for the current level
 */
const getPossibleEnemyTypes = () => {
  let ids = LEVEL_IDS;
  let x = ENEMY_TYPES;
  switch(game.level) {
    case ids.CIVIL_DUSK:
      return [x.ROLLER];
    case ids.NAUTICAL_DUSK:
      return [x.ROLLER, x.GLIDER];
    case ids.ASTRONOMICAL_DUSK:
      return [x.ROLLER];
    case ids.NIGHTFALL:
      return [x.ROLLER];
    case ids.NIGHTFALL2:
      return [x.ROLLER];
    case ids.NIGHTFALL3:
      return [x.ROLLER];
    case ids.NIGHT:
      return [x.ROLLER];
    case ids.MIDNIGHT:
      return [x.ROLLER];
    case ids.MORNING:
      return [x.ROLLER];
    case ids.SUNRISE:
      return [x.ROLLER];
    case ids.SUNRISE2:
      return [x.ROLLER];
    case ids.SUNRISE3:
      return [x.ROLLER];
    case ids.ASTRONOMICAL_DAWN:
      return [x.ROLLER];
    case ids.NAUTICAL_DAWN:
      return [x.ROLLER];
    case ids.CIVIL_DAWN:
      return [x.ROLLER];
  }
};

/**
 * Damages the specified enemy for the given amount
 * @param {number} enemyId Enemy ID
 * @param {number} amt Damage amount
 */
export const hurtEnemy = (enemyId, amt) => {
  enemies.map(e => {
    if(e.enemyId === enemyId) {
      e.hp -= amt;
      if(e.hp < 1) {
        killEnemy(enemyId);
      }
    }
  });
};

/**
 * Damages the enemy with the specified physics body ID for the given amount
 * @param {number} bodyId Phaser physics body ID
 * @param {number} amt Damage amount
 */
export const hurtEnemyByBodyId = (bodyId, amt) => {
  enemies.map(e => {
    if(!e.sprite.body) {
      console.error('No sprite body with id ' + bodyId);
    }
    if(e.sprite.body && e.sprite.body.id === bodyId) {
      e.hp -= amt;
      if(e.hp < 1) {
        killEnemy(e.enemyId);
      }
    }
  });
};

/**
 * Kills all currently spawned enemies
 */
export const killAllEnemies = () => {
  enemies.map(e => killEnemy(e.enemyId, false));
};

/**
 * Kills the enemy specified by the provided enemy ID
 * @param {number} enemyId Enemy ID
 * @param {boolean} addScore Flag for whether to increase player score
 */
export const killEnemy = (enemyId, addScore = true) => {
  enemies.map(e => {
    if(e.enemyId === enemyId && e.speed !== 0) {
      e.speed = 0;
      e.sprite.setVelocity(getRandBetween(-1, 1), getRandBetween(-3, -6));
      e.sprite.setAngularVelocity(getRandBetween(1, 3) / 10);
      e.sprite.body.collisionFilter.category = 0;
      e.sprite.setIgnoreGravity(false);
      e.onTick = () => { return; }
      setTimeout(() => {
        deleteEnemy(enemyId);
      }, 500);
      if(addScore) {
        increaseScore(ENEMY_SCORES[e.type]);
        fadingEnemyAlert(e.enemyId, `$${ENEMY_SCORES[e.type]}`);
      }
    }
  });
};

/**
 * Creates a "Roller" enemy
 * @param {number} enemyId Enemy ID
 * @param {number} type Civil Dawn enemy type value
 * @param {Sprite} sprite Phaser sprite
 * @returns Enemy Roller entity
 */
const makeRoller = (enemyId, type, sprite) => {
  let hp = 100;
  let speed = 2;
  sprite.setBody({
    type: 'circle',
    radius: 32
  });
  sprite.body.collisionFilter = {
    category: collisionCats.ENEMY,
    group: 0,
    mask: collisionCats.PLAYER | collisionCats.GROUND | collisionCats.ENEMY | collisionCats.BULLET
  };
  sprite.body.friction = 0;
  sprite.body.damage = getRandBetween(15, 18);
  sprite.setBounce(0);
  let onTick = () => {
    sprite.rotation = 0;
    sprite.setVelocityX(-2.5);
    if(sprite.body.position.x < -50) {
      deleteEnemy(enemyId);
    }
  };
  return {
    enemyId,
    hp,
    onTick,
    speed,
    sprite,
    type
  };
};

/**
 * Creates a "Glider" enemy
 * @param {number} enemyId Enemy ID
 * @param {number} type Civil Dawn enemy type value
 * @param {Sprite} sprite Phaser sprite
 * @returns Enemy Glider entity
 */
const makeGlider = (enemyId, type, sprite) => {
  let hp = 130;
  let speed = 2;
  sprite.setBody({
    type: 'rectangle',
    width: 80,
    height: 40
  });
  sprite.body.collisionFilter = {
    category: collisionCats.ENEMY,
    group: 0,
    mask: collisionCats.PLAYER | collisionCats.GROUND | collisionCats.ENEMY | collisionCats.BULLET
  };
  sprite.body.ignoreGravity = true;
  sprite.body.damage = getRandBetween(22, 25);
  sprite.setBounce(0);
  sprite.setPosition(game.width + 250, getRandBetween(game.height - 400, game.height - 600));
  let onTick = () => {
    sprite.rotation = 0;
    sprite.setVelocityX(-2);
    if(sprite.body.position.x < -50) {
      deleteEnemy(enemyId);
    }
  };
  return {
    enemyId,
    hp,
    onTick,
    speed,
    sprite,
    type
  };
};

/**
 * Creates an enemy of the given type
 * @param {number} type Civil Dawn enemy type value
 * @returns Created enemy
 */
const makeEnemy = type => {
  const enemyId = genId(16);
  let sprite = game.scene.matter.add.sprite(game.width + 250, 200, ENEMY_TYPE_NAMES[type]);
  let enemy;
  switch(type) {
    case ENEMY_TYPES.ROLLER:
      enemy = makeRoller(enemyId, type, sprite);
      break;
    case ENEMY_TYPES.GLIDER:
      enemy = makeGlider(enemyId, type, sprite);
      break;
    default:
      console.error(`Unrecognized enemy type ${type}`);
      break;
  }
  enemies.push(enemy);
  return enemy;
};

/**
 * Tick function to check whether to spawn a new enemy
 */
export const spawnCheck = () => {
  if(!enemies.some(e => e.sprite && e.sprite.body && e.sprite.body.position.x > game.width - game.enemySpawnDist)
  && !game.isTransitioningLevels) {
    spawnNextEnemy();
  }
};

/**
 * Spawns the next enemy in the level
 */
export const spawnNextEnemy = () => {
  rollNextEnemySpawnDist();
  const types = getPossibleEnemyTypes();
  const rolledType = types[Math.floor(Math.random() * types.length)];
  makeEnemy(rolledType);
};