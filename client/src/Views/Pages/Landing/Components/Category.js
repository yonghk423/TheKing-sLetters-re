import React from 'react';
import styled from 'styled-components';
import './Category.scss';

const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 2em 0;
  font-family: 'EBSHMJESaeronRA';
  position: relative;
  box-sizing: border-box;
  background-color: #fafafa;
  > h1 {
    margin-top: 6em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    letter-spacing: 3px;
    > span {
      font-family: 'EBSHunminjeongeumSBA';
      font-size: 50px;
      font-weight: 900;
    }
  }

  > h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    letter-spacing: 3px;
    margin-bottom: 1.5em;
  }

  @media (max-width: 768px) {
    > h1 {
      font-size: 2em;
      margin-top: 2em;
      letter-spacing: -1px;
    }
    > h1 span {
      font-size: 2em;
    }
    > h2 {
      font-size: 2.2em;
      letter-spacing: -1px;
    }
  }
    @media (max-width: 480px) {
    > h1 {
      font-size: 16px;
      margin-top: 2em;
      letter-spacing: -1px;
    }
    > h1 span {
      font-size: 18px;
    }
    > h2 {
      font-size: 1.2em;
      letter-spacing: -1px;
    }
  }
`;
const Category = () => {
  return (
    <CategoryContainer>
      <div className="custom-shape-divider-bottom-1635076194">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <h1 className="h1 service__title">
        <span>나랏말싸미 소예담</span>에선,
      </h1>
      <h2 className="h2 contents">아래과 같은 과목들을 학습할 수 있어요!</h2>
      <div className="slider">
        <div className="slide-track">
          <div className="slide">
            <img src="https://cdn.discordapp.com/attachments/830706676852064307/901776476565807124/008.png" />
          </div>
          <div className="slide">
            <img src="https://cdn.discordapp.com/attachments/830706676852064307/901776488054030336/001.png" />
          </div>
          <div className="slide">
            <img src="https://cdn.discordapp.com/attachments/830706676852064307/901776498816589854/009.png" />
          </div>
          <div className="slide">
            <img src="https://cdn.discordapp.com/attachments/830706676852064307/901776508018913320/002.png" />
          </div>
          <div className="slide">
            <img src="https://cdn.discordapp.com/attachments/830706676852064307/901776526901661747/010.png" />
          </div>
          <div className="slide">
            <img src="https://cdn.discordapp.com/attachments/830706676852064307/901776537228042270/004.png" />
          </div>
          <div className="slide">
            <img src="https://cdn.discordapp.com/attachments/830706676852064307/901776576771919872/003.png" />
          </div>
          <div className="slide">
            <img src="https://cdn.discordapp.com/attachments/830706676852064307/901776586670473247/007.png" />
          </div>
          <div className="slide">
            <img src="https://cdn.discordapp.com/attachments/830706676852064307/901776601119875092/006.png" />
          </div>
          <div className="slide">
            <img src="https://cdn.discordapp.com/attachments/830706578578997268/901788695764566016/005.png" />
          </div>
        </div>
      </div>
    </CategoryContainer>
  );
};

export default Category;
