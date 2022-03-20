import game from "./game";

/**
 * List of game events to be executed
 */
const gameEvents = [];

export default gameEvents;

/**
 * Adds a function to be executed at the specified trigger tick
 * @param {number} triggerTick Game tick in the future specifying when the event should trigger
 * @param {Function} onTrigger Function to execute
 */
export const addGameEvent = (triggerTick, onTrigger) => {
	gameEvents.push({ triggerTick, onTrigger });
};

/**
 * Triggers all game events that have passed their trigger tick
 */
export const executeGameEvents = () => {
	if (gameEvents.length < 1) return;
	for (let i = 0; i < gameEvents.length; i++) {
		const gameEvent = gameEvents[i];
		if (gameEvent.triggerTick <= game.tick) {
			gameEvent.onTrigger();
			gameEvents.splice(i, 1);
			i--;
		}
	}
};