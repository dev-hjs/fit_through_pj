import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Header from '../components/Header/Header';

const MyPage = () => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    // 사용자가 로그인한 경우에만 실행되도록 체크
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

  return (
    <>
      <Header />

      <div>dddd</div>
      <div>
        <h1>Your Posts</h1>
        {userPosts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyPage;
