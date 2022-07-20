import React, { useState, useEffect } from 'react';
import QuizManagement from './Components/QuizManagement';
import FindContents from './Components/FindContents';
import axios from 'axios';
import { useUserState } from '../../../context/UserContext';

// axios 기본값
axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

const AdminPage = () => {
  const userState = useUserState();
  const isLogin = userState.isAdminLoggedIn;

  const [validQuiz, setValidQuiz] = useState([]);
  const [invalidQuiz, setInValidQuiz] = useState([]);

  useEffect(() => {
    const getApproveQuiz = async () => {
      await axios.get('/approvalpage').then((res) => {
        setInValidQuiz(res.data.data.invalidQuizList);
        setValidQuiz(res.data.data.validQuizList);
      });
    };
    getApproveQuiz();
  }, [isLogin]);

  return (
    <div>
      <QuizManagement
        isLogin={isLogin}
        invalidQuiz={invalidQuiz}
        setInValidQuiz={setInValidQuiz}
      />
      <FindContents
        validQuiz={validQuiz}
        isLogin={isLogin}
        setValidQuiz={setValidQuiz}
      />
    </div>
  );
};

export default AdminPage;
