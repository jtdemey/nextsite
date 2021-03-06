//Creature ideas
//Whittler: SH1-inspired faceless dwarf with knife
//Carver: More threatening, bigger whittler with bigger knife
//Phase panther: Harder enemy that disappears/reappears more often
//	the more it gets hurt

const genCd = (display, hp, defense) => ({
  display,
  hp,
  defense
});

const creatureData = {
  wolf: genCd('Wolf', [16, 22], 5)
};

export default creatureData;