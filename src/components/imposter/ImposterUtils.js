import { IMPOSTER_THEMES } from './redux/imposterConstants';

export const getTheme = themeIndex => IMPOSTER_THEMES[themeIndex];

export const parseDateStr = isoStr => {
	const b = isoStr.split(/\D+/);
	return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};