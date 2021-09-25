import { appendLine } from '../redux/gameSlice';
import {
  handleExamineEntity,
  handleExamineLocale,
  handleExitLocale
} from '../redux/playerSlice';
import { DIRECTIONS } from '../world/LocaleConstants';
import { isSynonym } from '../world/Synonyms';
import { ALIASES, GO_DIRECTIONS, isAlias } from './ParserAliases';

const parseEquip = (input, actions) => {
  actions.push(handleExamineLocale());
};

const parseExamine = (input, actions) => {
  const subject = input[1];
  if (input.length === 1 || isSynonym(subject, 'locale')) {
    actions.push(handleExamineLocale());
    return;
  }
  actions.push(handleExamineEntity({ entityName: subject }));
};

const parseGo = (input, actions) => {
  Object.keys(GO_DIRECTIONS).forEach(dir => {
    if (
      isAlias(GO_DIRECTIONS, input[0], dir) ||
      isAlias(GO_DIRECTIONS, input[1], dir)
    ) {
      actions.push(
        handleExitLocale({
          exitDirection: DIRECTIONS[dir.toUpperCase()]
        })
      );
    }
  });
};

export const exploreParse = raw => {
  const actions = [];
  const input = raw
    .trim()
    .split(' ')
    .map(str => str.toLowerCase());
  const keyword = input[0].toLowerCase();
  Object.keys(ALIASES).forEach(commandName => {
    if (isAlias(ALIASES, keyword, commandName)) {
      switch (commandName) {
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
  if (actions.length === 0) {
    actions.push(appendLine({ text: `I can't understand that.` }));
  }
  return actions;
};