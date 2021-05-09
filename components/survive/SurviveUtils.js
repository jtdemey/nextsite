export const delay = duration => new Promise(resolve => setTimeout(resolve, duration));

export const getTimeFromTick = tick => {
  const s = new Date(1987, 11, 12, 9, 44, 0, 0);
  s.setSeconds((1 * s.getSeconds()) + Math.floor(tick / 2));
  return s.toString();
};