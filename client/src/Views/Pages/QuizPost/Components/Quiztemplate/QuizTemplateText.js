import React, { useEffect } from 'react';
import styled from 'styled-components';
import HelpMessage from '../HelpMessage';
import { isVaildQuiz } from '../VaildCheck';

const QuizTemplateTextWrapper = styled.div`
  /* 박스 설정 */
  position: relative;
  padding: 1% 6% 1% 6%;
  box-sizing: border-box;
  > .quiz_text_container {
    /* 박스 설정 */
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 100%;
    /* flex 설정 */
    display: flex;
    flex-direction: column;

    > .quiz_text_container_title {
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
    > textarea {
      /* 박스 설정 */
      padding: 8px 5px 8px 5px;
      border: none;
      outline: none;
      resize: none;
      overflow: hidden;
      /* 폰트 설정 */
      font-size: 16px;
      font-family: 'EBSHMJESaeronRA';
      letter-spacing: 3px;
      /* 박스 크기 설정 */
      width: auto;
      height: 275px;
    }
    :focus-within {
      border: 2px solid #0054bb;
    }
  }
`;

const QuizTemplateText = ({ dataQuizSelect, setDataQuizSelect }) => {
  // 컴포넌트가 로드되면 데이터를 초기화
  useEffect(() => {
    setDataQuizSelect((state) => ({
      ...state,
      title: '',
      type: 'text',
      contents: { text: '' },
    }));
  }, [setDataQuizSelect]);

  const inputHandler = (e, tag) => {
    const inputValue = e.target.value;
    if (!inputValue || !tag) return;
    if (tag === 'title') {
      setDataQuizSelect({ ...dataQuizSelect, title: inputValue });
    }
    if (tag === 'contents') {
      setDataQuizSelect({
        ...dataQuizSelect,
        type: 'text',
        contents: { text: inputValue },
      });
    }
  };

  return (
    <QuizTemplateTextWrapper>
      <HelpMessage
        data={dataQuizSelect}
        vaildator={isVaildQuiz}
        message={'퀴즈 제목과 내용을 입력해주세요'}
      />
      <div className="quiz_text_container">
        <input
          type="text"
          className="quiz_text_container_title"
          onChange={(e) => inputHandler(e, 'title')}
          placeholder="여기에 제목을 입력해 주세요"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = '여기에 제목을 입력해 주세요')}
        ></input>
        <textarea
          className="quiz_text_container_title_contents"
          onChange={(e) => inputHandler(e, 'contents')}
          placeholder="여기에 내용을 입력해 주세요"
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) => (e.target.placeholder = '여기에 내용을 입력해 주세요')}
        ></textarea>
      </div>
    </QuizTemplateTextWrapper>
  );
};

export default QuizTemplateText;
