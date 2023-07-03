import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { db } from '../firebase';
import 'react-quill/dist/quill.snow.css';
import { doc, setDoc } from 'firebase/firestore';
import Editor from '../components/editor/Editor';

const PostEdit = ({ postData, closeModal }) => {
  const [title, setTitle] = useState(postData.title);
  const [content, setConent] = useState(postData.content);
  const [selectedTag, setSelectedTag] = useState(postData.tags[0]);

  const postTags = ['#상체운동💪🏼', '#하체운동🏃🏻', '#영양제추천💊', '#식단공유🥗', '#다이어트꿀팁🍯'];

  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const handleAddTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleAddTag = (e) => {
    setSelectedTag(e.target.value);
  };
  const handleAddContent = (contents) => {
    setConent(contents);
  };

  const handleSave = async () => {
    const post = {
      authorId: postData.authorId,
      title,
      tags: [selectedTag],
      content
    };

    await setDoc(doc(db, 'posts', postData.id), post);

    alert('저장완료!');

    closeModal();

    window.location.reload(`/mypage/${post.authorId}`);
  };

  useEffect(() => {
    const bodyElement = document.body;

    bodyElement.classList.add('modal-open');
    bodyElement.style.overflow = 'hidden';

    return () => {
      bodyElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <S.ModalContainer>
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
            <S.TagsDropdown value={selectedTag} onChange={handleAddTag}>
              <option value="">태그 선택</option>
              {postTags.map((tag) => (
                <option
                  key={tag}
                  value={tag}
                  style={{
                    backgroundColor: selectedTag === tag ? '#35c5f0' : 'transparent',
                    color: selectedTag === tag ? '#fff' : '#000'
                  }}
                >
                  {tag}
                </option>
              ))}
            </S.TagsDropdown>
          </S.InputGroup>
          <S.InputGroup>
            <S.ReactQuill>
              <Editor
                style={{
                  width: '100%',
                  border: '1px solid gray',
                  borderRadius: '5px'
                }}
                value={content}
                onChange={handleAddContent}
              />
            </S.ReactQuill>
          </S.InputGroup>
          <S.ModalButton onClick={handleSave}>저장</S.ModalButton>
        </S.ModalContent>
      </S.ModalContainer>
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
    max-width: 770px;
    width: 100%;
    min-height: 500px;
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
    margin-bottom: 10px;
  `,

  ModalInput: styled.input`
    height: 30px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    font-size: 20px;
    height: 47px;
    font-weight: bold;
  `,

  ModalInputContent: styled.input`
    flex: 1;
    height: 60px;
    padding: 10px;
  `,
  TagsDropdown: styled.select`
    width: 100%;
    height: 30px;
    padding: 5px;
  `,

  ReactQuill: styled.div`
    .ql-editor {
      min-height: 300px;
      max-height: 500px;
    }
  `
};
