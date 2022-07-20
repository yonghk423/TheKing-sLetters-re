import React from 'react';
import styled from 'styled-components';
import AnswerTemplateImage from './Quiztemplate/AnswerTemplateImage';
import AnswerTemplateMultiChoice from './Quiztemplate/AnswerTemplateMultiChoice';
import AnswerTemplateOx from './Quiztemplate/AnswerTemplateOx';

const AnswerSelectWrapper = styled.div`
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
  > .answer_select_title {
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

const AnswerSelect = ({
  dataCategorySelect,
  dataAnswerSelect,
  setDataAnswerSelect,
}) => {
  return (
    <AnswerSelectWrapper>
      <h2 className="answer_select_title">답안 출제 유형</h2>
      {dataCategorySelect.answerTypes === '선다형 답안' ? (
        <AnswerTemplateMultiChoice
          className="answer_select_contents"
          dataAnswerSelect={dataAnswerSelect}
          setDataAnswerSelect={setDataAnswerSelect}
        ></AnswerTemplateMultiChoice>
      ) : null}
      {dataCategorySelect.answerTypes === '이미지 답안' ? (
        <AnswerTemplateImage
          className="answer_select_contents"
          dataAnswerSelect={dataAnswerSelect}
          setDataAnswerSelect={setDataAnswerSelect}
        ></AnswerTemplateImage>
      ) : null}
      {dataCategorySelect.answerTypes === 'OX 답안' ? (
        <AnswerTemplateOx
          className="answer_select_contents"
          dataAnswerSelect={dataAnswerSelect}
          setDataAnswerSelect={setDataAnswerSelect}
        ></AnswerTemplateOx>
      ) : null}
    </AnswerSelectWrapper>
  );
};

export default AnswerSelect;
