import styled from "styled-components";
import MynoteMessage from "./MynoteMessage";
import correctIcon from '../Assets/correct-1.png';
import incorrectIcon from '../Assets/incorrect-1.png';

const CheckAnswerWrapper = styled.div`
  /* 박스 설정 */
  margin: 0 10% 0 10%;
  width: 80%;
  @media (max-width: 960px) {
    margin: 0 1% 0 1%;
    width: 98%;
  }
	/* flex 설정 */
	display: flex;
	flex-direction: column;
	/* 폰트 설정 */
	font-size: 16px;
	> .check_answer_title_layout {
		background-color: #04AA6D;
		margin: 0% 6% 0% 6%;
		padding: 1% 1% 1% 1%;
		color: rgba(255, 255, 255, 1);
		font-family: 'EBSHMJESaeronRA';
		font-size: 24px;
		font-weight: 600;
	}
  > .check_answer_commentation_layout {
		/* 박스 설정 */
		width: auto;
		padding: 1% 6% 1% 6%;
		> .commentation_container {
			/* 박스 설정 */
			border: 2px solid rgba(0, 0, 0, 0.1);;
			border-radius: 5px;
			/* flex 설정 */
			display: flex;
			flex-direction: column;
			> .commentation_container_result {
				/* 박스 설정 */
				padding: 1px 5px 1px 5px;
				border: none;
				outline: none;
				background-color: rgba(0, 0, 0, 0.1);
				/* 폰트 설정 */
				font-size: 16px;
				/* flex 설정 */
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				align-content: flex-start;
				height: 10em;
				> img {
					width: 10em;
					height: 10em;
				}
				> p {
					font-family: 'EBSHMJESaeronRA';
				}
				> .result_msg_correct {
					color: rgba(0, 150, 255, 1);
					font-family: 'EBSHMJESaeronRA';
					font-size: 36px;
					font-weight: 800;
				}
				> .result_msg_wrong {
					color: rgba(255, 99, 71, 1);
					font-family: 'EBSHMJESaeronRA';
					font-size: 36px;
					font-weight: 800;
				}
			}
			> .commentation_container_bottom {
				/* 박스 설정 */
				padding: 8px 5px 8px 5px;
				border: none;
				outline: none;
				resize: none;
				overflow: hidden;
				/* 폰트 설정 */
				font-family: 'EBSHMJESaeronRA';
				font-size: 16px;
				/* 박스 크기 설정 */
				width: auto;
				min-height: 10rem;
    		height: auto;
			}
			> .add_wrong_sheet_button {
				/* 박스 설정 */
				position: relative;
				padding: 10px 0px 10px 0px;
				width: 100%;
				height: 3rem;
				/* 폰트 설정 */
				font-size: 18px;
				font-weight: 500;
				:hover {
					cursor: pointer;
					background-color: rgba(0, 0, 0, 0.5);
				}
			}
			:focus-within {
				border: 2px solid #0054bb;
			}
		}
  }
`;

const CheckAnswer = ({quizData, isCorrectAnswer, mynoteHandler}) => {

  return (
    <CheckAnswerWrapper>
      <h2 className="check_answer_title_layout">해설</h2>
      <div className="check_answer_commentation_layout">
				<div className="commentation_container">
					{isCorrectAnswer.result ?
					<>
					<div className="commentation_container_result">
						<img src={correctIcon} alt="정답 아이콘"></img>
						<p className="result_msg_correct">정답입니다!</p>
						<p>{isCorrectAnswer.message}</p>
					</div>
					<textarea className="commentation_container_bottom" defaultValue={quizData.answerComment} readOnly></textarea>
					</> :
					<>
					<div className="commentation_container_result">
						<img src={incorrectIcon} alt="오답 아이콘"></img>
						<p className="result_msg_wrong">오답입니다!</p>
						<p>{isCorrectAnswer.message}</p>
					</div>
					<textarea className="commentation_container_bottom" defaultValue={quizData.answerComment} readOnly></textarea>
					<button
						className="add_wrong_sheet_button"
						onClick={() => mynoteHandler()}>
						오답노트에 추가하기
						<MynoteMessage />
						</button>
					</>}
				</div>
      </div>
    </CheckAnswerWrapper>
  );
};

export default CheckAnswer;