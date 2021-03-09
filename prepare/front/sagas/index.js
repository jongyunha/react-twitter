// saga 의 effects
import { all, fork } from 'redux-saga/effects';

import postSaga from './post';
import userSage from './user';

export default function* rootSaga() {
  // 비동기 액션을 하나씩 넣어줍니다.
  yield all([fork(postSaga), fork(userSage)]);
}
