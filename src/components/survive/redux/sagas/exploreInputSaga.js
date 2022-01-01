import { all, put } from 'redux-saga/effects';
import { exploreParse } from '../../parser/ExploreParser';

export function* exploreInputSaga(action) {
  try {
    const actions = exploreParse(action.payload);
    yield all(actions.map(act => put(act)));
  } catch(err) {
    console.error(err);
  }
}