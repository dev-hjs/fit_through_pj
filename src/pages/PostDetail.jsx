import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import DOMPurify from 'dompurify';
import { onAuthStateChanged } from '@firebase/auth';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import PostEdit from './PostEdit';
import { deleteDoc, doc } from 'firebase/firestore';

const PostDetail = ({ postData, closeModal }) => {
  const posts = useSelector((state) => state.posts);
  const postDetails = posts.filter((post) => {
    if (post.authorId === postData.authorId) {
      if (post.content === postData.content) return post;
    }
  })[0];

  const [isSame, setIsSame] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid === postDetails.authorId) {
          setIsSame(true);
        }
      } else {
        console.log('로그인x');
      }
    });
  }, []);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  const deletePost = async () => {
    const check = window.confirm('정말 삭제하시겠습니까?');
    if (check) {
      const postRef = doc(db, 'posts', postData.pid);
      await deleteDoc(postRef);

      window.location.reload();
    }
  };

  return (
    <>
      <S.ModalContainer onClick={closeModal} />
      <S.ModalContent>
        {isEditModalOpen && <PostEdit postData={postData} closeModal={closeEditModal} />}
        {isSame && <button onClick={openEditModal}>수정</button>}
        {isSame && <button onClick={deletePost}>삭제</button>}
        <div>제목: {postDetails.title}</div>
        <div>태그: {postDetails.tags}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(postDetails.content)
          }}
        />
      </S.ModalContent>
    </>
  );
};

export default PostDetail;

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
