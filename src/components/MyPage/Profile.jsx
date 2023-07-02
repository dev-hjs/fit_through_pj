import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { storage } from '../../firebase';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';

const defaultProfileImage =
  'https://firebasestorage.googleapis.com/v0/b/fit-through-41507.appspot.com/o/profile%2Fprofile.jpg?alt=media&token=777e4edb-083b-4c3e-8f09-d157ebb979e1'; // Replace with your default image path

const Profile = () => {
  const imgInputRef = useRef(null);
  const nameInputRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [user, setUser] = useState(null);
  const [nameVal, setNameVal] = useState('닉네임');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setNameVal(currentUser.displayName ?? '');
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
  // const uid = user.uid;
  const handleInput = () => {
    imgInputRef.current.click();
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    try {
      const filePath = `contents/temp/${Date.now()}`;
      const fileRef = ref(storage, `imgs/${filePath}`);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      await updateProfile(auth.currentUser, {
        photoURL: url
      });
      setUser({ ...user, photoURL: url });
    } catch (e) {}
  };
  const handleName = async (name) => {
    if (name !== '닉네임') {
      await updateProfile(auth.currentUser, {
        displayName: name
      });
      setUser({ ...user, displayName: name });
    }
    setIsShow(!isShow);
  };

  return (
    <P.MypageProfile>
      <img src={photoURL} alt="사용자 프로필 이미지" onClick={handleInput} />
      <input
        ref={imgInputRef}
        style={{ display: 'none' }}
        type="file"
        onChange={(e) => {
          handleImage(e);
        }}
      />
      {isShow ? (
        <>
          <input
            ref={nameInputRef}
            type="text"
            value={nameVal}
            onChange={(e) => {
              setNameVal(e.target.value);
            }}
            placeholder="   닉네임을 입력해주세요."
          />

          <button
            onClick={() => {
              handleName(nameVal);
            }}
          >
            변경
          </button>
        </>
      ) : (
        <P.MypageName
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          <div className="nickname">닉네임</div>
          {displayName}
        </P.MypageName>
      )}

      <P.MyEmail>{email}</P.MyEmail>
      <P.MyIntro>{displayName}님의 마이페이지 입니다.</P.MyIntro>
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
      cursor: pointer;
    }
    &:hover:after {
      content: '사진변경'; /* Text to display */
      position: absolute;
      top: 28%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      padding: 0 12px;
      border-radius: 5px;
      font-size: 13px;
      line-height: 36px;
      cursor: pointer;
    }
    button {
      margin-left: 57px;
      margin-top: 5px;
    }
    input {
      height: 25px;
      cursor: pointer;
    }
  `,
  MypageName: styled.div`
    margin-top: 24px;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    line-height: 1.15;
    color: #636363;
    overflow-wrap: break-word;
    word-break: break-all;
    cursor: pointer;
    .nickname {
      font-size: 18px;
      margin-bottom: 10px;
      color: #919090;
      cursor: pointer;
    }
  `,

  MyEmail: styled.div`
    margin-top: 13px;
    text-align: center;
    color: #636363;
    overflow-wrap: break-word;
    word-break: break-all;
  `,
  MyIntro: styled.div`
    margin-top: 13px;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    line-height: 19px;
    color: #919090;
    overflow-wrap: break-word;
    word-break: break-all;
  `
};
