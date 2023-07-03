import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { styled } from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import { addDoc, collection } from 'firebase/firestore';
import Editor from '../components/editor/Editor';
import { MdClose } from 'react-icons/md';

const PostRegist = ({ closeModal }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [title, setTitle] = useState('');
  const [content, setConent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const postTags = ['#상체운동💪🏼', '#하체운동🏃🏻', '#영양제추천💊', '#식단공유🥗', '#다이어트꿀팁🍯'];

  // 마운트 되었을 때 한번만 인증상태 확인. user의 uid를 설정
  useEffect(() => {
    setCurrentUser(auth.currentUser.uid);
  }, []);

  // 태그 핸들러
  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  // 제목 핸들러
  const handleAddTitle = (e) => {
    setTitle(e.target.value);
  };

  //내용 핸들러
  const handleAddContent = (contents) => {
    setConent(contents);
  };

  // 게시글 생성 저장시 핸들러
  const handleSave = async () => {
    const post = { authorId: currentUser, title, tags: [selectedTag], content };

    // Firestore에서 'posts' 컬렉션에 대한 참조 생성하기
    const collectionRef = collection(db, 'posts');
    await addDoc(collectionRef, post);
    alert('작성완료');
    //모달닫기
    closeModal();

    //페이지 리로드, 홈화면으로 이동
    window.location.replace('/');
  };

  return (
    <>
      <S.ModalWrap>
        <S.ModalContainer>
          {/* 모달바깥 클릭시 모달 닫기 */}
          <S.ModalContent>
            <S.ModalFlex>
              <S.ModalButtonX onClick={closeModal}>
                <MdClose size="25" />
              </S.ModalButtonX>
            </S.ModalFlex>

            {/* 제목입력란 */}
            <S.InputGroup>
              <S.ModalInput placeholder="제목을 입력하세요" type="text" value={title} onChange={handleAddTitle} />
            </S.InputGroup>

            {/* 태그선택 */}
            <S.InputGroup>
              <S.TagsDropdown value={selectedTag} onChange={handleTagChange}>
                <option value="">태그 선택 (필수)</option>
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
      </S.ModalWrap>
    </>
  );
};

export default PostRegist;

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
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #35c5f0;
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
    position: relative;
    top: -30px;
    right: -35px;
  `,

  InputGroup: styled.div`
    margin-bottom: 10px;
  `,

  ModalInput: styled.input`
    flex: 1;
    // height: 50px;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    font-size: 20px;
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
  `,

  StModal: styled.div`
    .modal {
      display: none; /* 모달 숨기기 */
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
    }
  `
};
