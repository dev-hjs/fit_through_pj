import React from 'react';

const Home = () => {
  localStorage.setItem(
    'dummy',
    JSON.stringify({
      uid: '1',
      title: '더미입니다',
      tag: ['식단', '상체', '하체', '영양제'],
      content: '더미예용',
      img: 'img url'
    })
  );
  return <div>Home</div>;
};

export default Home;
