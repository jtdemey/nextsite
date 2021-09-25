import { hurtBetween } from '../redux/playerSlice';

/**
 * Create a combat move.
 *
 * @param {string} name - Internal name for move
 * @param {number} attack - Between 0 and 1: probability that move lands
 * @param {number} cooldown - Cooldown ticks
 * @param {string || array} hitPhrase - Phrase appended to combat console when move lands, randomly chosen from array if provided
 * @param {string || array} whiffPhrase - Phrase appended to combat console when move misses, randomly chosen from array if provided
 * @param {function} action - Redux action creator for move effect
 * @param {number} probability - Between 0 and 1: lesser means less probability to occur
 * @returns Combat move object
 */
const genMove = (
  name,
  attack,
  cooldown,
  hitPhrase,
  whiffPhrase,
  action,
  probability = 1
) => ({
  name,
  attack,
  cooldown,
	hitPhrase,
	whiffPhrase,
  action,
  probability
});

const CombatMoves = {
  wolf: [
    genMove(
      'bite',
      0.6,
      12,
      [
        'The wolf lunges at you with gnashing teeth and bites your flesh.',
        'The wolf sinks its teeth into your leg.',
        'The wolf jumps toward you and bites your arm.'
      ],
			[
        'The wolf lunges at you with gnashing teeth but misses you narrowly.',
				'The wolf attempts to bite you but misses.'
			],
      () => hurtBetween({ min: 7, max: 10 })
    )
  ]
};

export default CombatMoves;