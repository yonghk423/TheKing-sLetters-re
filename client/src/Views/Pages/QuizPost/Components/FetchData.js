import axios from "axios";
import UploadImage from "../../../../functions/upload";

// axios 기본값
axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

export const uploadData = async (data) => {
  const URL = `/quizzes/newQuiz`;
  const PAYLOAD = data;
  if (data === undefined) throw new Error('파라미터가 입력되지 않았습니다');
  let response = null;
  try {
    response = await axios(URL, {
      method: 'POST',
      data: PAYLOAD,
    });
    return {status: 'success', message: 'successfully uploaded', response: response};
  } catch(error) {
    throw error;
  }
};

export const refineData = async (dataCategorySelect, dataQuizSelect, dataAnswerSelect, dataCommentation, dataThumbnail) => {
  const toUpload = {
    title: JSON.parse(JSON.stringify(dataQuizSelect.title)), // 문제 제목
    thumbnail: {...dataThumbnail}, // 문제 섬네일
    /* ------------------------- */
    categories: JSON.parse(JSON.stringify(dataCategorySelect.categories)), // 문제 카테고리
    quizTypes: JSON.parse(JSON.stringify(dataCategorySelect.quizTypes)), // 문제 출제 타입
    answerTypes: JSON.parse(JSON.stringify(dataCategorySelect.answerTypes)), // 정답 출제 타입
    /* ------------------------- */
    quizContents: {...dataQuizSelect.contents}, // 퀴즈 내용
    answerContents: [...dataAnswerSelect.contents], // 정답 내용
    /* ------------------------- */
    answerCorrects: dataAnswerSelect.contents.findIndex(el => el.isAnswer).toString(), // 정답
    answerComments: JSON.parse(JSON.stringify(dataCommentation.answerComments)), // 정답 해설
    rewardPoints: dataCategorySelect.rewardPoints[0] || "-1", // 정답 포인트
  };

  if (toUpload.quizTypes === '이미지 문제') {
    const result = await UploadImage(toUpload.quizContents.image_object);
    URL.revokeObjectURL(toUpload.quizContents.image_url);
    toUpload.quizContents = { image_url: result.Location };
  }
  if (toUpload.answerTypes === '이미지 답안') {
    toUpload.answerContents = await Promise.all(
      toUpload.answerContents.map(async (el) => {
        const result = await UploadImage(el.image_object);
        URL.revokeObjectURL(el.image_url);
        return {file_url: result.Location};
      })
    );
  } else {
    toUpload.answerContents = await Promise.all(
      toUpload.answerContents.map((el) => {
        return el.text || el.name;
      })
    );
  }
  if (toUpload.thumbnail.image_url !== '') {
    const result = await UploadImage(toUpload.thumbnail.image_object);
    URL.revokeObjectURL(toUpload.thumbnail.image_url);
    toUpload.thumbnail = result.Location;
  } else {
    toUpload.thumbnail = 'default';
  }

  return toUpload;
};