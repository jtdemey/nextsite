import { appendLine } from "../redux/gameSlice";
import { equipItem, handleEquipEntity, handleExamineEntity,
  handleExamineLocale, handleExitLocale } from "../redux/playerSlice";
import { DIRECTIONS } from "../world/LocaleConstants";
import { isSynonym } from '../world/Synonyms';

const ALIASES = {
  attack: ['fight', 'hit', 'assault', 'bonk'],
  eat: ['bite', 'chew', 'devour', 'ingest', 'inhale', 'swallow', 'digest', 'masticate', 'nosh', 'feast'],
  equip: ['don', 'wear', 'adorn', 'arm', 'dress', 'endow', 'furnish', 'gear', 'fit'],
  examine: ['look', 'perceive', 'search', 'peruse', 'gander', 'where', 'whereami'],
  go: ['move', 'walk', 'travel', 'cross', 'migrate', 'proceed', 'progress', 'relocate', 'leave'],
  throw: ['toss', 'yeet', 'send', 'fling', 'fire', 'heave', 'hurl', 'lob', 'pitch', 'chuck', 'catapult', 'discharge', 'flick', 'launch', 'sling', 'volley']
};

const GO_DIRECTIONS = {
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

const isAlias = (aliasCollection, input, command) =>
  aliasCollection[command] && (input === command || aliasCollection[command].some(alias => alias === input));

const parseEquip = (input, actions) => {
  actions.push(handleExamineLocale());
};

const parseExamine = (input, actions) => {
  const subject = input[1];
  if(input.length === 1 || isSynonym(subject, 'locale')) {
    actions.push(handleExamineLocale());
    return;
  }
  actions.push(handleExamineEntity({ entityName: subject }));
};

const parseGo = (input, actions) => {
  Object.keys(GO_DIRECTIONS).forEach(dir => {
    if(isAlias(GO_DIRECTIONS, input[0], dir) || isAlias(GO_DIRECTIONS, input[1], dir)) {
      actions.push(handleExitLocale({
        exitDirection: DIRECTIONS[dir.toUpperCase()]
      }));
    }
  });
};

export const exploreParse = raw => {
  const actions = [];
  const input = raw.trim().split(' ').map(str => str.toLowerCase());
  const keyword = input[0].toLowerCase();
  Object.keys(ALIASES).forEach(commandName => {
    if(isAlias(ALIASES, keyword, commandName)) {
      switch(commandName) {
        case 'equip':
          parseEquip(input, actions);
          break;
        case 'examine':
          parseExamine(input, actions);
          break;
        case 'go':
          parseGo(input, actions);
          break;
      }
    }
  });
  if(actions.length === 0) {
    actions.push(appendLine({ text: `I can't understand that.` }));
  }
  return actions;
};
