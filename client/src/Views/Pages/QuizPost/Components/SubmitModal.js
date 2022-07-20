import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import CropModal from './CropModal';
import loadingIcon from '../Assets/loading-1.svg';

// 모달 컨텍스트
import { useModalDispatch } from '../../../../context/ModalContext';

const ModalSubmitBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalSubmitButtonContainer = styled.div`
  /* 박스 설정 */
  padding: 2% 15% 10% 15%;
  @media (max-width: 960px) {
    padding: 2% 8% 10% 8%;
  }

  > .modal_submit_button {
    font-family: 'EBSHMJESaeronRA';
    width: 100%;
    padding: 1% 1% 1% 1%;
    border-radius: 5px;
    background-color: transparent;
    border: 1px solid #303030;
    font-size: 20px;
    transition: all 0.4s ease;
    color: #303030;
    letter-spacing: 3px;
  }
  > .modal_submit_button:hover {
    cursor: pointer;
    color: #fafafa;
    background-color: #303030;
    border: 1px solid #303030;
  }
`;

const ModalSubmitView = styled.div`
  position: relative;
  border-radius: 10px;
  padding: 5rem;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 1.2em;
  @media (max-width: 768px) {
    padding: 3rem 0.8rem;
  }
  > .modal_image_preview_title {
    font-family: 'EBSHMJESaeronRA';
    text-align: center;
    font-size: 1.3rem;
    letter-spacing: 1px;
  }
  > .modal_image_preview_wrapper {
    border: 1px solid #303030;
    border-radius: 10px;
    overflow: hidden;
    margin-top: 0.7rem;
  }
  > .modal_image_preview_wrapper > button {
    font-family: 'EBSHMJESaeronRA';
    background-color: transparent;
    padding: 1rem;
    letter-spacing: 1px;
    font-size: 1rem;
    letter-spacing: 1px;
    &:hover {
      transition: all 0.4s ease;
      background-color: #303030;
      color: #fafafa;
    }
  }
  .modal_confirm_msg {
    letter-spacing: 1px;
    font-size: 1.2rem;
    margin-top: 0.7rem;
    font-family: 'EBSHMJESaeronRA';
  }
  > .modal_button_container {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    margin-top: 0.7rem;
  }
  > .modal_button_container .modal_confirm_yes {
    font-family: 'EBSHMJESaeronRA';
    width: 30%;
    color: #fafafa;
    font-weight: 500;
    border-radius: 6px;
    padding: 8px 18px;
    font-size: 1rem;
    letter-spacing: 1px;
    background-color: rgba(77, 109, 254, 0.9);
  }
  > .modal_button_container .modal_confirm_yes:hover {
    cursor: pointer;
    background-color: #0066ff;
    transition: all 0.4s ease;
  }
  > .modal_button_container .modal_confirm_no {
    font-family: 'EBSHMJESaeronRA';
    width: 30%;
    padding: 8px 18px;
    outline: 1px solid #303030;
    background-color: transparent;
    font-weight: 500;
    border-radius: 6px;
    font-size: 1rem;
    letter-spacing: 1px;
  }
  > .modal_button_container .modal_confirm_no:hover {
    cursor: pointer;
    background-color: #222222b0;
    color: #fafafa;
    outline: none;
    transition: all 0.4s ease;
  }
  > .modal_button_container .modal_confirm_loading {
    width: 30%;
    border: 1px solid #303030;
    background-color: transparent;
    color: #303030;
    font-weight: 500;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 1px;
  }
  > .modal_button_container .modal_confirm_loading .loading_image {
    max-width: 1rem;
    max-height: 1rem;
    margin-right: 0.3rem;
  }
`;

const ModalSubmit = ({
  isReadyToSubmit,
  uploadLoading,
  submitHandler,
  dataThumbnail,
  setDataThumbnail,
  isGuest,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const modalDispatch = useModalDispatch();

  const imageCropperHandler = (file, url) => {
    setDataThumbnail({ ...dataThumbnail, image_url: url, image_object: file });
    setIsUploaded(true);
  };
  const imageCropperConfig = {
    aspect: 1 / 1,
    unit: 'px',
    width: 80,
    height: 80,
  };

  const modalOpenHandler = () => {
    if (!isReadyToSubmit) {
      const target = document.querySelector('.modal_help_message_visible');
      if (target) {
        target.style.animationName = 'blink';
        target.scrollIntoView();
        setTimeout(() => {
          target.style.animationName = 'none';
        }, 1600);
      }
    } else {
      setIsModalOpen(!isModalOpen);
      setIsUploaded(false);
      setDataThumbnail({ ...dataThumbnail, image_url: '', image_object: '' });
    }
  };

  // 사용자가 썸네일 모달창에서 확인 버튼을 눌렀을 때
  const modalClickHandler = () => {
    // 만약 로그인하지 않았다면
    if (isGuest) {
      // 썸네일 업로드 모달창을 닫고
      setIsModalOpen(!isModalOpen);
      // 썸네일 이미지를 삭제
      setIsUploaded(false);
      setDataThumbnail({ ...dataThumbnail, image_url: '', image_object: '' });
      // 로그인 모달창을 오픈
      modalDispatch({ type: 'MODAL_USER_SIGN_IN', value: true });
    } else {
      // 로그인했다면 정상적으로 진행
      submitHandler();
    }
  };

  return (
    <>
      <ModalSubmitButtonContainer>
        <button
          className="modal_submit_button"
          onClick={() => modalOpenHandler()}
        >
          제출하기
        </button>
      </ModalSubmitButtonContainer>

      {isModalOpen && isReadyToSubmit ? (
        <ModalSubmitBackground>
          <ModalSubmitView>
            <p className="modal_image_preview_title">
              문제의 <span style={{ color: 'blue' }}>썸네일 사진</span>을 업로드
              해주세요
              <br />
              업로드하지 않으면{' '}
              <span style={{ color: 'blue' }}>기본 이미지</span>가 들어갑니다
            </p>
            <div className="modal_image_preview_wrapper">
              {isUploaded ? (
                <img
                  style={{ maxWidth: '80vw', maxHeight: '50vh' }}
                  src={dataThumbnail.image_url}
                  alt="썸네일 이미지"
                ></img>
              ) : (
                <CropModal
                  handler={imageCropperHandler}
                  config={imageCropperConfig}
                ></CropModal>
              )}
            </div>
            <p className="modal_confirm_msg">
              제출하시려면 <span style={{ color: 'blue' }}>확인</span>버튼을
              눌러주세요
            </p>
            <div className="modal_button_container">
              {!uploadLoading ? (
                <button
                  className="modal_confirm_yes"
                  onClick={modalClickHandler}
                >
                  확인
                </button>
              ) : null}

              {uploadLoading ? (
                <button className="modal_confirm_loading">
                  <img
                    className="loading_image"
                    src={loadingIcon}
                    alt="업로드 로딩"
                  ></img>
                  업로드 중
                </button>
              ) : null}

              <button
                className="modal_confirm_no"
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
