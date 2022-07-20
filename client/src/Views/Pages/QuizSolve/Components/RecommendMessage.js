import React from 'react';
import styled from 'styled-components';

const Message = styled.p`
  font-family: 'EBSHMJESaeronRA';
  border: none;
  border-radius: 6px;
  padding: 5px 5px 5px 5px;
  background-color: #555;
  color: #fafafa;
  letter-spacing: 2px;
  text-align: center;
  /* 기본값 안보임 */
  display: none;
  /* 메시지 위치 설정 */
  position: absolute;
  z-index: 501;
  left: -13.8rem;
  top: -2.5rem;
  /* 크기는 고정 */
  width: 15rem;
  /* 화살표 css */
  ::after {
    content: '';
    position: absolute;
    top: 100%;
    right: 5%;
    border-width: 8px 6px 8px 6px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;

const RecommendMessage = () => {
  return (
    <>
      <Message id="msg_recommend_success">추천했습니다</Message>
      <Message id="msg_recommend_cancel">추천을 취소했습니다</Message>
    </>
  )
};

export default RecommendMessage;