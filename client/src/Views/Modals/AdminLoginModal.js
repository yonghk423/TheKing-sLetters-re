import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useUserState, useUserDispatch } from '../../context/UserContext';

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
  height: 450px;
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
    width: 400px;
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

const SignInModal = ({isOpen, setIsOpen}) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  /* 유저 로그인 정보 확인 */
  const userState = useUserState();
  /* 유저 로그인 정보 수정 */
  const dispatch = useUserDispatch();

  /* 모달창 온오프 핸들러 */
  const modalOpenHandler = () => {
    setLoginInfo({
      email: '',
      password: '',
    });
    setIsOpen(!isOpen);
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

    const URL = `/admin/login`;
    const PAYLOAD = {
      email: loginInfo.email,
      password: loginInfo.password,
    }
    const OPTION = {};

    let response = null;
    try {
      response = await axios.post(URL, PAYLOAD, OPTION);
      if (response.status === 200) {
        const data = response.data.data.adminData;
        dispatch({type: "ADMIN_LOGIN"});
        dispatch({
          type: "SET_ADMIN_DATA",
          adminData: {
            email: data.email || "0",
            gender: data.gender || "0",
            image: data.image || "0",
            mobile: data.mobile || "0",
            name: data.name || "",
            createdAt: data.createdAt || "0",
            updatedAt: data.updatedAt || "0"
          }
        });
        modalOpenHandler();
        window.location = "/";
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
      .get(`/admin/signout`)
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem('adminToken');
          dispatch({type: "ADMIN_LOGOUT"});
          dispatch({type: "SET_ADMIN_DATA_NULL"});
          window.location = "/";
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
    {!userState.isAdminLoggedIn ?
    <ModalBtn onClick={modalOpenHandler}>관리자 로그인</ModalBtn>
    : null}
    
    {/* 유저가 로그인 했을 경우 로그아웃 버튼 표시 */}
    {userState.isAdminLoggedIn ?
    <ModalBtn onClick={logoutHandler}>관리자 로그아웃</ModalBtn>
    : null}

    {/* 모달 창 */}
    {isOpen ?
    <ModalBackdrop>
      <ModalView>
        <div className="modal_box">
          <span onClick={modalOpenHandler} className="close_btn">&times;</span>
          <SigninTitle>
              <h1 style={{fontWeight: "500"}}>나랏말싸미</h1>
              <h1>관리자 로그인</h1>
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
        </div>
      </ModalView>
    </ModalBackdrop>
    : null}
    </>
  );
};

export default SignInModal;