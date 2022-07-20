import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import dotenv from 'dotenv';

import { useUserState, useUserDispatch } from '../../context/UserContext';
import GitHubLogo from './Assets/github-1.png';
import GoogleLogo from './Assets/google-1.png';
dotenv.config();

axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

const DEBUG_MODE = true;

const ModalBackdrop = styled.div`
  /* css 부모로부터 상속 방지 */
  all: initial;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.75);
`;

const ModalBtn = styled.button`
  background-color: transparent;
  text-decoration: none;
  border: none;
`;

const ModalView = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: min(100vh, 680px);
  z-index: 301;
  @media (max-width: 768px) {
    transition: all 0.4s;
    height: 100vh;
    width: 100vw;
  }
  
  > .modal_box .close_btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    color: white;
    font-size: 1rem;
    font-weight: 800;
  }

  > .modal_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all 0.4s;
    background: white;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
  }
  
  > .modal_box .modal_form {
    width: 100%;
    margin: 2rem 0 1rem 0;
  }

  > .modal_box .modal_form .inputBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  > .modal_box .modal_form .inputBox input {
    width: 75%;
    padding: 10px;
    font-size: 1rem;
    color:  black;
    letter-spacing: 1px;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    background: transparent;
    border-radius: 0;
  }
  
  > .modal_box .modal_form .inputBox label {
    //이메일 패스워드 색
    width: 80%;
    font-family: 'EBSHMJESaeronRA';
    letter-spacing: 1px;
    font-size: 1rem;
    color:  black;
    pointer-events: none;
    transition: 0.5s;
  }
`;

const Sign = styled.div`
  > button {
    background: transparent;
    border: none;
    outline: none;
    color: #fff;
    background: #00800099;
    width: min(80vw, 400px);
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1.3rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  > button:hover {
    background: #008000c9;
  }
`;

const SigninTitle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #8a9f99;
  > h1 {
    font-family: 'EBSHMJESaeronRA';
    color: white;
    text-align: center;
    font-size: 2rem;
  }
`;

const Img = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 3rem 0 2rem 0;
  //-----------git logo
  > .github_link {
    display: block;
    width: min(80vw, 350px);
    height: 50px;
    border-radius: 12px;
    overflow: hidden;
    > .gitBox {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: black;
      color: white;
      > .gitlogoTitle {
        position: absolute;
        font-size: 1rem;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        @media (max-width: 460px) {
          font-size: 14px;
        }
      }
      > .gitHubImg {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        left: 1rem;
        top: 50%;
        transform: translate(0%, -50%);
      }
    }
  }
  //-----------google logo
  > .google_link {
    display: block;
    width: min(80vw, 350px);
    height: 50px;
    border: 1px solid black;
    border-radius: 12px;
    overflow: hidden;
    margin-top: 10px;
    > .googleBox {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: white;
      color: black;
      > .googleTitle {
        font-size: 1rem;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        @media (max-width: 460px) {
          font-size: 14px;
        }
      }
      > .googleImg {
        position: absolute;
        width: 1.5rem;
        height: 1.5rem;
        left: 1rem;
        top: 50%;
        transform: translate(0%, -50%);
      }
    }
  }
`;

const SignInModal = ({isOpen, setIsOpen, switcher}) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  /* 유저 로그인 정보 확인 */
  const userState = useUserState();
  /* 유저 로그인 정보 수정 */
  const dispatch = useUserDispatch();
  const gitOAuthUrl = process.env.REACT_APP_GIT_OAUTH_URL;
  const googleOAuthUrl = process.env.REACT_APP_GOOGLE_OAUTH_URL;

  /* 모달창 온오프 핸들러 */
  const modalOpenHandler = () => {
    setLoginInfo({
      email: '',
      password: '',
    });
    setIsOpen(!isOpen);
  };

  /* 로그인창에서 회원가입창으로 넘어가는 switcher */

  const modalSwitcher = () => {
    // 현재 모달창을 끄고
    modalOpenHandler();
    // 다른 모달창을 오픈
    switcher((state)=> !state);
  };
  
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  /* 로그인하고 회원 정보를 context에 저장 */
  const loginHandler = async () => {
    if (loginInfo.email === '' || loginInfo.password === '') {
      alert("이메일과 비밀번호를 입력해주세요");
      return;
    }

    const URL = `/login`;
    const PAYLOAD = {
      email: loginInfo.email,
      password: loginInfo.password,
    }
    const OPTION = {};

    let response = null;
    try {
      response = await axios.post(URL, PAYLOAD, OPTION);
      if (response.status === 200) {
        const data = response.data.data.userData;
        dispatch({type: "USER_LOGIN"});
        dispatch({
          type: "SET_USER_DATA",
          userData: {
            email: data.email || "0",
            gender: data.gender || "0",
            image: data.image || "0",
            mobile: data.mobile || "0",
            name: data.name || "",
            mileage: data.mileage || "0",
            rank: data.rank || "0",
            createdAt: data.createdAt || "0",
            updatedAt: data.updatedAt || "0"
          }
        });
        modalOpenHandler();
      }
    } catch(error) {
      response = error.response;
      alert("이메일과 비밀번호를 확인하세요.");
    } finally {
      DEBUG_MODE && console.log(response);
    }
  };

  const logoutHandler = async () => {
    await axios
      .get('/signout')
      .then((response) => {
        if (response.status === 200) {
          dispatch({type: "USER_LOGOUT"});
          dispatch({type: "SET_USER_DATA_NULL"});
        }
        DEBUG_MODE && console.log(response);
      })
      .catch((response) => {
        DEBUG_MODE && console.log(response);
      });
  };

  return (
    <>
    {/* 모달 열기 버튼 */}
    {/* 유저가 로그인하지 않았을 경우 로그인 버튼 표시 */}
    {!userState.isUserLoggedIn ?
    <ModalBtn onClick={modalOpenHandler}>로그인</ModalBtn>
    : null}
    
    {/* 유저가 로그인 했을 경우 로그아웃 버튼 표시 */}
    {userState.isUserLoggedIn ?
    <ModalBtn onClick={logoutHandler}>로그아웃</ModalBtn>
    : null}

    {/* 모달 창 */}
    {isOpen ?
    <ModalBackdrop>
      <ModalView>
        <div className="modal_box">
          <span onClick={modalOpenHandler} className="close_btn">&times;</span>
          <SigninTitle>
              <h1 style={{fontWeight: "500"}}>나랏말싸미</h1>
              <h1>로그인</h1>
          </SigninTitle>
          <form className="modal_form" onSubmit={(e) => e.preventDefault()}>
            <div className="inputBox">
              <label>이메일</label>
              <input onChange={handleInputValue('email')} type="email" name="user_email" autocomplete="off" required></input>
            </div>
            <div className="inputBox">
              <label>비밀번호</label>
              <input onChange={handleInputValue('password')} type="password" name="password" required></input>
            </div>
          </form>
          <Sign>
            <button onClick={loginHandler}>로그인하기</button>
          </Sign>

          <Img>
            <a className="github_link" href={gitOAuthUrl}>
              <div className="gitBox">
                <p className="gitlogoTitle">GitHub 로그인</p>  
                <img className="gitHubImg" src={GitHubLogo} alt="gitHubLogo"/>
              </div>
              </a>
              <a className="google_link" href={googleOAuthUrl}>
                <div className="googleBox">
                  <p className="googleTitle">Google 로그인</p>
                  <img className="googleImg" src={GoogleLogo} alt="googleLogo"/>
                </div>
              </a>
          </Img>
          <p>아직 회원이 아니신가요? <span onClick={modalSwitcher} style={{color: "blue", cursor: "pointer"}}>회원가입</span></p>
        </div>
      </ModalView>
    </ModalBackdrop>
    : null}
    </>
  );
};

export default SignInModal;