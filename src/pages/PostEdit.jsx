import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { db } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostEdit = () => {
  const [post, setPost] = useState({ title: '', content: '', tags: ',' });
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const doc1 = doc(db, 'posts', param.pid);
      const docData = await getDoc(doc1);

      setPost(docData.data());
      setTestContents(docData.data().content);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();

  const [testContents, setTestContents] = useState('');
  const onChangeContents = (contents) => {
    setTestContents(contents);
  };

  const titleRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    console.log(titleRef.current.innerHTML);
    titleRef.current.focus();
  }, []);

  const updatePost = () => {
    alert('저장완료!');
  };
  return (
    <>
      <StEditDiv>
        <StBtn onClick={updatePost}>완료</StBtn>
        <StBtn
          onClick={() => {
            const check = window.confirm('아직 작성이 완료되지 않았습니다. 정말로 돌아가시겠습니까?');
            if (check) {
              navigate(`/posts/${param.pid}`);
            }
          }}
        >
          돌아가기
        </StBtn>
      </StEditDiv>
      <StInputDiv>
        <StObject>제목</StObject>
        <StContentArea contentEditable="true" onInput={(e) => {}} ref={titleRef}>
          {post.title}
        </StContentArea>
      </StInputDiv>
      <StInputDiv>
        <StObject>태그</StObject>
        <StContentArea contentEditable="true" onInput={(e) => {}} ref={tagsRef}>
          {post.tags.split(',').map((tag) => '#' + tag)}
        </StContentArea>
      </StInputDiv>
      <StInputDiv>
        <StObject>내용</StObject>
        <ReactQuill
          style={{
            width: '80%',
            border: '1px solid gray',
            borderRadius: '5px'
          }}
          value={testContents}
          onChange={onChangeContents}
        />
      </StInputDiv>
    </>
  );
};

export default PostEdit;

const StEditDiv = styled.div`
  width: 1200px;
  height: 40px;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: 0;
`;
const StInputDiv = styled.div`
  display: flex;
  width: 1000px;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
`;
const StObject = styled.p`
  font-size: 35px;
  font-weight: bold;
`;
const StContentArea = styled.div`
  width: 80%;
  min-height: ${({ content }) => (content ? '500px' : '22px')};
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  padding-top: 5px;
  padding-left: 3px;
  overflow: hidden;
  caret-color: #35c5f0;
`;
const StBtn = styled.button`
  height: 30px;
  border-radius: 10px;
  background-color: transparent;
  border: 1px solid #35c5f0;
  margin: 0 5px;
  cursor: pointer;
`;
