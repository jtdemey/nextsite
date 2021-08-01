import { nanoid } from 'nanoid';
import store from '../redux/store';
import { setEnterPhrase, triggerWorldEvent } from "../redux/worldSlice";

export const EVENT_TRIGGERS = {
	ON_ENTER: 'onEnter',
	ON_EXIT: 'onExit'
};

const makeWorldEvent = (eventTrigger, eventAction, delay = 0, disarm = true) => ({
	eventId: nanoid(6),
	trigger: eventTrigger,
	action: eventAction,
	delay,
	disarm
});

export const WORLD_EVENTS = {
	mailbox: [
		makeWorldEvent(EVENT_TRIGGERS.ON_ENTER,
			() => setEnterPhrase({
				localeName: 'mailbox',
				enterPhrase: `Your wrecked car stands near a mailbox at the end of a driveway.`
			}))
	]
};

const containsWorldEvent = (localeName, eventTrigger) =>
	WORLD_EVENTS[localeName] && WORLD_EVENTS[localeName].some(e => e.trigger === eventTrigger);

const removeWorldEvent = (localeName, eventId) => {
	WORLD_EVENTS[localeName] = WORLD_EVENTS[localeName].filter(e => e.eventId !== eventId);
};

export const executeWorldEvents = (localeName, eventTrigger) => {
	if(!containsWorldEvent(localeName, eventTrigger)) return;
	const worldEvents = WORLD_EVENTS[localeName].filter(e => e.trigger === eventTrigger);
	worldEvents.forEach(e => {
		if(e.delay > 0) {
			setTimeout(() => store.dispatch(e.action()), e.delay);
		} else {
			store.dispatch(e.action());
		}
		if(e.disarm) {
			removeWorldEvent(localeName, e.eventId);
		}
	});
};