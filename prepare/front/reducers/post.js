// reduce or data 의 움직임이 1순위 화면은 그 데이터 또는 액션을 기반으로 맞춰나가는것

import shortid from 'shortid';

export const initalState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '하종윤',
      },
      content: '첫번째 게시글 #해시태그 #익스프레스',
      Images: [
        {
          src:
            'https://images.velog.io/images/printver_2world/post/88a7e9ea-a682-4497-93cc-70e1e89b9f5e/react_2.jpg',
        },
        {
          src:
            'https://cdn-images-1.medium.com/max/1200/1*VeM-5lsAtrrJ4jXH96h5kg.png',
        },
        {
          src:
            'https://www.baptiste-donaux.fr/react-redux-concept/react-redux.png',
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            nickname: 'redux',
          },
          content: 'redux todo study',
        },
        {
          User: {
            id: shortid.generate(),
            nickname: 'react',
          },
          content: 'react todo study',
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

// backend 가 없을때 id 값을 일단 랜덤하게 부여하기 위해서 쓰는 라이브 러리
// npm i shortid
// 더미데이터를 매번 만들기 힘들기 때문에 더미데이터를 자동으로 만들어주는 라이브러리
// npm i faker

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '하종윤',
  },
  Images: [],
  Comments: [],
});

const dummyComments = (data) => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '댓글봇',
  },
});

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        // 앞에다가 추가를 해주는 이유는
        // 새로운 게시글이 제일 상단에 뜨게하기 위해서
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
        addPostError: null,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      // 댓글을 달았을대 어떤 게시물에 댓글을 달았는지 게시물의 index 값을 찾아내기 위해서
      const postIndex = state.mainPosts.findIndex(
        (v) => v.id === action.data.postId,
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComments(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
        addCommentError: false,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        addCommentLoading: false,
        addCommentDone: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
