const synonyms = {
  locale: ['locale', 'area', 'place', 'range', 'stuff', 'surroundings', 'things', 'world']
};

export const isSynonym = (input, target) => input === target
  || (synonyms[target] && synonyms[target].some(x => x === input));
