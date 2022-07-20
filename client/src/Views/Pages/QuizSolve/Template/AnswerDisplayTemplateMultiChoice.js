import styled from "styled-components"

const AnswerDisplayTemplateMultiChoiceWrapper = styled.div`
  /* 박스 크기 설정 */
  width: auto;
  padding: 1% 6% 1% 6%;
  /* flex 박스 설정 */
  display: flex;
  align-items: left;
  flex-direction: column;
  gap: 0.5em;

  > .answer_container {
    /* 박스 크기, 위치 설정 */
    position: relative;
    width: auto;
    height: 32px;
    padding: 2px 8px 2px 8px;
    /* 박스 디자인 설정 */
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    /* flex 박스 설정 */
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5em;
    > .answer_container_input {
      font-family: 'EBSHunminjeongeumSBA';
      font-size: 16px;
      /* 박스 크기 설정 */
      border: 1px solid rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      line-height: 16px;
      outline: none;
      padding: 5px;
      width: 85%;
    }
    > .correct_answer_select {
      width: 1.5em;
      height: 1.5em;
      margin: 0px 3px 0px 3px;
      :hover {
        cursor: pointer;
      }
    }
    > .numbering_answer {
      /* 박스 설정 */
      width: 1.5em;
      background-color: transparent;
      border: none;
      /* 폰트 설정 */
      font-size: 16px;
      font-weight: 500;
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

  > .answer_selected {
    border: none;
    outline: 2px solid #0054bb;
  }
`;

const AnswerDisplayTemplateMultiChoice = ({quizData, selectedAnswer, setSelectedAnswer}) => {

  return (
    <AnswerDisplayTemplateMultiChoiceWrapper>
      {quizData.answerContents.map((el, idx) => {
        return (
          <div key={idx.toString()} className={selectedAnswer === idx ? "answer_container answer_selected" : "answer_container"}>
            {selectedAnswer === idx ? <span className="corret_answer_msg">정답</span> : null}
            <input type="radio" className="correct_answer_select" name="correct_answer" onChange={() => {}} onClick={() => setSelectedAnswer(idx)}></input>
            <button onClick={() => setSelectedAnswer(idx)} className="numbering_answer">{idx + 1}번</button>
            <input type="text" className="answer_container_input" defaultValue={el.text || ''} readOnly></input>
          </div>
        );
      })}
    </AnswerDisplayTemplateMultiChoiceWrapper>
  );
};

export default AnswerDisplayTemplateMultiChoice;