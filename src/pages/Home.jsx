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
  useEffect(() => {
    const filteredData = postsData.filter((post) => {
      post.tags.includes('하체');
    });
    console.log(filteredData);
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
  const filterPostData = (tag) => {
    const filteredData = postsData.filter((post) => {
      return post.tags[0].includes(tag);
    });
    setData(filteredData);
  };
  // -----------토글 메뉴 만들면 쓸 것?
  // const Navbar = () => {
  //   const [isOpen, setNav] = useState(false);
  //   const toggleNav = () => {
  //     setNav((isOpen) => !isOpen);
  //   };
  // };

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
        <div>
          <StCategoryBtn onClick={() => filterPostData('')}>#전체글🧡</StCategoryBtn>
          <StCategoryBtn
            className={selectedTags.includes('상체운동') ? 'active' : ''}
            onClick={() => {
              toggleTag('#상체운동');
              filterPostData('#상체운동');
            }}
          >
            #상체운동💪🏻
          </StCategoryBtn>
          <StCategoryBtn
            className={selectedTags.includes('하체운동') ? 'active' : ''}
            onClick={() => {
              toggleTag('#하체운동');

              filterPostData('#하체운동');
            }}
          >
            #하체운동🏃🏻‍
          </StCategoryBtn>
          <StCategoryBtn
            className={selectedTags.includes('영양제추천') ? 'active' : ''}
            onClick={() => {
              toggleTag('#영양제추천');

              filterPostData('#영양제추천');
            }}
          >
            #영양제추천💊
          </StCategoryBtn>
          <StCategoryBtn
            className={selectedTags.includes('식단공유') ? 'active' : ''}
            onClick={() => {
              toggleTag('#식단공유');

              filterPostData('#식단공유');
            }}
          >
            #식단공유🥗
          </StCategoryBtn>
          <StCategoryBtn
            className={selectedTags.includes('다이어트꿀팁') ? 'active' : ''}
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
                  <h3>{post.title}</h3>
                </StPostContainer>
              </>
            );
          })}
        </StPostList>
      </main>
      <Footer />
    </>
  );
};

export default Home;

// const StHeader = styled.header`
//   /* border: 1px solid black; */
//   margin: 10px;
//   padding: 10px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

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
  width: 100%;
  height: 260px;
  /* border: 1px solid black; */
  background-color: #e0e0e0;
  border-radius: 5px;
  margin: 5px;
  & div {
    width: 100%;
    height: 100%;
    & img {
      object-fit: cover;
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
  grid-gap: 15px 35px;
  width: 100%;
  align-items: center;
  & div {
    & img {
      object-fit: cover;
    }
  }
`;

// const StSearchBtn = styled.button`
//   background-color: white;
//   border: 0px;
// `;

// const StForm = styled.form`
//   position: relative;
// `;
