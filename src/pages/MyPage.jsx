import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AiFillPicture } from 'react-icons/ai';
import { LiaEditSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, auth, db, storage } from '../firebase';

const S = {
  MypageBodyWrap: styled.div`
    max-width: 1156px;
    width: 100%;
    height: 100vh;
  `,
  FlexWrap: styled.div`
    display: flex;
    justify-content: space-between;
  `,
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
  IconWrapper: styled.div`
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
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
    color: #292929;
  `,
  MyIntro: styled.div`
    margin-top: 13px;
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    line-height: 19px;
    color: #828c94;
  `,
  MyIconList: styled.ul`
    display: flex;
    justify-content: space-between;
  `,
  MypagePost: styled.section`
    margin-top: 50px;
    max-width: 700px;
    width: 100%;
  `,
  PostTitleWrap: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  MyPostTitle: styled.div`
    color: #000000;
    font-weight: bold;
    font-size: 18px;
    line-height: 1;
  `,
  PostViewLink: styled(Link)`
    font-weight: bold;
    color: #35c5f0;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `,
  PostList: styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    img {
      border-radius: 10px;
    }
  `,
  ImageGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px 35px;

    img {
      border-radius: 10px;
      width: 100%;
      height: auto;
    }
  `,
  FileUpload: styled.button`
    margin: 20px auto;
    padding: 60px 10px;
    border: 1px solid #dbdbdb;
    color: #757575;
    font-size: 13px;
    font-weight: bold;
    width: 100%;
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  FileUploadText: styled.span`
    margin-left: 5px;
  `
};

const MyPage = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [name, setName] = useState('닉네임');
  const [email, setEmail] = useState('test12345@gmail.com');
  const [intro, setIntro] = useState('안녕하세요.\n후뚜루 마뚜루입니다.');
  const [isImageDisplayed, setIsImageDisplayed] = useState(true);

  const [imageSrc, setImageSrc] = useState(
    'https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/1687764519_kakao_1464544308.jpg?gif=1&w=240&h=240&c=c&webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/1687764519_kakao_1464544308.jpg?gif=1&w=320&h=320&c=c&webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/1687764519_kakao_1464544308.jpg?gif=1&w=480&h=480&c=c&webp=1 3x'
  );
  const [isClicked, setIsClicked] = useState(false);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleEditProfile = () => {
    const newName = prompt('새로운 닉네임을 입력하세요:', name);
    const newEmail = prompt('새로운 이메일을 입력하세요:', email);
    const newIntro = prompt('새로운 소개를 입력하세요:', intro);

    if (newName && newEmail && newIntro) {
      // Update the state with the new values
      setName(newName);
      setEmail(newEmail);
      setIntro(newIntro);

      // Update the user's profile display name and photo URL
      updateProfile(auth.currentUser, {
        displayName: newName,
        photoURL: uploadedImageUrl || imageSrc
      })
        .then(() => {
          console.log('Profile updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });

      // Create a reference to the user document in Firestore
      const userRef = doc(db, 'users', 'YOUR_USER_ID'); // Replace 'YOUR_USER_ID' with the actual user ID

      // Set the new values in the user document
      setDoc(userRef, {
        name: newName,
        email: newEmail,
        intro: newIntro
      })
        .then(() => {
          console.log('Profile updated successfully!');
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
        });
    }
  };

  const handleClick = () => {
    setIsImageDisplayed(false);
    setSelectedFile(null);
    setUploadedImageUrl(null);
  };

  const handleSelectedFile = async (event) => {
    if (event && event.target && event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);

      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setUploadedImageUrl(imageUrl);

      // Reset the isImageDisplayed state to true
      setIsImageDisplayed(true);
    }
  };

  return (
    <>
      <S.MypageBodyWrap>
        <S.FlexWrap>
          <S.MypageProfile>
            <S.IconWrapper>
              <LiaEditSolid size="25" onClick={handleEditProfile} />
            </S.IconWrapper>
            {isImageDisplayed ? (
              <div style={{ position: 'relative', textAlign: 'center', marginTop: '5px' }}>
                <img src={uploadedImageUrl || imageSrc} alt="" />
                <span
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#fff',
                    backgroundColor: '#000',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                  onClick={handleClick}
                >
                  삭제
                </span>
              </div>
            ) : (
              <S.FileUpload onClick={handleFileUpload}>
                <AiFillPicture size={20} />
                <S.FileUploadText>이미지 업로드</S.FileUploadText>
                <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleSelectedFile} />
              </S.FileUpload>
            )}

            <S.MypageName>{name}</S.MypageName>
            <S.MyEmail>
              <span>{email}</span>
            </S.MyEmail>
            <S.MyIntro>
              <span>{intro}</span>
            </S.MyIntro>
          </S.MypageProfile>

          <S.MypagePost>
            <S.PostTitleWrap>
              <S.MyPostTitle>내 게시글</S.MyPostTitle>
              <S.PostViewLink to="/전체보기">전체보기</S.PostViewLink>
            </S.PostTitleWrap>
            <S.PostList>
              <S.ImageGrid>
                <img src="https://via.placeholder.com/150" alt="Post Image" />
                <img src="https://via.placeholder.com/150" alt="Post Image" />
                <img src="https://via.placeholder.com/150" alt="Post Image" />
                <img src="https://via.placeholder.com/150" alt="Post Image" />
              </S.ImageGrid>
            </S.PostList>
            {/* <S.FileUpload>
              <AiFillPicture size={20} />
              <S.FileUploadText>사진 업로드</S.FileUploadText>
              <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleSelectedFile} />
            </S.FileUpload> */}
          </S.MypagePost>
        </S.FlexWrap>
      </S.MypageBodyWrap>
    </>
  );
};

export default MyPage;
