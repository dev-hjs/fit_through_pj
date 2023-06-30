import React, { useEffect, useRef, useState, useMemo } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PostEdit = ({ postData, closeModal }) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState(postData.title);
  const [tags, setTags] = useState(postData.tags);
  const [content, setConent] = useState(postData.content);

  const titleRef = useRef(null);
  // const tagsRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const handleAddTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleAddTag = (e) => {
    setTags(e.target.value);
  };
  const handleAddContent = (contents) => {
    setConent(contents);
  };
  const handleSave = async () => {
    const post = {
      authorId: postData.authorId,
      title,
      tags,
      content
    };
    await setDoc(doc(db, 'posts', postData.pid), post);
    alert('저장완료!');

    window.location.replace('/');

    setTitle('');
    setTags('');
    setConent('');
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }, 'link', 'image']
        ],
        handlers: {
          // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
          // image: imageHandler,
        }
      }
    };
  }, []);
  return (
    <>
      <S.ModalContainer onClick={closeModal} />
      <S.ModalContent>
        <S.InputGroup>
          <S.ModalInput
            placeholder="제목을 입력해주세요"
            ref={titleRef}
            type="text"
            value={title}
            onChange={handleAddTitle}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.ModalInput type="text" value={tags} onChange={handleAddTag} />
        </S.InputGroup>
        <S.InputGroup>
          <S.ReactQuill>
            <ReactQuill
              placeholder="내용을 입력하세요"
              style={{
                width: '100%',
                border: '1px solid gray',
                borderRadius: '5px'
              }}
              value={content}
              onChange={handleAddContent}
              modules={modules}
            />
          </S.ReactQuill>
          {/* <S.ModalInputContent type="text" value={content} onChange={handleAddContent} /> */}
        </S.InputGroup>
        <S.ModalButton onClick={handleSave}>저장</S.ModalButton>
      </S.ModalContent>
    </>
  );
};

export default PostEdit;

const S = {
  ModalContainer: styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,

  ModalContent: styled.div`
    position: absolute;
    top: 50%;
    left: 50%;

    width: 410px;
    height: 500px;

    padding: 40px;

    text-align: center;

    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
  `,

  ModalButton: styled.button`
    padding: 10px 20px;
    background-color: #35c5f0;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `,

  InputGroup: styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  `,

  ModalInput: styled.input`
    flex: 1;
    height: 10px;
    padding: 10px;
  `,

  ModalInputContent: styled.input`
    flex: 1;
    height: 60px;
    padding: 10px;
  `,

  ReactQuill: styled.div`
    .ql-editor {
      min-height: 300px;
    }
  `
};
