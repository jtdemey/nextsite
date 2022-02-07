export const ALIASES = {
  attack: ['fight', 'hit', 'assault', 'bonk'],
  eat: [
    'bite',
    'chew',
    'devour',
    'digest',
    'feast',
    'ingest',
    'inhale',
    'masticate',
    'nosh',
    'swallow'
  ],
  equip: [
    'adorn',
    'arm',
    'don',
    'dress',
    'endow',
    'fit',
    'furnish',
    'gear',
    'wear'
  ],
  examine: [
    'gander',
    'look',
    'perceive',
    'peruse',
    'search',
    'where',
    'whereami'
  ],
  go: [
    'cross',
    'leave',
    'migrate',
    'move',
    'proceed',
    'progress',
    'relocate',
    'travel',
    'walk'
  ],
  throw: [
    'catapult',
    'chuck',
    'discharge',
    'fire',
    'flick',
    'fling',
    'heave',
    'hurl',
    'launch',
    'lob',
    'pitch',
    'send',
    'sling',
    'toss',
    'volley',
    'yeet'
  ]
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