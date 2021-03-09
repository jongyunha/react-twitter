import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';

const Profile = () => {
  // 더미데이터로 테스트하기
  // 하나의 배열 객체가 하나의 Item 입니다.

  const { me } = useSelector((state) => state.user);
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
