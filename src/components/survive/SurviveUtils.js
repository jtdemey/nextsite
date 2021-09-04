import { isStackable } from './world/Items';
import { TEMPERATURE_AMOUNTS_F } from './world/LocaleConstants';

export const addAOrAn = str => {
  const vowels = [ ...'aeiou' ];
  if(vowels.some(v => v === str.charAt(0))) {
    return 'an ' + str;
  }
  return 'a ' + str;
};

//Adds items to collection of items, accounting for stackability
const addItemToCollection = (items, item) => {
  if(isStackable(item.name) && items.some(i => i.name === item.name)) {
    items.forEach(thing => {
      if(thing.name === item.name) {
        thing.amount += 1;
      }
      return;
    });
    return items;
  }
  return items.concat([item]);
};

export const addItemsToCollection = (baseItems, itemsToAdd) => {
  itemsToAdd.forEach(item => addItemToCollection(baseItems, item));
  return baseItems;
};

export const between = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const capitalize = str => `${str[0].toUpperCase()}${str.substr(1)}`;

export const createCommand = (command, data) => ({ command, data });

export const createConsoleLine = (index, text, color) => ({
  index,
  color,
  text
});

export const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

export const formatTime = (gt, includeWeekday = false) => {
  const s = gt.split(' ');
  const d = s[0] === 'Sat' ? `${s[0]}urday ` : `${s[0]}day `;
  const pa = s[0] === 'Sat' ? 'PM' : 'AM';
  let t = s[4];
  if(t[0] == '0') {
    t = t.slice(1, t.length);
  }
  return includeWeekday ? d + t : `${t} ${pa}`;
};

export const getCelsiusFromTemperature = temperature => {
	const fah = TEMPERATURE_AMOUNTS_F[temperature] || 0;
	return Math.round((fah - 32) * (5 / 9) * 10) / 10;
};

export const getFahrenheitFromTemperature = temperature => TEMPERATURE_AMOUNTS_F[temperature] || 0;

export const getItemAmountSpan = amount => amount > 1 ? `(${amount})` : '';

export const getTimeFromTick = tick => {
  const s = new Date(1987, 11, 12, 9, 44, 0, 0);
  s.setSeconds((1 * s.getSeconds()) + Math.floor(tick / 2));
  return s.toString();
};

export const isArray = data => Object.prototype.toString.call(data) === '[object Array]';

export const isStringSimilar = (x, y) => {
  return x === y || x === y.substring(1, y.length) || x === y.substring(0, y.length - 1);
};

export const lowercaseFirstLetter = str => {
  return str.substring(0, 1).toLowerCase() + str.substring(1, str.length);
};

export const toCelsius = fah => Math.round(((fah - 32) * (5 / 9)) * 10) / 10;