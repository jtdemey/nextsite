//Adds items to collection of items, accounting for stackability
const addItemToCollection = (items, item) => {
  if(item.stackable && items.some(i => i.name === item.name)) {
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