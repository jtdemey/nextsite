import * as Factory from './LocaleFactory';
import forest from './Forest';
import { isStackable } from '../world/Items';
import { between, isArray } from '../SurviveUtils';
import { TEMPERATURE_AMOUNTS_F } from './LocaleConstants';

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
  if(matchingItems.length > 0 && isStackable(item.name)) {
    matchingItems[0].amount += 1;
    return;
  }
  locale.items = locale.items.concat([item]);
};

export const getAffectedBodyTemperature = envTemp => {
	let temperatureIndex = 4;
	TEMPERATURE_AMOUNTS_F.forEach((temp, i) => {
		if(envTemp > temp) {
			temperatureIndex = i;
		}
	});
	return temperatureIndex - 4;
};

export const fluxTemperature = currentFlux => {
	let flux = currentFlux;
	const fluxChance = Math.random();
	if(fluxChance > 0.5
		&& !(currentFlux < -4 || currentFlux > 4)) {
		const fluxAmt = fluxChance < 0.75 ? 1 : -1;
		flux = flux + fluxAmt;
	}
	return flux;
};

export const removeItemFromLocale = (state, localeName, item) => {
  const locale = getLocale(state, localeName);
  const matchingItems = locale.items.filter(x => x.entityId === item.entityId);
  if(matchingItems.length > 0 && isStackable(item.name)) {
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