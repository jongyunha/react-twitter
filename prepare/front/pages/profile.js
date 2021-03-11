import React, { useEffect } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  // 더미데이터로 테스트하기
  // 하나의 배열 객체가 하나의 Item 입니다.

  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);
  if (!me) {
    return null;
  }
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        {/* 큼직 큼직하게 미리 구상 해놓기  */}
        <NicknameEditForm />
        <FollowList header="팔로워 목록" data={me.Followings} />
        <FollowList header="팔로잉 목록" data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
