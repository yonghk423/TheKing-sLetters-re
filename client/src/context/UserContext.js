import React, { createContext, useContext, useReducer, useEffect } from "react";

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

const initialState = {
  isUserLoggedIn: false,
  isAdminLoggedIn: false,
  userData: {
    email: "",
    gender: "",
    image: "",
    mobile: "",
    name: "",
    mileage: "",
    rank: "",
    createdAt: "",
    updatedAt: ""
  },
  adminData: {
    email: "",
    gender: "",
    image: "",
    mobile: "",
    name: "",
    createdAt: "",
    updatedAt: ""
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isUserLoggedIn: true,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        isUserLoggedIn: false,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        userData: {...action.userData},
      };
    case "SET_USER_DATA_NULL":
      return {
        ...state,
        userData: {...initialState.userData},
      };
    case "ADMIN_LOGIN":
      return {
        ...state,
        isAdminLoggedIn: true,
      };
    case "ADMIN_LOGOUT":
      return {
        ...state,
        isAdminLoggedIn: false,
      };
    case "SET_ADMIN_DATA":
      return {
        ...state,
        adminData: {...action.adminData},
      };
    case "SET_ADMIN_DATA_NULL":
      return {
        ...state,
        adminData: {...initialState.adminData},
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  let storedState = JSON.parse(sessionStorage.getItem('storedState'));
  if (!storedState) storedState = initialState;
  const [state, dispatch] = useReducer(reducer, storedState);

  // sessionStorage에 정보를 저장해서 새로고침해도 초기화되지 않게 수정
  useEffect(() => {
    // sessionStorage는 모든 값을 문자로 저장하므로 문자로 변환
    sessionStorage.setItem('storedState', JSON.stringify(state));
  }, [state]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  // UserStateContext value를 불러옵니다
  const state = useContext(UserStateContext);
  // 불러올 수 없다면 에러 출력
  if (!state) throw new Error("Cannot find UserProvider");
  // value를 리턴
  return state;
};

export const useUserDispatch = () => {
  // UserDispatchContext의 value를 불러옵니다
  const dispatch = useContext(UserDispatchContext);
  // 불러올 수 없다면 에러 출력
  if (!dispatch) throw new Error("Cannot find UserProvider");
  // value를 리턴
  return dispatch;
};


// /* index.js 설정 */
// // 먼저 모듈을 import
// import { UserProvider } from "...";
// // 다음으로 return 최상단에 추가
// ReactDOM.render(
//   <UserProvider>
//     ....
//   </UserProvider>
// )

/* ------------------- 유저 관련 ------------------- */
/* useUserState, useUserDispatch의 선언은 컴포넌트 안에 해야함 */

// /* 유저 로그인으로 변경하기 */
// import { useUserDispatch } from ".....";
// const dispatch = useUserDispatch();
// dispatch({type: "USER_LOGIN"});


// /* 유저 로그아웃으로 변경하기 */
// import { useUserDispatch } from ".....";
// const dispatch = useUserDispatch();
// dispatch({type: "USER_LOGOUT"});


// /* 유저 로그인 상태 보기 */
// import { useUserState } from ".....";
// const userState = useUserState();
// console.log(userState.isUserLoggedIn);


// /* 유저 정보 보기 */
// import { useUserState } from ".....";
// const userState = useUserState();
// console.log(userState.userData);


// /* 유저 정보 변경하기 */
// import { useUserDispatch } from ".....";
// const dispatch = useUserDispatch();
// dispatch({
//   type: "SET_USER_DATA",
//   userData: {
//     email: "",
//     gender: "",
//     image: "",
//     mobile: "",
//     name: "",
//     mileage: "",
//     rank: "",
//     createdAt: "",
//     updatedAt: ""
//   }
// });

// /* 유저 정보 초기화 */
// dispatch({type: "SET_USER_DATA_NULL"});


/* ------------------- 어드민 관련 ------------------- */
/* useUserState, useUserDispatch의 선언은 컴포넌트 안에 해야함 */

// /* 어드민 로그인으로 변경하기 */
// import { useUserDispatch } from ".....";
// const dispatch = useUserDispatch();
// dispatch({type: "ADMIN_LOGIN"});


// /* 어드민 로그아웃으로 변경하기 */
// import { useUserDispatch } from ".....";
// const dispatch = useUserDispatch();
// dispatch({type: "ADMIN_LOGOUT"});


// /* 어드민 정보 보기 */
// import { useUserState } from ".....";
// const userState = useUserState();
// console.log(userState.adminData);


/* 어드민 정보 변경하기 */
// import { useUserDispatch } from ".....";
// const dispatch = useUserDispatch();
// dispatch({
//   type: "SET_ADMIN_DATA",
//     adminData: {
//       email: "",
//       gender: "",
//       image: "",
//       mobile: "",
//       name: "",
//       createdAt: "",
//       updatedAt: ""
//     }
// });

// /* 어드민 정보 초기화 */
// dispatch({type: "SET_ADMIN_DATA_NULL"});