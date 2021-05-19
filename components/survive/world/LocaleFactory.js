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

export const createContainer = (name, description, loot, locked = false) => ({
  name,
  description,
  loot,
  locked
});

export const createExit = (direction, duration, exitPhrase) => ({
  direction,
  duration,
  exitPhrase
});

export const createFeature = (name, visibilityThreshold, description) => ({
  name,
  visibilityThreshold,
  description
});

export const createItem = (name, display, description, stackable, consumable, equipable) => ({
  amount: 1,
  name,
  display,
  description,
  stackable,
  consumable,
  equipable
});

export const createLoot = (probability, itemName, amounts) => ({
  probability,
  itemName,
  amounts
});

export const createEnemy = (name, probability) => ({
  name,
  probability
});