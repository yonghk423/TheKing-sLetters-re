import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';

const ProblemQuizBoxContainer = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 100%;
  padding: 3%;
  box-sizing: border-box;
  background-color: #b6c3b6;
  position: relative;

  > .problem__box__quiz__title {
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 2rem;
    border-bottom: 2px solid #303030;
    margin: 0 0.8rem 1rem 0.8rem;
    letter-spacing: 3px;
  }
  @media (max-width: 786px) {
    > .problem__box__quiz__title {
      padding-top: 1rem;
    }
  }
`;

const ProblemBoxQuizizzContainer = styled.div`
  margin-top: 5%;
  padding-top: 5%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 7px;
  box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.5);
  background-color: #fafafa;
  z-index: 5;

  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  box-sizing: border-box;

  .grid__quiz__box {
    display: grid;
    grid-gap: 3vh 3vw;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, minmax(25vw, auto));

    @media (max-width: 1280px) {
      grid-template-columns: repeat(auto-fit, minmax(40vw, auto));
    }
    @media (max-width: 480px) {
      grid-template-columns: repeat(auto-fit, minmax(90vw, auto));
    }
  }
  .paginationBtn {
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 5rem 0 2rem;
    z-index: 5;
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
      width: 100%;
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

const ProblemBoxQuizizz = styled.div`
  font-family: 'EBSHMJESaeronRA';
  display: flex;
  flex-direction: column;
  align-items: center;
  /* size */
  width: 25vw;
  height: 32vw;
  padding: 5px;
  @media (max-width: 1280px) {
    width: 40vw;
    height: 50vw;
    padding: 5px;
  }
  @media (max-width: 480px) {
    width: 90vw;
    height: 120vw;
    padding: 5px;
  }
  /* --- */
  box-sizing: border-box;
  background-color: #6f958f;
  border-radius: 5px;
  box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  &:hover {
    transform: scale(1.03); /* 이미지 확대 */
    transition: transform 0.5s; /*  시간 설정  */
  }
  // 최상단에서 아래 1단계 박스
  > a {
    position: relative;
    width: 100%;
    height: 100%;
  }
  // 1단계 박스 안의 이미지 컨테이너 2단계
  > a .image_container {
    max-width: 100%;
    max-height: 70%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  // 박스 안의 이미지 3단계
  > a .image_container img {
    object-fit: contain;
    box-sizing: border-box;
    border-radius: 5px;
    margin-bottom: 1%;
  }

  // 박스 안의 카테고리 컨테이너 2단계
  > a .problem__box__quiz {
    margin: 5px 0 5px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    box-sizing: border-box;
  }
  // 카테고리 컨테이너 안의 태그 3단계
  > a .problem__box__quiz span {
    padding: 5px 10px 5px 10px;
    box-sizing: border-box;
    background-color: #fafafa;
    border: 1px solid #303030;
    text-align: center;
    color: #303030;
    border-radius: 5px;
    box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
    flex: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 18px;
    @media (max-width: 1024px) {
      font-size: 16px;
    }
    @media (max-width: 768px) {
      font-size: 14px;
    }
    @media (max-width: 480px) {
      font-size: 12px;
    }
  }
  // 카테고리 컨테이너 안의 하트 아이콘 컨테이너 3단계
  > a .problem__box__quiz .main__heart {
    flex: 10vw 1 0;
  }

  // 박스 안의 문제 제목 컨테이너 2단계
  > a .problem__box__title {
    width: 100%;
    // 제일 바닥으로
    position: absolute;
    bottom: 3%;
    left: 50%;
    transform: translate(-50%, 0%);
    transition: all 0.4s;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // 박스 안의 문제 제목 3단계
  > a .problem__box__title h1 {
    background-color: transparent;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    font-size: 20px;
    color: #fafafa;
    text-align: center;
    @media (max-width: 1024px) {
      font-size: 18px;
    }
    @media (max-width: 786px) {
      font-size: 16px;
    }
    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
  > a:hover .problem__box__title {
    bottom: -1%;
    padding: 5px 10px 5px 10px;
    z-index: 500;
    background-color: #344b48;
    border-radius: 5px;
    min-height: 10vw;
    @media (max-width: 1280px) {
      min-height: 20vw;
    }
    @media (max-width: 480px) {
      min-height: 30vw;
    }
  }
  > a:hover .problem__box__title h1 {
    white-space: normal;
    font-size: 18px;
  }
`;

const ProblemQuizBox = ({
  dataCategorySelect,
  myNote,
  UserName,
  isLogin,
  myNoteQuizList,
}) => {
  const filtered = myNote.map((el) => {
    return {
      id: el.id,
      categories: el.categories[0].category,
      quizTypes: el.quiz_types[0].quizContent.quizType,
      answerTypes: el.answer_types[0].answerContent.answerType,
      rewardPoints: el.rewardPoint,
      thumbnail: el.thumbnail,
      title: el.title,
      heart: el.heart,
    };
  });
  const notLoginList = myNoteQuizList.map((el) => {
    return {
      id: el.id,
      categories: el.categories[0].category,
      quizTypes: el.quiz_types[0].quizContent.quizType,
      answerTypes: el.answer_types[0].answerContent.answerType,
      rewardPoints: el.rewardPoint,
      thumbnail: el.thumbnail,
      title: el.title,
      heart: el.heart,
    };
  });
  const [MyNoteQuiz, setMyNoteQuiz] = useState([]);
  const [NotLoginQuizList, setNotLoginQuizList] = useState([]);
  const [MyNoteAll, setMyNoteAll] = useState(0);

  useEffect(() => {
    let result = [...filtered];
    for (const [key, value] of Object.entries(dataCategorySelect)) {
      if (value === '') continue;
      result = result.filter((el) => {
        if (el[key] === value) return el;
      });
      setMyNoteQuiz(result);
    }
    let noResult = [...notLoginList];
    for (const [key, value] of Object.entries(dataCategorySelect)) {
      if (value === '') continue;
      noResult = noResult.filter((el) => {
        if (el[key] === value) return el;
      });
      setNotLoginQuizList(noResult);
    }
  }, [dataCategorySelect]);

  // 문제풀이로 넘어갑니다.
  const handleQuizClick = async (event) => {
    await axios
      .get(`https://api.thekingsletters.ml/quizzes`, {
        withCredentials: true,
      })
      .then((res) => {
        let allQuiz = res.data.data.quizList.filter((el) => el.id === event);
        if (allQuiz[0].id === event) {
          return axios.get(
            `https://api.thekingsletters.ml/quizzes/selectquiz/?quizId=${event}`
          );
        }
      });
  };

  // 페이지네이션 구현
  const max_contents = 6;
  const pageVisited = MyNoteAll * max_contents;
  const pageCount = Math.ceil(myNote.length / max_contents);
  const FindPageCount = Math.ceil(MyNoteQuiz.length / max_contents);
  const allNotLoginPageCount = Math.ceil(myNoteQuizList.length / max_contents);
  const FindNotLoginPageCount = Math.ceil(
    NotLoginQuizList.length / max_contents
  );
  const changePage = ({ selected }) => {
    setMyNoteAll(selected);
  };

  const displayContents = MyNoteQuiz.slice(
    pageVisited,
    pageVisited + max_contents
  ).map((el, i) => {
    return (
      <ProblemBoxQuizizz key={i} onClick={() => handleQuizClick(el.id)}>
        <Link to={`/quizsolve/${el.id}`}>
          <div className="image_container">
            <img src={el.thumbnail} alt="problem box Thumbnail" />
          </div>
          <div className="problem__box__quiz">
            <span>{el.categories}</span>
            <span>{el.quizTypes}</span>
            <span>{el.answerTypes}</span>
            <span>{el.rewardPoints}냥</span>
            <span className="problem__box__heart">
                <FontAwesomeIcon icon={faHeart} />
                {el.heart}
            </span>
          </div>
          <div className="problem__box__title">
            <h1>{el.title}</h1>
          </div>
        </Link>
      </ProblemBoxQuizizz>
    );
  });

  const allDisplay = myNote
    .slice(pageVisited, pageVisited + max_contents)
    .map((el, i) => {
      return (
        <ProblemBoxQuizizz key={i}>
          <Link
            to={`/quizsolve/${el.id}`}
            onClick={() => handleQuizClick(el.id)}
          >
            <div className="image_container">
              <img src={el.thumbnail} alt="problem box Thumbnail" />
            </div>
            <div className="problem__box__quiz">
              <span>{el.categories[0].category}</span>
              <span>{el.quiz_types[0].quizContent.quizType}</span>
              <span>{el.answer_types[0].answerContent.answerType}</span>
              <span>{el.rewardPoint}냥</span>
              <span className="problem__box__heart">
                <FontAwesomeIcon icon={faHeart} />
                {el.heart}
              </span>
            </div>
            <div className="problem__box__title">
              <h1>{el.title}</h1>
            </div>
          </Link>
        </ProblemBoxQuizizz>
      );
    });

  // 로그인 안되었을 때

  const notLoginDisplayContents = NotLoginQuizList.slice(
    pageVisited,
    pageVisited + max_contents
  ).map((el, i) => {
    return (
      <ProblemBoxQuizizz key={i}>
        <Link to={`/quizsolve/${el.id}`} onClick={() => handleQuizClick(el.id)}>
          <div className="image_container">
            <img src={el.thumbnail} alt="problem box Thumbnail" />
          </div>
          <div className="problem__box__quiz">
            <span>{el.categories}</span>
            <span>{el.quizTypes}</span>
            <span>{el.answerTypes}</span>
            <span>{el.rewardPoints}냥</span>
            <span className="problem__box__heart">
                <FontAwesomeIcon icon={faHeart} />
                {el.heart}
            </span>
          </div>
          <div className="problem__box__title">
            <h1>{el.title}</h1>
          </div>
        </Link>
      </ProblemBoxQuizizz>
    );
  });

  const allNotLoginDisplay = myNoteQuizList
    .slice(pageVisited, pageVisited + max_contents)
    .map((el, i) => {
      return (
        <ProblemBoxQuizizz key={i}>
          <Link
            to={`/quizsolve/${el.id}`}
            onClick={() => handleQuizClick(el.id)}
          >
            <div className="image_container">
              <img src={el.thumbnail} alt="problem box Thumbnail" />
            </div>
            <div className="problem__box__quiz">
              <span>{el.categories[0].category}</span>
              <span>{el.quiz_types[0].quizContent.quizType}</span>
              <span>{el.answer_types[0].answerContent.answerType}</span>
              <span>{el.rewardPoint}냥</span>
              <span className="problem__box__heart">
                <FontAwesomeIcon icon={faHeart} />
                {el.heart}
              </span>
            </div>
            <div className="problem__box__title">
              <h1>{el.title}</h1>
            </div>
          </Link>
        </ProblemBoxQuizizz>
      );
    });
  return (
    <ProblemQuizBoxContainer>
      <h2 className="problem__box__quiz__title">
        {isLogin ? UserName.name : '나'}의 서재
      </h2>
      <ProblemBoxQuizizzContainer>
        <div className="grid__quiz__box">
        {isLogin
          ? MyNoteQuiz.length === 0
            ? allDisplay
            : displayContents
          : NotLoginQuizList.length === 0
          ? allNotLoginDisplay
          : notLoginDisplayContents}
        </div>
        <ReactPaginate
          previousLabel={'이전'}
          nextLabel={'다음'}
          pageCount={
            isLogin
              ? MyNoteQuiz.length === 0
                ? pageCount
                : FindPageCount
              : NotLoginQuizList.length === 0
              ? allNotLoginPageCount
              : FindNotLoginPageCount
          }
          onPageChange={changePage}
          containerClassName={'paginationBtn'}
          previousLinkClassName={'previousBtn'}
          nextLinkClassName={'nextBtn'}
          disabledClassName={'paginationDisabled'}
          activeClassName={'paginationActive'}
        />
      </ProblemBoxQuizizzContainer>
    </ProblemQuizBoxContainer>
  );
};

export default ProblemQuizBox;
