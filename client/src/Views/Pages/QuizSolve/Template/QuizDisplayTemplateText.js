import styled from "styled-components"

const QuizDisplayTemplateTextWrapper = styled.div`
  /* 박스 설정 */
  padding: 1% 6% 1% 6%;
  > .quiz_display_text_container {
    /* 박스 설정 */
    border: 2px solid rgba(0, 0, 0, 0.1);;
    border-radius: 5px;
    width: auto;
    /* flex 설정 */
    display: flex;
    flex-direction: column;
    > .quiz_display_text_title {
      /* 박스 설정 */
      padding: 5% 0 5% 0;
      border: none;
      outline: none;
      background-color: rgba(0, 0, 0, 0.1);
      /* 폰트 설정 */
      font-family: 'EBSHunminjeongeumSBA';
      font-weight: 500;
      /* 크기 설정 */
      flex: 10% 1 0;

      font-size: 18px;
      @media (max-width: 1024px) {
        font-size: 16px;
      }
      @media (max-width: 768px) {
        font-size: 14px;
      }
      @media (max-width: 480px) {
        font-size: 12px;
      }
    }
    > .quiz_display_text_contents {
      /* 박스 설정 */
      padding: 0.8% 0.5% 0.8% 0.5%;
      border: none;
      outline: none;
      resize: none;
      overflow: hidden;
      /* 폰트 설정 */
      font-family: 'EBSHunminjeongeumSBA';
      font-size: 16px;
      /* 박스 크기 설정 */
      width: auto;
      height: max(50vw, 50vh);
    }
  }
`;

const QuizDisplayTemplateText = ({quizData}) => {

  return (
    <QuizDisplayTemplateTextWrapper>
      <div className="quiz_display_text_container">
        <input type="text" className="quiz_display_text_title" value={quizData.title} readOnly></input>
        <textarea className="quiz_display_text_contents" value={quizData.quizContents.text} readOnly></textarea>
      </div>
    </QuizDisplayTemplateTextWrapper>
  );
};

export default QuizDisplayTemplateText;