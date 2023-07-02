import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {});
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
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (password.length < 8) {
      alert('비밀번호는 최소 8자리 이상이어야 합니다.');
      return;
    }
    if (!email.includes('@')) {
      alert('이메일 주소를 올바르게 작성해주세요.');
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        alert('회원가입이 완료되었습니다!', userCredential.user);
        navigate('/login');
      }, 500);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert('중복된 이메일입니다. 다른 이메일을 작성해주세요.');
      } else {
        alert('회원가입이 완료되지 않았습니다. 형식에 맞게 다시 작성해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

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
        <L.Title>SIGN UP</L.Title>
        <L.WrapperBox>
          <L.Box type="email" value={email} name="email" onChange={onChange} placeholder="Email address" required />
          <L.Box type="password" value={password} name="password" onChange={onChange} placeholder="Password" required />
          <L.Box
            type="password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={onChange}
            placeholder="Confirm password"
            required
          />
          <L.SignUpBtn onClick={signUp} disabled={isLoading}>
            Sign Up
          </L.SignUpBtn>
          <Link to="/login">
            <L.HomeBtn>Log In</L.HomeBtn>
          </Link>
        </L.WrapperBox>
      </L.LoginContent>
    </L.LoginPage>
  );
};

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
  SignUpBtn: styled.button`
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
  HomeBtn: styled.button`
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

export default SignUp;
