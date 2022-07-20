import React from 'react';
import styled from 'styled-components';

const Message = styled.p`
  font-family: 'EBSHMJESaeronRA';
  border: none;
  border-radius: 6px;
  background-color: #555;
  color: #fafafa;
  letter-spacing: 2px;
  text-align: center;
  /* 기본값 안보임 */
  display: none;
  /* 메시지 위치 설정 */
  position: absolute;
  z-index: 501;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
`;

const MynoteMessage = () => {
  return (
    <>
      <Message id="msg_mynote_added">오답노트에 추가되었습니다</Message>
      <Message id="msg_mynote_already_added">이미 오답노트에 추가된 퀴즈입니다</Message>
    </>
  )
};

export default MynoteMessage;