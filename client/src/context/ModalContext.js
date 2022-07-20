import React, { createContext, useContext, useReducer } from 'react';

const ModalStateContext = createContext(null);
const ModalDispatchContext = createContext(null);

const initialState = {
  modalUserSignIn: false,
  modalUserSignUp: false,
  modalUserMypage: false,
  modalAdminSignIn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'MODAL_USER_SIGN_IN':
      return {
        ...state,
        modalUserSignIn: action.value,
      };
    case 'MODAL_USER_SIGN_UP':
      return {
        ...state,
        modalUserSignUp: action.value,
      };
    case 'MODAL_USER_MYPAGE':
      return {
        ...state,
        modalUserMypage: action.value,
      };
    case 'MODAL_ADMIN_SIGN_IN':
      return {
        ...state,
        modalAdminSignIn: action.value,
      };
    default:
      return state;
  }
};

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
};

export const useModalState = () => {
  // UserStateContext value를 불러옵니다
  const state = useContext(ModalStateContext);
  // 불러올 수 없다면 에러 출력
  if (!state) throw new Error('Cannot find ModalProvider');
  // value를 리턴
  return state;
};

export const useModalDispatch = () => {
  // UserDispatchContext의 value를 불러옵니다
  const dispatch = useContext(ModalDispatchContext);
  // 불러올 수 없다면 에러 출력
  if (!dispatch) throw new Error('Cannot find ModalProvider');
  // value를 리턴
  return dispatch;
};
