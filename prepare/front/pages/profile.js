import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  // 더미데이터로 테스트하기
	// 하나의 배열 객체가 하나의 Item 입니다.
  const followerList = [
    { nickname: '종윤1' },
    { nickname: '종윤2' },
    { nickname: '종윤3' },
  ];
 
  const followingList = [
    { nickname: '태훈1' },
    { nickname: '태훈2' },
    { nickname: '태훈3' },
  ];
  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
      </Head>
      <AppLayout>
        {/* 큼직 큼직하게 미리 구상 해놓기  */}
        <NicknameEditForm />
        <FollowList header="팔로워 목록" data={followerList} />
        <FollowList header="팔로잉 목록" data={followingList} />
      </AppLayout>
    </>
  );
};

export default Profile;
