import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const defaultProfileImage =
  'https://firebasestorage.googleapis.com/v0/b/fit-through-41507.appspot.com/o/logo512.png?alt=media&token=d764bd69-9646-49b5-89d7-62953a3f991f'; // Replace with your default image path

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (user === null) {
    return <div>마이페이지 프로필을 보시려면 로그인을 해주세요.</div>;
  }

  const displayName = user.displayName;
  const email = user.email;
  const photoURL = user.photoURL ? user.photoURL : defaultProfileImage;
  const uid = user.uid;

  return (
    <P.MypageProfile>
      <img src={photoURL} alt="사용자 프로필 이미지" />
      <P.MypageName>{displayName}</P.MypageName>
      <P.MyEmail>{email}</P.MyEmail>
      <P.MyIntro>{uid}</P.MyIntro>
    </P.MypageProfile>
  );
};

export default Profile;

const P = {
  MypageProfile: styled.div`
    margin-top: 30px;
    padding: 30px 55px 18px;
    position: relative;
    max-width: 270px;
    box-sizing: border-box;
    width: 100%;
    min-height: 310px;
    height: 100%;
    border: 1px solid rgb(218, 220, 224);
    box-shadow: rgba(63, 71, 77, 0.06) 0px 2px 4px 0px;
    img {
      margin: 0 auto;
      display: block;
      width: 100%;
      height: 158px;
      object-fit: cover;
      border-radius: 50%;
    }
  `,
  MypageName: styled.div`
    margin-top: 24px;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    line-height: 1.15;
    color: #292929;
    overflow-wrap: break-word;
    word-break: break-all;
  `,
  MyEmail: styled.div`
    margin-top: 13px;
    text-align: center;
    color: #292929;
    overflow-wrap: break-word;
    word-break: break-all;
  `,
  MyIntro: styled.div`
    margin-top: 13px;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    line-height: 19px;
    color: #828c94;
    overflow-wrap: break-word;
    word-break: break-all;
  `
};
