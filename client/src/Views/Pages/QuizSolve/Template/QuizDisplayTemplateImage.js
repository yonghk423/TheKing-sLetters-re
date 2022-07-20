import styled from "styled-components";

const QuizDisplayTemplateImageWrapper = styled.div`
  /* 박스 설정 */
  padding: 1% 6% 1% 6%;
  height: auto;
  > .quiz_display_temaplate_image_container {
    /* 박스 설정 */
    border: 2px solid rgba(0, 0, 0, 0.1);;
    border-radius: 5px;
    width: auto;
    height: auto;
    /* flex 설정 */
    display: flex;
    flex-direction: column;
    /* ---------- image_container_title (최상단 문제 제목 CSS) 시작 ---------- */
    > .image_container_title {
      /* 박스 설정 */
      padding: 1% 0.5% 1% 0.5%;
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
    /* ---------------------- image_container_title 끝 ---------------------- */
  
    /* ---------------------------------- image_container_image 속성 시작 ---------------------------------- */
    > .image_container_image {
      /* 박스 설정 */
      border: 1px dashed rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      object-fit: contain;
      margin: 0.5%;

      max-width: min(1280px, 90vw);
      max-height: min(1536px, 120vw);
      @media (max-width: 1024px) {
        max-width: min(921px, 90vw);
        max-height: min(1228px, 120vw);
      }
      @media (max-width: 768px) {
        max-width: min(691px, 90vw);
        max-height: min(921px, 120vw);
      }
      @media (max-width: 480px) {
        max-width: min(384px, 90vw);
        max-height: min(576px, 120vw);
      }
    }
    /* ---------------------------------- image_container_image 속성 끝 ---------------------------------- */
  }
`;

const QuizDisplayTemplateImage = ({quizData}) => {
  return (
    <QuizDisplayTemplateImageWrapper>
      <div className="quiz_display_temaplate_image_container">
        <input type="text" className="image_container_title" value={quizData.title} readOnly></input>
        <img className="image_container_image" src={quizData.quizContents.image_url} alt="문제 이미지"></img>
      </div>
    </QuizDisplayTemplateImageWrapper>
  );
};

export default QuizDisplayTemplateImage;