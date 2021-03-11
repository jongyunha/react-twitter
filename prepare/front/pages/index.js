import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

import { LOAD_POST_REQUEST } from '../reducers/post';

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state) => state.post,
  );
  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 400 &&
        hasMorePost &&
        !loadPostLoading
      ) {
        dispatch({
          type: LOAD_POST_REQUEST,
        });
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePost, loadPostLoading]);

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
