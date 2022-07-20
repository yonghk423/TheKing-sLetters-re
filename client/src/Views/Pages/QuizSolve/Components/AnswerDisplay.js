import React from "react";
import styled from "styled-components";
import AnswerDisplayTemplateOx from "../Template/AnswerDisplayTemplateOx";
import AnswerDisplayTemplateMultiChoice from "../Template/AnswerDisplayTemplateMultiChoice";
import AnswerDisplayTemplateImage from "../Template/AnswerDisplayTemplateImage";

const AnswerDisplayWrapper = styled.div`
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
	> .answer_select_title {
		font-family: 'EBSHunminjeongeumSBA';
		font-size: 24px;
		background-color: #93aca0;
		margin: 0% 6% 0% 6%;
		padding: 1% 1% 1% 1%;
		color: rgba(255, 255, 255, 1);
		font-weight: 600;
	}
`;

const AnswerDisplay = ({quizData, selectedAnswer, setSelectedAnswer}) => {
	
	return (
    <AnswerDisplayWrapper>
			<h2 className="answer_select_title">답안 선택하기</h2>
			{quizData.answerType === 'OX 답안' ? 
				<AnswerDisplayTemplateOx className="answer_display_template_ox" selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer}></AnswerDisplayTemplateOx>
			: null}
			{quizData.answerType === '선다형 답안' ? 
				<AnswerDisplayTemplateMultiChoice className="answer_display_template_multi_choice" quizData={quizData} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer}></AnswerDisplayTemplateMultiChoice>
			: null}
			{quizData.answerType === '이미지 답안' ? 
				<AnswerDisplayTemplateImage className="answer_display_template_image" quizData={quizData} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer}></AnswerDisplayTemplateImage>
			: null}
	  </AnswerDisplayWrapper>
	);
};

export default AnswerDisplay;