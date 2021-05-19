export const capitalize = str => `${str[0].toUpperCase()}${str.substr(1)}`;

export const createConsoleLine = (index, text, color) => ({
  index,
  color,
  text
});

export const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

export const getTimeFromTick = tick => {
  const s = new Date(1987, 11, 12, 9, 44, 0, 0);
  s.setSeconds((1 * s.getSeconds()) + Math.floor(tick / 2));
  return s.toString();
};

export const isStringSimilar = (x, y) => {
  return x === y || x === y.substring(1, y.length) || x === y.substring(0, y.length - 1);
};