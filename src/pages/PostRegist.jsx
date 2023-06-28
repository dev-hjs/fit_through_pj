import React, { useState } from 'react';
import { styled } from 'styled-components';

const PostRegist = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [content, setConent] = useState('');

  const handleAddTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleAddTag = (e) => {
    setTag(e.target.value);
  };
  const handleAddContent = (e) => {
    setConent(e.target.value);
  };

  const handleSave = () => {
    const post = { title, tag, content };
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = [...savedPosts, post];
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    closeModal();

    setTitle('');
    setTag('');
    setConent('');
  };

  return (
    <S.ModalContainer>
      <S.ModalContent>
        <div>
          <S.InputGroup>
            <S.InputLabel>제목:</S.InputLabel>
            <S.ModalInput type="text" value={title} onChange={handleAddTitle} />
          </S.InputGroup>
          <S.InputGroup>
            <S.InputLabel>태그:</S.InputLabel>
            <S.ModalInput type="text" value={tag} onChange={handleAddTag} />
          </S.InputGroup>
          <S.InputGroup>
            <S.InputLabel>내용:</S.InputLabel>
            <S.ModalInputContent type="text" value={content} onChange={handleAddContent} />
          </S.InputGroup>
          <S.ModalButton onClick={handleSave}>저장</S.ModalButton>
        </div>
      </S.ModalContent>
    </S.ModalContainer>
  );
};

export default PostRegist;

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

    width: 400px;
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
    background-color: #007bff;
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

  InputLabel: styled.label`
    flex: 0 0 80px;
    text-align: right;
    margin-right: 10px;
    margin-right: 10px;
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
  `
};
