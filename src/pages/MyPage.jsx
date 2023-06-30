import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Profile from '../components/MyPage/Profile';
import PostDetail from './PostDetail';

const MyPage = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [postData, setPostData] = useState('');

  const openDetailModal = (post) => {
    setPostData(post);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

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
                {userPosts.map((post) => {
                  const contentHTML = post.content;
                  const parser = new DOMParser();
                  const parsedHTML = parser.parseFromString(contentHTML, 'text/html');
                  let thumbnailURL = '';
                  if (contentHTML.includes('<img src=')) {
                    const imageTag = parsedHTML.querySelector('img');
                    thumbnailURL = imageTag.getAttribute('src');
                  }
                  return (
                    <P.ImgList key={post.id} onClick={() => post && openDetailModal(post)}>
                      <P.Img
                        dangerouslySetInnerHTML={{ __html: `<img width="100%" height="100%" src=${thumbnailURL}>` }}
                      ></P.Img>
                      <P.PostTitle>{post.title}</P.PostTitle>
                    </P.ImgList>
                  );
                })}
              </P.ImageGrid>
            </P.PostList>
          </P.MypagePost>
        </P.FlexWrap>
      </P.MypageBodyWrap>
      {isDetailModalOpen && <PostDetail postData={postData} closeModal={closeDetailModal} />}
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
  `,
  PostViewLink: styled(Link)`
    color: #1b1b1b;
    font-weight: 500;
    font-size: 14px;
    text-decoration: underline;
  `,
  PostList: styled.div`
    margin-top: 10px;
    // display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 12px;
  `,
  ImageGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 25px;
  `,
  ImgList: styled.div`
    width: 100%;
    height: 216px;
    // padding-bottom: 100%;
    position: relative;
    cursor: pointer;
    & div > img {
      object-fit: cover;
      border-radius: 10px;
    }
  `,
  Img: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `,
  PostTitle: styled.h3`
    position: absolute;
    bottom: -21px;
    text-align: center;
  `
};
