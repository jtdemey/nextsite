export const ALIASES = {
  attack: ['fight', 'hit', 'assault', 'bonk'],
  eat: ['bite', 'chew', 'devour', 'ingest', 'inhale', 'swallow', 'digest', 'masticate', 'nosh', 'feast'],
  equip: ['don', 'wear', 'adorn', 'arm', 'dress', 'endow', 'furnish', 'gear', 'fit'],
  examine: ['look', 'perceive', 'search', 'peruse', 'gander', 'where', 'whereami'],
  go: ['move', 'walk', 'travel', 'cross', 'migrate', 'proceed', 'progress', 'relocate', 'leave'],
  throw: ['toss', 'yeet', 'send', 'fling', 'fire', 'heave', 'hurl', 'lob', 'pitch', 'chuck', 'catapult', 'discharge', 'flick', 'launch', 'sling', 'volley']
};

export const GO_DIRECTIONS = {
  north: ['n', 'nort'],
  east: ['e', 'eas'],
  south: ['s', 'sout'],
  west: ['w', 'wes'],
  up: ['u'],
  down: ['d', 'dow'],
  inside: ['i', 'in', 'into'],
  outside: ['o', 'out', 'outta']
};
//Add directions as shorthands for GO
Object.keys(GO_DIRECTIONS).forEach(dir => {
  ALIASES.go.push(dir);
  GO_DIRECTIONS[dir].forEach(alias => ALIASES.go.push(alias));
});

export const isAlias = (aliasCollection, input, command) =>
  aliasCollection[command] &&
  (input === command ||
    aliasCollection[command].some(alias => alias === input));