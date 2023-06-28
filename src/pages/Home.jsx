import React, { useState } from 'react';
import PostRegist from './PostRegist';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>Home</div>
      <button onClick={openModal}>글쓰기</button>
      {isModalOpen && <PostRegist closeModal={closeModal} />}
      <div></div>
    </div>
  );
};

export default Home;
