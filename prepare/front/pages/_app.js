import PropTypes from 'prop-types';
import React from 'react';
import 'antd/dist/antd.css';
import Head from 'next/head';

const App = ({ Component }) => {
  return (
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

export default App;
