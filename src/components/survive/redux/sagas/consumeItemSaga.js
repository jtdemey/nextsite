import { put } from 'redux-saga/effects';
import ItemActions from '../../world/ItemActions';
import { appendLine } from '../gameSlice';
import { removeItem } from '../playerSlice';

export function* consumeItemSaga(action) {
  try {
		const itemActions = ItemActions[action.payload.itemName];
		if(!itemActions) {
			console.error(`Could not consume item ${action.payload.itemName}`);
			return;
		}
		const consumeAction = itemActions.filter(act => act.name === 'Consume')[0];
		if(!consumeAction) {
			console.error(`No consume action found for ${action.payload.itemName}`);
			return;
		}
		yield put(removeItem({ entityId: action.payload.entityId }));
		yield put(consumeAction.action());
		yield put(appendLine({ text: `You use the ${action.payload.itemName}.` }));
  } catch(err) {
    console.error(err);
  }
}