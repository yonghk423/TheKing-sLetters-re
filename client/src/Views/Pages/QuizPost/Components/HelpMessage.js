import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const MsgShowUp = styled.p`
  font-family: 'EBSHMJESaeronRA';
  border: none;
  border-radius: 6px;
  padding: 5px 5px 5px 5px;
  background-color: rgba(0, 0, 0, 0.45);
  width: 35%;
  color: #fafafa;
  letter-spacing: 2px;
  text-align: center;
  /* 기본값 보임 */
  visibility: hidden;
  /* 메시지 위치 설정 */
  position: absolute;
  z-index: 1;
  /* padding을 고려해서 왼쪽 끝으로 이동 */
  left: 6%;

  /* 가운데에서 살짝 위로 */
  top: -30px;
  /* 애니메이션으로 서서히 사라지게함 */
  opacity: 0.8;
  transition: visibility 0.3s linear, opacity 0.3s linear;

  /* 깜빡이는 애니메이션 */
  animation: 0.8s linear 0s 2 normal none running none;
  @keyframes blink {
    0% {
      opacity: 0.8;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0.8;
    }
  }

  /* 화살표 css */
  ::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 5%;
    border-width: 8px 6px 8px 6px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
  @media (max-width: 960px) {
    width: 70%;
  }
  @media (max-width: 768px) {
    width: 70%;
  }
`;

const HelpMessage = ({ data, vaildator, message }) => {
  const helpMessage = useRef();

  useEffect(() => {
    if (vaildator(data)) {
      helpMessage.current.style.visibility = 'hidden';
      helpMessage.current.style.opacity = '0';
    } else {
      helpMessage.current.style.visibility = 'visible';
      helpMessage.current.style.opacity = '0.8';
    }
  }, [data, vaildator]);

  return (
    <MsgShowUp
      className={
        vaildator(data)
          ? 'modal_help_message_hidden'
          : 'modal_help_message_visible'
      }
      ref={helpMessage}
    >
      {message}
    </MsgShowUp>
  );
};

export default HelpMessage;
