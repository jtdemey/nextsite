import { delay, put, select } from 'redux-saga/effects';
import { appendLine } from '../gameSlice';
import { addAOrAn } from '../../SurviveUtils';

export function* examineLocaleSaga(action) {
  try {
    const localeName = yield select(state => state.player.locale);
    const locale = yield select(state => state.world[localeName]);
    if(locale.examinePhrase) {
      yield put(appendLine({ text: locale.examinePhrase }));
    }
    yield delay(620);
    let examination = `You see `;
    const notedFeatures = [];
    const noteFeatures = entityGroups => {
      entityGroups.forEach(group => {
        if(locale[group]) {
          locale[group].forEach(entity => {
            const prefixedName = entity.name.substring(entity.name.length - 1) === 's'
              ? `some ${entity.name}` : addAOrAn(entity.name);
            notedFeatures.push(prefixedName.toLowerCase());
          });
        }
      });
    };
    noteFeatures(['containers', 'features', 'items']);
    notedFeatures.forEach((noted, i) => {
      if(i + 1 === notedFeatures.length) {
        examination += notedFeatures.length > 1 ? `and ${noted}.` : `${noted}.`;
        return;
      }
      examination += `${noted}, `;
    });
    yield put(appendLine({ text: examination }));
  } catch(err) {
    console.error(err);
  }
}
