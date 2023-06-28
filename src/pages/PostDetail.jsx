import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';

const PostDetail = () => {
  const [test, setTest] = useState([
    { text: '할 일1', id: 1 },
    { text: '할 일2', id: 2 }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'test01'));
      const querySnapshot = await getDocs(q);

      const initialTest = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data()
        };
        initialTest.push(data);
      });
      setTest(initialTest);
    };
    fetchData();
  }, []);
  console.log(test);

  return (
    <div>
      {test.map((item) => (
        <div key={item.id}>
          <div>제목: {item.title}</div>
          <div>태그: {item.tag}</div>
          <div>내용: {item.content}</div>
        </div>
      ))}
    </div>
  );
};

export default PostDetail;
