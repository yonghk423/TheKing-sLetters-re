import React from "react";
import styled from 'styled-components';
import lockIcon from '../Assets/lock-1.svg';

const PleaseLoginWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .lock_icon {
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

const PleaseLogin = ({ modalOpenHandler }) => {
  // 모달창 온오프 핸들러
  return (
    <PleaseLoginWrapper>
      <div className="close_button_top" onClick={modalOpenHandler}>&times;</div>
      <img className="lock_icon" src={lockIcon} alt="자물쇠 아이콘"></img>
      <p style={{fontSize: "1.5em", textAlign: "center"}}>계속하시려면 <br /><span style={{color: "green"}}>로그인</span>이 필요합니다</p>
      <button className="close_button_bottom" onClick={modalOpenHandler}>닫기</button>
    </PleaseLoginWrapper>
  );
}

export default PleaseLogin;