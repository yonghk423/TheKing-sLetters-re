import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

// axios 기본값
axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

const QuizManagementContainer = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 100%;
  padding: 2% 6% 2% 6%;
  box-sizing: border-box;
  background-color: #d4cdc1;
  > .quiz__totalbar {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 1%;
    padding-right: 1em;
    font-size: 1.5em;
    border-radius: 5px;
    background-color: #6b574f;
    margin-bottom: 1.5em;
    > form {
      color: #fff;
      padding-left: 1em;
      input[type='checkbox'] {
        -ms-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -webkit-transform: scale(1.5);
        -o-transform: scale(1.5);
        cursor: pointer;
      }
      > span {
        font-size: 1.2em;
        padding-left: 1em;
        text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
        letter-spacing: 3px;
      }
    }
    > button {
      font-family: 'EBSHMJESaeronRA';
      margin-left: auto;
      font-size: 1em;
      padding: 0 0.5em;
      background-color: transparent;
      border: 1px solid #303030;
      box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      cursor: pointer;
      color: #303030;
      letter-spacing: 3px;
      text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
      transition: all 0.4s;
    }
    > button:hover {
      color: #fafafa;
      background-color: #303030;
    }
  }
`;

const QuizizzContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  .paginationBtn {
    width: 80%;
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 5rem 0 2rem;
  }
  .paginationBtn a {
    padding: 0.6rem;
    margin: 0.4rem;
    border-radius: 5px;
    border: 1.5px solid #303030;
    color: #303030;
    cursor: pointer;
    transition: all 0.4s;
    font-size: 1rem;
    &:hover {
      color: #fafafa;
      background-color: #303030;
    }
  }
  .paginationActive a {
    color: #fafafa;
    background-color: #303030;
  }

  @media (max-width: 768px) {
    .paginationBtn {
      width: 80%;
      list-style: none;
      display: flex;
      justify-content: center;
      padding: 3rem 0 2rem;
    }
    .paginationBtn a {
      padding: 0.4rem;
      margin: 0.3rem;
      border-radius: 5px;
      border: 1.2px solid #303030;
      color: #303030;
      cursor: pointer;
      transition: all 0.4s;
      font-size: 0.8rem;
    }
    .paginationActive a {
      color: #fafafa;
      background-color: #303030;
    }
  }
`;

const Quizizz = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 32%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #6b574f;
  padding: 1.5em;
  border-radius: 5px;
  box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
  margin-left: 2%;
  margin-bottom: 2%;
  &:first-child {
    margin-left: 0;
  }
  &:nth-child(4n) {
    margin-left: 0;
  }
  > form {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    > img {
      flex: auto;
      object-fit: cover;
      background-size: cover;
      box-sizing: border-box;
      border-radius: 5px;
      margin-bottom: 1em;
    }
    input[type='checkbox'] {
      position: absolute;
      top: 10px;
      left: 10px;
      -ms-transform: scale(1.5);
      -moz-transform: scale(1.5);
      -webkit-transform: scale(1.5);
      -o-transform: scale(1.5);
      cursor: pointer;
    }
    > span {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #fafafa;
      font-weight: bold;
      border: 1px solid #303030;
      background-color: #303030;
      font-size: 1.2em;
      border-radius: 5px;
      padding: 0 3px;
      text-align: center;
      cursor: pointer;
    }
  }
  .category__quiz {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > span {
      box-sizing: border-box;
      background-color: #fafafa;
      border: 1px solid #303030;
      text-align: center;
      color: #303030;
      border-radius: 5px;
      padding: 0.5em;
      margin-left: 1em;
      font-size: 1.4em;
      margin-bottom: 1em;
      box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
      letter-spacing: 0;
    }
    > span:first-child {
      margin-left: 0;
    }
  }
  @media (max-width: 960px) {
    > form {
      input[type='checkbox'] {
        -ms-transform: scale(1.4);
        -moz-transform: scale(1.4);
        -webkit-transform: scale(1.4);
        -o-transform: scale(1.4);
      }
      > span {
        font-size: 1em;
      }
    }
    .category__quiz > span {
      font-size: 1.2em;
      height: 120px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    > form {
      input[type='checkbox'] {
        -ms-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -webkit-transform: scale(1.2);
        -o-transform: scale(1.2);
      }
    }

    .category__quiz > span {
      font-size: 0.5em;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .category__title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    > h1 {
      width: 80%;
      box-sizing: border-box;
      background-color: transparent;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
      font-size: 2em;
      letter-spacing: 1.5px;
      color: #fafafa;
    }
    > span {
      width: 20%;
      box-sizing: border-box;
      font-size: 1.2em;
      display: flex;
      justify-content: right;
      align-items: center;
      flex-direction: column;
      font-weight: bold;
      color: #fafafa;
      > .heart {
        font-size: 1.5em;
        color: #fafafa;
      }
    }
  }
  @media (max-width: 960px) {
    .category__title > h1 {
      font-size: 1.7em;
    }
    .category__title > span {
      font-size: 1.2em;
    }
  }
  @media (max-width: 768px) {
    .category__title > h1 {
      font-size: 1.5em;
    }
    .category__title > span {
      font-size: 0.7em;
    }
  }
`;

const QuizManagement = ({ isLogin, invalidQuiz, setInValidQuiz }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [checkedList, setCheckedLists] = useState([]);

  useEffect(() => {
    setCheckedLists([]);
  }, [invalidQuiz]);

  // 전체 체크 클릭 시 발생하는 함수
  const handleAllCheck = useCallback(
    (checked) => {
      if (checked) {
        const checkedListArray = [];
        invalidQuiz.forEach((list) => checkedListArray.push(list));
        setCheckedLists(checkedListArray);
      } else {
        setCheckedLists([]);
      }
    },
    [invalidQuiz]
  );
  // 개별 체크 클릭 시 발생하는 함수
  const handleSingleCheck = useCallback(
    (checked, list) => {
      if (checked) {
        setCheckedLists([...checkedList, list]);
      } else {
        setCheckedLists(checkedList.filter((el) => el !== list));
      }
    },
    [checkedList]
  );

  // 승인안된 퀴즈 삭제
  const deleteQuiz = async (value) => {
    if (isLogin) {
      await axios
        .delete('/admin/deletequiz', {
          data: { quizId: value },
        })
        .then(() => {
          const del = invalidQuiz.filter((el) => el.id !== value);
          setInValidQuiz(del);
        });
    }
  };

  // 문제풀이로 넘어갑니다.
  const handleQuizClick = async (event) => {
    await axios
      .get(`https://api.thekingsletters.ml/approvalpage`, {
        withCredentials: true,
      })
      .then((res) => {
        let allQuiz = res.data.data.invalidQuizList.filter(
          (el) => el.id === event
        );
        if (allQuiz[0].id === event) {
          return axios.get(
            `https://api.thekingsletters.ml/quizzes/selectquiz/?quizid=${event}`
          );
        }
      });
  };

  // 페이지네이션 구현
  const max_contents = 6;
  const pageVisited = pageNumber * max_contents;
  const pageCount = Math.ceil(invalidQuiz.length / max_contents);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayContents = invalidQuiz
    .slice(pageVisited, pageVisited + max_contents)
    .map((el, i) => {
      return (
        <Quizizz key={i} onClick={() => handleQuizClick(el.id)}>
          <form>
            <Link to={`/quizsolve/${el.id}`}>
              <img src={el.thumbnail} alt="main Thumbnail" />
            </Link>
            <input
              type="checkbox"
              name="choice_quiz"
              value="choiceQuiz"
              onChange={(e) => handleSingleCheck(e.target.checked, el)}
              checked={checkedList.includes(el) ? true : false}
            />
            <span onClick={() => deleteQuiz(el.id)}>&times;</span>
          </form>
          <div className="category__quiz">
            <span>{el.categories[0].category}</span>
            <span>{el.quiz_types[0].quizContent.quizType}</span>
            <span>{el.answer_types[0].answerContent.answerType}</span>
            <span>{el.rewardPoint}냥</span>
          </div>
          <div className="category__title">
            <h1>{el.title}</h1>
            <span>
              <FontAwesomeIcon
                className="heart"
                icon={faHeart}
              ></FontAwesomeIcon>
              {el.heart}
            </span>
          </div>
        </Quizizz>
      );
    });

  const PrevdisplayContents = invalidQuiz
    .slice(pageVisited - max_contents, pageVisited)
    .map((el, i) => {
      return (
        <Quizizz key={i} onClick={() => handleQuizClick(el.id)}>
          <Link to={`/quizsolve/${el.id}`}>
            <form>
              <img src={el.thumbnail} alt="main Thumbnail" />
              <input
                type="checkbox"
                name="choice_quiz"
                value="choiceQuiz"
                onChange={(e) => handleSingleCheck(e.target.checked, el)}
                checked={checkedList.includes(el) ? true : false}
              />
              <span onClick={() => deleteQuiz(el.id)}>&times;</span>
            </form>
            <div className="category__quiz">
              <span>{el.categories[0].category}</span>
              <span>{el.quiz_types[0].quizContent.quizType}</span>
              <span>{el.answer_types[0].answerContent.answerType}</span>
              <span>{el.rewardPoint}냥</span>
            </div>
            <div className="category__title">
              <h1>{el.title}</h1>
              <span>
                <FontAwesomeIcon
                  className="heart"
                  icon={faHeart}
                ></FontAwesomeIcon>
                {el.heart}
              </span>
            </div>
          </Link>
        </Quizizz>
      );
    });

  // 승인하기 버튼 구현
  const approveQuiz = () => {
    let filtered = checkedList.map((el) => el.id);
    if (isLogin) {
      axios({
        method: 'post',
        url: '/approve',
        data: { quizzes: filtered },
      });

      if (filtered.length === 1) {
        const approveOne = invalidQuiz.filter((el) => el.id !== filtered[0]);
        setInValidQuiz(approveOne);
      } else {
        let appoveMany = [];
        filtered.map((el) =>
          invalidQuiz.map((ele) => {
            if (!filtered.includes(ele.id) && !appoveMany.includes(ele)) {
              appoveMany.push(ele);
            }
          })
        );
        setInValidQuiz(appoveMany);
      }
    }
  };

  return (
    <QuizManagementContainer>
      <div className="quiz__totalbar">
        <form>
          <input
            type="checkbox"
            name="choice"
            value="allQuiz"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={
              checkedList.length === 0
                ? false
                : checkedList.length === invalidQuiz.length
                ? true
                : false
            }
          />
          <span>전체선택</span>
        </form>
        <button onClick={approveQuiz}>승인하기</button>
      </div>
      <QuizizzContainer>
        {displayContents.length === 0 && pageNumber !== 0
          ? PrevdisplayContents
          : displayContents}
        <ReactPaginate
          previousLabel={'이전'}
          nextLabel={'다음'}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginationBtn'}
          previousLinkClassName={'previousBtn'}
          nextLinkClassName={'nextBtn'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
        />
      </QuizizzContainer>
    </QuizManagementContainer>
  );
};

export default QuizManagement;
