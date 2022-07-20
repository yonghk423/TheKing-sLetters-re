export const isVaildCategory = (dataCategorySelect) => {
  /* !! dataCategorySelect 유효성 검사 !! */
  for (const value of Object.values(dataCategorySelect)) {
    // 모든 항목이 빈칸이면 안됨
    if (value === '') {
      return false;
    }
  }
  return true;
}

export const isVaildQuiz = (dataQuizSelect) => {
  /* !! dataQuizSelect 유효성 검사 !! */
  // 모든 항목이 빈칸이면 안됨
  // {title: '', type: '', contents: {}}
  // 텍스트 문제일 경우 contents: {text: ''}
  // 이미지 문제일 경우 contents: {image_url: '', image_type: ''}
  
  // 퀴즈 제목이 있어야 함
  if (dataQuizSelect.title === '') {
    return false;
  }

  // 퀴즈 내용이 있어야 함
  if (Object.keys(dataQuizSelect.contents).length === 0 ||
      dataQuizSelect.type === '' ||
      dataQuizSelect.contents.text === '' ||
      dataQuizSelect.contents.image_url === '' ||
      dataQuizSelect.contents.image_type === '') {
    return false;
  }
  return true;
};

export const isVaildAnswer = (dataAnswerSelect) => {
  /* !! dataAnswerSelect 유효성 검사 !! */
  // 이미지 문제의 경우 contents: {image_url: url, image_object: file, isAnswer: false}
  // 선다형 문제의 경우 contents: {text: '', isAnswer: false}
  // OX 문제의 경우 contents: {name: "correct", icon: correctIcon, isAnswer: false}

  // 모든 정답의 선택지는 최소 2개가 있어야 함
  if (dataAnswerSelect.contents.length < 2) {
    return false;
  }
  // 이미지 문제와 선다형 문제의 답안 중에 빈칸이 있는지 확인
  for (const el of dataAnswerSelect.contents) {
    if (el.image_url === '' || el.text === '') {
      return false;
    }
  }
  // 문제에 정답이 한개라도 있어야 함
  if (dataAnswerSelect.contents.find((el) => el.isAnswer) === undefined) return false;
  
  return true;
};

export const isVaildCommentation = (dataCommentation) => {
  /*!! dataCommentation 유효성 검사 !!*/
  if (dataCommentation.answerComments === '') {
    return false;
  }
  return true;
};

export const vaildCheckAll = (dataCategorySelect, dataQuizSelect, dataAnswerSelect, dataCommentation) => {
  if (!isVaildCategory(dataCategorySelect)) return false;
  if (!isVaildQuiz(dataQuizSelect)) return false;
  if (!isVaildAnswer(dataAnswerSelect)) return false;
  if (!isVaildCommentation(dataCommentation)) return false;
  return true;
};