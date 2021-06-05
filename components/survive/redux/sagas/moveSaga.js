import { put } from 'redux-saga/effects';
import { appendLine } from '../gameSlice';

export function* moveSaga(action) {
  try {
    console.log(action)
    yield put(appendLine({ text: 'blaahhh' }));
  } catch(err) {
    console.error(err);
  }
}