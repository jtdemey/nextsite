import { nanoid } from "nanoid";
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

export const createItem = (name, amount) => {
  const metadata = ItemData[name];
  return {
    itemId: nanoid(),
    amount,
    name,
    display: metadata.display,
    description: metadata.description,
    stackable: metadata.stackable,
    consumable: metadata.consumable,
    equipable: metadata.equipable
  };
};

export const createLoot = (probability, itemName, amounts) => ({
  probability,
  itemName,
  amounts
});

export const createEnemy = (name, probability) => ({
  name,
  probability
});