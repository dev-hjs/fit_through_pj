import React from 'react';
import { styled } from 'styled-components';

const Thumbnail = ({ postsArr, openDetailModal, area }) => {
  return (
    <>
      {postsArr.map((post) => {
        const contentHTML = post.content;
        const parser = new DOMParser();
        const parsedHTML = parser.parseFromString(contentHTML, 'text/html');
        let thumbnailURL = '';
        if (contentHTML.includes('<img src=')) {
          const imageTag = parsedHTML.querySelector('img');
          thumbnailURL = imageTag.getAttribute('src');
        }
        //그려지는 부분
        if (area === 'Home') {
          return (
            <>
              <StPostContainer key={post.id} onClick={() => openDetailModal(post)}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `<img width="100%" height="100%" src=${thumbnailURL}>`
                  }}
                ></div>

                <h3>
                  &nbsp;&nbsp;<span>{post.tags}</span> {post.title}
                </h3>
              </StPostContainer>
            </>
          );
        } else if (area === 'MyPage') {
          return (
            <ImgList key={post.id} onClick={() => openDetailModal(post)}>
              <Img dangerouslySetInnerHTML={{ __html: `<img width="100%" height="100%" src=${thumbnailURL}>` }}></Img>
            </ImgList>
          );
        }
      })}
    </>
  );
};

export default Thumbnail;

const StPostContainer = styled.div`
  position: relative;
  width: 269px;
  // height: 179.33px;
  /* border: 1px solid black; */
  background-color: #fff;
  border-radius: 4px;
  /* box-sizing: content-box; */
  margin: 0px auto;

  &:hover::after {
    content: '상세보기'; /* Text to display */
    position: absolute;
    top: 40%;
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
    border-radius: 5px;
    width: 100%;
    height: 216px;
    & img {
      object-fit: cover;
      border-radius: 4px;
      cursor: pointer;
    }
    /* & p {
      width: 100%;
      height: 100%;
      & img {
        width: 100%;
        height: 100%;
      }
    } */
  }
  & h3 {
    font-size: 16px;
    height: 48px;
    width: 269px;
    margin-top: 5px;
    word-break: keep-all;
    line-height: 24px;
  }
  & span {
    color: #30b4dc;
    font-weight: 600;
    margin-right: 5px;
  }
`;
const ImgList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px 35px;
  width: 100%;
  height: 216px;
  /* margin-top: 10px; */
  // padding-bottom: 100%;
  position: relative;
  cursor: pointer;
  & div > img {
    object-fit: cover;
  }
`;

const Img = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
