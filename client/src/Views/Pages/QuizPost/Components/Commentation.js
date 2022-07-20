import styled from 'styled-components';
import HelpMessage from './HelpMessage';
import { isVaildCommentation } from './VaildCheck';

const CommentationWrapper = styled.div`
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
  font-size: 1rem;
  > .commentation_top_layout {
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
  > .commentation_bottom_layout {
    /* 박스 설정 */
    position: relative;
    width: auto;
    padding: 1% 6% 1% 6%;
    > .commentation_bottom_container {
      /* 박스 설정 */
      border: 2px solid rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      /* flex 설정 */
      display: flex;
      flex-direction: column;
      > .commentation_bottom_title {
        /* 박스 설정 */
        padding: 1px 5px 1px 5px;
        border: none;
        outline: none;
        background-color: rgba(0, 0, 0, 0.1);
        /* 폰트 설정 */
        font-size: 16px;
        /* 크기 설정 */
        flex: 2em 1 0;
      }
      > .commentation_bottom_contents {
        /* 박스 설정 */
        padding: 8px 5px 8px 5px;
        border: none;
        outline: none;
        resize: none;
        overflow: hidden;
        /* 폰트 설정 */
        font-size: 16px;
        font-family: 'EBSHMJESaeronRA';
        letter-spacing: 1px;
        /* 박스 크기 설정 */
        width: auto;
        height: 10em;
      }
      :focus-within {
        border: 2px solid #0054bb;
      }
    }
  }
`;

const Commentation = ({ dataCommentation, setDataCommentation }) => {
  const inputHandler = (e) => {
    const inputValue = e.target.value;
    if (!inputValue) return;
    setDataCommentation({ ...dataCommentation, answerComments: inputValue });
  };

  return (
    <CommentationWrapper>
      <h2 className="commentation_top_layout">해설</h2>
      <div className="commentation_bottom_layout">
        <HelpMessage
          data={dataCommentation}
          vaildator={isVaildCommentation}
          message={'해설을 입력해 주세요'}
        />
        <div className="commentation_bottom_container">
          <p className="commentation_bottom_title"></p>
          <textarea
            className="commentation_bottom_contents"
            onChange={inputHandler}
            placeholder="여기에 해설을 입력해 주세요"
            onFocus={(e) => (e.target.placeholder = '')}
            onBlur={(e) =>
              (e.target.placeholder = '여기에 해설을 입력해 주세요')
            }
          ></textarea>
        </div>
      </div>
    </CommentationWrapper>
  );
};

export default Commentation;
