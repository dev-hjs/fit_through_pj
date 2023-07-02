import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import searchBtn from '../../images/btn-search.png';
import { Link, useNavigate } from 'react-router-dom';
import PostRegist from '../../pages/PostRegist';
import { LiaUserCircleSolid } from 'react-icons/lia';
import { auth, signOut } from '../../firebase';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ---모달 닫기---
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ---로그인상태일 경우 모달열고 로그인이 안된 경우 로그인페이지로 이동시키기---
  const openModal = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      alert('로그인이 필요한 페이지 입니다.');
      navigate('/login');
    }
  };

  // ---인증 상태 변경 감지---
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user !== null);
    });
    // 사용자가 로그인한 경우 isLoggedIn을 true로 설정
    return () => unsubscribe();
    // 컴포넌트 언마운트 시 인증 상태 변경 감지 정리
  }, []);

  //---로그아웃 클릭시 사용자 로그아웃 처리 + 홈화면으로 이동---
  const onLogOutClick = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <StHeader>
      {/* 로고 */}
      <Link to="/">
        <img src="../img/mainlogo.jpg" alt="main logo" />
      </Link>
      {/* 검색창 */}
      <StForm>
        <StInput type="text" placeholder=" 검색어를 입력하세요 !" />
        <StSearchBtn>
          <img src={searchBtn} alt="검색 이미지" />
        </StSearchBtn>
      </StForm>
      <StBtns>
        {/* 로그인버튼 */}
        {!isLoggedIn ? (
          // = 로그인상태가 참인경우 로그아웃 버튼을 보여줌
          <Link to="/login">
            <StButton className="login-btn">Login</StButton>
          </Link>
        ) : (
          <StButton className="logout-btn" onClick={onLogOutClick}>
            Logout
          </StButton>
        )}

        {/* 프로필버튼 */}
        <StButton onClick={openModal}>
          <Link to={`/mypage/${auth?.currentUser?.uid}`} className="profile-btn">
            {isLoggedIn ? <StyledUserIconBlue size="30" /> : <StyledUserIconGrey size="30" />}
            {/* 로그인 상태에서 파란아이콘으로, 로그아웃 상태에서는 회색 아이콘으로 바뀜 */}
          </Link>

          {/* 글쓰기버튼 */}
        </StButton>
        <StPostingBtn onClick={openModal}>글쓰기</StPostingBtn>
        {isModalOpen && <PostRegist closeModal={closeModal} />}
        {/* 모달이 열려있을 경우 게시글등록 컴포넌트를 보여준다는 의미. 
        closeModal함수를 closeModal prop으로 전달.*/}
      </StBtns>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  margin: 0 auto;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  & a > img {
    width: 230px;
  }
`;

const StForm = styled.form`
  position: relative;
  top: 23px;
`;

const StInput = styled.input`
  padding: 0 40px 0 10px;
  width: 350px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background: #eee;
`;

const StSearchBtn = styled.button`
  position: absolute;
  top: 2.3px;
  right: 2px;
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;

  img {
    padding: 5px 4px;
    width: 20px;
  }
`;

const StBtns = styled.div`
  margin-top: 12px;
  display: flex;

  & a {
    text-decoration: none;
    .login-btn {
      display: block;
      margin-top: 10px;
      margin-right: 0;
    }
    .logout-btn {
      margin-top: 50px;
    }
    & button .profile-btn {
      margin-top: 126px;
    }
  }
`;

const StButton = styled.button`
  background-color: white;
  border: 0px;
  font-size: 16px;
  cursor: pointer;
`;

const StPostingBtn = styled.button`
  padding: 6px 13px;
  margin-top: 10px;
  height: 31px;
  color: #fff;
  border: none;
  border-radius: 5px;
  background-color: #35c5f0;
`;

const StyledUserIconGrey = styled(LiaUserCircleSolid)`
  margin-top: 7px;
  margin-right: 7px;
  color: rgb(110, 110, 110);
  cursor: pointer;
`;

const StyledUserIconBlue = styled(LiaUserCircleSolid)`
  margin-top: 7px;
  margin-right: 7px;
  color: #35c5f0;
  cursor: pointer;
`;
