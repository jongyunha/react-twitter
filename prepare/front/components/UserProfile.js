import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { logOutLoading, me } = useSelector((state) => state.user);
  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          게시글
          <br />
          {me.Posts.length}
        </div>,
        <div key="following">
          팔로잉
          <br />
          {me.Followings.length}
        </div>,
        <div key="follwers">
          팔로워
          <br />
          {me.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button onClick={onLogout} loading={logOutLoading}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
