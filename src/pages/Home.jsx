import React, { useState } from 'react';
import PostRegist from './PostRegist';
import styled from 'styled-components';

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
`;

const StPostContainer = styled.div`
  width: 20%;
  height: 150px;
  border: 1px solid black;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 5px;
`;

const StButton = styled.button`
  background-color: white;
  border: 0px;
  /* height: 50px; */
`;

const StIcon = styled.button`
  margin-right: 10px;
  background-color: white;
  border: 0px;
`;

const StPostList = styled.div`
  display: flex;
  align-items: center;
`;

const Home = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // return (
  //   <div>
  //     <div>Home</div>
  //     <button onClick={openModal}>글쓰기</button>
  //     {isModalOpen && <PostRegist closeModal={closeModal} />}
  //     <div></div>
  //   </div>
  // );

  // ----------------------------------
  return (
    <>
      <StHeader>
        <div>
          <img
            style={{
              height: '60px'
            }}
            src="img/mainlogo.jpg"
            alt="main logo"
          />
        </div>
        <form>
          <input
            style={{
              height: '30px',
              width: '350px'
            }}
            type="text"
            placeholder=" 검색어를 입력하세요 !"
          />
          <StButton>🔍</StButton>
        </form>
        <div>
          <StIcon>로그인</StIcon>
          <StIcon>👤</StIcon>
          <StButton>✏️</StButton>
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
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
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
        footer
      </footer>
    </>
  );
};

export default Home;
