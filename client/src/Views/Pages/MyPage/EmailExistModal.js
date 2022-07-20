import React, { useState } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  all: initial;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.75);
  display: grid;
  place-items: center;
  font-family: 'EBSHMJESaeronRA';
`;

const ModalView = styled.div`
  position: relative;
  text-align: center;
  font-size: 16px;
  z-index: 999;

  > .modal_box {
    transition: all 0.4s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 550px;
    height: 250px;
    padding: 50px;
    background: white;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    > .main_text {
      font-size: 1.5em;
    }
    > .help_comment {
      font-size: 1em;
      color: #353535;
      margin-top: 2em;
    }
  }
`;

const Check = styled.div`
  > button {
    font-family: 'EBSHMJESaeronRA';
    background: transparent;
    color: #fafafa;
    border: 2px solid rgba(77, 109, 254, 0.9);
    background-color: rgba(77, 109, 254, 0.9);
    font-weight: 500;
    border-radius: 6px;
    letter-spacing: 3px;
    font-size: 1.2rem;
    cursor: pointer;
    width: 10em;
    padding: 10px 20px;
    transition: all 0.4s ease;
    font-size: 1.2em;
    margin-top: 2em;
      &:hover {
        border: 2px solid #0066ff;
        background-color: #0066ff;
      }
  }
`;

const EmailExistModal = ({ setIsExist }) => {
  const returnHome = () => {
    setIsExist(false);
    window.location='/';
  }

  return (
    <>
    <ModalBackdrop>
      <ModalView>
        <div className="modal_box">
          <div className="main_text">
          해당 이메일로 생성된 계정이 존재합니다.
          </div>
          <div className="help_comment">
            다른 소셜 계정 혹은 일반 계정 로그인을 시도해주세요.  
          </div>
          <Check>
            <button onClick={returnHome}>확인</button>
          </Check>
        </div>
      </ModalView>
    </ModalBackdrop>
    </>
  );
};

export default EmailExistModal;