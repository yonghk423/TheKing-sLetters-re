import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainHot from './Components/MainHot';
import MainCategorySelect from './Components/MainCategorySelect';
import MainQuiz from './Components/MainQuiz';
import axios from 'axios';

const MainContainer = styled.div`
  width: 100%;
`;

const Main = () => {
  const [dataCategorySelect, setDataCategorySelect] = useState({
    categories: '',
    quizTypes: '',
    answerTypes: '',
    rewardPoints: '',
  });
  const [MainHotData, setMainHotData] = useState([]);

  useEffect(() => {
    getMainHotQuiz();
  }, []);

  const getMainHotQuiz = async () => {
    await axios
      .get('https://api.thekingsletters.ml/quizzes', {
        withCredentials: true,
      })
      .then((res) => {
        setMainHotData(res.data.data.quizList);
      });
  };

  return (
    <MainContainer>
      <MainHot MainHotData={MainHotData} />
      <MainCategorySelect
        dataCategorySelect={dataCategorySelect}
        setDataCategorySelect={setDataCategorySelect}
      />
      <MainQuiz
        dataCategorySelect={dataCategorySelect}
        MainHotData={MainHotData}
      />
    </MainContainer>
  );
};

export default Main;
