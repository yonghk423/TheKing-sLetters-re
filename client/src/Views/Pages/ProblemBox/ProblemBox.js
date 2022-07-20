import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProblemBoxCategorySelect from './Components/ProblemCategorySelect';
import ProblemQuizBox from './Components/ProblemQuizBox';
import axios from 'axios';
import { useUserState } from '../../../context/UserContext';

const ProblemBoxContainer = styled.div`
  width: 100%;
`;

const ProblemBox = () => {
  const [dataCategorySelect, setDataCategorySelect] = useState({
    categories: '',
    quizTypes: '',
    answerTypes: '',
    rewardPoints: '',
  });
  const userState = useUserState();
  const isLogin = userState.isUserLoggedIn;
  const [myNote, setMyNote] = useState([]);
  const [UserName, setUserName] = useState([]);
  const [myNoteQuizList, setMyNoteQuizList] = useState([]);

  useEffect(() => {
    if (isLogin) {
      const getProblemBoxQuiz = async () => {
        if (isLogin) {
          await axios
            .get('https://api.thekingsletters.ml/mynote', {
              withCredentials: true,
            })
            .then((res) => {
              setMyNote(res.data.data.myNote);
              setUserName(res.data.data.userData);
            });
        }
      };
      getProblemBoxQuiz();
    }
  }, []);

  useEffect(() => {
    if (!isLogin) {
      const getAllQuizList = async () => {
        await axios
          .get('https://api.thekingsletters.ml/quizzes', {
            withCredentials: true,
          })
          .then((res) => {
            setMyNoteQuizList(res.data.data.quizList);
          });
      };
      getAllQuizList();
    }
  }, []);

  return (
    <ProblemBoxContainer>
      <ProblemBoxCategorySelect
        isGuest={!userState.isUserLoggedIn}
        dataCategorySelect={dataCategorySelect}
        setDataCategorySelect={setDataCategorySelect}
      />
      <ProblemQuizBox
        isLogin={isLogin}
        dataCategorySelect={dataCategorySelect}
        UserName={UserName}
        myNote={myNote}
        myNoteQuizList={myNoteQuizList}
      />
    </ProblemBoxContainer>
  );
};

export default ProblemBox;
