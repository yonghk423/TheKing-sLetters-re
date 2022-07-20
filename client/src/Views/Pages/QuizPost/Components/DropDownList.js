import styled from 'styled-components';

const PostDropDownListWrapper = styled.ul`
  /* 박스 설정 */
  position: absolute;
  width: ${(props) => props.dropDownWidth}px;
  padding: 2px 0px 2px 0px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 1);
  z-index: 500;
  /* flex 설정 */
  display: flex;
  flex-direction: column;

  > li button {
    /* 폰트 설정 */
    font-family: 'EBSHMJESaeronRA';
    font-size: 0.8em;
    text-align: left;
    /* 박스 설정 */
    padding: 0.5em 1.2em;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    letter-spacing: 2px;
    :hover {
      cursor: pointer;
      background-color: #0969da;
      color: rgba(255, 255, 255, 1);
    }
  }
`;

const DropDownList = ({
  isDropDownOpen,
  listData,
  clickValueHandler,
  dropDownWidth,
}) => {
  return (
    <>
      {isDropDownOpen ? (
        <PostDropDownListWrapper dropDownWidth={dropDownWidth}>
          {listData.map((el, idx) => {
            return (
              <li key={idx.toString()}>
                <button type="submit" onClick={() => clickValueHandler(el)}>
                  {el}
                </button>
              </li>
            );
          })}
        </PostDropDownListWrapper>
      ) : null}
    </>
  );
};

export default DropDownList;
