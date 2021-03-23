import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import {
  LOG_OUT_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
  FOLLOW_FAILURE,
  FOLLOW_SUCCESS,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_SUCCESS,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
} from '../reducers/user';

function followApi(data) {
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action) {
  try {
    const result = yield call(followApi, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: FOLLOW_FAILURE,
      data: error.response.data,
    });
  }
}

function unfollowApi(data) {
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowApi, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    yield put({
      type: UNFOLLOW_FAILURE,
      data: error,
    });
  }
}

function logInApi(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  // action.type = login request, action.data = login data
  // 성공결과는 result.data,
  // 실패결과는 err.response.data
  try {
    // call 과 fork 둘다 함수를 실행시키는 함수인데 차이점이 뭘까?
    // fork 는 비동기 함수 호출, call 은 동기 함수 호출 입니다.
    // call 을 하게 되면 axios.post 의 결과 값이 return 될때까지 기다렸다가 result 에 받고
    // put 을 실행 하는데, fork 를 하게 되면 비동기 이기때문에 바로 put 이 실행되어 버립니다.!! 참

    // 보통이 함수 호출은 logInApi(action.data) 이렇게 하지마 call 이나 fork 를 사용할때는 이렇게 펼쳐줘야 합니다.
    const result = yield call(logInApi, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      // 서버로 부터 사용자 데이터를 받아옵니다.
      data: result.data,
    });
  } catch (err) {
    // put 은 dispatch 입니다.
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function logOutApi() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutApi);
    yield put({
      type: LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function signUpApi(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpApi, action.data);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function loadMyInfoApi() {
  return axios.get('/user');
}

function* loadMyInfo() {
  try {
    const result = yield call(loadMyInfoApi);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function changeMyNicknameApi(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* changeMyNickname(action) {
  try {
    const result = yield call(changeMyNicknameApi, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      data: err.response.data,
    });
  }
}

function loadFollowersApi(data) {
  return axios.get('/user/followers', data);
}

function* loadFollowers(action) {
  try {
    const result = yield call(loadFollowersApi, action.data);
    console.log(result.data);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      data: err.response.data,
    });
  }
}

function loadFollowingsApi(data) {
  return axios.get('/user/followings', data);
}

function* loadFollowings(action) {
  try {
    const result = yield call(loadFollowingsApi, action.data);
    console.log(result.data);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      data: err.response.data,
    });
  }
}

function removeFollowerApi(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerApi, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  // 만약 while 로 감싸지 않았다면 next 가 한번 호출될때 로그인 한번실행되고 끝이 납니다.
  // 그래서 무한 or event listener 의 역활을 하기 위해서 while (true) 로 래핑합니다.
  // take 는 동기적으로 동작하지만 take Every 는 비동기로 동작합니다.
  // while  문이 직관적으로 보이지 않기때문에 take 를 takeEvery 로 바꿔줍니다.
  // while 대신 쓰이는 takeEvery
  // 하지만 takeEvery 의 단점이 있는데 실수로 로그인 버튼을 3번연속 눌렀을 경우
  // 3번의 요청이 서버에 가기때문에 굉장히 비효율적이고 사고가 날수 있다.
  // 그래서 takeLatest 라는 걸 사용해서 100번을 눌러도 마지막 액션만 수행한다.
  // takeLatest 와는 반대대는 개념으로 takeLeading 이 있습니다. 첫번째만 수행합니다.

  // while (true) {
  //    yield take('LOG_IN_REQUEST', logIn);
  // }

  // take('LOG_IN') 의 뜻은
  // LOG_IN 이라는 ACTION 이 실행될때 까지 기다리겠다.
  // 첫번째 인자는 액션을 받고 두번째 인자는 generator 함수를 인자로 받고 실행
  // take 에서는 LOG_IN_REQUEST 에 대한 액션 자체가 logIn 함수의 매개변수로 전달됩니다.
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchChangeMyNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeMyNickname);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

export default function* userSage() {
  yield all([
    fork(watchLogin),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadMyInfo),
    fork(watchChangeMyNickname),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower),
  ]);
}
