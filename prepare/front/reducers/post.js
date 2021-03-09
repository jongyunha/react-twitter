// reduce or data 의 움직임이 1순위 화면은 그 데이터 또는 액션을 기반으로 맞춰나가는것

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
          User: {
            nickname: 'redux',
          },
          content: 'redux todo study',
        },
        {
          User: {
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
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '하종윤더미',
  },
  Images: [],
  Comments: [],
};

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
        mainPosts: [dummyPost, ...state.mainPosts],
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
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
        addCommentError: false,
      };
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
