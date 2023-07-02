import React, { useEffect, useState } from 'react';
import PostRegist from './PostRegist';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
// import Footer from '../components/Footer/Footer';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PostDetail from './PostDetail';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const postsData = useSelector((state) => state.posts);
  const [data, setData] = useState(postsData);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let initialPosts = [];

      const querySnapshot = await getDocs(collection(db, 'posts'));
      initialPosts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));

      dispatch({ type: '초기세팅', payload: initialPosts });
    };

    fetchData();
  }, []);

  useEffect(() => {
    setData(postsData);
  }, [postsData]);

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

  // const onFilterValueSelected = (filterValue) => {
  //   console.log(filterValue);
  // };
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
      // 이미 선택된 태그인 경우 선택 해제합니다.
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // 이전에 선택한 태그의 색상을 없애기 위해 기존의 선택된 태그 배열을 초기화합니다.
      setSelectedTags([]);

      // 새로운 태그를 선택합니다.
      setSelectedTags((prevTags) => {
        // 중복 체크를 위해 선택된 태그 배열을 복사합니다.
        const newTags = [...prevTags];
        if (!newTags.includes(tag)) {
          // 중복된 태그가 없는 경우에만 추가합니다.
          newTags.push(tag);
        }
        return newTags;
      });
    }
    filterPostData(tag);
  };

  const filterPostData = (tag) => {
    const filteredData = postsData.filter((post) => {
      return post.tags[0].includes(tag);
    });
    setData(filteredData);
  };

  return (
    <>
      <Header />
      {isDetailModalOpen && <PostDetail postData={postData} closeModal={closeDetailModal} />}
      <Main>
        <div>
          <StCategoryBtnAll
            isActive={selectedTag === ''}
            onClick={() => {
              setSelectedTag(''); // '전체글' 태그 클릭 시 선택된 태그 상태를 초기화합니다.
              filterPostData(''); // 해당 태그에 대한 게시물 필터링 작업을 수행합니다.
            }}
          >
            #전체글🧡
          </StCategoryBtnAll>
          <StCategoryBtn
            isActive={selectedTags.includes('#상체운동')}
            onClick={() => {
              toggleTag('#상체운동');
              filterPostData('#상체운동');
            }}
          >
            #상체운동💪🏻
          </StCategoryBtn>
          <StCategoryBtn
            isActive={selectedTags.includes('#하체운동')}
            onClick={() => {
              toggleTag('#하체운동');
              filterPostData('#하체운동');
            }}
          >
            #하체운동🏃🏻‍
          </StCategoryBtn>
          <StCategoryBtn
            isActive={selectedTags.includes('#영양제추천')}
            onClick={() => {
              toggleTag('#영양제추천');
              filterPostData('#영양제추천');
            }}
          >
            #영양제추천💊
          </StCategoryBtn>
          <StCategoryBtn
            isActive={selectedTags.includes('#식단공유')}
            onClick={() => {
              toggleTag('#식단공유');
              filterPostData('#식단공유');
            }}
          >
            #식단공유🥗
          </StCategoryBtn>
          <StCategoryBtn
            isActive={selectedTags.includes('#다이어트꿀팁')}
            onClick={() => {
              toggleTag('#다이어트꿀팁');
              filterPostData('#다이어트꿀팁');
            }}
          >
            #다이어트꿀팁🍯
          </StCategoryBtn>
        </div>
        <br />
        <StPostList>
          {data.map((post) => {
            const contentHTML = post.content;
            const parser = new DOMParser();
            const parsedHTML = parser.parseFromString(contentHTML, 'text/html');
            let thumbnailURL = '';
            if (contentHTML.includes('<img src=')) {
              const imageTag = parsedHTML.querySelector('img');
              thumbnailURL = imageTag.getAttribute('src');
            }

            return (
              <>
                <StPostContainer key={post.pid} onClick={() => openDetailModal(post)}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<img width="100%" height="100%" src=${thumbnailURL}>`
                    }}
                  ></div>
                  <StPostTitle>{post.title}</StPostTitle>
                </StPostContainer>
              </>
            );
          })}
        </StPostList>
      </Main>
      <Footer />
    </>
  );
};

export default Home;

const Main = styled.main`
  margin: 0 auto;
  padding: 20px 0;
  max-width: 1200px;
  width: 100%;
`;
// const StHeader = styled.header`
//   /* border: 1px solid black; */
//   margin: 10px;
//   padding: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

const StCategoryBtn = styled.button`
  background-color: ${(props) => (props.isActive ? '#35c5f0' : '#fff')};
  height: 40px;
  border-radius: 10px;
  font-weight: bold;
  font-size: medium;
  text-align: center;
  border: none;
  padding: 3px 10px 5px 10px;
  margin-right: 10px;
  cursor: pointer;
  &:not(:first-child) {
    background-color: ${(props) => (props.isActive ? '#35c5f0' : '#fff')};
  }

  &.active {
    background-color: #35c5f0;
  }
`;

const StCategoryBtnAll = styled(StCategoryBtn)`
  background-color: #e6e6e6;
`;

const StPostContainer = styled.div`
  position: relative;
  width: 100%;
  height: 260px;
  /* border: 1px solid black; */
  background-color: #fff;
  border-radius: 5px;
  /* box-sizing: content-box; */

  &:hover::after {
    content: '상세보기'; /* Text to display */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    padding: 0 12px;
    border-radius: 5px;
    font-size: 16px;
    line-height: 36px;
    cursor: pointer;
  }

  & div {
    border-radius: 20px;
    width: 100%;
    height: 100%;
    & img {
      object-fit: cover;
      border-radius: 15px;
      cursor: pointer;
    }
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px 35px;
  width: 100%;
  align-items: center;
  & div {
    & img {
      object-fit: cover;
    }
  }
`;

const StPostTitle = styled.h3`
  margin-top: 5px;
`;
