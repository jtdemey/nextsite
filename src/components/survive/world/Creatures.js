import { hurtBetween } from '../redux/playerSlice';

//Creature ideas
//Whittler: SH1-inspired faceless dwarf with knife
//Carver: More threatening, bigger whittler with bigger knife
//Phase panther: Harder enemy that disappears/reappears more often
//	the more it gets hurt

const genMove = (name, phrase, cooldown, action) => ({ name, phrase, cooldown, action });
const genCd = (display, hp, damage, moves) => ({ display, hp, damage, moves });

const creatureData = {
  wolf: genCd('Wolf', [16, 22], [
    genMove('The wolf lunges at you with gnashing teeth.', 10, () =>
      hurtBetween({ min: 7, max: 10 })
    )
  ])
};

export default creatureData;