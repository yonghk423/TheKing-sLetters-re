import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 모달 컨텍스트
import { useModalDispatch } from '../../../../context/ModalContext';
import { useUserState } from '../../../../context/UserContext';

const ModalSubmitBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalSubmitButtonContainer = styled.div`
  /* 박스 설정 */
  padding: 2% 15% 10% 15%;
  @media (max-width: 960px) {
    padding: 2% 10% 10% 10%;
  }
  > .modal_submit_button {
    width: 100%;
    padding: 1% 1% 1% 1%;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.2);
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 24px;
    transition: all 0.4s ease;
  }
  > .modal_submit_button:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
  }
`;

const ModalSubmitView = styled.div`
  position: relative;
  border-radius: 10px;
  width: 30rem;
  height: 20rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  > .modal_contents {
    padding: 5rem 0 5rem 0;
  }
  > .modal_contents p {
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 16px;
    text-align: center;
  }
  > .modal_button_container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
  }
  > .modal_button_container .modal_confirm_yes {
    width: 6rem;
    height: 3rem;
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 16px;
    border: 1px solid #2266ee;
    background-color: #2266ee;
    color: white;
    font-weight: 500;
    border-radius: 6px;
  }
  > .modal_button_container .modal_confirm_yes:hover {
    cursor: pointer;
    border: 1px solid #0000ff;
    background-color: #0000ff;
    color: white;
  }
  > .modal_button_container .modal_confirm_no {
    width: 6rem;
    height: 3rem;
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 16px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: transparent;
    color: rgba(0, 0, 0, 0.3);
    font-weight: 500;
    border-radius: 6px;
  }
  > .modal_button_container .modal_confirm_no:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
  }
`;

const ModalSubmit = ({ submitHandler, isGuest, quizData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalDispatch = useModalDispatch();
  const userState = useUserState();
  const adminIsLogin = userState.isAdminLoggedIn;

  const modalOpenHandler = () => {
    if (isGuest) {
      window.scrollTo(0, 0);
      modalDispatch({ type: 'MODAL_USER_SIGN_IN', value: true });
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };
  return (
    <>
      {adminIsLogin ? (
        <ModalSubmitButtonContainer>
          <button className="modal_submit_button">
            {quizData.answerComment}
          </button>
        </ModalSubmitButtonContainer>
      ) : (
        <ModalSubmitButtonContainer>
          <button
            className="modal_submit_button"
            onClick={() => modalOpenHandler()}
          >
            정답 제출하기
          </button>
        </ModalSubmitButtonContainer>
      )}

      {isModalOpen ? (
        <ModalSubmitBackground>
          <ModalSubmitView>
            <div className="modal_contents">
              <p style={{ fontWeight: 'bold' }}>정답을 제출하시겠습니까?</p>
              <br />
              <p>문제는 다시 풀 수 있지만</p>
              <p>포인트를 얻을 수 있는 기회는 한번입니다</p>
            </div>
            <div className="modal_button_container">
              <button
                className="modal_button modal_confirm_yes"
                onClick={() => {
                  submitHandler();
                  modalOpenHandler();
                }}
              >
                확인
              </button>
              <button
                className="modal_button modal_confirm_no"
                onClick={() => modalOpenHandler()}
              >
                취소
              </button>
            </div>
          </ModalSubmitView>
        </ModalSubmitBackground>
      ) : null}
    </>
  );
};

export default ModalSubmit;
