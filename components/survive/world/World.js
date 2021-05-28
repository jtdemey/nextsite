import * as Factory from './LocaleFactory';
import forest from './Forest';
import { between, isArray } from '../SurviveUtils';

const world = forest;
export default world;

export const rollLoot = loot => {
  const items = [];
  loot.forEach(goodie => {
    if(Math.random() > goodie.probability) return;
    const amount = isArray(goodie.amounts) ? between(goodie.amounts[0], goodie.amounts[1]) : goodie.amounts;
    items.push(Factory.createItem(goodie.name, amount));
  });
  return items;
};