import styled from "styled-components"

const AnswerDisplayTemplateImageWrapper = styled.div`
  /* 박스 크기 설정 */
  width: auto;
  padding: 3% 6% 3% 6%;
  /* flex 박스 설정 */
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;

  > .image_container {
    /* 박스 설정 */
    position: relative;
    box-sizing: border-box;
    width: 362px;
    height: 362px;
    border: 1px dashed rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 8px;

    > .answer_img {
      /* 박스 크기 설정 */
      max-width: 100%;
      max-height: 345px;
      /* 박스 디자인 설정 */
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }

    > .corret_answer_msg {
      /* 박스 크기, 위치 설정 */
      position: absolute;
      left: 0;
      top: -22px;
      /* 폰트 설정 */
      font-family: 'EBSHunminjeongeumSBA';
      font-size: 14px;
      font-weight: 700;
      color: #0054bb;
    }
  }
  
  > .image_container:hover {
    cursor: pointer;
  }
  
  > .answer_selected {
    border: none;
    outline: 3px solid #0054bb;
  }

  @media (max-width: 960px) {
    justify-content: center;
    > .image_container {
      width: 450px;
      height: auto;
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
    > .image_container {
      width: 550px;
      height: auto;
    }
  }
`;

const AnswerDisplayTemplateImage = ({quizData, selectedAnswer, setSelectedAnswer}) => {

  return (
    <AnswerDisplayTemplateImageWrapper>
      {quizData.answerContents.map((el, idx) => {
        return (
          <div key={idx.toString()} className={selectedAnswer === idx ? "image_container answer_selected" : "image_container"}>
            <img className="answer_img" src={el.image_url} alt="정답 이미지" onClick={() => setSelectedAnswer(idx)}></img>
            {selectedAnswer === idx ? <span className="corret_answer_msg">정답</span> : null}
          </div>
        );
      })}
    </AnswerDisplayTemplateImageWrapper>
  );
};

export default AnswerDisplayTemplateImage;