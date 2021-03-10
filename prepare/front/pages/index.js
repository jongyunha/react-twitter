import React from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayout>
      {/* 의미가 있는 컴포넌트 단위로 묶어주기!! 코드를 깔금하게 작성하는 방법 */}
      {me && <PostForm />}
      {/* key에 인덱스를 부여하는것은 피해야하는 안티패턴입니다. */}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
