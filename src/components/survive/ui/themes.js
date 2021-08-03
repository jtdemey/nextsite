const gen = (base1, base2, base3, primary, secondary, highlight) =>
  ({ base1, base2, base3, primary, secondary, highlight });

const themes = [
  gen('#0b0d0e', '#161b1d', '#22282b', '#33415c', '#485c84', '#33525c'), //Forest
  gen('#292929', '#2b2727', '#2f2323', '#460c0c', '#991a1a', '#46290c'), //Mansion
  gen('#333333', '#363034', '#3b2b36', '#52143d', '#90236b', '#331452')  //Graveyard
];

export default themes;

export const getTheme = region => themes[region];
