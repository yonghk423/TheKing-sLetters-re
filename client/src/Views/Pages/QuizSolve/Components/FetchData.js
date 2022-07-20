import axios from "axios";

// axios 기본값
axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

// 콘솔로그 표시 온오프
const DEBUG_MODE = true;

export const fetchSubmitAnswer = async (id, answer) => {
  /* 파라메터 유효성 검사 */
  if (id === undefined || answer === undefined) {
    throw new Error(`파라메터가 입력되지 않았습니다`);
  }

  if (typeof id !== 'number' || typeof answer !== 'string') {
    throw new Error(`파라메터가 형식에 맞지 않습니다`);
  }

  const END_PONT = `/quizzes/submit`;
  const METHOD = `POST`;
  const PAYLOAD = { quizId: id, answer: answer };

  let response = null;
  try {
    response = await axios(END_PONT, {
      method: METHOD,
      data: PAYLOAD,
    });
    return { message: `${METHOD} ${END_PONT}요청에 성공했습니다`, data: response.data };
  } catch(error) {
    response = error.response;
    throw new Error(`${METHOD} ${END_PONT}요청에 실패했습니다`);
  } finally {
    DEBUG_MODE && console.log(response);
  }
};

export const refineSubmitAnswer = async (data) => {
  console.log(data.data.message);
  if (data.data.message === `correct answer!`) {
    return { result: true, message: '포인트를 획득했습니다'};
  } else if (data.data.message === `correct answer! but can't gain point(publish)`) {
    return { result: true, message: '하지만 출제자는 자신의 문제로 포인트를 얻을 수 없습니다' };
  } else if (data.data.message === `correct answer! but can't gain point(cleared)`) {
    return { result: true, message: '하지만 이미 푼 문제로는 포인트를 얻을 수 없습니다'};
  } else if (data.data.message === `incorrect answer!`) {
    return { result: false, message: ''};
  } else {
    throw new Error(`형식에 맞는 서버 응답을 찾을 수 없습니다`);
  }
};

export const fetchQuizData = async (id) => {
  if (id === undefined) throw new Error('파라메터가 존재하지 않습니다');
  if (typeof id !== 'number') throw new Error('형식에 맞지 않는 파라메터가 있습니다');
  const END_PONT = `/quizzes/selectquiz/?quizid=${id}`;
  const METHOD = `GET`;
  let response = null;
  try {
    response = await axios(END_PONT, {
      method: METHOD,
    });
    return { message: `${METHOD} ${END_PONT} 요청에 성공했습니다.`, data: response.data.data.selectedQuiz[0] };
  } catch(error) {
    response = error.response;
    throw new Error(`${METHOD} ${END_PONT} 요청에 실패했습니다.`);
  } finally {
    console.log(response);
  }
};

export const refineQuizData = async (raw) => {
  const refined = {
    "title": raw.data.title,
    "category" : raw.data.categories[0].category,
    "quizType": raw.data.quiz_types[0].quizContent.quizType,
    "quizContents": (() => {
      if (raw.data.quiz_types[0].quizContent.quizType === '텍스트 문제') {
        return { text: raw.data.quiz_types[0].quizContent.quizCode }
      }
      if (raw.data.quiz_types[0].quizContent.quizType === '이미지 문제') {
        return { image_url: raw.data.quiz_types[0].quizContent.quizCode }
      }
    })(),
    "answerType": raw.data.answer_types[0].answerContent.answerType,
    "answerContents": raw.data.answer_types.map((el) => {
      if (raw.data.answer_types[0].answerContent.answerType === 'OX 답안') {
        return { name: el.answerContent.answerCode };
      }
      if (raw.data.answer_types[0].answerContent.answerType === '이미지 답안') {
        return { image_url: el.answerContent.answerCode };
      }
      if (raw.data.answer_types[0].answerContent.answerType === '선다형 답안') {
        return { text: el.answerContent.answerCode };
      }
      return null;
    }),
    "answerComment": raw.data.answer_types[0].answerContent.answerComment,
    "rewardPoint": raw.data.rewardPoint,
    "howManyLikes": raw.data.user_recommend_quizzes.length,
  };
  return refined;
};

export const recommendQuiz = async (id) => {
  if (id === undefined) throw new Error('파라메터가 존재하지 않습니다');
  if (typeof id !== 'number') throw new Error('형식에 맞지 않는 파라메터가 있습니다');
  const END_PONT = `/quizzes/recommend`;
  const METHOD = `POST`;
  const PAYLOAD = { quizId: id };
  try {
    const response = await axios(END_PONT, {
      method: METHOD,
      data: PAYLOAD,
    });
    const data = response.data;
    if (response.status === 200 && data === "add recommend")
      return "ADD RECOMMEND";
    else if (response.status === 200 && data === "cancel recommend")
      return "CANCEL RECOMMEND";
    else
      return "UNHANDLED ERROR";
  } catch(error) {
    throw error;
  }
};

export const addToMynote = async (id) => {
  if (id === undefined) throw new Error('파라메터가 존재하지 않습니다');
  if (typeof id !== 'number') throw new Error('형식에 맞지 않는 파라메터가 있습니다');
  const END_PONT = `/mynote/add`;
  const METHOD = `POST`;
  const PAYLOAD = { quizId: id };
  try {
    const response = await axios(END_PONT, {
      method: METHOD,
      data: PAYLOAD,
    });
    const data = response.data;
    if (response.status === 200 && data === "successfully added")
      return "ADDED MYNOTE";
    else
      return "UNHANDLED ERROR";
  } catch(error) {
    const data = error.response.data;
    if (error.response.status === 409 && data === "already in your my note")
      return "ALREADY ADDED MYNOTE";
    else
      throw error;
  }
};