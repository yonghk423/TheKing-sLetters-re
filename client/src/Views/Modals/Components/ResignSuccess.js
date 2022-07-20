import React from "react";
import styled from 'styled-components';
import checkIcon from '../Assets/check-1.png';

const ResignSuccessWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .check_icon {
    width: 8em;
    height: 8em;
    margin: 5em 0 2em 0;
  }
  > .close_button_top {
    position: absolute;
    right: 0.3em;
    top: 0.3em;
    font-size: 1.3em;
    font-weight: 800;
    color: black;
    :hover {
      cursor: pointer;
    }
  }
  > .close_button_bottom {
    position: absolute;
    bottom: 2em;
    width: 10em;
    height: 3em;
    border-radius: 5px;
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
    font-size: 1em;
    font-weight: 600;
    :hover {
      cursor: pointer;
    }
  }
  > p {
    font-family: 'EBSHMJESaeronRA';
  }
`;

const ResignSuccess = ({ setIsLogin }) => {
  const reRoute = () => {
    window.location = "/";
    setIsLogin(false);
  };
  return (
    <ResignSuccessWrapper>
      <div className="close_button_top" onClick={reRoute}>&times;</div>
      <img className="check_icon" src={checkIcon} alt="체크 아이콘"></img>
      <p style={{fontSize: "1.5em", textAlign: "center"}}>회원 탈퇴가 <span style={{color: "green"}}>완료</span>되었습니다</p>
      <p style={{fontSize: "1.5em", textAlign: "center"}}>이용해 주셔서 <span style={{color: "green"}}>감사합니다</span></p>
      <button className="close_button_bottom" onClick={reRoute}>닫기</button>
    </ResignSuccessWrapper>
  );
}

export default ResignSuccess;