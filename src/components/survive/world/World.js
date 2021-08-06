import * as Factory from './LocaleFactory';
import forest from './Forest';
import { between, isArray } from '../SurviveUtils';

const world = forest;
export default world;

const getLocale = (state, localeName) => {
  const locale = state[localeName];
  if(!locale) {
    console.error(`No locale name ${localeName}`);
  }
  return locale;
};

export const addItemToLocale = (state, localeName, item) => {
  const locale = getLocale(state, localeName);
  const matchingItems = locale.items.filter(x => x.name === item.name);
  if(matchingItems.length > 0 && item.stackable) {
    matchingItems[0].amount += 1;
    return;
  }
  locale.items = locale.items.concat([item]);
};

export const removeItemFromLocale = (state, localeName, item) => {
  const locale = getLocale(state, localeName);
  const matchingItems = locale.items.filter(x => x.entityId === item.entityId);
  if(matchingItems.length > 0 && item.stackable) {
    matchingItems[0].amount += 1;
    return;
  }
  locale.items = locale.items.filter(x => x.name === item.name);
};

export const rollLoot = loot => {
  const items = [];
  loot.forEach(goodie => {
    if(Math.random() > goodie.probability) return;
    const amount = isArray(goodie.amounts) ? between(goodie.amounts[0], goodie.amounts[1]) : goodie.amounts;
    items.push(Factory.createItem(goodie.name, amount));
  });
  return items;
};
