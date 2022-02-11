import { all } from 'redux-saga/effects';

import { boardMainSaga } from './board';

export const rootSaga = function* () {
  yield all([boardMainSaga()]);
};
