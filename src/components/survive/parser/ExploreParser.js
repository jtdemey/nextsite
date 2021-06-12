import { appendLine } from "../redux/gameSlice";
import { handleExitLocale } from "../redux/playerSlice";
import { DIRECTIONS } from "../world/LocaleConstants";

const ALIASES = {
  attack: ['fight', 'hit', 'assault', 'bonk'],
  examine: ['look', 'perceive', 'search', 'peruse', 'gander'],
  go: ['move', 'walk', 'travel', 'cross', 'migrate', 'proceed', 'progress', 'relocate', 'leave'],
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
Object.keys(GO_DIRECTIONS).forEach(dir => GO_DIRECTIONS[dir].forEach(alias => ALIASES.go.push(alias)));

const isAlias = (aliasCollection, input, command) => aliasCollection[command] && (input === command || aliasCollection[command].some(alias => alias === input));

const parseGo = (input, actions) => {
  Object.keys(GO_DIRECTIONS).forEach(dir => {
    if(isAlias(GO_DIRECTIONS, input[0], dir) || isAlias(GO_DIRECTIONS, input[1], dir)) {
      console.log(dir);
      actions.push(handleExitLocale({
        exitDirection: DIRECTIONS[dir.toUpperCase()]
      }));
    }
  });
};

export const exploreParse = raw => {
  const input = raw.trim().split(' ').map(str => str.toLowerCase());
  const actions = [];
  const keyword = input[0].toLowerCase();
  Object.keys(ALIASES).forEach(commandName => {
    if(isAlias(ALIASES, keyword, commandName)) {
      switch(commandName) {
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