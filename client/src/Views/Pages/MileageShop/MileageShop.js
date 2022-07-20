// library
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// modules
import MileageDisplay from './Components/MileageDisplay';
import ShoppingCart from './Components/ShoppingCart';
import ItemDisplay from './Components/ItemDisplay';
import { useUserState } from '../../../context/UserContext';

import {
  fetchItemsData,
  refineItemsData,
  fetchItemsBuy,
  // 내가 구매한 쿠폰 확인 임시 주석 처리
  // fetchMyItems,
  // refineMyItems,
} from './Components/FetchData';
import loadingIcon from './Assets/loading-1.svg';
import lockIcon from './Assets/lock-1.svg';

const DEBUG_MODE = true;

const BOX_SHADOW = `
	-moz-box-shadow: 0 1px 1px 0 #ccc;
	-webkit-box-shadow: 0 1px 1px 0 #ccc;
	box-shadow: 0 1px 1px 0 #ccc;
`;

const MileageShopWrapper = styled.div`
  position: relative;
  display: flex;
  flex-flow: column;
  width: 100%;
  min-height: 86.8vh;
  padding-top: 5%;

  > .page_error_message_container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;

    background-color: rgba(0, 0, 0, 0.1);
    ${BOX_SHADOW}
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 50%;
    height: 50%;
    @media (max-width: 480px) {
      width: 100vw;
      height: 150vw;
    }
  }
  > .page_error_message_container .page_error_image {
    width: 4rem;
    height: 4rem;
    padding: 0 0 1rem 0;
    z-index: 3;
  }
  > .page_error_message_container .page_error_msg {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
    z-index: 3;
  }
  > .page_error_message_container .guest_mode_msg {
    width: 10rem;
    color: white;
    font-weight: 600;
    background-color: #151515;
    text-align: center;
    font-size: 1.5em;
    font-weight: 500;
    z-index: 3;
    cursor: pointer;
  }
`;

const MileageShopTitle = styled.div`
  margin: 1% 6% 3% 6%;
  padding: 1% 1% 1% 1%;
  background-color: #8a9f99;
  color: #303030;
  font-size: 1.8em;
  font-weight: bold;
  font-family: 'EBSHunminjeongeumSBA';
  letter-spacing: 3px;
  border-radius: 6px;
`;

const MileageShopSubmit = styled.div`
  padding: 1% 6% 1% 6%;
  margin: 3rem 0 5rem 0;
  > button {
    font-family: 'EBSHunminjeongeumSBA';
    letter-spacing: 3px;
    border-radius: 5px;
    width: 100%;
    height: 2em;
    font-size: 2em;
    font-weight: 600;
    transition: all 0.4s ease-in-out;
  }
  > button:hover {
    cursor: pointer;
    background-color: #303030;
    color: #fafafa;
  }
`;

const ConfirmModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmModalView = styled.div`
  position: relative;
  border-radius: 10px;
  width: 45%;
  height: 45%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .modal_close_icon {
    position: absolute;
    top: 1em;
    right: 1em;
    background-color: transparent;
    font-size: 1.3em;
    font-weight: bold;
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
  > .modal_loading_icon {
    width: 20%;
    height: 20%;
  }
  > .modal_confirm_msg {
    font-family: 'EBSHMJESaeronRA';
    font-size: 1.5rem;
    letter-spacing: 3px;
  }
  > .modal_button_container {
    position: absolute;
    bottom: 1.5em;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1em;
    > .modal_confirm_yes {
      font-family: 'EBSHMJESaeronRA';
      padding: 8px 18px;
      border: 1px solid rgba(77, 109, 254, 0.9);
      background-color: rgba(77, 109, 254, 0.9);
      color: #fafafa;
      font-weight: 500;
      border-radius: 6px;
      letter-spacing: 3px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.4s ease;
      margin-right: 3rem;
      &:hover {
        border: 1px solid #0066ff;
        background-color: #0066ff;
      }
    }
    > .modal_confirm_no {
      font-family: 'EBSHMJESaeronRA';
      padding: 8px 18px;
      border: 1px solid rgba(0, 0, 0, 0.3);
      background-color: transparent;
      color: rgba(0, 0, 0, 0.3);
      font-weight: 500;
      border-radius: 6px;
      letter-spacing: 3px;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.4s ease;
      &:hover {
        border: 1px solid #303030;
        background-color: #303030;
        color: #fafafa;
      }
    }
  }
  @media (max-width: 1280px) {
    width: 70%;
    height: 40%;
    > .modal_confirm_msg {
      font-size: 1.5rem;
    }
  }
  @media (max-width: 960px) {
    width: 80%;
    height: 35%;
    > .modal_confirm_msg {
      font-size: 1.3rem;
    }
  }
  @media (max-width: 768px) {
    width: 90%;
    height: 30%;
    > .modal_confirm_msg {
      font-size: 1.2rem;
    }
  }
`;

const initialItems = [
  {
    uid: 'a1',
    name: '[스타벅스] 아이스 아메리카노',
    image: '',
    qty: 5,
    price: 1000,
    selected: 0,
    items: [1, 2, 3, 4, 5],
  },
  {
    uid: 'b2',
    name: '[카페베네] 카라멜 마키야토',
    image: '',
    qty: 5,
    price: 2000,
    selected: 0,
    items: [6, 7, 8, 9, 10],
  },
  {
    uid: 'c3',
    name: '[BHC] 뿌링클 치킨',
    image: '',
    qty: 5,
    price: 3000,
    selected: 0,
    items: [11, 12, 13, 14, 15],
  },
  {
    uid: 'd4',
    name: '[파리바게트] 부드러운 생크림 케이크',
    image: '',
    qty: 2,
    price: 4000,
    selected: 0,
    items: [16, 17],
  },
  {
    uid: 'e5',
    name: '[파리바게트] 치즈 케이크',
    image: '',
    qty: 4,
    price: 4000,
    selected: 0,
    items: [18, 19, 20, 21],
  },
  {
    uid: 'f6',
    name: '[카페베네] 녹차 라떼',
    image: '',
    qty: 4,
    price: 4000,
    selected: 0,
    items: [22, 23, 24, 25],
  },
  {
    uid: 'g7',
    name: '[엔젤리너스] 스위트 아이스 아메리카노',
    image: '',
    qty: 2,
    price: 4000,
    selected: 0,
    items: [26, 27],
  },
  {
    uid: 'h8',
    name: '[엔젤리너스] 요거트 프라페',
    image: '',
    qty: 1,
    price: 4000,
    selected: 0,
    items: [28],
  },
  {
    uid: 'i9',
    name: '[엔젤리너스] 초코 프라페',
    image: '',
    qty: 2,
    price: 4000,
    selected: 0,
    items: [29, 30],
  },
];

const initialUserInfo = {
  name: '테스트 유저',
  image: 'https://i.ibb.co/NSRNHdr/quiz-1.jpg',
  rank: '1',
  mileage: 1000,
};

const MileageShop = () => {
  // 유저 정보 저장
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  // 아이템 정보 저장
  const [items, setItems] = useState(initialItems);
  // 장바구니 합계 저장
  const [totalPrice, setTotalPrice] = useState(0);
  // 구매 확인창 modal
  const [confrimIsOpen, setConfirmIsOpen] = useState(false);
  // 구매 확인창 loading
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  // 모달창 메시지 저장
  const [modalMsgList, setModalMsgList] = useState({submitError: false, submitSuccess: false, notEnoughPoint: false, cartIsEmpty: true, unhandledError: false});
  // 로그인 여부 저장
  const [userLoginSuccess, setUserLoginSuccess] = useState(false);
  // 유저 정보 state를 context에서 불러옴, 로그인 정보와 유저 정보가 담겨있음
  const userState = useUserState();
  // 체험 모드 온오프
  const [isTestModeOn, setIsTestModeOn] = useState(false);
  // 구매 에러 여부 확인
  const [isAnyError, setIsAnyError] = useState(false);

  // 만약 구매하는데 에러가 발생하면 isAnyError를 true로 변경
  useEffect(() => {
    const result = Object.values(modalMsgList).filter((el) => el);
    if (result.length === 0) setIsAnyError(false);
    else setIsAnyError(true);
  }, [modalMsgList]);
  /* 유저 데이터 불러오기 */
  useEffect(() => {
    setUserLoginSuccess(false);
    // 더미데이터가 켜져있으면
    if (isTestModeOn) {
      // 더미용 유저데이터를 불러오고
      setUserInfo(initialUserInfo);
      // 화면을 표시
      setUserLoginSuccess(true);
      return;
    }
    // 유저가 로그인 한 상태라면
    if (userState.isUserLoggedIn) {
      // 유저 데이터를 fetch하고
      axios.get("/users/info")
      .then((response) => {
        const data = response.data.data.userData;
        // 가져온 유저 정보를 가공하고
        const refinedData = {
          name: data.name,
          image: data.image,
          rank: data.rank.toString(),
          mileage: data.mileage,
        };
        // state에 저장
        setUserInfo(refinedData);
        // 화면을 표시
        setUserLoginSuccess(true);
      })
      .catch((err) => {
        DEBUG_MODE && console.log(err);
      });
    }
  }, [userState, isTestModeOn]);

  // 장바구니가 업데이트될 때 마다 합계 계산
  useEffect(() => {
    // 메뉴에 표시될 합계를 저장
    const total = items.reduce((acc, cur) => {
      const cal = cur.price * cur.selected;
      return acc + cal;
    }, 0);
    setTotalPrice(total);

    // 만약 카트가 비어있으면 카트가 비어있다고 저장
    if (total === 0)
      setModalMsgList((state) => ({...state, cartIsEmpty: true}));
    else
      setModalMsgList((state) => ({...state, cartIsEmpty: false}));
  }, [items]);

  // 쿠폰 정보 fetch
  useEffect(() => {
    try {
      const getItemsFromServer = async () => {
        // 서버에서 상품 정보를 가져오고
        const raw = await fetchItemsData();
        // 데이터를 적절하게 가공
        const refined = await refineItemsData(raw.data);
        // state에 저장
        setItems(refined);
      };
      getItemsFromServer();
    } catch (err) {
      DEBUG_MODE && console.log(err);
    }
  }, []);

  // 아이템 구매 요청 fetch
  const itemsBuyHandler = async () => {
    setIsSubmitLoading(true);
    let itemsToBuy = items.reduce((acc, cur) => {
      if (cur.selected !== 0)
        return [...acc, ...cur.items.slice(0, cur.selected)];
      else return [...acc];
    }, []);
    try {
      const sequence = async () => {
        const result = await fetchItemsBuy(itemsToBuy);
        if (result === 'success') {
          setModalMsgList((state) => ({
            ...state,
            submitSuccess: true,
          }));
          setTimeout(() => {
            // window.location.reload();
          }, 2000);
        } else if (result === 'not enough point') {
          setModalMsgList((state) => ({
            ...state,
            notEnoughPoint: true,
          }));
        } else {
          setModalMsgList((state) => ({
            ...state,
            unhandledError: true,
          }));
        }
        DEBUG_MODE && console.log(result);
      };
      await fetchManyTimes(2, 1000, sequence);
    } catch (err) {
      setModalMsgList((state) => ({
        ...state,
        submitError: true,
      }));
      DEBUG_MODE && console.log(err);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  // 서버가 정상적으로 응답하지 않는다면 재시도
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

  // // 내가 구매한 쿠폰 확인 임시 주석 처리
  // const letsCheck = async () => {
  //   try {
  //     let raw = await fetchMyItems();
  //     let refined = await refineMyItems(raw);
  //     DEBUG_MODE && console.log(refined);
  //   } catch (err) {
  //     DEBUG_MODE && console.log(err);
  //   }
  // };

  // 에러 메시지가 있으면 모달창에 출력
  const ModalMsgDisplay = () => {
    let message = null;
    if (modalMsgList.submitError) {
      message = (
        <p
          key="submit_error_msg"
          className="submit_error_msg"
          style={{
            textAlign: 'center',
            fontSize: '1.3rem',
            fontFamily: 'EBSHMJESaeronRA',
            letterSpacing: '3px',
          }}
        >
          서버와 연결할 수 없습니다
          <br />
          잠시 후 다시 시도해주세요
        </p>
      );
    } else if (modalMsgList.submitSuccess) {
      message = (
        <p
          key="submit_success_msg"
          className="submit_success_msg"
          style={{
            textAlign: 'center',
            fontSize: '1.3rem',
            fontFamily: 'EBSHMJESaeronRA',
            letterSpacing: '3px',
          }}
        >
          쿠폰을 성공적으로 구매했습니다
          <br />
          마이페이지에서 확인하세요
        </p>
      );
    } else if (modalMsgList.notEnoughPoint) {
      message = (
        <p
          key="submit_success_msg"
          className="submit_success_msg"
          style={{
            textAlign: 'center',
            fontSize: '1.3rem',
            fontFamily: 'EBSHMJESaeronRA',
            letterSpacing: '3px',
          }}
        >
          포인트가 부족합니다
          <br />
          문제를 풀고 포인트를 획득하세요
        </p>
      );
    } else if (modalMsgList.cartIsEmpty) {
      message = (
        <p
          key="submit_success_msg"
          className="submit_success_msg"
          style={{
            textAlign: 'center',
            fontSize: '1.3rem',
            fontFamily: 'EBSHMJESaeronRA',
            letterSpacing: '3px',
          }}
        >
          장바구니가 비어있습니다
        </p>
      );
    } else if (modalMsgList.unhandledError) {
      message = (
        <p
          key="submit_success_msg"
          className="submit_success_msg"
          style={{
            textAlign: 'center',
            fontSize: '1.3rem',
            fontFamily: 'EBSHMJESaeronRA',
            letterSpacing: '3px',
          }}
        >
          알 수 없는 에러입니다
          <br />
          관리자에게 문의하세요
        </p>
      );
    };
    return message;
  };

  const ModalOpenHandler = () => {
    setModalMsgList((state) => {
      return {...state,
              submitError: false,
              submitSuccess: false,
              notEnoughPoint: false,
              unhandledError: false}});
    setConfirmIsOpen(!confrimIsOpen);
  };

  return (
    <>
      {/* 로그인이 안되어 있다면 표시 체험하기 모드 버튼 표시*/}
      {!userLoginSuccess ?
      <MileageShopWrapper>
        <div className="page_error_message_container">
          <img
            className="page_error_image"
            src={lockIcon}
            alt="배경 이미지"
          ></img>
          <p className="page_error_msg">
            저잣거리에 들어가시려면
            <br />
            <span style={{color: "blue"}}>로그인</span>이 필요합니다
            <br />
            <br />
          </p>
          <p className="guest_mode_msg" onClick={() => setIsTestModeOn(true)}>체험하기</p>
        </div>
      </MileageShopWrapper>
      : null}
      
      {/* 로그인이 되어있다면 마일리지샵 표시 */}
      {userLoginSuccess ?
      <MileageShopWrapper>
          <MileageShopTitle>저잣거리</MileageShopTitle>
          <MileageDisplay userInfo={userInfo} totalPrice={totalPrice} />
          <ShoppingCart
            items={items}
            setItems={setItems}
            totalPrice={totalPrice}
          />
          <ItemDisplay items={items} setItems={setItems} />
          <MileageShopSubmit>
            <button onClick={() => setConfirmIsOpen(!confrimIsOpen)}>
              구매하기
            </button>
          </MileageShopSubmit>
      </MileageShopWrapper>
      : null}

      {/* 구매하기 버튼을 클릭했을 경우 모달창 표시 */}
      {confrimIsOpen ?
      <ConfirmModalOverlay>
        <ConfirmModalView>
          <button className="modal_close_icon" onClick={ModalOpenHandler}>
            &times;
          </button>

          {/* 구매 로딩중이 아니고 에러가 없을 경우 */}
          {!isSubmitLoading && !isAnyError ?
          <>
          <p className="modal_confirm_msg">
            확인 버튼을 누르시면 구매가 완료됩니다
          </p>
          <div className="modal_button_container">
            <button
              className="modal_confirm_yes"
              onClick={itemsBuyHandler}
            >
              확인
            </button>
            <button
              className="modal_confirm_no"
              onClick={ModalOpenHandler}
            >
              취소
            </button>
          </div>
          </>
          : null}

          {/* 구매 로딩중이고 에러가 없을 경우 */}
          {isSubmitLoading && !isAnyError ?
          <img
            className="modal_loading_icon"
            src={loadingIcon}
            alt="구매 로딩 이미지">
          </img>
          : null}
          
          {/* 에러가 있을 경우 에러를 표시 */}
          {isAnyError ?
          <ModalMsgDisplay />
          : null}
        </ConfirmModalView>
      </ConfirmModalOverlay>
      : null}
    </>
  );
};

export default MileageShop;
