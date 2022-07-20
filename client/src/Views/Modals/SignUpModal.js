import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import EmailAuthAlertModal from './Components/EmailAuthAlertModal'
import loadingIcon from './Assets/loading-1.svg';

axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

const DEBUG_MODE = false;

export const ModalBackdrop = styled.div`
  /* css 부모로부터 상속 방지 */
  all: initial;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.75);
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
  height: min(100vh, 680px);
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
  justify-content: space-between;
  align-items: center;

  > .close_btn {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    font-size: 1.3rem;
    font-weight: 800;
    color: white;
    :hover {
      cursor: pointer;
    }
  }

  > .modal_title {
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
  }

  > .modal_form {
    width: 86%;
    margin: 1% 0 0 0;
    flex: min(60%, 70vh) 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
    
  > .modal_form .input_box {
    position: relative;
    width: 100%;
    height: auto;
    margin: 1.5rem 0 0 0;
  }

  > .modal_form .input_box input {
    width: 98%;
    padding: 0 1% 0 1%;
    height: 2.5rem;
    color: rgba(0, 0, 0, 1);
    background-color: rgba(0, 0, 0, 0.1);
    letter-spacing: 1px;
    border: none;
    outline: none;
    border-radius: 5px;
  }
  > .modal_form .input_box label {
    font-family: 'EBSHMJESaeronRA';
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    letter-spacing: 1px;
    color: rgba(0, 0, 0, 0.3);
    font-weight: 500;
    pointer-events: none;
    transition: 0.5s;
  }
  > .modal_form .input_box .submit-error-msg {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translate(0%, -50%);
    font-size: 0.8rem;
    text-align: right;
    color: #e6162a;
  }
  > .modal_form .input_box .label_active {
    top: -1.3rem;
    left: 0;
    color: blueviolet;
    font-weight: 600;
  }
  > .modal_form .vaild-check-box {
    position: relative;
    font-family: 'EBSHMJESaeronRA';
    width: 100%;
    height: auto;
  }
  > .modal_form .vaild-check-box .vaild-check-msg {
    width: 100%;
    padding: 0.2rem 0.5rem 0rem 0.5rem;
    font-size: 0.8rem;
    text-align: left;
    /* 깜빡이는 애니메이션 */
    animation: 0.5s linear 0s 2 normal none running none;
    @keyframes blink {
      0% {
        opacity: 0.8;
      }
      50% {
        opacity: 0.3;
      }
      100% {
        opacity: 0.8;
      }
    }
  }

  > .modal_form .radio_box {
    line-height: 1.5rem;
    width: 100%;
    height: auto;
    margin: 1rem 0 0 0;
  }
  > .modal_form .radio_box input {
    position: relative;
    margin: 0 0.3rem 0 0.3rem;
  }
  > .modal_form .radio_box input::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: lightgray;
    z-index: 101;
  }
  > .modal_form .radio_box input:checked::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #2196F3;
    z-index: 102;
  }
  .modal_form .radio_box input:checked::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: white;
    z-index: 103;
  }
  > .modal_form .radio_box label {
    font-family: 'EBSHMJESaeronRA';
    letter-spacing: 1px;
    color: #0a0a0a;
    font-weight: 500;
    transition: 0.5s;
    font-size: 1rem;
  }

  > .submit_buttons {
    margin: 0 0 1rem 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    > .submit_button_yes {
      font-family: 'EBSHMJESaeronRA';
      width: 10rem;
      height: 3rem;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: #2149f3a1;
      color: white;
      font-size: 1rem;
      @media (max-width: 480px) {
        width: 6rem;
        height: 2.5rem;
      }
    }
    > .submit_button_yes:hover {
      cursor: pointer;
      background-color: #2149f3c4;
    }
    > .submit_button_no {
      font-family: 'EBSHMJESaeronRA';
      width: 10rem;
      height: 3rem;
      border: none;
      outline: none;
      border-radius: 5px;
      font-size: 1rem;
      background-color: #efefef;
      @media (max-width: 480px) {
        width: 6rem;
        height: 2.5rem;
      }
    }
    > .submit_button_no:hover {
      cursor: pointer;
      background-color: #d8d8d8;
    }
  }
`;

const initialValue = {
  email: "",
  name: "",
  mobile: "",
  image: "",
  gender: "",
  password: "",
  passwordCheck: "",
};

const SignUpModal = ({ isOpen, setIsOpen }) => {
  const [isVaildEmail, setIsVaildEmail] = useState(false);
  const [isVaildName, setIsVaildName] = useState(false);
  const [isVaildMobile, setIsVaildMobile] = useState(false);
  const [isVaildGender, setIsVaildGender] = useState(false);
  const [isVaildPassword, setIsVaildPassword] = useState(false);
  const [isVaildPasswordCheck, setIsVaildPasswordCheck] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);

  // 회원가입 확인버튼 로딩
  const [isLoading, setIsLoading] = useState(false);

  // 회원가입 완료 여부를 저장하는 state
  const [isDoneSubmit, setIsDoneSubmit] = useState(false);
  
  // 에러 저장용 state
  const [errorList, setErrorList] = useState({emailAlreadyExist: false});

  // 입력 정보 저장용 state
  const [inputUserInfo, SetInputUserInfo] = useState(initialValue);

  /* 모달창이 열리고 닫힐 때 마다 모든 state를 초기화 */
  useEffect(() => {
    SetInputUserInfo(initialValue);
    setIsLoading(false);
    setIsDoneSubmit(false);
    setErrorList({emailAlreadyExist: false});
  }, [isOpen]);

  const vaildGenderCheck = (input) => {
    return input !== '';
  };

  const vaildEmailCheck = (input) => {
    const pattern = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    return pattern.test(input);
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
    //6~20 영문 대소문자
    //최소 1개의 숫자 혹은 특수 문자를 포함해야 함
    return pattern.test(input);
  };

  useEffect(() => {
    if (inputUserInfo.password === '') {
      setIsPasswordEmpty(true);
    } else {
      DEBUG_MODE && console.log('비밀번호 칸이 비어있지 않습니다.');
      setIsPasswordEmpty(false);
    }

    if (vaildPasswordCheck(inputUserInfo.password)) {
      DEBUG_MODE && console.log('형식에 맞는 비밀번호입니다.')
      setIsVaildPassword(true);
    } else {
      setIsVaildPassword(false);
    }

    if (inputUserInfo.password === inputUserInfo.passwordCheck) {
      DEBUG_MODE && console.log('비밀번호가 일치합니다.')
      setIsVaildPasswordCheck(true);
    } else {
      setIsVaildPasswordCheck(false);
    }

    if (vaildNameCheck(inputUserInfo.name)) {
      DEBUG_MODE && console.log('형식에 맞는 이름입니다.')
      setIsVaildName(true);
    } else {
      setIsVaildName(false);
    }

    if (vaildMobileCheck(inputUserInfo.mobile)) {
      DEBUG_MODE && console.log('형식에 맞는 전화번호입니다.')
      setIsVaildMobile(true);
    } else {
      setIsVaildMobile(false);
    }

    if (vaildEmailCheck(inputUserInfo.email)) {
      DEBUG_MODE && console.log('형식에 맞는 이메일입니다.')
      setIsVaildEmail(true);
    } else {
      setIsVaildEmail(false);
    }

    if (vaildGenderCheck(inputUserInfo.gender)) {
      DEBUG_MODE && console.log('형식에 맞는 성별입니다.')
      setIsVaildGender(true);
    } else {
      setIsVaildGender(false);
    }
  }, [inputUserInfo]);

  const submitButtonHandler = (e) => {
    e.preventDefault();
    // 확인 버튼 로딩 아이콘 활성화
    setIsLoading(true);
    if (!isPasswordEmpty && isVaildPassword && isVaildPasswordCheck && isVaildEmail && isVaildName && isVaildMobile && isVaildGender) {
      DEBUG_MODE && console.log('모두 양식에 맞습니다.');
      fetchSubmittedInfo((result) => {
        if (result === '이메일을 확인하세요.') {
          // 인증메일 확인하라는 모달창으로 넘김
          setIsDoneSubmit(true);
        } else if (result === '이미 존재하는 이메일입니다.') {
          setErrorList((state) => ({...state, emailAlreadyExist: true}));
        }
      });
      // 확인버튼 로딩 아이콘 비활성화
      setIsLoading(false);
    } else {
      // 만약 유효성 검사를 통과하지 못한다면
      // 최상단 유효성 검사 메시지를 선택
      const node = document.querySelectorAll(`.vaild-check-box .vaild-check-msg`);
      const list = Array.from(node);
      const target = list.filter((el) => el.style.visibility === 'visible')[0];
      if (target) { 
        // 유효성 검사 메시지를 1초간 깜빡이게
        target.style.animationName = 'blink';
        setTimeout(() => {
          target.style.animationName = 'none';
        }, 1000);
      }
      // 확인버튼 로딩 아이콘 비활성화
      setIsLoading(false);
      DEBUG_MODE && console.log('양식에 맞지 않습니다.');
      DEBUG_MODE && console.log(isPasswordEmpty, isVaildPassword, isVaildPasswordCheck, isVaildEmail, isVaildName, isVaildMobile, isVaildGender);
    }
  };
  
  const fetchSubmittedInfo = async (callback) => {
    const URL = `/signup`;
    const DEFAULT_IMAGE = `https://preview.redd.it/2rcjpn4o1sn51.png?width=440&format=png&auto=webp&s=c372e948dbd9efe0aad20ae54382f9244c9110b6`;
    const MOBILE = inputUserInfo.mobile;
    const GENDER = inputUserInfo.gender;
    const NAME = inputUserInfo.name;
    const EMAIL = inputUserInfo.email;
    const PASSWORD = inputUserInfo.password;
  
    const PAYLOAD = {
      name: NAME,
      email: EMAIL,
      password: PASSWORD,
      mobile: MOBILE,
      gender: GENDER,
      image: DEFAULT_IMAGE,
    }
    const OPTION = {};
  
    let response = null;
    try {
      response = await axios.post(URL, PAYLOAD, OPTION);
      DEBUG_MODE && console.log('POST /user/signup 요청에 성공했습니다.');
      callback(response.data);
    } catch(error) {
      response = error.response;
      DEBUG_MODE && console.log('POST /user/signup 요청에 실패했습니다.');
      callback(response.data);
    } finally {
      DEBUG_MODE && console.log(response);
    }
  };

  const inputValueHandler = (e, tag) => {
    const inputValue = e.target.value;
    if (tag === 'email') {
      const newValue = {...inputUserInfo, email: inputValue};
      SetInputUserInfo(newValue);
    } else if (tag === 'name') {
      const newValue = {...inputUserInfo, name: inputValue};
      SetInputUserInfo(newValue);
    } else if (tag === 'mobile') {
      const newValue = {...inputUserInfo, mobile: inputValue};
      SetInputUserInfo(newValue);
    } else if (tag === 'password') {
      const newValue = {...inputUserInfo, password: inputValue};
      SetInputUserInfo(newValue);
    } else if (tag === 'passwordCheck') {
      const newValue = {...inputUserInfo, passwordCheck: inputValue};
      SetInputUserInfo(newValue);
    } else if (tag === 'gender') {
      const newValue = {...inputUserInfo, gender: inputValue};
      SetInputUserInfo(newValue);
    }
  };

  /* 입력 테스트용 */
  useEffect(() => {
    DEBUG_MODE && console.log(inputUserInfo);
  }, [inputUserInfo]);

  const modalOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <ModalBtn onClick={modalOpenHandler}>회원가입</ModalBtn>

    {isOpen ?
    <ModalBackdrop className="modal_backdrop">
      <ModalView>
      {/* 회원가입이 완료되었으면 아래 모달창을 출력 */}
      {isDoneSubmit ?
      <EmailAuthAlertModal openHandler={modalOpenHandler} />
      : null}

      {/* 회원가입이 완료되지 않았으면 아래 모달창을 출력 */}
      {!isDoneSubmit ?
      <>
      <div className='close_btn' onClick={modalOpenHandler}>&times;</div>
      <div className="modal_title">
        <h1 style={{fontWeight: "500"}}>나랏말싸미</h1>
        <h1>회원가입</h1>
      </div>
      <form className="modal_form">
        <div className="input_box">
          <input type="email" name="email"
            onChange={(e) => {
              inputValueHandler(e, 'email');
              setErrorList({...errorList, emailAlreadyExist: false});}}
            required autocomplete="off" />
          <label
            className={inputUserInfo.email === '' ?
              '' : 'label_active'}>
              이메일</label>
          <p 
            className="submit-error-msg"
            style={{visibility: errorList.emailAlreadyExist ? "visible" : "hidden"}}>
            이미 존재하는 이메일입니다
            </p>
        </div>

        <div className="vaild-check-box">
          <p className="vaild-check-msg" style={{visibility: !isVaildEmail || inputUserInfo.email === '' ? "visible" : "hidden"}}>골뱅이표(@)를 포함한 이메일 주소</p>
        </div>
        
        <div className="input_box">
          <input type="text" name="text" onChange={(e) => inputValueHandler(e, 'name')} required autocomplete="off" />
          <label
            className={inputUserInfo.name === '' ?
              '' : 'label_active'}>
              이름</label>
        </div>

        <div className="vaild-check-box">
          <p
            className="vaild-check-msg"
            style={{visibility: !isVaildName
              || inputUserInfo.name === '' ? "visible" : "hidden"}}>
            2글자 이상 10글자 이하의 이름</p>
        </div>

        <div className="input_box">
          <input type="password" name="password" onChange={(e) => inputValueHandler(e, 'password')} required autocomplete="off" />
          <label
            className={inputUserInfo.password === '' ?
              '' : 'label_active'}>
              비밀번호</label>
        </div>

        <div className="input_box">
          <input type="password" name="password_check" onChange={(e) => inputValueHandler(e, 'passwordCheck')} required autocomplete="off" />
          <label
            className={inputUserInfo.passwordCheck === '' ?
              '' : 'label_active'}>
              비밀번호 확인</label>
        </div>

        <div className="vaild-check-box">
          <p 
            className="vaild-check-msg"
            style={{visibility: !isVaildPassword
              || inputUserInfo.password === '' ? "visible" : "hidden"}}>
            6~20자리 영문자와 최소 1개의 숫자 혹은 특수 문자를 포함한 비밀번호
            </p>
          <p 
            className="vaild-check-msg"
            style={{visibility: isVaildPassword 
              && inputUserInfo.password !== inputUserInfo.passwordCheck ? "visible" : "hidden"}}>
            비밀번호가 일치하지 않습니다
            </p>
        </div>

        <div className="input_box">
          <input type="tel" name="input_mobile" onChange={(e) => inputValueHandler(e, 'mobile')} required autocomplete="off" />
          <label
            className={inputUserInfo.mobile === '' ?
              '' : 'label_active'}>
              연락처</label>
        </div>

        <div className="vaild-check-box">
          <p 
            className="vaild-check-msg"
            style={{visibility: !isVaildMobile  
              || inputUserInfo.mobile === '' ? "visible" : "hidden"}}>
            하이픈(-)을 포함한 연락처를 입력
            </p>
        </div>

        <div className="radio_box">
          <input type="radio" id="male_selected" name="select_gender" value="male" onChange={(e) => inputValueHandler(e, 'gender')} />
          <label htmlFor="male_selected">남성</label>
          <input type="radio" id="female_selected" name="select_gender" value="female" onChange={(e) => inputValueHandler(e, 'gender')} />
          <label htmlFor="female_selected">여성</label>
        </div>

        <div className="vaild-check-box">
          <p 
            className="vaild-check-msg"
            style={{visibility: !isVaildGender ? "visible" : "hidden"}}>
            성별을 선택해주세요
            </p>
        </div>
      </form>
      <div className="submit_buttons">
        <button 
          className="submit_button_yes"
          onClick={submitButtonHandler}>
          {isLoading ?
          <img
            src={loadingIcon}
            alt="로딩 아이콘"
            style={{width: "1rem", height: "1rem"}}>
            </img> :
          "확인"}
          </button>
        <button className="submit_button_no" onClick={modalOpenHandler}>취소</button>
      </div>
      </>
      : null}
      </ModalView>
    </ModalBackdrop>
    : null}
    </>
  );
};
 
export default SignUpModal;

