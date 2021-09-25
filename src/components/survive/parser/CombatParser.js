import { appendCombatLine } from '../redux/combatSlice';
import { ALIASES } from './ParserAliases';

const parseAttack = (input, actions) => {

};

export const combatParse = raw => {
  const actions = [];
  const input = raw
    .trim()
    .split(' ')
    .map(str => str.toLowerCase());
  const keyword = input[0].toLowerCase();
  Object.keys(ALIASES).forEach(commandName => {
    if (isAlias(ALIASES, keyword, commandName)) {
      switch (commandName) {
        case 'attack':
          parseAttack(input, actions);
          break;
				case 'punch':
					break;
				case 'slap':
					break;
				case 'kick':
					break;
				case 'throw':
					break;
      }
    }
  });
  if (actions.length === 0) {
    actions.push(appendCombatLine({ text: `I can't understand that.` }));
  }
  return actions;
};