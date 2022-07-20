import styled from 'styled-components';
import QuizTemplateText from './Quiztemplate/QuizTemplateText';
import QuizTemplateImage from './Quiztemplate/QuizTemplateImage';

const QuizSelectWrapper = styled.div`
  /* 박스 설정 */
  margin: 0 10% 0 10%;
  width: 80%;
  @media (max-width: 960px) {
    margin: 0 1% 0 1%;
    width: 98%;
  }
  /* 폰트 설정 */
  font-size: 1rem;
  /* flex 설정 */
  display: flex;
  flex-direction: column;
  > .post_quiz_select_wrapper__quiz_title {
    font-family: 'EBSHMJESaeronRA';
    background-color: #93aca0;
    margin: 0% 6% 0.8% 6%;
    padding: 1% 0;
    font-size: 1.8em;
    padding-left: 1em;
    color: #303030;
    font-size: 21px;
    border-radius: 5px;
    letter-spacing: 3px;
  }
`;

const QuizSelect = ({
  dataCategorySelect,
  dataQuizSelect,
  setDataQuizSelect,
}) => {
  return (
    <QuizSelectWrapper>
      <h2 className="post_quiz_select_wrapper__quiz_title">문제 출제 유형</h2>
      {dataCategorySelect.quizTypes === '텍스트 문제' ? (
        <QuizTemplateText
          className="post_quiz_select_wrapper__quiz_contents"
          dataQuizSelect={dataQuizSelect}
          setDataQuizSelect={setDataQuizSelect}
        ></QuizTemplateText>
      ) : null}
      {dataCategorySelect.quizTypes === '이미지 문제' ? (
        <QuizTemplateImage
          className="post_quiz_select_wrapper__quiz_contents"
          dataQuizSelect={dataQuizSelect}
          setDataQuizSelect={setDataQuizSelect}
        ></QuizTemplateImage>
      ) : null}
    </QuizSelectWrapper>
  );
};

export default QuizSelect;
