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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    if (isLoggedIn) {
      setIsModalOpen(true);
    } else {
      navigate('/login'); // 수정된 부분: 로그인 페이지로 이동하는 경로 '/login'으로 변경
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    // 인증 상태 변경 감지
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(user !== null); // 사용자가 로그인한 경우 isLoggedIn을 true로 설정
    });

    // 컴포넌트 언마운트 시 인증 상태 변경 감지 정리
    return () => unsubscribe();
  }, []);

  const onLogOutClick = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <StHeader>
      <Link to="/">
        <img src="../img/mainlogo.jpg" alt="main logo" />
      </Link>
      <StForm>
        <StInput type="text" placeholder=" 검색어를 입력하세요 !" />
        <StSearchBtn>
          <img src={searchBtn} alt="검색 이미지" />
        </StSearchBtn>
      </StForm>
     <StBtns>
        {!isLoggedIn ? (
          <Link to="/login">
            <StButton className="login-btn">Login</StButton>
          </Link>
        ) : (
          <StButton className="logout-btn" onClick={onLogOutClick}>
            Logout
          </StButton>
        )}
        <StButton>
          <Link to={`/mypage/${auth?.currentUser?.uid}`} className="profile-btn">
            <StyledUserIcon size="30" />
          </Link>
        </StButton>
        <StPostingBtn onClick={openModal}>글쓰기</StPostingBtn>
        {isModalOpen && <PostRegist closeModal={closeModal} />}
      </StBtns>
    </StHeader>
  );
};

export default Header;

const StHeader = styled.header`
  margin: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;

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
      margin-top: 16px;
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

const StyledUserIcon = styled(LiaUserCircleSolid)`
  margin-top: 7px;
  margin-right: 7px;
  color: rgb(110, 110, 110);
  cursor: pointer;
`;
