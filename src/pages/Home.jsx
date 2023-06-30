import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// import { Link } from 'react-router-dom';
import PostDetail from './PostDetail';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.posts);
  useEffect(() => {
    const fetchData = async () => {
      let initialState = [];

      const querySnapshot = await getDocs(collection(db, 'posts'));
      initialState = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        pid: doc.id
      }));

      dispatch({ type: '초기세팅', payload: initialState });
    };

    fetchData();
  }, []);

  const [isRegistModalOpen, setIsRegistModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const openRegistModal = () => {
    setIsRegistModalOpen(true);
  };

  const closeRegistModal = () => {
    setIsRegistModalOpen(false);
  };

  const [postData, setPostData] = useState('');

  const openDetailModal = (post) => {
    setPostData(post);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const onFilterValueSelected = (filterValue) => {
    console.log(filterValue);
  };
  // closeModal();

  const [selectedTags, setSelectedTags] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tagQueries = selectedTags.map((tag) => query(collection(db, 'posts'), where('tag', '==', tag)));

      if (tagQueries.length === 0) {
        // 선택된 태그가 없는 경우 빈 배열을 초기 값으로 설정합니다.
        setFilteredPosts([]);
        return;
      }

      const compoundQuery = tagQueries.reduce((q1, q2) => q1 || q2);
      const querySnapshot = await getDocs(compoundQuery);
      const postsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), pid: doc.id }));
      setFilteredPosts(postsData);
    };

    fetchData();
  }, [selectedTags]);

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <>
      <Header />
      {isDetailModalOpen && <PostDetail postData={postData} closeModal={closeDetailModal} />}
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
          <StCategoryBtn
            className={selectedTags.includes('상체운동') ? 'active' : ''}
            onClick={() => toggleTag('#상체운동')}
          >
            #상체운동💪🏻
          </StCategoryBtn>
          <StCategoryBtn
            className={selectedTags.includes('하체운동') ? 'active' : ''}
            onClick={() => toggleTag('#하체운동')}
          >
            #하체운동🏃🏻‍
          </StCategoryBtn>
          <StCategoryBtn
            className={selectedTags.includes('영양제추천') ? 'active' : ''}
            onClick={() => toggleTag('#영양제추천')}
          >
            #영양제추천💊
          </StCategoryBtn>
          <StCategoryBtn
            className={selectedTags.includes('식단공유') ? 'active' : ''}
            onClick={() => toggleTag('#식단공유')}
          >
            #식단공유🥗
          </StCategoryBtn>
          <StCategoryBtn
            className={selectedTags.includes('다이어트꿀팁') ? 'active' : ''}
            onClick={() => toggleTag('#다이어트꿀팁')}
          >
            #다이어트꿀팁🍯
          </StCategoryBtn>
        </div>
        <br />
        <StPostList>
          {filteredPosts.map((post) => (
            <>
              <StPostContainer key={post.pid} onClick={() => openDetailModal(post)}>
                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                {/* <h3>{post.authorId}</h3> */}
              </StPostContainer>
            </>
          ))}
        </StPostList>
        <StPostList></StPostList>
        <br />
        <StPostList>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
          <StPostContainer></StPostContainer>
        </StPostList>
      </main>
      <Footer />
    </>
  );
};

export default Home;

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
  cursor: pointer;
  &.active {
    background-color: #35c5f0;
  }
`;

const StPostContainer = styled.div`
  width: 20%;
  height: 150px;
  border: 1px solid black;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 5px;
  & div {
    width: 100%;
    height: 100%;
    & p {
      width: 100%;
      height: 100%;
      & img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

// const StButton = styled.button`
//   background-color: white;
//   border: 0px;
//   /* height: 50px; */
// `;

const StPostList = styled.div`
  display: flex;
  align-items: center;
`;

// const StSearchBtn = styled.button`
//   background-color: white;
//   border: 0px;
// `;

// const StForm = styled.form`
//   position: relative;
// `;
