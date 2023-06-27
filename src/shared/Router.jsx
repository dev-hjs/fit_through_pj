import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import PostDetail from '../pages/PostDetail';
import MyPage from '../pages/MyPage';
import Login from '../pages/Login';
import PostEdit from '../pages/PostEdit';
import PostRegist from '../pages/PostRegist';
import SignUp from '../pages/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:pid" element={<PostDetail />} />
        <Route path="/post/edit/:pid" element={<PostEdit />} />
        <Route path="/post/regist" element={<PostRegist />} />
        <Route path="/mypage/:uid" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
