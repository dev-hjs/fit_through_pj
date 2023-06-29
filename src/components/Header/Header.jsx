import React, { useState } from 'react';
import styled from 'styled-components';
import searchBtn from '../../images/btn-search.png';
import { Link } from 'react-router-dom';
import PostRegist from '../../pages/PostRegist';
import { LiaUserCircleSolid } from 'react-icons/lia';
// import { useSelector, useDispatch } from 'react-redux';
// import { collection, getDocs } from 'firebase/firestore';
import { auth } from '../../firebase';

const Header = () => {
  // const dispatch = useDispatch();
  // const postsData = useSelector((state) => state.posts);
  // console.log(postsData);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const initialState = [];

  //     const querySnapshot = await getDocs(collection(db, 'posts'));
  //     querySnapshot.forEach((doc) => {
  //       initialState.push({ ...doc.data(), pid: doc.id });
  //     });
  //     dispatch({ type: '초기세팅', payload: initialState });
  //   };
  //   fetchData();
  // }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <Link to="/login">
          <StButton className="login-btn">로그인</StButton>
        </Link>
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
      margin-top: 17px;
      margin-right: 0;
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

// const StTooltip = styled.div`
//   position: absolute;
//   top: 40px;
//   right: 0;
//   padding: 10px;
//   background-color: #f0f0f0;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

const StyledUserIcon = styled(LiaUserCircleSolid)`
  margin-top: 7px;
  margin-right: 7px;
  color: rgb(110, 110, 110);
  cursor: pointer;
`;
