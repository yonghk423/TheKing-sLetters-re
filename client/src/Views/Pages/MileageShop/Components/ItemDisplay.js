import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import defaultImage from '../Assets/default-1.png';

const ItemDisplayWrapper = styled.div`
  font-family: 'EBSHMJESaeronRA';
  border: 1px solid black;
  border-radius: 5px;
  margin: 1% 6% 1% 6%;
  display: flex;
  flex-direction: column;
  > .shopping_cart_title {
    flex: 1 0 0;
    background-color: #b6c3b6;
    font-size: 1.5em;
    padding: 0.5% 1% 0.5% 1%;
    letter-spacing: 3px;
  }
  > .more__btn {
    font-size: 1.5em;
    font-family: 'EBSHunminjeongeumSBA';
    padding: 0.5rem 0;
    letter-spacing: 3px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0 0 3px 3px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
      color: #fafafa;
      background-color: #303030;
    }
  }
`;

const ItemContainerWrapper = styled.div`
  font-family: 'EBSHMJESaeronRA';
  padding: 2% 1% 2% 1%;
  flex: 1 0 0;
  height: auto;
  /* flex 설정 */
  display: grid;
  grid-gap: 3vh 3vw;
  justify-items: center;
  
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(80vw, 1fr));
  }
  > .item_container {
    position: relative;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    margin: 1rem;
    padding: 0.5% 0.5% 0.5% 0.5%;
    display: flex;
    flex-direction: column;
    gap: 1px;

    width: 20rem;
    height: 33rem;
    @media (max-width: 480px) {
      width: 80vw;
      height: 120vw;
    }
    > .image_container {
      background-color: gray;
      margin: 0px 0px 3px 0px;
      border: none;
      border-radius: 5px;
      outline: 1px dotted black;
      max-width: 320px;
      max-height: 320px;
      overflow: hidden;
      @media (max-width: 480px) {
        max-width: 100%;
        max-height: 80vw;
      }
    }

    > .image_container .item_image {
      object-fit: contain;
    }
    > .item_selected_msg {
      position: absolute;
      top: -1.5em;
      left: 0;
      color: blueviolet;
    }
    > .item_name {
      margin-top: 1%;
      padding: 0% 2% 0% 2%;
      flex: 1 1 0;
      font-size: 1rem;
    }
    > .item_qty {
      padding: 0% 2% 0% 2%;
      flex: 1 1 0;
      font-size: 1rem;
    }
    > .item_price {
      padding: 0% 2% 0% 2%;
      flex: 1 1 0;
      font-size: 1rem;
      margin-bottom: 1%;
    }
    > .item_select_button {
      padding: 2% 0% 2% 0%;
      width: 100%;
      height: auto;
      font-size: 0.9rem;
      letter-spacing: 2px;
      font-family: 'EBSHunminjeongeumSBA';
      font-weight: bold;
      background-color: transparent;
      border: 1px solid #303030;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.4s ease;
      &:hover {
        background-color: #303030;
        border: 1px solid #303030;
        color: #fafafa;
      }
    }
  }
  > .selected {
    border: none;
    outline: 2px solid blueviolet;
  }
`;

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const ItemDisplay = ({ items, setItems }) => {
  const limitMaxItemsInPage = 4;
  const limitMaxPage = Math.ceil(items.length / limitMaxItemsInPage);
  const [numToSlice, setNumToSlice] = useState(limitMaxItemsInPage);
  const [itemsToDisplay, setItemsToDisplay] = useState([]);
  const [reachedLimit, setReachedLimit] = useState(false);

  useEffect(() => {
    setItemsToDisplay(() => items.slice(0, numToSlice));
  }, [items, numToSlice]);

  useEffect(() => {
    if (Math.ceil(numToSlice / limitMaxItemsInPage) >= limitMaxPage) {
      setReachedLimit(true);
    }
  }, [itemsToDisplay, numToSlice, limitMaxPage]);

  const itemClickHandler = (id) => {
    setItems((state) =>
      state.map((el) => {
        if (el.uid === id && el.selected < el.qty)
          return { ...el, selected: el.selected + 1 };
        else return el;
      })
    );
  };

  const expandListHandler = () => {
    if (Math.ceil(numToSlice / limitMaxItemsInPage) < limitMaxPage) {
      setNumToSlice(numToSlice + limitMaxItemsInPage);
    }
  };

  return (
    <ItemDisplayWrapper>
      <div className="shopping_cart_title">상품</div>
      <ItemContainerWrapper>
        {itemsToDisplay.map((el, idx) => {
          return (
            <div
              className={
                el.selected !== 0 ? 'item_container selected' : 'item_container'
              }
              key={idx.toString()}
            >
              {el.selected !== 0 ? (
                <span className="item_selected_msg">선택함</span>
              ) : null}
              <div className="image_container">
                <img
                  className="item_image"
                  src={el.image || defaultImage}
                  alt="상품 이미지"
                ></img>
              </div>
              <div className="item_name">
                <p style={{ fontWeight: '600' }}>이름</p>
                <p style={{ textAlign: 'right' }}>{el.name}</p>
              </div>
              <div className="item_qty">
                <p style={{ fontWeight: '600' }}>재고</p>
                <p style={{ textAlign: 'right' }}>
                  {numberWithCommas(el.qty)} 개
                </p>
              </div>
              <div className="item_price">
                <p style={{ fontWeight: '600' }}>가격</p>
                <p style={{ textAlign: 'right' }}>
                  {numberWithCommas(el.price)} 냥
                </p>
              </div>
              <button
                className="item_select_button"
                onClick={() => itemClickHandler(el.uid)}
              >
                장바구니에 추가하기
              </button>
            </div>
          );
        })}
      </ItemContainerWrapper>
      {!reachedLimit ? (
        <button className="more__btn" onClick={expandListHandler} style={{}}>
          더보기
        </button>
      ) : null}
    </ItemDisplayWrapper>
  );
};

export default ItemDisplay;
