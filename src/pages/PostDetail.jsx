import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import DOMPurify from 'dompurify';
import { onAuthStateChanged } from '@firebase/auth';

const PostDetail = () => {
  const [postDetails, setPostDetails] = useState({ title: '', tag: '', content: '' });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('로그인', user.uid);
      } else {
        console.log('로그인x');
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = doc(db, 'posts', 'Hgr1PiSk0EJslxWSTRnm');
      const docDetail = await getDoc(querySnapshot);
      setPostDetails(docDetail.data());
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div>제목: {postDetails.title}</div>
        <div>태그: {postDetails.tag}</div>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(postDetails.content)
          }}
        />
      </div>
    </div>
  );
};

export default PostDetail;
