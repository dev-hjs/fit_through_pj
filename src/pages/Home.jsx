import React, { useEffect, useState } from 'react';
import PostRegist from './PostRegist';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PostDetail from './PostDetail';

const Home = () => {
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.posts);
  useEffect(() => {
    const fetchData = async () => {
      const initialState = [];

      const querySnapshot = await getDocs(collection(db, 'posts'));
      querySnapshot.forEach((doc) => {
        initialState.push({ ...doc.data(), pid: doc.id });
      });
      dispatch({ type: '초기세팅', payload: initialState });
    };
    fetchData();
  }, []);

  const [isRegistModalOpen, setIsRegistModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openRegistModal = () => {
    setIsRegistModalOpen(true);
  };

  const closeRegistModal = () => {
    setIsRegistModalOpen(false);
  };

  const [postData, setPostData] = useState('');

  const openDetailModal = (post) => {
    setPostData(post);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };
  // closeModal();

  // -----------토글 메뉴 만들면 쓸 것?
  // const Navbar = () => {
  //   const [isOpen, setNav] = useState(false);
  //   const toggleNav = () => {
  //     setNav((isOpen) => !isOpen);
  //   };
  // };

  return (
    <>
      <StHeader>
        <div>
          <Link to="/">
            <img
              style={{
                height: '60px'
              }}
              src="img/mainlogo.jpg"
              alt="main logo"
            />
          </Link>
        </div>
        <StForm>
          <input
            style={{
              height: '30px',
              width: '350px'
            }}
            type="text"
            placeholder=" 검색어를 입력하세요 !"
          />
          <StSearchBtn></StSearchBtn>
        </StForm>
        <div>
          <Link to="/login">
            <StButton>로그인</StButton>
          </Link>
          <Link to="/mypage/:uid">
            <StButton>👤</StButton>
          </Link>
          <StButton onClick={openRegistModal}>✏️</StButton>
          {isRegistModalOpen && <PostRegist closeModal={closeRegistModal} />}
          {isDetailModalOpen && <PostDetail postData={postData} closeModal={closeDetailModal} />}
        </div>
      </StHeader>
      <main
        style={{
          // border: '1px solid black',
          margin: '10px',
          padding: '10px',
          height: '100%'
        }}
      >
        {/* <h2>Main</h2> */}
        <div>
          <StCategoryBtn>#전체글🧡</StCategoryBtn>
          <StCategoryBtn>#상체운동💪🏻</StCategoryBtn>
          <StCategoryBtn>#하체운동🏃🏻‍</StCategoryBtn>
          <StCategoryBtn>#영양제추천💊</StCategoryBtn>
          <StCategoryBtn>#식단공유🥗</StCategoryBtn>
          <StCategoryBtn>#다이어트꿀팁🍯</StCategoryBtn>
        </div>
        <br />
        <StPostList>
          {postsData.map((post) => (
            <>
              <StPostContainer key={post.pid} onClick={() => openDetailModal(post)}>
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                {/* <h3>{post.authorId}</h3> */}
              </StPostContainer>
            </>
          ))}
        </StPostList>
        <br />
        <div>
          <button>더보기</button>
        </div>
        <br />
        <StPostList>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
        </StPostList>
      </main>
      <footer
        style={{
          // border: '1px solid black',
          margin: '10px',
          padding: '10px'
        }}
      >
        <div></div>
      </footer>
    </>
  );
};

export default Home;

const StHeader = styled.header`
  /* border: 1px solid black; */
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StCategoryBtn = styled.button`
  background-color: #96ddf2;
  height: 40px;
  border-radius: 10px;
  font-weight: bold;
  font-size: medium;
  text-align: center;
  border: none;
  padding: 3px 10px 5px 10px;
  margin-right: 10px;
  &.active {
    background-color: #35c5f0;
  }
`;

const StPostContainer = styled.div`
  width: 20%;
  height: 150px;
  border: 1px solid black;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 5px;
  & div {
    width: 100%;
    height: 100%;
    & p {
      width: 100%;
      height: 100%;
      & img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const StButton = styled.button`
  background-color: white;
  border: 0px;
  /* height: 50px; */
`;

const StPostList = styled.div`
  display: flex;
  align-items: center;
`;

const StSearchBtn = styled.button`
  background-color: white;
  border: 0px;
`;

const StForm = styled.form`
  position: relative;
`;
