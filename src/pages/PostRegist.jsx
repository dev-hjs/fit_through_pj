import React, { useState, useEffect, useMemo } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addDoc, collection } from 'firebase/firestore';
import Editor from '../components/editor/Editor';

const PostRegist = ({ closeModal }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setConent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const postTags = ['#상체운동💪🏼', '#하체운동🏃🏻', '#영양제추천💊', '#식단공유🥗', '#다이어트꿀팁🍯'];

  // const handletagClick = (tag) => {
  //   setSelectedTag((prevTag) => (prevTag === tag ? '' : tag));
  // };
  // const handleTagSave = () => {
  //   selectedTag()
  // };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
        console.log('user', user);
      }
    });
  }, []);

  const handleAddTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleAddContent = (contents) => {
    setConent(contents);
  };

  const handleSave = async () => {
    const post = { authorId: currentUser, title, tags: [selectedTag], content };

    // Firestore에서 'todos' 컬렉션에 대한 참조 생성하기
    const collectionRef = collection(db, 'posts');
    // 'todos' 컬렉션에 newTodo 문서를 추가합니다.
    await addDoc(collectionRef, post);

    closeModal();
    setSelectedTag('');
    handleTagChange({ target: { value: '' } });

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
        ]
      }
    };
  }, []);
  return (
    <S.Modal>
      <div class="modal-content">
        <S.ModalContainer onClick={closeModal} />
        <S.ModalContent>
          <S.InputGroup>
            <S.ModalInput placeholder="제목을 입력하세요" type="text" value={title} onChange={handleAddTitle} />
          </S.InputGroup>
          <S.InputGroup>
            <S.TagsDropdown value={selectedTag} onChange={handleTagChange}>
              <option value="">
                태그 선택 <small>(필수)</small>
              </option>
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
      </div>
    </S.Modal>
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
    margin-top: 10px;
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
    }
  `,

  Modal: styled.div`
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
