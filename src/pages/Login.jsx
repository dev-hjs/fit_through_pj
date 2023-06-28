import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  // const signUp = async (event) => {
  //   event.preventDefault();

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     console.log('user', userCredential.user);
  //   } catch (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log('error with signUp', errorCode, errorMessage);
  //   }
  // };
  const signIn = async (event) => {
    event.preventDefault();

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert('환영합니다!', userCredential.user);
      navigate('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('이메일 혹은 비밀번호가 일치하지 않습니다.', errorCode, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  // const logOut = async (event) => {
  //   event.preventDefault();
  //   await signOut(auth);
  // };

  return (
    <L.LoginPage>
      <L.LoginContent>
        <Link to="/">
          <L.Logo
            style={{
              height: '60px'
            }}
            src="img/mainlogo.jpg"
            alt="main logo"
          />
        </Link>
        {/* <img src={process.env.PUBLIC_URL + '..logo.png'} alt="fit_through 로고" /> */}
        <L.Title>LOG IN</L.Title>
        <L.WrapperBox>
          <L.Box type="email" value={email} name="email" onChange={onChange} placeholder="Email address" required />
          <L.Box type="password" value={password} name="password" onChange={onChange} placeholder="Password" required />
          {/* <button onClick={signUp}>회원가입</button> */}
          <L.LoginBtn onClick={signIn} disabled={isLoading}>
            Sign In
          </L.LoginBtn>
          <Link to="/SignUp">
            <L.SignBtn>Sign Up</L.SignBtn>
          </Link>
          {/* <button onClick={logOut}>로그아웃</button> */}
        </L.WrapperBox>
      </L.LoginContent>
    </L.LoginPage>
  );
};

// #35C5F0
// #EF6161

const L = {
  LoginPage: styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #fff;
  `,
  LoginContent: styled.div`
    width: 420px;
    padding: 40px;
    height: 500px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 1;
    position: absolute;
    background: #fff;
    box-shadow: 0 0px 70px rgba(0, 0, 0, 0.1);
    border-top: 5px solid #35c5f0;
    float: left;
    -webkit-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;
    transition-delay: 0.2s;
  `,
  Logo: styled.img`
    margin: 0 auto 50px;
    text-align: center;
    display: block;
  `,
  Title: styled.h2`
    text-align: left;
    color: #35c5f0;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  `,

  WrapperBox: styled.form`
    margin-top: 20px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
    padding-left: 0;
    box-shadow: none;
    -webkit-transition: all 0.1s ease-out;
    transition: all 0.1s ease-out;
  `,
  Box: styled.input`
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    padding-left: 30px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.233);
    margin-top: 20px;
  `,
  LoginBtn: styled.button`
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    padding-left: 30px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.233);
    margin-top: 20px;
    background-color: #35c5f0;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  `,
  SignBtn: styled.button`
    width: 100%;
    box-sizing: border-box;
    padding: 15px;
    padding-left: 30px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.233);
    margin-top: 20px;
    background-color: #fff;
    cursor: pointer;
  `
};

export default Login;
