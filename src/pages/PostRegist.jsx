import React, { useState, useEffect, useMemo } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { styled } from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { addDoc, collection } from 'firebase/firestore';

const PostRegist = ({ closeModal }) => {
  const [currentUser, setCurrentUser] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setConent] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const postTags = ['#상체운동', '#하체운동', '#영양제주천', '#식단공유', '#다이어트꿀팁'];

  const handletagClick = (tag) => {
    setSelectedTag(tag);
  };
  // const handleTagSave = () => {
  //   selectedTag()
  // };

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
  const handleAddTag = (e) => {
    setTags(e.target.value);
  };
  const handleAddContent = (contents) => {
    setConent(contents);
  };

  const handleSave = async () => {
    const post = { authorId: currentUser, title, tags, content };

    // Firestore에서 'todos' 컬렉션에 대한 참조 생성하기
    const collectionRef = collection(db, 'posts');
    // 'todos' 컬렉션에 newTodo 문서를 추가합니다.
    await addDoc(collectionRef, post);

    closeModal();
    setSelectedTag('');

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
    <>
      <S.ModalContainer onClick={closeModal} />
      <S.ModalContent>
        <S.InputGroup>
          <S.InputLabel>제목:</S.InputLabel>
          <S.ModalInput type="text" value={title} onChange={handleAddTitle} />
        </S.InputGroup>
        <S.InputGroup>
          {/* <S.InputLabel>태그:</S.InputLabel>
          <S.ModalInput type="text" value={tags} onChange={handleAddTag} /> */}
          {postTags.map((tag) => (
            <S.TagsButton
              className={`tag${tag === selectedTag ? 'active' : ''}`}
              onClick={() => {
                handletagClick(tag);
              }}
            ></S.TagsButton>
          ))}
        </S.InputGroup>
        <S.InputGroup>
          <S.InputLabel>내용:</S.InputLabel>
          <ReactQuill
            style={{
              width: '80%',
              border: '1px solid gray',
              borderRadius: '5px'
            }}
            value={content}
            onChange={handleAddContent}
            modules={modules}
          />
          {/* <S.ModalInputContent type="text" value={content} onChange={handleAddContent} /> */}
        </S.InputGroup>
        <S.ModalButton onClick={handleSave}>저장</S.ModalButton>
      </S.ModalContent>
    </>
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
  `,

  TagsButton: styled.button`
    width: 85px;
    height: 25px;
    background-color: ${(props) => (props.className.includes('active') ? '#35c5f0' : 'transparent')};
    color: ${(props) => (props.className.includes('active') ? '#fff' : '#000')};
    border-radius: 5px;
  `
};
