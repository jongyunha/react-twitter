import { useState, useCallback } from 'react';

// 커스텀훅을 만드는 예시
export default (initalValue = null) => {
  // 반복적으로 사용되는 Form 부분을 따로 빼서 initalValue 를 받아서 초기값으로 설정해준다.
  const [value, setValue] = useState(initalValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  // return 에 setValue 대신 useState와 useCallback 합쳤기 때문에 이 2개를 return
  return [value, handler, setValue];
};
