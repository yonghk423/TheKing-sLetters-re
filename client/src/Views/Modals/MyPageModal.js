import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useUserDispatch, useUserState } from '../../context/UserContext';
import { useModalState, useModalDispatch } from '../../context/ModalContext';
import PleaseLogin from './Components/PleaseLogin';
import MessageResign from './Components/MessageResign';
import ResignSuccess from './Components/ResignSuccess';
import Upload from '../../functions/upload';

const DEBUG_MODE = true;
axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

export const ModalBackdrop = styled.div`
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

export const ModalContainer = styled.div`
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

export const ModalBtn = styled.button`
  background-color: transparent;
  text-decoration: none;
  border: none;
`;

export const ModalView = styled.div`
  position: absolute;
  overflow: hidden;
  font-size: 16px;
  transition: all 0.4s;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 750px;
  background:  white;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  @media (max-width: 768px) {
    transition: all 0.4s;
    height: 100vh;
    width: 100vw;
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  > .close_btn {
    position: absolute;
    top: 1em;
    right: 1em;
    cursor: pointer;
    color: white;
    font-weight: 800;
  }

  > .modal_title {
    color: #0a0a0a;
    background-color: #8a9f99;
    color: white;
    font-size: 1.5em;
    font-weight: 600;
    letter-spacing: 0.1em;
    padding-left: 0.1em;
    text-align: center;

    width: 100%;
    height: 2.5em;
    line-height: 2.5em;
  }
  > .modal_form {
    position: relative;
    width: 90%;
    height: auto;
  }

  // 프로필 사진 wrapper
  > .modal_form .imageBox {
    position: relative;
    width: 6rem;
    height: 6rem;
    outline: 3px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
  }
  // 프로필 사진 제목
  > .modal_form .profile_image_title {
    font-family: 'EBSHMJESaeronRA';
    color: blueviolet;
    font-weight: 600;
  }
  // 프로필 사진 안내 메시지
  > .modal_form .profile_image_message {
    font-size: 0.8em;
  }
  > .modal_form .imageBox img {
    max-width: 100%;
    max-height: 100%;
  }
  // 프로필 사진 업로드 입력창 라벨 숨김
  > .modal_form .imageBox label {
    position: absolute;
    width: 100%;
    height: 100%;
    :hover {
      cursor: pointer;
    }
  }
  // 프로필 사진 업로드 입력창 숨김
  > .modal_form .imageBox input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;
  }
  > .modal_form .inputBox {
    position: relative;
    width: 100%;
    height: auto;
    margin: 1.8em 0 0 0;
  }
  > .modal_form .inputBox input {
    width: 98%;
    padding: 0 1% 0 1%;
    height: 2.5em;
    color: rgba(0, 0, 0, 1);
    background-color: rgba(0, 0, 0, 0.1);
    letter-spacing: 1px;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  > .modal_form .inputBox label {
    font-family: 'EBSHMJESaeronRA';
    position: absolute;
    top: 0.5em;
    left: 0.5em;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.3);
    font-weight: 500;
    pointer-events: none;
    transition: 0.5s;
  }
  // 유효성 검사 메시지
  > .modal_form .vaildCheck .valid_check_msg {
    font-size: 0.8em;
  }
  > .modal_form .inputBox .label_active {
    top: -1.3em;
    left: 0;
    color: blueviolet;
    font-weight: 600;
  }
  > .modal_form .user_gender .user_gender_title {
    color: blueviolet;
    font-weight: 600;
  }
  > .button_container {
    position: absolute;
    width: 100%;
    /* 가로축 중앙으로 */
    left: 50%;
    transform: translate(-50%, 0%);
    /* 세로축 밑에서 살짝 위로 */
    bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .button_container .button_yes {
    width: 5em;
    height: 2em;
    margin: 0 0.5em 0 0.5em;
    border-radius: 5px;
    box-shadow: 0 1px 3px 0 rgba(32, 33, 36, .28);
    color: white;
    font-size: 1em;
    font-weight: 600;
    background-color: #0096FF;
    :hover {
      cursor: pointer;
    }
  }
  > .button_container .button_no {
    width: 5em;
    height: 2em;
    margin: 0 0.5em 0 0.5em;
    border-radius: 5px;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
    font-size: 1em;
    font-weight: 600;
    :hover {
      cursor: pointer;
    }
  }
`;

const initialValue = {
  email: "",
  name: "",
  mobile: "",
  image: "",
  image_object: "",
  gender: "",
  password: "",
  passwordCheck: "",
};

const MyPageModal = () => {
  const [modifiedUserInfo, setModifiedUserInfo] = useState(initialValue);
  const [isPasswordMatched, setIsPasswordMatched] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [isVaildPassword, setIsVaildPassword] = useState(true);
  const [isVaildMobile, setIsVaildMobile] = useState(true);
  const [isVaildName, setIsVaildName] = useState(true);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [isResigned, setIsResigned] = useState(false);
  /* context에서 유저 정보 state를 불러옴 */
  const userState = useUserState();
  const userDispatch = useUserDispatch();
  const isLogin = userState.isUserLoggedIn;
  const setIsLogin = (onOff) => {
    if (onOff)
      userDispatch({type: "USER_LOGIN"});
    else
      userDispatch({type: "USER_LOGOUT"});
  };

  /* context에서 모달 state를 불러옴 */
  const modalState = useModalState();
  const modalDispatch = useModalDispatch();
  const isOpen = modalState.modalUserMypage;
  const setIsOpen = (onOff) => {
    modalDispatch({type: "MODAL_USER_MYPAGE", value: onOff});
  };

  useEffect(() => {
    const initiate = async () => {
      if(isOpen) {
        const data = userState.userData;
        const newValue = {
          email: data.email,
          name: data.name,
          mobile: data.mobile,
          image: data.image,
          image_object: "",
          gender: data.gender,
          password: "",
          passwordCheck: "",
        };
        setModifiedUserInfo(newValue);
      }
    }
    initiate();
    DEBUG_MODE && console.log('유저 정보 초기화됨');
  }, [isOpen, userState]);

  useEffect(() => {
    DEBUG_MODE && console.log('유저 정보 수정됨', modifiedUserInfo);
  }, [modifiedUserInfo]);

  const inputUserInfoHandler = (e, tag) => {
    const inputValue = e.target.value;
    if (tag === 'name') {
      const newValue = {...modifiedUserInfo, name: inputValue};
      setModifiedUserInfo(newValue);
    } else if (tag === 'mobile') {
      const newValue = {...modifiedUserInfo, mobile: inputValue};
      setModifiedUserInfo(newValue);
    } else if (tag === 'password') {
      const newValue = {...modifiedUserInfo, password: inputValue};
      setModifiedUserInfo(newValue);
    } else if (tag === 'passwordCheck') {
      const newValue = {...modifiedUserInfo, passwordCheck: inputValue};
      setModifiedUserInfo(newValue);
    } else return;
  };

  const inputUserImageHandler = (e) => {
    if (!e.target.files) return;
    DEBUG_MODE && console.log(e.target.value);
    const file = e.target.files[0];
    const localUrl = URL.createObjectURL(file);
    const newValue = {...modifiedUserInfo, image: localUrl, image_object: file};
    setModifiedUserInfo(newValue);
  };

  const vaildMobileCheck = (input) => {
    const pattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    return pattern.test(input);
  };

  const vaildNameCheck = (input) => {
    const pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\s]{2,10}$/;
    return pattern.test(input);
  };

  const vaildPasswordCheck = (input) => {
    const pattern = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
    return pattern.test(input);
    ///^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
  };

  const submitButtonHandler = async (e) => {
    if (!submitEnabled) return;
    if (isPasswordMatched && isVaildPassword && isVaildName && isVaildMobile) {
      try {
        setSubmitEnabled(false);
        if(modifiedUserInfo.image_object !== '') {
          const result = await Upload(modifiedUserInfo.image_object);
          const newUrl = result.Location;
          URL.revokeObjectURL(modifiedUserInfo.image);
          const PAYLOAD = {
            email: modifiedUserInfo.email,
            name: modifiedUserInfo.name,
            image: newUrl,
            mobile: modifiedUserInfo.mobile,
            password: modifiedUserInfo.password,
          };
          DEBUG_MODE && console.log('프로필 사진 업로드 완료');
          await fetchUserInfo(PAYLOAD);
          userDispatch({type: "USER_LOGOUT"});
          userDispatch({type: "SET_USER_DATA_NULL"});
          alert('회원정보가 수정되었습니다');
          window.location = "/";
        } else {
          const PAYLOAD = {
            email: modifiedUserInfo.email,
            name: modifiedUserInfo.name,
            image: modifiedUserInfo.image,
            mobile: modifiedUserInfo.mobile,
            password: modifiedUserInfo.password,
          };
          await fetchUserInfo(PAYLOAD);
          userDispatch({type: "USER_LOGOUT"});
          userDispatch({type: "SET_USER_DATA_NULL"});
          alert('회원정보가 수정되었습니다');
          window.location = "/";
        }
      } catch (err) {
        DEBUG_MODE && console.log(err);
      } finally {
        setSubmitEnabled(true);
      }
    }
  }

  const fetchUserInfo = async (PAYLOAD) => {
    const URL = `/users/edit`;

    let response = null;
    try {
      response = await axios(URL, {
        method: 'PATCH',
        data: PAYLOAD,
      });
      DEBUG_MODE && console.log('PATCH /user/edit 요청에 성공했습니다.');
      if (response.status === 201) {
        DEBUG_MODE && console.log('이부분 수정')
      }
    } catch(error) {
      response = error.response;
      DEBUG_MODE && console.log('PATCH /user/edit 요청에 실패했습니다.');
    } finally {
      DEBUG_MODE && console.log(response);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (modifiedUserInfo.password === '' && modifiedUserInfo.passwordCheck === '') {
        // console.log('비밀번호 칸이 비어있습니다.');
        setIsPasswordEmpty(true);
      } else {
        // console.log('비밀번호 칸이 비어있지 않습니다.');
        setIsPasswordEmpty(false);
      }

      if (modifiedUserInfo.password === modifiedUserInfo.passwordCheck) {
        // console.log('비밀번호가 일치합니다.');
        setIsPasswordMatched(true);
      } else {
        // console.log('비밀번호가 일치하지 않습니다.');
        setIsPasswordMatched(false);
      }

      if (vaildPasswordCheck(modifiedUserInfo.password)) {
        // console.log('형식에 맞는 비밀번호입니다.')
        setIsVaildPassword(true);
      } else {
        setIsVaildPassword(false);
      }

      if (vaildNameCheck(modifiedUserInfo.name)) {
        // console.log('형식에 맞는 이름입니다.')
        setIsVaildName(true);
      } else {
        setIsVaildName(false);
      }

      if (vaildMobileCheck(modifiedUserInfo.mobile)) {
        // console.log('형식에 맞는 전화번호입니다.')
        setIsVaildMobile(true);
      } else {
        setIsVaildMobile(false);
      }
    }, 1000);
  }, [modifiedUserInfo]);

  // 모달창 온오프 핸들러
  const modalOpenHandler = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
    <ModalBtn onClick={modalOpenHandler}>내 정보</ModalBtn>
    {/* 유저가 회원 탈퇴했을 때 표시하는 페이지*/}
    {isResigned ?
    <ModalBackdrop>
      <ModalView>
        <ResignSuccess setIsLogin={setIsLogin} />
      </ModalView>
    </ModalBackdrop>
    : null}
    
    {/* 유저가 로그인하지 않았을 때 로그인을 요구하는 페이지 */}
    {isOpen && !isLogin && !isResigned ?
    <ModalBackdrop>
      <ModalView>
        <PleaseLogin modalOpenHandler={modalOpenHandler} />
      </ModalView>
    </ModalBackdrop>
    : null}

    {/* 유저가 로그인 했다면 본문을 표시 */}
    {isOpen && isLogin && !isResigned ?
    <ModalBackdrop>
      <ModalView>
        <span onClick={modalOpenHandler} className='close_btn'>&times;</span>
        <h1 className="modal_title">내 정보 수정</h1>
        <div className="modal_form">
          <p className="profile_image_title">내 사진</p>
          <p className="profile_image_message">클릭하시면 수정할 수 있습니다</p>
          <div className="imageBox">
            <label htmlFor="profile_uploader_1"></label>
            <img src={modifiedUserInfo.image} alt="이미지 100px*100px"></img>
            <input type="file" id="profile_uploader_1"onChange={(e) => inputUserImageHandler(e)}></input>
          </div>

          <div className="inputBox">
            <input type="text" name="email" autocomplete="off" defaultValue={modifiedUserInfo.email} readonly required />
            <label 
              className={modifiedUserInfo.email === '' ?
              '' : 'label_active'}>
              이메일
              </label>
          </div>
          <div className="inputBox">
            <input type="text" name="text" autocomplete="off"  defaultValue={modifiedUserInfo.name} onChange={(e) => inputUserInfoHandler(e, 'name')} required />
            <label 
              className={modifiedUserInfo.name === '' ?
              '' : 'label_active'}>
              이름
              </label>
          </div>
          <div className="vaildCheck">
            <p 
              className="valid_check_msg"
              style={{visibility: !isVaildName ? "visible" : "hidden"}}>
              닉네임은 2 ~ 10자, 영문, 한글, 숫자, 띄어쓰기만 가능합니다
              </p>
          </div>

          <div className="user_gender">
            <p className="user_gender_title">성별</p>
            <p>{modifiedUserInfo.gender === 'MALE' ? "남" : "여"}</p>
          </div> 

          <div className="inputBox">
            <input type="password" name="password" onChange={(e) => inputUserInfoHandler(e, 'password')} autocomplete="off" required />
            <label 
              className={modifiedUserInfo.password === '' ?
              '' : 'label_active'}>
              비밀번호
              </label>
          </div> 
          
          <div className="inputBox">
            <input type="password" name="passwordCheck" onChange={(e) => inputUserInfoHandler(e, 'passwordCheck')} autocomplete="off" required />
            <label 
              className={modifiedUserInfo.passwordCheck === '' ?
              '' : 'label_active'}>
              비밀번호 확인
              </label>
          </div> 

          <div className="vaildCheck">
            <p
              className="valid_check_msg"
              style={{visibility: !isPasswordEmpty && !isPasswordMatched ? "visible" : "hidden"}}>
              비밀번호가 일치하지 않습니다
              </p>
            <p
              className="valid_check_msg"
              style={{visibility: !isVaildPassword && isPasswordMatched ? "visible" : "hidden"}}>
              비밀번호는 영문자 6 ~ 20자로, 최소 1개의 숫자 또는 특수 문자를 포함해야 합니다
              </p>
          </div>

          <div className="inputBox">
            <input type="tel" name="tel" autocomplete="off" defaultValue={modifiedUserInfo.mobile} onChange={(e) => inputUserInfoHandler(e, 'mobile')} required />
            <label 
              className={modifiedUserInfo.mobile === '' ?
              '' : 'label_active'}>
              연락처
              </label>
          </div>  
          
          <div className="vaildCheck">
            <p 
              className="valid_check_msg"
              style={{visibility: !isVaildMobile ? "visible" : "hidden"}}>
              휴대폰 번호가 형식에 맞지 않습니다
              </p>
          </div>
        </div>
        <div className="button_container">
          <button className="button_yes" onClick={submitButtonHandler}>수정 완료</button>
          <button className="button_no" onClick={modalOpenHandler}>취소</button>
          <MessageResign setIsResigned={setIsResigned} setIsLogin={setIsLogin}></MessageResign>
        </div>
      </ModalView>
    </ModalBackdrop>
    : null}
    </>
  );
};
 
export default MyPageModal;