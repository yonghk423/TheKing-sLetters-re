import React, { useEffect } from 'react';
import styled from 'styled-components';
import HelpMessage from '../HelpMessage';
import { isVaildAnswer } from '../VaildCheck';

const AnswerTemplateMultiChoiceWrapper = styled.div`
  /* 박스 크기 설정 */
  position: relative;
  width: auto;
  padding: 0.8% 6% 0.8% 6%;
  box-sizing: border-box;
  /* flex 박스 설정 */
  display: flex;
  align-items: left;
  flex-direction: column;
  gap: 0.3em;
  > div {
    padding: 1%;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  > div > .answer_container {
    /* 박스 크기, 위치 설정 */
    position: relative;
    width: auto;
    height: 32px;
    padding: 4px 8px 4px 8px;
    margin: 0.7rem 0;
    /* 박스 디자인 설정 */
    border: 1px dashed rgba(0, 0, 0, 0.3);
    border-radius: 10px;

    /* flex 박스 설정 */
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5em;
    > .answer_container_input {
      font-family: 'EBSHMJESaeronRA';
      /* 박스 크기 설정 */
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      line-height: 16px;
      outline: none;
      padding: 5px;
      width: 85%;
      letter-spacing: 2px;
      :focus {
        border: 2px solid #0054bb;
      }
    }
    > .correct_answer_select {
      width: 1.5em;
      height: 1.5em;
      margin: 0px 3px 0px 3px;
      :hover {
        cursor: pointer;
      }
    }
    > .answer_container_delete_button {
      font-family: 'EBSHMJESaeronRA';
      width: 10%;
      padding: 3px;
      border-radius: 5px;
      transition: all 0.4s ease;
      letter-spacing: 1px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      background-color: transparent;
      :hover {
        cursor: pointer;
        background-color: #303030;
        color: #fafafa;
      }
    }
    > .corret_answer_msg {
      /* 박스 크기, 위치 설정 */
      position: absolute;
      left: -32px;
      /* 폰트 설정 */
      font-size: 14px;
      font-weight: 700;
      color: #0054bb;
    }
  }

  > div > .answer_selected {
    border: none;
    outline: 2px solid #0054bb;
  }

  > div > .answer_add {
    font-size: 20px;
    font-family: 'EBSHMJESaeronRA';
    /* 박스 디자인 설정 */
    border: 2px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    /* 크기 설정 */
    width: 100%;
    height: 32px;
    transition: all 0.4s ease;
    letter-spacing: 3px;
    background-color: transparent;
    margin-top: 12px;
    padding: 1rem 0;
    line-height: 5px;
    :hover {
      cursor: pointer;
      background-color: #303030;
      border: 2px solid #303030;
      color: #fafafa;
    }
  }

  > div > .error_msg {
    margin-top: 12px;
    /* 폰트 설정 */
    font-size: 16px;
    font-family: 'EBSHMJESaeronRA';
    letter-spacing: 3px;
    /* 크기 설정 */
    width: 542px;
    height: 32px;
    padding: 0px 5px 0px 5px;
  }
`;

const MAX_ANSWER = 6;

const AnswerTemplateMultiChoice = ({
  dataAnswerSelect,
  setDataAnswerSelect,
}) => {
  // 컴포넌트가 로드되면 실행
  useEffect(() => {
    const INITIAL_VALUE = [{ text: '', isAnswer: false }];
    setDataAnswerSelect({ type: '선다형 답안', contents: INITIAL_VALUE });
  }, [setDataAnswerSelect]);

  const addHandler = () => {
    setDataAnswerSelect({
      ...dataAnswerSelect,
      contents: [...dataAnswerSelect.contents, { text: '', isAnswer: false }],
    });
  };

  const deleteHandler = (index) => {
    setDataAnswerSelect({
      ...dataAnswerSelect,
      contents: dataAnswerSelect.contents.filter((el, idx) => idx !== index),
    });
  };

  const answerInputHandler = (e, index) => {
    const inputValue = e.target.value;
    if (!inputValue || inputValue === '') return;
    let copied = { ...dataAnswerSelect };
    copied.contents[index].text = inputValue;
    setDataAnswerSelect(copied);
  };

  const answerSelectHandler = (index) => {
    let copied = {
      ...dataAnswerSelect,
      contents: [...dataAnswerSelect.contents].map((el, idx) => {
        if (idx === index) {
          return { ...el, isAnswer: true };
        } else {
          return { ...el, isAnswer: false };
        }
      }),
    };
    setDataAnswerSelect(copied);
  };

  return (
    <AnswerTemplateMultiChoiceWrapper>
      <HelpMessage
        data={dataAnswerSelect}
        vaildator={isVaildAnswer}
        message={'보기를 만드시고 정답을 선택해 주세요'}
      />
      <div>
        {dataAnswerSelect.contents.map((el, idx) => {
          return (
            <div
              key={idx.toString()}
              className={
                el.isAnswer
                  ? 'answer_container answer_selected'
                  : 'answer_container'
              }
            >
              {el.isAnswer ? (
                <span className="corret_answer_msg">정답</span>
              ) : null}
              <input
                type="text"
                className="answer_container_input"
                onChange={(e) => answerInputHandler(e, idx)}
                placeholder="여기에 정답을 입력해 주세요"
                onFocus={(e) => (e.target.placeholder = '')}
                onBlur={(e) =>
                  (e.target.placeholder = '여기에 정답을 입력해 주세요')
                }
                value={el.text || ''}
              ></input>
              <input
                type="radio"
                className="correct_answer_select"
                name="correct_answer"
                checked={el.isAnswer || false}
                onChange={() => {}}
                onClick={() => answerSelectHandler(idx)}
              ></input>
              <button
                onClick={() => deleteHandler(idx)}
                className="answer_container_delete_button"
              >
                삭제
              </button>
            </div>
          );
        })}
        {dataAnswerSelect.contents.length < MAX_ANSWER ? (
          <button onClick={addHandler} className="answer_add">
            정답 추가하기
          </button>
        ) : null}
        {dataAnswerSelect.contents.length >= MAX_ANSWER ? (
          <p className="error_msg">
            선다형 답안의 최대 개수는 {MAX_ANSWER}개 입니다.
          </p>
        ) : null}
      </div>
    </AnswerTemplateMultiChoiceWrapper>
  );
};

export default AnswerTemplateMultiChoice;
