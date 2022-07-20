import styled from "styled-components"
import correctIcon from '../Assets/correct-1.png';
import incorrectIcon from '../Assets/incorrect-1.png';

const AnswerDisplayTemplateOxWrapper = styled.div`
  width: auto;
  padding: 3% 6% 3% 6%;
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: space-evenly;
  
  > .ox_container {
    position: relative;
    border: 1px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 250px;
    height: 250px;
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
  > .ox_container:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
  > .answer_selected {
    border: 3px solid #0054bb;
  }

  @media (max-width: 960px) {
    > .ox_container {
      width: 325px;
      height: auto;
    }
  }
  @media (max-width: 768px) {
    > .ox_container {
      width: 425px;
      height: auto;
    }
  }
`;



const AnswerDisplayTemplateOx = ({selectedAnswer, setSelectedAnswer}) => {

  return (
    <AnswerDisplayTemplateOxWrapper>
      <div className={selectedAnswer === 0 ? "ox_container answer_selected" : "ox_container"} onClick={() => setSelectedAnswer(0)}>
        {selectedAnswer === 0 ? <span className="corret_answer_msg">정답</span> : null}
        <img className="answer_icon" src={correctIcon} alt="아이콘"></img>
      </div>
      <div className={selectedAnswer === 1 ? "ox_container answer_selected" : "ox_container"} onClick={() => setSelectedAnswer(1)}>
        {selectedAnswer === 1 ? <span className="corret_answer_msg">정답</span> : null}
        <img className="answer_icon" src={incorrectIcon} alt="아이콘"></img>
      </div>
    </AnswerDisplayTemplateOxWrapper>
  );
};

export default AnswerDisplayTemplateOx;