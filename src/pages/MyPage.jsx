import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Profile from '../components/MyPage/Profile';

const MyPage = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (auth.currentUser) {
      const fetchData = async () => {
        const q = query(collection(db, 'posts'), where('authorId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        const initialPosts = [];

        querySnapshot.forEach((doc) => {
          initialPosts.push({ id: doc.id, ...doc.data() });
        });

        setUserPosts(initialPosts);
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
  }, []);

  return (
    <>
      <Header />
      <P.MypageBodyWrap>
        <P.FlexWrap>
          <Profile />
          <P.MypagePost>
            <P.PostTitleWrap>
              <P.MyPostTitle>내 게시글</P.MyPostTitle>
              <P.PostViewLink to="/">전체글 보러가기</P.PostViewLink>
            </P.PostTitleWrap>
            <P.PostList>
              <P.ImageGrid>
                {userPosts.map((post) => (
                  <P.ImgList key={post.id}>
                    {/* <h3>{post.title}</h3> */}
                    {/* <p>{post.content}</p> */}
                    <P.Img dangerouslySetInnerHTML={{ __html: post.content }}></P.Img>
                  </P.ImgList>
                ))}
              </P.ImageGrid>
            </P.PostList>
          </P.MypagePost>
        </P.FlexWrap>
      </P.MypageBodyWrap>
    </>
  );
};

export default MyPage;

const P = {
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
    width: 100%;

    img {
      border-radius: 10px;
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  `,
  ImgList: styled.div``,
  Img: styled.div`
    p {
      width: 100%;
      height: 150px;
    }
  `
};
