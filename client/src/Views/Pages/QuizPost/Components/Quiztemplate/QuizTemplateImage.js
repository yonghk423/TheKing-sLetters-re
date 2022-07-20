import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CropModal from '../CropModal';
import HelpMessage from '../HelpMessage';
import { isVaildQuiz } from '../VaildCheck';
import deleteIcon from '../../Assets/delete-1.svg';

const QuizTemplateImageWrapper = styled.div`
  /* 박스 설정 */
  position: relative;
  padding: 1% 6% 1% 6%;
  box-sizing: border-box;

  > .quiz_image_container {
    /* 박스 설정 */
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 100%;
    /* flex 설정 */
    display: flex;
    flex-direction: column;
    > .quiz_image_container__title {
      /* 박스 설정 */
      padding: 1px 5px 1px 5px;
      border: none;
      outline: none;
      background-color: rgba(0, 0, 0, 0.1);
      /* 폰트 설정 */
      font-size: 16px;
      font-family: 'EBSHMJESaeronRA';
      letter-spacing: 3px;
      /* 크기 설정 */
      flex: 2em 1 0;
    }
    > .quiz_image_contents {
      /* flex 박스 설정 */
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1em;
      /* 박스 설정 */
      position: relative;
      border: 1px dashed rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      min-height: 250px;
      margin: 3px;
      padding: 1em 0.5em 1em 0.5em;
      > .upload_button_container {
        font-family: 'EBSHMJESaeronRA';
        border: none;
        padding: 1em 0;
        width: 100%;
        height: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        letter-spacing: 1px;
        > span {
          letter-spacing: 1px;
          margin-top: 1rem;
        }
      }
      > .uploaded_image {
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        box-sizing: border-box;

        /* 이미지 업로드 크기 제한 */
        max-width: 95%;
        max-height: 100rem;
      }
      > .delete_icon {
        /* 박스 설정 */
        position: absolute;
        top: 0;
        right: 0;
        width: 48px;
        height: 48px;
        :hover {
          cursor: pointer;
        }
      }
    }
  }

  @media (max-width: 768px) {
    > .quiz_image_container > .quiz_image_contents > .uploaded_image {
      width: 100%;
    }
  }
  @media (max-width: 960px) {
    > .quiz_image_container > .quiz_image_contents > .uploaded_image {
      width: 100%;
    }
  }
`;

const QuizTemplateImage = ({ dataQuizSelect, setDataQuizSelect }) => {
  const [isUploaded, setIsUploaded] = useState(false);

  // 컴포넌트가 로드되면 데이터를 초기화
  useEffect(() => {
    setDataQuizSelect((state) => ({
      ...state,
      title: '',
      type: 'image',
      contents: { image_url: '', image_type: '' },
    }));
  }, [setDataQuizSelect]);

  const deleteHandler = (e) => {
    if (e.target && isUploaded) {
      setIsUploaded(false);
      setDataQuizSelect({
        ...dataQuizSelect,
        type: 'image',
        contents: { image_url: '', image_type: '' },
      });
    }
  };

  const inputHandler = (e, tag) => {
    e.preventDefault();
    if (!e.target || !tag) return;
    if (tag === 'title') {
      const inputValue = e.target.value;
      setDataQuizSelect({ ...dataQuizSelect, title: inputValue });
    }
  };

  const imageCropperHandler = (file, url) => {
    setDataQuizSelect({
      ...dataQuizSelect,
      type: 'image',
      contents: { image_url: url, image_object: file },
    });
    setIsUploaded(true);
  };

  const imageCropperConfig = { unit: 'px', width: 80, height: 60 };

  return (
    <QuizTemplateImageWrapper>
      <HelpMessage
        data={dataQuizSelect}
        vaildator={isVaildQuiz}
        message={'퀴즈 제목과 내용을 입력해주세요'}
      />
      <div className="quiz_image_container">
        <input
          type="text"
          className="quiz_image_container__title"
          onChange={(e) => inputHandler(e, 'title')}
          placeholder="여기에 제목을 입력해 주세요"
        ></input>
        {!isUploaded ? (
          <div className="quiz_image_contents">
            <div className="upload_button_container">
              <CropModal
                handler={imageCropperHandler}
                config={imageCropperConfig}
              />
              <span>파일 최대 용량 3MB</span>
            </div>
          </div>
        ) : (
          <div className="quiz_image_contents">
            <img
              className="delete_icon"
              src={deleteIcon}
              onClick={(e) => deleteHandler(e)}
              alt="이미지 삭제 아이콘"
            ></img>
            <img
              className="uploaded_image"
              src={dataQuizSelect.contents.image_url}
              alt="업로드된 이미지"
            ></img>
          </div>
        )}
      </div>
    </QuizTemplateImageWrapper>
  );
};

export default QuizTemplateImage;
