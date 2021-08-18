import { delay, put, select } from 'redux-saga/effects';
import { appendLine } from '../gameSlice';
import ItemData, { getItemDescription, getItemDisplayName, getItemNameFromDisplay } from '../../world/Items';
import { lowercaseFirstLetter } from '../../SurviveUtils';

export function* examineEntitySaga(action) {
  try {
    const entityName = action.payload.entityName;
    const itemName = getItemNameFromDisplay(entityName);
    const playerLocale = yield select(state => state.player.locale);
    if(itemName) {
      const playerItems = yield select(state => state.player.items);
      const localeItems = yield select(state => state.world[playerLocale].items);
      const prefix = itemName.substring(itemName.length - 1, itemName.length) === 's'
        ? `They're ` : `It's `;
      const itemExamination = `${prefix}${lowercaseFirstLetter(getItemDescription(itemName))}.`;
      if(playerItems.some(item => item.name === itemName) || localeItems.some(item => item.name === itemName)) {
        yield put(appendLine({ text: itemExamination }));
        return;
      }
    }
    const localeFeatures = yield select(state => state.world[playerLocale].features);
    if(localeFeatures.some(feature => feature.name.toLowerCase() === entityName)) {
      yield put(appendLine({ text: feature.description }));
      return;
    }
    const verb = entityName.substring(entityName.length - 1) === 's' ? 'are' : 'is';
    const nothingHereText = `There ${verb} no ${entityName} here to examine.`;
    yield put(appendLine({ text: nothingHereText }));
  } catch(err) {
    console.error(err);
  }
}
