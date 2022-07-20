import React from "react";
import styled from 'styled-components';
import mailIcon from '../Assets/mail-1.svg';

const EmailAuthAlertModalWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .mail_icon {
    width: 8rem;
    height: 8rem;
    margin: 4rem 0 2rem 0;
  }
  > .close_button_top {
    position: absolute;
    right: 0.3em;
    top: 0.3em;
    font-size: 1.3rem;
    font-weight: 800;
    color: black;
    :hover {
      cursor: pointer;
    }
  }
  > .close_button_bottom {
    position: absolute;
    bottom: 2rem;
    width: 10rem;
    height: 3rem;
    border-radius: 5px;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
    font-size: 1rem;
    font-weight: 600;
    :hover {
      cursor: pointer;
    }
  }
  > p {
    font-family: 'EBSHMJESaeronRA';
  }
`;

const EmailAuthAlertModal = ({ openHandler }) => {
  return (
    <EmailAuthAlertModalWrapper>
      <div className="close_button_top" onClick={() => openHandler()}>&times;</div>
      <img className="mail_icon" src={mailIcon} alt="메일 아이콘"></img>
      <p style={{fontSize: "2em"}}>이메일 <span style={{color: "green"}}>인증하기</span></p>
      <br />
      <p style={{fontSize: "1em"}}>회원님이 입력하신 이메일로 인증 메일이  <span style={{color: "green", fontWeight: "500"}}>발송</span>되었습니다</p>
      <p style={{fontSize: "1em"}}>메일함을 열어 <span style={{color: "green", fontWeight: "500"}}>인증 확인 링크</span>를 클릭하시면 가입이 완료됩니다</p>
      <button className="close_button_bottom" onClick={() => openHandler()}>닫기</button>
    </EmailAuthAlertModalWrapper>
  );
}

export default EmailAuthAlertModal;