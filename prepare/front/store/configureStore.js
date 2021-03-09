// npm i next-redux-wrapper redux
// Redux 를 쓰는이유
// 로그인 정보 같은것들은 많은 모든 페이지에서 필요로 할수가 있는데 그럴때 마다 부모한테서 로그인 정보를 받아오기에는
// 제약적인 부분들이 많아서 Reudx 가 중앙에서 하나로 관리하여 components 에게 뿌려주는 방식

// Redux의 장단점 에러가 나도 잘해결되고 앱의 안정성이 높아집니다.
// 하지만 그만큼 코드량이 길어집니다.
// 앱의 규모가 작은 경우 context 를 써도되고 자신이 react의 생태계를 잘알고 있다면
// mobox를 사용해도 좋음
// contextApi 를 쓰면 직접 비동기 부분을 구현해야하는데 component 부분에 보통 들어갑니다.
// 데이터를 가져오고 보내는 부분을 따로 모듈로 빼서 중앙에서 데이터를 component 에게 뿌리는 방식으로 하다보면 문득
// 드는 생각이 Redux와 비슷한대 ?
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

// custorm middleware 를 만들고 middlewares 배열안에 넣어주면 된다.
const loggerMiddleWare = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  return next(action);
};

const configureStore = () => {
  // npm i redux-saga, npm i next-redux-saga (next.js 와 redux-saga 를 연결해주는 라이브러리)
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleWare];
  // npm i redux-devtools-extension
  // 배포용 일때는 compose
  // 개발용 일때는 DevTools (history 를 남기기 위해서)
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));
  // store 는 state 와 reduce 를 포함하는 부분
  const store = createStore(reducer, enhancer);
  // root reducers 를 작성한것처럼 rootSaga 도 직접 작성합니다.
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

// 2번째 인자는 옵션입니다.
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
