import { hurtBetween } from '../redux/playerSlice';

const genMove = (name, phrase, cooldown, action) => ({
  name,
  phrase,
  attack,
  cooldown,
  action
});

const combatMoves = {
  wolf: [
    genMove(
      'bite',
      'The wolf lunges at you with gnashing teeth.',
      0.8,
      10,
      () => hurtBetween({ min: 7, max: 10 })
    )
  ]
};

export default combatMoves;
