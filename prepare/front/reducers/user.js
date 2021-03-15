import produce from 'immer';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from './post';

export const initalState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: false,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: false,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: false,
  ChangeNickNameLoading: false, // 닉네임 변경 시도중
  ChangeNickNameDone: false,
  ChangeNickNameError: false,
  followLoading: false, // 팔로우 시도중
  followDone: false,
  followError: false,
  unfollowLoading: false, // 언팔로우 시도중
  unfollowDone: false,
  unfollowError: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUt_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

const dummyUser = (data) => ({
  ...data,
  nickname: '하종윤',
  id: 1,
  Posts: [{ id: 1 }],
  Followings: [
    { nickname: '최태훈' },
    { nickname: '황수철' },
    { nickname: '김기량' },
  ],
  Followers: [
    { nickname: '최태훈' },
    { nickname: '황수철' },
    { nickname: '김기량' },
  ],
});

// 이것의 redux-thunk 전부 입니다. redux-thunk 를 사용하는 이유는 한번에 여러번의 dispatch 를 하기 위해서
// export const loginAction = (data) => {
//   // 요기서 getState 는 initalState 가 아닌 reducers index.js 의 index, user, post 가 나옵니다.
//   return (dispatch, getState) => {
//     const state = getState();
//     dispatch(loginRequestAction());
//     axios
//       .post('/api/login')
//       .then((res) => {
//         dispatch(loginSuccessAction(res.data));
//       })
//       .catch((err) => {
//         dispatch(loginFailureAction(err));
//       });
//   };
// };

// action creater
export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initalState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followDone = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.me.Followings.push({ id: action.data });
        draft.followDone = true;
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowDone = false;
        draft.unfollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.me.Followings = draft.me.Followings.filter(
          (v) => v.id !== action.data,
        );
        draft.unfollowDone = true;
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.loginDone = false;
        draft.loginError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.loginDone = true;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.loginError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutDone = false;
        draft.logOutError = null;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.loginError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpDone = false;
        draft.signUpError = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.ChangeNickNameLoading = true;
        draft.ChangeNickNameDone = false;
        draft.ChangeNickNameError = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.ChangeNickNameLoading = false;
        draft.ChangeNickNameDone = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.ChangeNickNameLoading = false;
        draft.ChangeNickNameError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      // return {
      //   ...state,
      //   me: {
      //     ...state.me,
      //     Posts: [{ id: action.data }, ...state.me.Posts],
      //   },
      // };
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
      default:
        break;
    }
  });

export default reducer;
