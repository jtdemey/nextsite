export const ENDGAME_REASONS = {
  TIME_RAN_OUT: 0,
  IMPOSTER_ACCUSED: 1,
  IMPOSTER_CORRECT: 2,
  IMPOSTER_WRONG: 3,
  IMPOSTER_QUIT: 4
};

const makeTheme = (primary, secondary, highlight) => ({ primary, secondary, highlight });
export const IMPOSTER_THEMES = [
	makeTheme('#3b3c3b', '#468387', '#74ba9f'),	//Synth
	makeTheme('#41413e', '#88a26f', '#899264'),	//Remnant
	makeTheme('#39141e', '#a62639', '#db324d'), //Crystal
	makeTheme('#1b2c39', '#2d6a68', '#b4ad72'), //Seascape
	makeTheme('#2a3c3c', '#6e7b6d', '#849c8a') //Slate
];

export const IMPOSTER_VIEWS = {
	MAIN_MENU: 0,
	HOST_GAME_FORM: 1,
	JOIN_GAME_FORM: 2,
  LOBBY: 3,
  IN_GAME: 4,
  IMPOSTER_VICTORY: 5,
  BYSTANDER_VICTORY: 6,
  LOADING: 7,
  TIME_EXPIRED: 8
};