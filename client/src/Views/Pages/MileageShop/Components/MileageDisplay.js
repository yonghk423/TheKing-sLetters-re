import React from 'react';
import styled from 'styled-components';

const MileageDisplayWrapper = styled.div`
  margin: 1% 6% 1% 6%;
  display: flex;
  flex-direction: column;
  font-family: 'EBSHMJESaeronRA';
  letter-spacing: 3px;
  border: 1px solid #303030;
  border-radius: 6px;

  > .mileage_title {
    background-color: #b6c3b6;
    font-size: 1.5em;
    padding: 0.7% 1% 0.7% 1%;
    border-radius: 6px 6px 0 0;
  }
  > .mileage_contents {
    display: flex;
    flex-direction: row;
    padding: 2em 0;
  }
`;

const MileageCategoryWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 1.5%;
  > .mileage_cat_name_1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 1% 0% 0% 0%;
    font-size: 1.8em;
    font-weight: 500;
    text-align: right;
  }
  > .mileage_cat_name_2 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 1.4em;
    text-align: right;
  }
  > .mileage_cat_name_3 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 1.4em;
    text-align: right;
  }
  @media (max-width: 768px) {
    > .mileage_cat_name_1 {
      font-size: 18px;
      letter-spacing: 0;
    }
    > .mileage_cat_name_2 {
      font-size: 12px;
      letter-spacing: 0;
    }
    > .mileage_cat_name_3 {
      font-size: 12px;
      letter-spacing: 0;
    }
  }
  @media (max-width: 480px) {
    > .mileage_cat_name_1 {
      font-size: 14px;
      letter-spacing: 0;
    }
    > .mileage_cat_name_2 {
      font-size: 12px;
      letter-spacing: 0;
    }
    > .mileage_cat_name_3 {
      font-size: 12px;
      letter-spacing: 0;
    }
  }
`;

const MileageValueWrapper = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-right: 1.5%;
  > .mileage_val_name_1 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 1.8em;
    font-weight: 500;
    text-align: right;
  }
  > .mileage_val_name_2 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 1.4em;
    text-align: right;
  }
  > .mileage_val_name_3 {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    padding: 3% 0% 0% 0%;
    font-size: 1.4em;
    text-align: right;
  }
  @media (max-width: 768px) {
    > .mileage_val_name_1 {
      font-size: 18px;
      letter-spacing: 0;
    }
    > .mileage_val_name_2 {
      font-size: 12px;
      letter-spacing: 0;
    }
    > .mileage_val_name_3 {
      font-size: 12px;
      letter-spacing: 0;
    }
  }
  @media (max-width: 480px) {
    > .mileage_val_name_1 {
      font-size: 14px;
      letter-spacing: 0;
    }
    > .mileage_val_name_2 {
      font-size: 12px;
      letter-spacing: 0;
    }
    > .mileage_val_name_3 {
      font-size: 12px;
      letter-spacing: 0;
    }
  }
`;

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const MileageDisplay = ({ userInfo, totalPrice }) => {
  return (
    <MileageDisplayWrapper>
      <div className="mileage_title">내 돈주머니</div>
      <div className="mileage_contents">
        <MileageCategoryWrapper>
          <div className="mileage_cat_name_1">사용가능한 상평통보</div>
          <div className="mileage_cat_name_2">장바구니 합계</div>
          <div className="mileage_cat_name_3">사용 후 상평통보</div>
        </MileageCategoryWrapper>
        <MileageValueWrapper>
          <p className="mileage_val_name_1">
            {numberWithCommas(userInfo.mileage)} 냥
          </p>
          <p className="mileage_val_name_2">
            {totalPrice === 0 ? "" : "−"} {numberWithCommas(totalPrice)} 냥
          </p>
          <p className="mileage_val_name_3">
            {numberWithCommas(userInfo.mileage - totalPrice)} 냥
          </p>
        </MileageValueWrapper>
      </div>
    </MileageDisplayWrapper>
  );
};

export default MileageDisplay;
