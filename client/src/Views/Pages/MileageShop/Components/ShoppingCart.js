import React from 'react';
import styled from 'styled-components';
import deleteIcon from '../Assets/delete-1.png';
import shoppingCartIcon from '../Assets/shopping-cart-1.png';

const ShoppingCartWrapper = styled.div`
  font-family: 'EBSHMJESaeronRA';
  letter-spacing: 3px;
  border: 1px solid black;
  border-radius: 5px;
  margin: 1% 6% 1% 6%;
  display: flex;
  flex-direction: column;

  > .shopping_cart_title {
    background-color: #b6c3b6;
    padding: 0.5% 1% 0.5% 1%;
    font-size: 1.5em;
    font-weight: 500;
  }
  > .shopping_cart_contents {
    display: flex;
    flex-direction: column;
  }
  > .shopping_cart_total {
    background-color: rgba(0, 0, 0, 0.2);
    padding: 0.8% 5% 0.8% 0%;
    font-size: 1.2em;
    font-weight: 500;
    text-align: right;
  }
  > .shopping_cart_empty {
    margin: 3% 0% 3% 0%;
    align-self: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    > .cart_empty_icon {
      width: 10%;
      height: auto;
    }
    > .cart_empty_msg {
      margin-top: 1.5rem;
      font-size: 1rem;
      color: rgb(71, 71, 71);
    }
  }
`;

const ShoppingCartItemWrapper = styled.div`
  padding: 0.3% 1% 0.3% 1%;
  display: flex;
  align-items: center;
  margin: 0.5rem 0.2rem;
  border-radius: 6px;

  > .cart_item_title {
    font-size: 1.2rem;
    font-weight: 600;
    width: 70%;
  }
  > .cart_max_qty_msg {
    text-align: left;
    width: 25%;
    font-size: 1rem;
    letter-spacing: 1px;
  }
  > .cart_item_price {
    border-right: 1px solid rgba(0, 0, 0, 0.3);
    min-width: 20%;
    text-align: center;
    letter-spacing: 2px;
    font-size: 1rem;
  }
  > .cart_item_subtotal {
    text-align: center;
    min-width: 17%;
    font-size: 1rem;
    letter-spacing: 2px;
  }
  > .cart_item_delete {
    width: 1em;
    height: 1em;
    margin-right: 0.5rem;
    &:hover {
      cursor: pointer;
    }
  }
  @media (max-width: 960px) {
    > .cart_item_title {
      font-size: 1rem;
      width: 70%;
    }
    > .cart_max_qty_msg {
      text-align: center;
      width: 32%;
      font-size: 0.8rem;
    }
    > .cart_item_price {
      border-right: 1px solid rgba(0, 0, 0, 0.3);
      width: 22%;
      letter-spacing: 0;
      text-align: center;
      font-size: 0.8rem;
    }
    > .cart_item_subtotal {
      text-align: center;
      width: 22%;
      letter-spacing: 0;
      font-size: 0.8rem;
    }
    > .cart_item_delete {
      width: 0.8em;
      height: 0.8em;
    }
  }
  @media (max-width: 768px) {
    border: 1px solid #303030;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem 0.5rem;
    > .cart_item_title {
      font-size: 1.2rem;
      width: 100%;
      text-align: center;
      margin: 0.1rem 0;
    }
    > .cart_max_qty_msg {
      text-align: center;
      width: 100%;
      font-size: 1rem;
      margin: 0.1rem 0;
    }
    > .cart_item_price {
      width: 100%;
      letter-spacing: 3px;
      text-align: center;
      font-size: 1rem;
      margin: 0.1rem 0;
    }
    > .cart_item_subtotal {
      text-align: center;
      width: 100%;
      letter-spacing: 3px;
      font-size: 1rem;
      margin: 0.1rem 0;
    }
    > .cart_item_delete {
      width: 1em;
      height: 1em;
      margin: 0.5rem 0;
    }
  }
`;

const ItemQuantityWrapper = styled.div`
  margin: 0em 1em 0em 1em;
  display: flex;
  flex-direction: row;

  > .item_qty_display {
    margin: auto;
    padding: 0em 0.5em 0em 0.5em;
    font-size: 1.5em;
  }
  > .item_qty_button {
    background-color: transparent;
    font-size: 2em;
    font-weight: 600;
    color: #5f5fce;
    cursor: pointer;
  }
  @media (max-width: 960px) {
    > .item_qty_display {
      font-size: 1.2em;
    }
    > .item_qty_button {
      background-color: transparent;
      font-size: 1.5em;
      font-weight: 600;
      color: #5f5fce;
    }
  }
  @media (max-width: 768px) {
    > .item_qty_display {
      font-size: 1.5em;
    }
    > .item_qty_button {
      background-color: transparent;
      font-size: 2em;
      color: #5f5fce;
    }
  }
`;

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const ShoppingCart = ({ items, setItems, totalPrice }) => {
  const itemDeleteHandler = (id) => {
    setItems((state) =>
      state.map((el) => {
        if (el.uid === id) return { ...el, selected: 0 };
        else return el;
      })
    );
  };

  const quantityHandler = (id, flags) => {
    if (flags === 'plus') {
      setItems((state) =>
        state.map((el) => {
          if (el.uid === id && el.selected < el.qty)
            return { ...el, selected: el.selected + 1 };
          else return el;
        })
      );
    }
    if (flags === 'minus') {
      setItems((state) =>
        state.map((el) => {
          if (el.uid === id && el.selected > 1)
            return { ...el, selected: el.selected - 1 };
          else return el;
        })
      );
    }
  };

  return (
    <ShoppingCartWrapper>
      <div className="shopping_cart_title">장바구니</div>
      <div className="shopping_cart_contents">
        {items.map((el, idx) => {
          if (el.selected === 0) return null;
          return (
            <ShoppingCartItemWrapper key={idx.toString()}>
              <p className="cart_item_title">{el.name}</p>
              <p
                className="cart_max_qty_msg"
                style={{
                  visibility: `${
                    el.selected === el.qty ? 'visible' : 'hidden'
                  }`,
                }}
              >
                최대 수량입니다
              </p>
              <ItemQuantityWrapper>
                <button
                  className="item_qty_button minus"
                  onClick={() => quantityHandler(el.uid, 'minus')}
                >
                  −
                </button>
                <p className="item_qty_display">{el.selected}</p>
                <button
                  className="item_qty_button plus"
                  onClick={() => quantityHandler(el.uid, 'plus')}
                >
                  +
                </button>
              </ItemQuantityWrapper>
              <p className="cart_item_price">
                가격 {numberWithCommas(el.price)} 냥
              </p>
              <p className="cart_item_subtotal">
                합계 {numberWithCommas(el.price * el.selected)} 냥
              </p>
              <img
                className="cart_item_delete"
                onClick={() => itemDeleteHandler(el.uid)}
                src={deleteIcon}
                alt="삭제 아이콘"
              ></img>
            </ShoppingCartItemWrapper>
          );
        })}
      </div>

      {/* 모든 items.selected가 0이면 장바구니에 들어있는 물건이 없으므로 메시지 출력 */}
      {items.filter((el) => {
        if (el.selected !== 0) return el;
        else return null;
      }).length === 0 ? (
        <div className="shopping_cart_empty">
          <img
            className="cart_empty_icon"
            src={shoppingCartIcon}
            alt="쇼핑카트 아이콘"
          ></img>
          <div className="cart_empty_msg">장바구니에 물건을 넣어주세요</div>
        </div>
      ) : null}
      <div className="shopping_cart_total">
        장바구니 합계 {numberWithCommas(totalPrice)} 냥
      </div>
    </ShoppingCartWrapper>
  );
};

export default ShoppingCart;
