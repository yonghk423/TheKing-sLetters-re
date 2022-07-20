import React from 'react';
import styled from 'styled-components';

const MainDropDownListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  border: 1px solid #d0d7de;
  border-radius: 0 0 6px 6px;
  background-color: rgba(255, 255, 255, 1);
  z-index: 500;

  > li button {
    /* 폰트 설정 */
    font-family: 'EBSHMJESaeronRA';
    font-size: 0.8em;
    text-align: left;
    /* 박스 설정 */
    padding: 0.5em 1.2em;
    width: 100%;
    background-color: rgba(255, 255, 255, 1);
    :hover {
      cursor: pointer;
      background-color: #0969da;
      color: rgba(255, 255, 255, 1);
    }
  }
`;

const MainDropDownList = ({
  isDropDownOpen,
  listData,
  clickValueHandler,
  dropDownWidth,
}) => {
  return (
    <>
      {isDropDownOpen ? (
        <MainDropDownListContainer dropDownWidth={dropDownWidth}>
          {listData.map((el, idx) => {
            return (
              <li key={idx.toString()}>
                <button type="submit" onClick={() => clickValueHandler(el)}>
                  {el}
                </button>
              </li>
            );
          })}
        </MainDropDownListContainer>
      ) : null}
    </>
  );
};

export default MainDropDownList;
