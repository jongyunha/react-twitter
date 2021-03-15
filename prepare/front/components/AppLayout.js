import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
// npm i react-redux
import { useSelector } from 'react-redux';

import UserProfile from './UserProfile';
import LoginForm from './LoginForm';

const Global = createGlobalStyle`
	.ant-row {
		margin-right: 0 !important;
		margin-right: 0 !important;
	}
	.ant-col:first-child {
		padding-left: 0 !important;
	}
	.ant-col:last-child {
		padding-right: 0 !important;
	}
`;

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const AppLayout = ({ children }) => {
  // isLoggedIn 의 상태가 바뀌면 알아서 리렌더링 됩니다.
  const { me } = useSelector((state) => state.user);
  return (
    <div>
      <Global />
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/">Home</Link>
        </Menu.Item>
        <Menu.Item>{me && <Link href="/profile">프로필</Link>}</Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item>{!me && <Link href="/signup">회원가입</Link>}</Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://popawaw.tistory.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made By hajongyn
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  // children 이 react 의 화면의 그리는 node type 인지 검사합니다.
  // typescript 를 사용하면 검사 안해도됨.
  children: PropTypes.node.isRequired,
};

export default AppLayout;
