import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

// (이전상태, 액션) => 다음상태
const rootReducer = combineReducers({
  // HYDRATE를 위해서 index reduce를 하나 추가해주세요
  // sever side rendering 을 위함!!
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log('HTDRATE', action);
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  },
  // initalState 는 combineReducers 가 자동으로 합쳐줍니다.
  user,
  post,
});

export default rootReducer;
