import styled from 'styled-components';
import { useEffect } from 'react';
import HelpMessage from '../HelpMessage';
import { isVaildAnswer } from '../VaildCheck';
import correctIcon from '../../Assets/correct-1.png';
import incorrectIcon from '../../Assets/incorrect-1.png';

const AnswerTemplateOxWrapper = styled.div`
  font-family: 'EBSHMJESaeronRA';
  position: relative;
  width: auto;
  padding: 0.8% 6% 0.8% 6%;

  > .ox__wrap {
    letter-spacing: 1px;
    width: 100%;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    /* flex 박스 설정 */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
  }
  > .ox__wrap > .ox_container {
    position: relative;
    border: 1px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 250px;
    margin: 1em 1em 1em 1em;
    padding: 1em 1em 1em 1em;
    transition: all 0.4s ease;

    > .answer_icon {
      width: 100%;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }
    > .corret_answer_msg {
      position: absolute;
      left: 0;
      top: -22px;
      font-size: 14px;
      font-weight: 700;
      color: #0054bb;
    }
  }
  > .ox__wrap > .ox_container:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
  > .ox__wrap > .answer_selected {
    border: 3px solid #0054bb;
  }
  @media (max-width: 960px) {
    > .ox__wrap {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
    }
    > .ox__wrap > .ox_container {
      width: 50%;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
  @media (max-width: 768px) {
    > .ox__wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    > .ox__wrap > .ox_container {
      width: 80%;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
  }
`;

const AnswerTemplateOx = ({ dataAnswerSelect, setDataAnswerSelect }) => {
  // 컴포넌트가 로드되면 실행
  useEffect(() => {
    const INITIAL_VALUE = [
      { name: 'correct', icon: correctIcon, isAnswer: false },
      { name: 'incorrect', icon: incorrectIcon, isAnswer: false },
    ];
    setDataAnswerSelect({ type: 'OX 답안', contents: INITIAL_VALUE });
  }, [setDataAnswerSelect]);

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
    <AnswerTemplateOxWrapper>
      <HelpMessage
        data={dataAnswerSelect}
        vaildator={isVaildAnswer}
        message={'정답을 선택해 주세요'}
      />
      <div className="ox__wrap">
        {dataAnswerSelect.contents.map((el, idx) => (
          <div
            key={idx.toString()}
            className={
              el.isAnswer ? 'ox_container answer_selected' : 'ox_container'
            }
            onClick={() => answerSelectHandler(idx)}
          >
            {el.isAnswer ? (
              <span className="corret_answer_msg">정답</span>
            ) : null}
            <img className="answer_icon" src={el.icon} alt="아이콘"></img>
          </div>
        ))}
      </div>
    </AnswerTemplateOxWrapper>
  );
};

export default AnswerTemplateOx;
