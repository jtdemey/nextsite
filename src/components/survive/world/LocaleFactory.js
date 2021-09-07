import { nanoid } from "nanoid";
import { CONTAINER_STATES } from "../redux/gameConstants";
import { between } from "../SurviveUtils";
import creatureData from "./Creatures";
import ItemData from './Items';
import { TEMPERATURES, VISIBILITIES } from "./LocaleConstants";

export const createLocale = (name, display, x, y, z, overrides) => Object.assign({
  name,
  display,
  comments: [],
  containers: [],
  coordinates: [x, y, z],
  enemies: [],
  enterPhrase: 'You have entered a default locale.',
  examinePhrase: 'Looks like a default locale here.',
  exitPhrase: 'You have exited a default locale.',
  exits: [],
  features: [],
  items: [],
  loot: [],
	spawns: [],
  visits: 0,
  temperature: TEMPERATURES.NORMAL,
  visibility: VISIBILITIES.NORMAL
}, overrides);

export const createComment = (visibilityThreshold, text) => ({
  lastCommented: 0,
  visibilityThreshold,
  text
});

export const createContainer = (name, description, loot, lock = false) => ({
  containerId: nanoid(),
  containerState: CONTAINER_STATES.UNKNOWN,
  name,
  description,
  items: [],
  loot,
  lock
});

export const createEnemy = name => {
	const enemyData = creatureData[name];
	const health = Array.isArray(health)
		? between(enemyData.hp[0], enemyData.hp[1])
		: enemyData.hp;
	return {
		entityId: nanoid(),
		name,
		health,
		defense: enemyData.defense,
		moves: enemyData.moves
	};
};

export const createExit = (direction, destination, duration, exitPhrase) => ({
  direction,
  destination,
  duration,
  exitPhrase
});

export const createFeature = (name, visibilityThreshold, description) => ({
  name,
  visibilityThreshold,
  description
});

export const createItem = (name, amount) => ({
	entityId: nanoid(),
	amount,
	name
});

export const createLoot = (probability, name, amounts) => ({
  probability,
  name,
  amounts
});

export const createSpawn = (name, probability) => ({
  name,
  probability
});