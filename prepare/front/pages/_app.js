import PropTypes from 'prop-types';
import React from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';
import withReduxSaga from 'next-redux-saga';

const App = ({ Component }) => {
  return (
    // 원래 Redux 의 문법이나 next Redux의 6버전 이전의 경우 <Provider></Provider> 로 감싸줘야 했지만
    // 6버전 부터는 자동으로 감싸주기 때문에 오히려 감싸주면 더 문제가 됩니다.
    <>
      <Head>
        <meta charSet="uts-8" />
        <title>NodeBird</title>
      </Head>
      <Component />
    </>
  );
};

App.PropTypes = {
  Component: PropTypes.elementType.isRequired,
};

// Redux 2 high order 로 감싸주기
export default wrapper.withRedux(withReduxSaga(App));
