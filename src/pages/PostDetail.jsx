import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import DOMPurify from 'dompurify';
import { onAuthStateChanged } from '@firebase/auth';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import PostEdit from './PostEdit';
import { deleteDoc, doc } from 'firebase/firestore';
import { MdClose } from 'react-icons/md';

const PostDetail = ({ postData, closeModal }) => {
  const isModalOpen = true;
  const posts = useSelector((state) => state.posts);
  const postDetails = posts.filter((post) => {
    if (post.authorId === postData.authorId && post.content === postData.content) {
      return post;
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
      console.log(postData);
      const postRef = doc(db, 'posts', postData.id);
      await deleteDoc(postRef);

      window.location.reload();
    }
  };

  useEffect(() => {
    const bodyElement = document.body;
    if (isModalOpen) {
      bodyElement.classList.add('modal-open');
      bodyElement.style.overflow = 'hidden';
    } else {
      bodyElement.classList.remove('modal-open');
      bodyElement.style.overflow = 'auto';
    }

    return () => {
      bodyElement.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <S.ModalWrap>
          <S.ModalContent>
            <S.ModalFlex>
              {isEditModalOpen && <PostEdit postData={postData} closeModal={closeEditModal} />}
              <S.ModalButtonX onClick={closeModal}>
                <MdClose size="25" />
              </S.ModalButtonX>
            </S.ModalFlex>
            <S.ModalTitleWrap>
              <S.ModalTitle>제목: {postDetails.title}</S.ModalTitle>
              <S.PlacedButton>
                {isSame && <S.ModalButton onClick={openEditModal}>수정</S.ModalButton>}
                {isSame && <S.ModalButton onClick={deletePost}>삭제</S.ModalButton>}
              </S.PlacedButton>
            </S.ModalTitleWrap>
            <hr />
            <S.ImgContent
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(`<S.TagName>${postDetails.tags}</S.TagName>` + postDetails.content)
              }}
            />
          </S.ModalContent>
        </S.ModalWrap>
      )}
    </>
  );
};

export default PostDetail;

const S = {
  ModalWrap: styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    backdrop-filter: saturate(180%) blur(7px);
    background-color: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    text-align: center;
    word-break: keep-all;
    position: fixed;
    z-index: 1300;
    inset: 0px;
  `,
  ModalContainer: styled.div``,

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
  ModalFlex: styled.div`
    display: flex;
    justify-content: end;
    align-items: baseline;
  `,
  ModalButton: styled.button`
    margin-left: 5px;
    padding: 5px 10px;
    background-color: #35c5f0;
    font-size: 17px;
    font-weight: bold;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `,
  ModalButtonX: styled.button`
    background-color: #fff;
    font-size: 20px;
    color: #63605f;
    border: none;
    position: absolute;
    top: 7px;
    right: 0;
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
  TagName: styled.div`
    margin-top: 10px;
  `,
  ImgContent: styled.div`
    width: 100%;
    padding-top: 50px;
    max-height: 500px;
    overflow-y: scroll;
    p {
      margin-top: 20px;
    }
  `,
  ModalTitleWrap: styled.div`
    position: relative;
    height: 45px;
    z-index: -1;
  `,
  ModalTitle: styled.p`
    position: absolute;
    font-size: 30px;
  `,
  PlacedButton: styled.span`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  `
};
