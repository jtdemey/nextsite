import { delay, put, select } from 'redux-saga/effects';
import { appendLine } from '../gameSlice';
import { equipItem } from '../playerSlice';
import { isEquipable } from '../../world/Items';

export function* equipItemSaga(action) {
  try {
    const equipped = yield select(state => state.player.equipped);
    if(equipped.some(e => e === action.payload.entityId)) {
      return;
    }
    const items = yield select(state => state.player.items);
    const itemToEquip = items.filter(i => i.entityId === action.payload.entityId)[0];
    if(isEquipable(itemToEquip.name)) {
      yield put(equipItem({ entityId: itemToEquip.entityId }));
    }
    yield put(appendLine({ text: `You equip the ${itemToEquip.display.toLowerCase()}.` }));
  } catch(err) {
    console.error(err);
  }
}
