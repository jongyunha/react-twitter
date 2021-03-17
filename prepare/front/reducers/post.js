// reduce or data 의 움직임이 1순위 화면은 그 데이터 또는 액션을 기반으로 맞춰나가는것

import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

export const initalState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePost: true,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
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

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [{ src: faker.image.image() }],
      Comments: [
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

// initalState.mainPosts = initalState.mainPosts.concat(generateDummyPost(10));

export const LOAD_POST_REQUEST = 'LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'LOAD_POST_FAILURE';

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
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: '댓글봇',
  },
});

// 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수
const reducer = (state = initalState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.loadPostError = null;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.addPostError = null;
        // 앞에다가 추가를 해주는 이유는
        // 새로운 게시글이 제일 상단에 뜨게하기 위해서
        // draft.mainPosts = [dummyPost(action.data), ...state.mainPosts];
        // immer 도입후
        draft.mainPosts.unshift(action.data);
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addPostDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS:
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComments(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        //
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        //   addCommentError: false,
        // };
        // 댓글을 달았을대 어떤 게시물에 댓글을 달았는지 게시물의 index 값을 찾아내기 위해서
        {
          const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
          post.Comments.unshift(action.data);
          draft.addCommentLoading = false;
          draft.addCommentDone = true;
        }
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        draft.addPostDone = false;
        break;
      default:
        break;
    }
  });

export default reducer;
