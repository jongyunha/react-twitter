import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';

import { addPost, UPLOAD_IMAGES_REQUEST } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);
  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    // input type 이 파일인경우 ref 를 사용해 직접 Dom 에 접근한 후 current.click()
    imageInput.current.click();
  }, [imageInput.current]);
  const onChangeImages = useCallback((e) => {
    // 이미지 들에 대한 정보
    // e.target.files 는 배열모양을 띄는 유사 객체 입니다.
    console.log('images', e.target.files);
    // formData 를 사용하면 multipart 형식으로 파일을 보낼 수 있습니다.
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      // append 안에는 key , value
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);
  return (
    // 태그 안에서 바로 style을 주면 리렌더링 되기 때문에 밖으로 따로 빼주는 것이 좋지만
    // 시작부터 useMemo 나 style component로 최적화를 꼭 해줄 필요는 없다!!
    // 성능상에 문제가 생기면 그때 해줄것
    // backend 에서 multipart (파일 이미지 비디오 등등..) 을 받기위해서는 multer 라는 라이브러리가 필요합니다.
    <Form
      style={{ margin: '10px 0 20px' }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        {/* input 에서 올린 이미지 파일들이 /Post /images 로 들어갑니다. */}
        <input
          type="file"
          name="image"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">
          등록
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
