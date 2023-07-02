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
import Footer from '../components/Footer/Footer';

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
    //   const fetchData = async () => {
    //     if (!auth) {
    //       console.log('auth없음');
    //       window.location.replace(`/`);
    //     }
    //     if (!auth.currentUser) {
    //       console.log('currentUser없음');
    //       window.location.replace(`/`);
    //     }
    //     if (!auth.currentUser.uid) {
    //       console.log('uid없음');
    //       window.location.replace(`/`);
    //     }
    //     console.log('fetch함수실행');
    //     const q = query(collection(db, 'posts'), where('authorId', '==', auth.currentUser.uid));
    //     const querySnapshot = await getDocs(q);
    //     const initialPosts = [];
    //     querySnapshot.forEach((doc) => {
    //       initialPosts.push({ id: doc.id, ...doc.data() });
    //     });
    //     console.log(initialPosts);
    //     setUserPosts(initialPosts);
    //   };
    //   fetchData();
    // }, []);

    console.log('useeffect실행됨');
    if (auth.currentUser) {
      console.log('auth오류 아님');
      const fetchData = async () => {
        console.log('fetch함수실행');
        const q = query(collection(db, 'posts'), where('authorId', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const initialPosts = [];
        querySnapshot.forEach((doc) => {
          initialPosts.push({ id: doc.id, ...doc.data() });
        });
        console.log(initialPosts);
        setUserPosts(initialPosts);
      };
      fetchData();
    } else {
      console.log('auth오류');
    }
  });

  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {});
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
                      {/* <P.PostTitle>{post.title}</P.PostTitle> */}
                    </P.ImgList>
                  );
                })}
              </P.ImageGrid>
            </P.PostList>
          </P.MypagePost>
        </P.FlexWrap>
      </P.MypageBodyWrap>
      {isDetailModalOpen && <PostDetail postData={postData} closeModal={closeDetailModal} />}
      <Footer />
    </>
  );
};

export default MyPage;

const P = {
  MypageBodyWrap: styled.div`
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
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
    position: relative;
    max-width: 773px;
    width: 100%;
  `,
  PostTitleWrap: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  MyPostTitle: styled.div`
    font-weight: bold;
    font-size: 18px;
    line-height: 1;
  `,
  PostViewLink: styled(Link)`
    font-size: 14px;
    font-weight: bold;
    color: #35c5f0;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `,
  PostList: styled.div`
    margin-top: 20px;
    // display: flex;
    // justify-content: space-between;

    // grid-template-columns: repeat(3, 1fr);
    // grid-gap: 12px;

    img {
      border-radius: 10px;
    }
  `,
  ImageGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 25px;
    img {
      border-radius: 10px;
      width: 100%;
      // height: 150px;
      object-fit: cover;
    }
  `,
  ImgList: styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 15px 35px;
    width: 100%;
    height: 216px;
    // padding-bottom: 100%;
    position: relative;
    cursor: pointer;
    & div > img {
      object-fit: cover;
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
    p {
      width: 100%;
      height: 150px;
    }
  `
};
