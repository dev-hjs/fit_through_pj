import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { db } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostEdit = () => {
  const [post, setPost] = useState([{ title: '', content: '', tags: [''] }]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'posts'));
      const querySnapshot = await getDocs(q);
      const testPost = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        testPost.push(data);
      });
      setPost(testPost);
      setTestContents(testPost[0].content);
    };
    fetchData();
  }, []);

  const navigate = useNavigate();
  const id = 1;
  const [testContents, setTestContents] = useState('');
  const onChangeContents = (contents) => {
    setTestContents(contents);
  };
  console.log(testContents);
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <>
      <StEditDiv>
        <StBtn
          onClick={() => {
            alert('저장완료');
          }}
        >
          완료
        </StBtn>
        <StBtn
          onClick={() => {
            const check = window.confirm('아직 작성이 완료되지 않았습니다. 정말로 돌아가시겠습니까?');
            if (check) {
              navigate(`/posts/${id}`);
            }
          }}
        >
          돌아가기
        </StBtn>
      </StEditDiv>
      <StInputDiv>
        <StObject>제목</StObject>
        <StContentArea contentEditable="true" onInput={(e) => {}} ref={ref}>
          {post[0].title}
        </StContentArea>
      </StInputDiv>
      <StInputDiv>
        <StObject>태그</StObject>
        <StContentArea contentEditable="true" onInput={(e) => {}}>
          {post[0].tags.map((item, idx) => {
            if (idx !== post[0].tags.length - 1) {
              return <p key={idx}>{'#' + item + ','}</p>;
            }
            return <p key={idx}>{'#' + item}</p>;
          })}
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
