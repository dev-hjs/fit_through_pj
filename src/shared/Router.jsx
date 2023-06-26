import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import MyProfile from '../pages/MyProfile';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Detail />} />
        <Route path="/myprofile" element={<MyProfile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
