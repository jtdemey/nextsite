import { getRandomProperty, getRandBetween } from "../cdUtils";
import game from "./game";
import collisionCats from "./collision";
import player, { fadingPlayerAlert } from "./player";
import { refreshHealthCt } from "./hud";
import { addPackageDestructible } from "./destructibles";
import pistol from "./pistol";

export const POWERUP_IDS = {
  HEAL: 0,
  DAMAGE: 1,
  MAX_AMMO: 2,
  RELOAD_SPEED: 3,
  JUMP_HEIGHT: 4,
  JUMP_AMOUNT: 5,
  RAGE: 6
};

export const POWERUP_NAMES = ['powerupHeal', 'powerupDamage', 'powerupMaxAmmo', 'powerupReload', 'powerupJumpHeight', 'powerupJumpAmount', 'powerupRage'];

export const POWERUP_TYPES = {
  LINEAR: 0,
  PACKAGE: 1,
  MISSILE: 2
};

/*
Reload speed up (gears of war style action reload)
Rage: 1hp, game speed+, every enemy is one shot
Jump height
Amount of jumps
Dmg+
Max ammo

Alternate fires
Two different colors: one representing a time-based powerup (GO HAM), other color = ammo-based (big think)
Shotgun
Grenade launcher
Molotovs?
Seeker launcher

Immersion idea:
falling debris from the sky release powerups that float away
*/

/**
 * Powerup entities and related data
 */
const powerups = {
  spawnChance: 0.9,
  sprites: []
};

export default powerups;

/**
 * Gets the next powerup ID to spawn accounting for the player's current stats
 * @returns The next powerup ID to spawn
 */
const getPowerupId = () => {
  let goodId;
  const badIds = [];
	//Max ammo: 999
	if (pistol.maxAmmo >= 999) {
    badIds.push(POWERUP_IDS.MAX_AMMO);
	}
  //Max jumps: 3
  if (player.maxJumps > 2) {
    badIds.push(POWERUP_IDS.JUMP_AMOUNT);
  }
	//Max jump height: -14
	if (player.jumpHeight <= -14) {
    badIds.push(POWERUP_IDS.JUMP_HEIGHT);
	}
	//Max health: 100 
	if (player.hp > 100) {
    badIds.push(POWERUP_IDS.HEAL);
	}
  //Max reload speed: 200
  if (player.reloadSpeed <= 200) {
    badIds.push(POWERUP_IDS.RELOAD_SPEED);
  }
  do {
    goodId = getRandomProperty(POWERUP_IDS);
  } while (badIds.some(id => id === goodId));
  return goodId;
};

/**
 * Creates a powerup that moves in a straight line across the screen
 * @param {number} id Powerup ID
 */
const makeLinearPowerup = id => {
  const pickup = game.scene.matter.add.sprite(
    game.width + 32,
    getRandBetween(game.height - 300, game.height - 400),
    POWERUP_NAMES[id]
  );
  pickup.setBody({
    type: "circle",
    radius: 32
  });
  pickup.powerupId = id;
  pickup.powerupType = POWERUP_TYPES.LINEAR;
  pickup.setIgnoreGravity(true);
  pickup.setCollisionCategory(collisionCats.CONSUMABLE);
	//pickup.setCollisionGroup(powerupCollisionGroup);
  //pickup.body.collisionFilter.mask = collisionCats.PLAYER;
  pickup.body.mass = 0.01;
  const velocity = getRandBetween(-4, -8);
  pickup.onTick = () => {
    pickup.rotation = 0;
    pickup.setVelocityX(velocity);
    if (pickup.x < 0 - pickup.width) {
      deletePowerup(pickup.body.id);
    }
  };
  powerups.sprites.push(pickup);
};

/**
 * Spawns a powerup
 */
export const addPowerup = () => {
  const nextId = getPowerupId();
  // const powerupType = getRandomProperty(POWERUP_TYPES);
  // switch(powerupType) {
  //   case POWERUP_TYPES.LINEAR:
  //     // makeLinearPowerup(nextId);
  //     addPackageDestructible(game.width + 64, getRandBetween(100, 200), nextId);
  //     break;
  //   case POWERUP_TYPES.PACKAGE:
  //     addPackageDestructible(game.width + 64, getRandBetween(100, 200), nextId);
  //     break;
  //   case POWERUP_TYPES.MISSILE:
  //     // makeLinearPowerup(nextId);
  //     addPackageDestructible(game.width + 64, getRandBetween(100, 200), nextId);
  //     break;
  // }
  makeLinearPowerup(nextId);
};

/**
 * Applies the powerup effect of the given ID to the player
 * @param {number} powerupId Powerup ID
 */
export const applyPower = powerupId => {
	let gain;
  switch (powerupId) {
    case POWERUP_IDS.HEAL:
			gain = getRandBetween(15, 30);
      player.hp = player.hp + gain;
      if (player.hp > 100) {
        player.hp = 100;
      }
      refreshHealthCt();
      fadingPlayerAlert(`+${gain} HEALTH`);
      break;
    case POWERUP_IDS.DAMAGE:
      player.damage += 10;
      fadingPlayerAlert(`+10 DAMAGE`);
      break;
    case POWERUP_IDS.MAX_AMMO:
			pistol.maxAmmo += 2;
      fadingPlayerAlert(`+2 AMMO CAPACITY`);
      break;
    case POWERUP_IDS.RELOAD_SPEED:
			player.reloadSpeed -= 100;
      fadingPlayerAlert(`RELOAD SPEED UP`);
      break;
    case POWERUP_IDS.JUMP_HEIGHT:
      player.jumpHeight -= 2;
      fadingPlayerAlert(`JUMP HEIGHT UP`);
      break;
    case POWERUP_IDS.JUMP_AMOUNT:
      player.maxJumps += 1;
      fadingPlayerAlert(`+1 JUMP`);
      break;
    case POWERUP_IDS.RAGE:
      fadingPlayerAlert(`RAGE`);
      break;
  }
};

/**
 * Check if a powerup is valid to spawn and do so if it is
 */
export const attemptPowerupSpawn = () => {
  if (
    !game.paused &&
    !game.isTransitioningLevels &&
    Math.random() < powerups.spawnChance
  ) {
    addPowerup();
    powerups.spawnChance = 0.5;
  } else {
    if (powerups.spawnChance < 1) {
      powerups.spawnChance += 0.1;
    }
  }
};

/**
 * Deletes a powerup entity by body ID
 * @param {number} bodyId Phaser physics body ID
 */
export const consumePowerup = bodyId => {
  const powerup = powerups.sprites.filter(s => s.body.id === bodyId)[0];
  deletePowerup(bodyId);
  applyPower(powerup.powerupId);
};

/**
 * Deletes all powerup entities
 */
export const deleteAllPowerups = () => {
  powerups.sprites.forEach(s => deletePowerup(s.body.id));
};

/**
 * Deletes the powerup specified by the provided body ID
 * @param {number} bodyId Phaser physics body ID
 */
export const deletePowerup = bodyId => {
  powerups.sprites.forEach((powerup, i) => {
    if (powerup.body.id === bodyId) {
      powerup.destroy();
      powerups.sprites.splice(i, 1);
      i -= 1;
    }
  });
};

/**
 * Powerup tick update
 */
export const updatePowerups = () => {
  if (powerups.sprites.length > 0) {
    powerups.sprites.forEach(sprite => sprite.onTick());
  }
};