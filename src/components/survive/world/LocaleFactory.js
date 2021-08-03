import { nanoid } from "nanoid";
import { CONTAINER_STATES } from "../redux/gameConstants";
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
  exitPhrase: 'You have exited a default locale.',
  exits: [],
  features: [],
  items: [],
  loot: [],
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

export const createItem = (name, amount) => {
	//Todo
  const meta = ItemData[name];
  return {
    itemId: nanoid(),
    amount,
    name,
    display: meta.display,
    description: meta.description,
    stackable: meta.stackable
  };
};

export const createLoot = (probability, name, amounts) => ({
  probability,
  name,
  amounts
});

export const createEnemy = (name, probability) => ({
  name,
  probability
});