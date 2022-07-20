import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import MainDropDownList from './MainTemplate/MainDropDownList';
import dropDownIcon from '../Assets/dropdown-1.svg';

const MainCategoryContainer = styled.div`
  font-family: 'EBSHunminjeongeumSBA';
  width: 100%;
  padding: 6%;
  box-sizing: border-box;
  background-color: #fafafa;
  @media (max-width: 768px) {
    padding-top: 5rem;
  }
  > .main_categoty_title {
    font-family: 'EBSHMJESaeronRA';
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 1% 0;
    font-size: 1.8em;
    padding-left: 1em;
    border-radius: 5px;
    background-color: #93aca0;
    margin-bottom: 2em;
    letter-spacing: 3px;
  }
  > .main_select_container {
    display: flex;
    align-items: center;
    flex-direction: column;
    > .main_select_box {
      width: 100%;
      padding: 0.5% 0;
      margin-bottom: 1em;
      position: relative;
      border: 1px solid rgba(209, 213, 218, 0.5);
      border-radius: 5px;
      background-color: rgba(209, 213, 218, 0.5);
      font-size: 1.5em;

      > .select_title {
        margin-left: 1em;
        letter-spacing: 1px;
      }
      > .dropdown_arrow {
        position: absolute;
        top: 40%;

        right: 12px;
        width: 12px;
        height: 12px;
        line-height: 12px;
      }
      :hover {
        cursor: pointer;
        background-color: #93aca0;
      }
    }
  }
`;

const categoryDropDownListData = [
  '정치',
  '경제',
  '사회',
  '스포츠',
  '정보기술',
  '관광',
  '요리',
  '여행',
  '음악',
  '외래어',
];
const quizTypeDropDownListData = ['텍스트 문제', '이미지 문제'];
const answerTypeDropDownListData = ['OX 답안', '선다형 답안', '이미지 답안'];
const scoreDropDownListData = ['1냥', '2냥', '3냥', '4냥', '5냥'];

const MainCategorySelect = ({ dataCategorySelect, setDataCategorySelect }) => {
  const [selectedDropDown, setSelectedDropDown] = useState(0);
  const [dropDownWidth, setDropDownWidth] = useState(0);

  const dropDownClickHandler = (e, index) => {
    const width = e.currentTarget.clientWidth;
    if (selectedDropDown === index) setSelectedDropDown(0);
    else {
      setSelectedDropDown(index);
      setDropDownWidth(width);
    }
  };
  const clickValueHandler = (value, type = selectedDropDown) => {
    if (value === '' || type === '') return;

    switch (type) {
      case 1:
        setDataCategorySelect({ ...dataCategorySelect, categories: value });
        break;
      case 2:
        setDataCategorySelect({ ...dataCategorySelect, quizTypes: value });
        break;
      case 3:
        setDataCategorySelect({ ...dataCategorySelect, answerTypes: value });
        break;
      case 4:
        setDataCategorySelect({ ...dataCategorySelect, rewardPoints: value });
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    const pageClickEvent = () => {
      setSelectedDropDown(0);
    };
    if (selectedDropDown !== 0) {
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [selectedDropDown]);

  return (
    <MainCategoryContainer>
      <h2 className="main_categoty_title">자료검색</h2>
      <div className="main_select_container">
        <div
          className="main_select_box"
          onClick={(e) => dropDownClickHandler(e, 1)}
        >
          <span className="select_title">
            {dataCategorySelect.categories === ''
              ? '카테고리'
              : dataCategorySelect.categories}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
          <MainDropDownList
            isDropDownOpen={selectedDropDown === 1 ? true : false}
            listData={categoryDropDownListData}
            clickValueHandler={clickValueHandler}
            dropDownWidth={dropDownWidth}
          ></MainDropDownList>
        </div>
        <div
          className="main_select_box"
          onClick={(e) => dropDownClickHandler(e, 2)}
        >
          <span className="select_title">
            {dataCategorySelect.quizTypes === ''
              ? '문제 출제 유형'
              : dataCategorySelect.quizTypes}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
          <MainDropDownList
            isDropDownOpen={selectedDropDown === 2 ? true : false}
            listData={quizTypeDropDownListData}
            clickValueHandler={clickValueHandler}
            dropDownWidth={dropDownWidth}
          ></MainDropDownList>
        </div>
        <div
          className="main_select_box"
          onClick={(e) => dropDownClickHandler(e, 3)}
        >
          <span className="select_title">
            {dataCategorySelect.answerTypes === ''
              ? '답안 출제 유형'
              : dataCategorySelect.answerTypes}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
          <MainDropDownList
            isDropDownOpen={selectedDropDown === 3 ? true : false}
            listData={answerTypeDropDownListData}
            clickValueHandler={clickValueHandler}
            dropDownWidth={dropDownWidth}
          ></MainDropDownList>
        </div>
        <div
          className="main_select_box"
          onClick={(e) => dropDownClickHandler(e, 4)}
        >
          <span className="select_title">
            {dataCategorySelect.rewardPoints === ''
              ? '점수 설정'
              : dataCategorySelect.rewardPoints}
          </span>
          <img className="dropdown_arrow" src={dropDownIcon} alt="화살표"></img>
          <MainDropDownList
            isDropDownOpen={selectedDropDown === 4 ? true : false}
            listData={scoreDropDownListData}
            clickValueHandler={clickValueHandler}
            dropDownWidth={dropDownWidth}
          ></MainDropDownList>
        </div>
      </div>
    </MainCategoryContainer>
  );
};

export default MainCategorySelect;
