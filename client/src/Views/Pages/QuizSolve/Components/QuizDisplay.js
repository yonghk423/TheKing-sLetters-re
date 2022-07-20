import styled from "styled-components";
import QuizDisplayTemplateText from "../Template/QuizDisplayTemplateText";
import QuizDisplayTemplateImage from "../Template/QuizDisplayTemplateImage";

const QuizDisplayWrapper = styled.div`
  /* 박스 설정 */
  margin: 0 10% 0 10%;
  width: 80%;
  @media (max-width: 960px) {
    margin: 0 1% 0 1%;
    width: 98%;
  }
	/* 폰트 설정 */
	font-size: 16px;
	/* flex 설정 */
	display: flex;
	flex-direction: column;
	> .quiz_solve_title {
		font-family: 'EBSHunminjeongeumSBA';
		font-size: 24px;
		background-color: #93aca0;
		margin: 0% 6% 0% 6%;
		padding: 1% 1% 1% 1%;
		color: rgba(255, 255, 255, 1);
		font-weight: 600;
	}
	> .quiz_solve_tags_container {
    /* 박스 설정 */
		margin: 0% 6% 0% 6%;
		padding: 1% 1% 0% 1%;
    height: 2em;
    /* 폰트 설정 */
    font-size: 16px;
    /* 크기 설정 */
    display: flex;
    flex-direction: row;
    gap: 1%;
    flex: 2em 1 0;
  }
	> .quiz_solve_tags_container .quiz_solve_tags {
		font-family: 'EBSHunminjeongeumSBA';
	}
`;

const QuizDisplay = ({quizData}) => {
	return (
    <QuizDisplayWrapper>
			<h2 className="quiz_solve_title">문제</h2>
			<div className="quiz_solve_tags_container">
        <div className="quiz_solve_tags">#{quizData.category}</div>
        <div className="quiz_solve_tags">#{quizData.quizType}</div>
        <div className="quiz_solve_tags">#{quizData.answerType}</div>
        <div className="quiz_solve_tags">#{quizData.rewardPoint}점</div>
      </div>
			{quizData.quizType === '텍스트 문제' ?
			<QuizDisplayTemplateText className="quiz_display_template_text" quizData={quizData}></QuizDisplayTemplateText>
			: null}
			{quizData.quizType === '이미지 문제' ?
			<QuizDisplayTemplateImage className="quiz_display_template_image" quizData={quizData}></QuizDisplayTemplateImage>
			: null}
    </QuizDisplayWrapper>
	);
};

export default QuizDisplay;