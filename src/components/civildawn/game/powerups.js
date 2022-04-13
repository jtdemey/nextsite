import { getRandomProperty, getRandBetween } from "../cdUtils";
import game from "./game";
import collisionCats, { nonCollidingGroup } from "./collision";
import player, { fadingPlayerAlert } from "./player";
import { refreshHealthCt } from "./hud";
import pistol from "./pistol";
import { DESTRUCTIBLE_TYPES, makeDestructible } from "./destructibles";

export const POWERUP_IDS = {
  HEAL: 0,
  DAMAGE: 1,
  MAX_AMMO: 2,
  RELOAD_SPEED: 3,
  JUMP_HEIGHT: 4,
  JUMP_AMOUNT: 5,
  RAGE: 6
};

export const POWERUP_NAMES = [
  "powerupHeal",
  "powerupDamage",
  "powerupMaxAmmo",
  "powerupReload",
  "powerupJumpHeight",
  "powerupJumpAmount",
  "powerupRage"
];

export const POWERUP_TYPES = {
  LINEAR: 0,
  DROP: 1
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
  // makeLinearPowerup(nextId);
  makeMissilePowerup(nextId);
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
      player.jumpHeight -= 1.5;
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
  if (game.paused || game.isTransitioningLevels) return;
  if (Math.random() < powerups.spawnChance) {
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
  const powerupSprite = powerups.sprites.filter(s => s.body.id === bodyId)[0];
  if (powerupSprite.isConsumed === true) return;
  powerupSprite.isConsumed = true;
  applyPower(powerupSprite.powerupId);
	game.scene.tweens.killTweensOf(powerupSprite);
  game.scene.tweens.add({
    targets: powerupSprite,
    alpha: 0,
    scaleX: 1.75,
    scaleY: 1.75,
    ease: "Sine.easeOut",
    duration: 500,
    repeat: 0,
    onComplete: () => deletePowerup(bodyId)
  });
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
			game.scene.tweens.killTweensOf(powerup);
      powerup.destroy();
      powerups.sprites.splice(i, 1);
      i -= 1;
    }
  });
};

/**
 * Gets a powerup sprite by the specified body id
 * @param {number} bodyId Matter physics body ID
 * @returns Powerup sprite with specified ID or undefined if not found
 */
export const getPowerupByBodyId = bodyId =>
	powerups.sprites.filter(s => s.body && s.body.id === bodyId)[0] ?? undefined;

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
 * Creates and returns a base, template powerup
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {number} powerupId Powerup ID
 * @returns Base powerup
 */
const makeBasePowerup = (x, y, powerupId) => {
  const powerup = game.scene.matter.add.sprite(x, y, POWERUP_NAMES[powerupId]);
  powerup.setBody({
    type: "circle",
    radius: 32
  });
  powerup.setScale(0.85, 0.85);
  powerup.isConsumed = false;
  powerup.powerupId = powerupId;
  powerup.setIgnoreGravity(true);
  powerup.setCollisionCategory(collisionCats.CONSUMABLE);
  powerup.setCollisionGroup(nonCollidingGroup);
  powerup.body.mass = 0.001;
  powerups.sprites.push(powerup);
  return powerup;
};

/**
 * Creates a powerup that drops in a straight line and hovers a bit above the ground
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {number} id Powerup ID
 */
const makeDropPowerup = (x, y, id) => {
  const powerup = makeBasePowerup(x, y, id);
	powerup.isDropping = true;
  powerup.powerupType = POWERUP_TYPES.DROP;
	powerup.setIgnoreGravity(false);
	powerup.onGroundCollision = () => {
		powerup.isDropping = false;
		powerup.setIgnoreGravity(true);
		const xOnHit = powerup.x;
		player.scene.tweens.add({
			targets: powerup,
			ease: "Sine.easeOut",
			duration: 600,
			repeat: 0,
			x: xOnHit,
			y: powerup.y - 160,
			onComplete: () => {
				powerup.onTick = () => {
					powerup.rotation = 0;
					powerup.setVelocityX(-(game.speed));
				};
			}
		});
	};
  powerup.onTick = () => {
		powerup.rotation = 0;
    if (powerup.x < 0 - powerup.width) {
      deletePowerup(powerup.body.id);
    }
  };
};

/**
 * Creates a powerup that moves in a straight line across the screen
 * @param {number} id Powerup ID
 */
const makeLinearPowerup = id => {
  const pickup = makeBasePowerup(
    game.width + 32,
    getRandBetween(game.height - 300, game.height - 400),
    id
  );
  pickup.powerupType = POWERUP_TYPES.LINEAR;
  const velocity = getRandBetween(-4, -8);
  pickup.onTick = () => {
    pickup.rotation = 0;
    pickup.setVelocityX(velocity);
    pickup.setVelocityY(0);
    if (pickup.x < 0 - pickup.width) {
      deletePowerup(pickup.body.id);
    }
  };
};

/**
 * Creates a destructible containing a powerup that moves in a straight line across the screen
 * @param {number} id Powerup ID
 */
const makeMissilePowerup = id => {
  const destructible = makeDestructible(
    DESTRUCTIBLE_TYPES.MISSILE,
    getPowerupId()
  );
  destructible.onDestroy = () => {
		console.log(destructible)
    makeDropPowerup(
      destructible.sprite.x,
      destructible.sprite.y,
      id
    );
  };
};

/**
 * Powerup tick update
 */
export const updatePowerups = () => {
  if (powerups.sprites.length > 0) {
    powerups.sprites.forEach(sprite => sprite.onTick());
  }
};