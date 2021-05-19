import forest from './Forest';

const world = forest;
export default world;

export const getLocale = localeName => world[localeName];