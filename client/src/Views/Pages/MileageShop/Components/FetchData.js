import axios from 'axios';
import shoppingBagIcon from '../Assets/shopping-bag-1.svg';

axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

const DEBUG_MODE = true;

const generateId = (len) => {
  var arr = new Uint8Array((len || 40) / 2);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (el) => el.toString(36)).join('');
};

export const fetchItemsData = async () => {
  const END_PONT = `/items/all`;
  const METHOD = `GET`;
  let response = null;
  try {
    response = await axios(END_PONT, {
      method: METHOD,
    });
    return {
      message: `${METHOD} ${END_PONT} 요청에 성공했습니다.`,
      data: response.data.data.itemList,
    };
  } catch (error) {
    response = error.response;
    throw new Error(`${METHOD} ${END_PONT} 요청에 실패했습니다.`);
  } finally {
    console.log(response);
  }
};

export const refineItemsData = async (data) => {
  const refined = data.map((el) => {
    return {
      uid: generateId(20),
      name: `[${el.company}] ${el.itemName}`,
      image: el.itemImage || shoppingBagIcon,
      qty: el.quantity,
      price: el.cost,
      selected: 0,
      items: el.itemIds,
    };
  });
  return refined;
};

export const fetchItemsBuy = async (data) => {
  if (data === undefined || !Array.isArray(data))
    throw new Error(`잘못된 파라메터가 입력되었습니다`);
  const END_PONT = `/buy`;
  const METHOD = `POST`;
  const PAYLOAD = { itemData: data };

  try {
    const response = await axios(END_PONT, {
      method: METHOD,
      data: PAYLOAD,
    });
    const data = response.data;
    DEBUG_MODE && console.log(`${METHOD} ${END_PONT} 요청에 성공했습니다.`);
    if (response.status === 200 && data === 'successfully purchased')
      return "success";
    else if (response.status === 202 && data === 'not enough point')
      return "not enough point";
    else
      return "unhandled error";
  } catch (error) {
    DEBUG_MODE && console.log(`${METHOD} ${END_PONT} 요청에 실패했습니다.`);
    throw error;
  }
};

// // 내가 구매한 쿠폰 확인 임시 주석 처리
// export const fetchMyItems = async () => {
//   const END_PONT = `/myitems`;
//   const METHOD = `GET`;
//   let response = null;
//   try {
//     response = await axios(END_PONT, {
//       method: METHOD,
//     });
//     return {
//       message: `${METHOD} ${END_PONT} 요청에 성공했습니다.`,
//       data: response.data.data,
//     };
//   } catch (error) {
//     response = error.response;
//     throw new Error(`${METHOD} ${END_PONT} 요청에 실패했습니다.`);
//   } finally {
//     DEBUG_MODE && console.log(response);
//   }
// };

// // 내가 구매한 쿠폰 확인 임시 주석 처리
// export const refineMyItems = async (data) => {
//   const items = data.data.userData.user_usedItems;

//   const result = items.reduce((acc, cur) => {
//     return [...acc, cur.usedItem];
//   }, []);

//   return result;
// };
