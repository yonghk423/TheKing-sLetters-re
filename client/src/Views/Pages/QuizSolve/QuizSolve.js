// library
import styled from 'styled-components';
import React, { useState, useEffect, useRef, useCallback } from 'react';

// modules
import TopProfile from './Components/TopProfile';
import QuizDisplay from './Components/QuizDisplay';
import AnswerDisplay from './Components/AnswerDisplay';
import CheckAnswer from './Components/CheckAnswer';
import SubmitModal from './Components/SubmitModal';

// functions
import { useUserState } from '../../../context/UserContext';
import {
  fetchQuizData,
  refineQuizData,
  fetchSubmitAnswer,
  refineSubmitAnswer,
  recommendQuiz,
  addToMynote,
} from './Components/FetchData';

// icons
import pageLoadingIcon from './Assets/loading-1.svg';
import commentLoadingIcon from './Assets/loading-2.svg';
import lockIcon from './Assets/lock-1.svg';

const DEBUG_MODE = true;

const BOX_SHADOW = `
	-moz-box-shadow: 0 1px 1px 0 #ccc;
	-webkit-box-shadow: 0 1px 1px 0 #ccc;
	box-shadow: 0 1px 1px 0 #ccc;
`;

const QuizSolveContainer = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  min-height: 86.8vh;
  > .quiz_solve_top_title {
    width: 100%;
    padding: 3% 6.2% 2% 6.2%;
    box-sizing: border-box;
    background-color: #d7dbd1;
    position: relative;
  }

  > .quiz_solve_top_title h2 {
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 2rem;
    border-bottom: 2px solid #303030;
    letter-spacing: 3px;
  }

  > .page_loading_icon {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 10%;
  }
  > .page_error_message_container {
    position: absolute;
    top: 10%;
    transform: translateX(50%);
    border: none;
    width: 50%;
    height: 20%;
    background-color: rgba(0, 0, 0, 0.1);
    ${BOX_SHADOW}
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > .page_error_message_container .page_error_image {
    width: 5em;
    z-index: 2;
  }
  > .page_error_message_container .login_error_msg {
    margin: 3em 0em 3em 0em;
    font-size: 1.5em;
    font-weight: 500;
    z-index: 3;
  }
  > .page_error_message_container .quiz_error_msg {
    margin: 3em 0em 3em 0em;
    font-size: 1.5em;
    font-weight: 500;
    z-index: 3;
  }
  > .comment_loading_icon {
    width: 10%;
    height: 10%;
    align-self: center;
    justify-self: center;
  }
  > .sumit_error_msg {
    align-self: center;
    justify-self: center;
    text-align: center;
  }
`;

/* 더미데이터 */
const initialUser = {
  name: '테스트 유저',
  image:
    'https://media.vlpt.us/images/otter/post/ec1e02e9-f350-44dd-a341-9f2192e11015/default_profile.png',
  ranking: '1',
};

/* 더미데이터 이미지 문제, 이미지 답안 */
const initialQuiz = {
  title: '다음 보기에서 알맞은 답을 고르세요',
  category: '경제',
  quizType: '이미지 문제',
  quizContents: { image_url: 'https://i.ibb.co/NSRNHdr/quiz-1.jpg' },
  answerType: '이미지 답안',
  answerContents: [
    { image_url: 'https://i.ibb.co/7V33Ctz/answer-1.png' },
    { image_url: 'https://i.ibb.co/4d3x0M4/answer-2.png' },
    { image_url: 'https://i.ibb.co/FVf7GfW/answer-3.png' },
  ],
  answerComment: '정답은 설거지입니다',
  rewardPoint: '1',
  correctAnswer: '0',
  howManyLikes: '1',
};

/* 더미데이터 정답 */
const initialAnswer = 0;

const QuizSolve = ({ match }) => {
  const quizId = parseInt(match.params.id);
  const [userData, setUserData] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [doneSubmit, setDoneSubmit] = useState(false);
  const [commentIsLoading, setCommentIsLoading] = useState(false);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [errorList, setErrorList] = useState({
    submitError: false,
    loginError: false,
    quizError: false,
  });
  // 유저 정보 state를 context에서 불러옴, 로그인 정보와 유저 정보가 담겨있음
  const userState = useUserState();
  // 정답을 확인받고 돌아온 서버 응답을 저장
  const isCorrectAnswer = useRef({ result: null, message: '' });
  // 테스트 모드 온오프
  const isTestModeOn = useRef(false);

  /* 유저 데이터 불러오기 */
  useEffect(() => {
    setErrorList((state) => ({ ...state, loginError: true }));
    // 더미데이터가 켜져있으면
    if (isTestModeOn.current) {
      // 더미용 유저데이터를 불러오고
      setUserData(initialUser);
      // 화면을 표시
      setErrorList((state) => ({ ...state, loginError: false }));
      return;
    }
    // 유저가 로그인 한 상태라면
    if (userState.isUserLoggedIn) {
      // context에서 유저 정보를 가져와서
      const rawData = userState.userData;
      // 가져온 유저 정보를 가공하고
      const refinedData = {
        name: rawData.name,
        image: rawData.image,
        ranking: rawData.rank.toString(),
      };
      // state에 저장
      setUserData(refinedData);
      // 유저가 로그인 했으니 화면을 표시
      setErrorList((state) => ({ ...state, loginError: false }));
    } else {
      // 유저가 로그인하지 않았으면 로그인 에러 표시
      setErrorList((state) => ({ ...state, loginError: true }));
    }
  }, [userState]);

  /* 퀴즈 데이터 불러오기 */
  const initialFetchQuizDate = useCallback(async () => {
    try {
      const rawQuizData = await fetchQuizData(quizId);
      const refinedQuizData = await refineQuizData(rawQuizData);
      setQuizData(refinedQuizData);
      setErrorList((state) => ({ ...state, quizError: false }));
    } catch (err) {
      DEBUG_MODE && console.log(err);
      setErrorList((state) => ({ ...state, quizError: true }));
    }
  }, [quizId]);

  /* 퀴즈 데이터 불러오기 */
  useEffect(() => {
    setErrorList((state) => ({ ...state, quizError: true }));
    // 더미데이터가 켜져있으면
    if (isTestModeOn.current) {
      // 더미용 퀴즈데이터를 불러오고
      setQuizData(initialQuiz);
      // 화면을 표시
      setErrorList((state) => ({ ...state, quizError: false }));
      return;
    }
    // 퀴즈 데이터 불러오기
    initialFetchQuizDate();
  }, [quizId, initialFetchQuizDate]);

  /* 퀴즈 데이터를 성공적으로 불러왔다면 페이지를 로드 */
  useEffect(() => {
    if (quizData) setPageIsLoading(false);
  }, [quizData]);

  /* 정답을 제출하고 서버에서 데이터를 불러옴 */
  const submitHandler = async () => {
    if (commentIsLoading || doneSubmit) return;
    setCommentIsLoading(true);
    // 더미데이터가 켜져있으면
    if (isTestModeOn.current) {
      // 해설을 표시하고
      setCommentIsLoading(false);
      // 정답을 표시
      setDoneSubmit(true);
      // 선택한 정답과 더미데이터 정답이 일치하면 정답으로 표시
      if (selectedAnswer === initialAnswer) {
        isCorrectAnswer.current = {
          result: true,
          message: '테스트 유저입니다',
        };
      } else {
        isCorrectAnswer.current = {
          result: false,
          message: '테스트 유저입니다',
        };
      }
      return;
    }
    try {
      const sequence = async () => {
        const response = await fetchSubmitAnswer(
          quizId,
          selectedAnswer.toString()
        );
        const refined = await refineSubmitAnswer(response);
        isCorrectAnswer.current = { ...refined };
      };
      await fetchManyTimes(2, 1000, sequence);
      setDoneSubmit(true);
    } catch (err) {
      DEBUG_MODE && console.log(err);
      setErrorList({ ...errorList, submitError: true });
    } finally {
      setCommentIsLoading(false);
    }
  };

  /* 서버가 정상적으로 응답하지 않는다면 재시도 */
  const fetchManyTimes = (repeat, interval, inputPromise) => {
    return new Promise((resolve, reject) => {
      inputPromise()
        .then((res) => {
          return resolve(res);
        })
        .catch((err) => {
          if (repeat <= 0) return reject(err);
          setTimeout(() => {
            fetchManyTimes(repeat - 1, interval, inputPromise)
              .then((res) => resolve(res))
              .catch((err) => reject(err));
          }, interval);
        });
    });
  };

  const recommendHandler = async () => {
    try {
      const result = await recommendQuiz(quizId);
      if (result === 'ADD RECOMMEND') {
        const target = document.querySelector('#msg_recommend_success');
        if (target) {
          setQuizData((state) => ({
            ...state,
            howManyLikes: state.howManyLikes + 1,
          }));
          target.style.display = 'block';
          setTimeout(() => {
            target.style.display = 'none';
          }, 2000);
        } else return;
      }
      if (result === 'CANCEL RECOMMEND') {
        const target = document.querySelector('#msg_recommend_cancel');
        if (target) {
          setQuizData((state) => ({
            ...state,
            howManyLikes: state.howManyLikes - 1,
          }));
          target.style.display = 'block';
          setTimeout(() => {
            target.style.display = 'none';
          }, 2000);
        } else return;
      }
    } catch (err) {
      DEBUG_MODE && console.log(err);
    }
  };

  const mynoteHandler = async () => {
    try {
      const result = await addToMynote(quizId);
      console.log(result);
      if (result === 'ADDED MYNOTE') {
        const target = document.querySelector('#msg_mynote_added');
        if (target) {
          target.style.display = 'block';
          setTimeout(() => {
            target.style.display = 'none';
          }, 2000);
        } else return;
      }
      if (result === 'ALREADY ADDED MYNOTE') {
        const target = document.querySelector('#msg_mynote_already_added');
        if (target) {
          target.style.display = 'block';
          setTimeout(() => {
            target.style.display = 'none';
          }, 2000);
        } else return;
      }
    } catch (err) {
      DEBUG_MODE && console.log(err);
    }
  };

  return (
    <QuizSolveContainer>
      {/* 퀴즈를 불러올 수 없으면 아래의 메시지를 표시 */}
      {errorList.quizError ? (
        <div className="page_error_message_container">
          <img
            className="page_error_image"
            src={lockIcon}
            alt="자물쇠 아이콘"
          ></img>
          <p className="quiz_error_msg">
            퀴즈 데이터를 받아올 수 없습니다<br></br>잠시후 다시 시도해주세요
          </p>
        </div>
      ) : null}

      {/* 퀴즈를 불러오는 도중에는 아래의 로딩 아이콘을 표시 */}
      {pageIsLoading && !errorList.quizError ? (
        <img
          src={pageLoadingIcon}
          alt="로딩 아이콘"
          className="page_loading_icon"
        ></img>
      ) : null}

      {/* 퀴즈를 불러왔으면 아래의 본문을 표시 */}
      {!pageIsLoading ? (
        <>
          <div className="quiz_solve_top_title">
            <h2>문제 풀이</h2>
          </div>
          <TopProfile
            quizData={quizData}
            userData={userData}
            recommendHandler={recommendHandler}
            isGuest={errorList.loginError}
          ></TopProfile>
          <QuizDisplay quizData={quizData}></QuizDisplay>
          <AnswerDisplay
            quizData={quizData}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
          ></AnswerDisplay>
          {!doneSubmit ? (
            <SubmitModal
              submitHandler={submitHandler}
              isGuest={errorList.loginError}
              quizData={quizData}
            />
          ) : null}
          {/* 정답 제출에 실패하면 아래의 메시지를 표시 */}
          {errorList.submitError ? (
            <p className="sumit_error_msg">
              정답 데이터를 받아올 수 없습니다<br></br>잠시후 다시 시도해주세요
            </p>
          ) : null}
          {/* 정답 제출에 성공하면 아래의 해설을 표시 */}
          {doneSubmit ? (
            <CheckAnswer
              quizData={quizData}
              isCorrectAnswer={isCorrectAnswer.current}
              mynoteHandler={mynoteHandler}
            ></CheckAnswer>
          ) : null}
          {commentIsLoading ? (
            <img
              src={commentLoadingIcon}
              alt="해설 로딩 아이콘"
              className="comment_loading_icon"
            ></img>
          ) : null}
        </>
      ) : null}
    </QuizSolveContainer>
  );
};

export default QuizSolve;
