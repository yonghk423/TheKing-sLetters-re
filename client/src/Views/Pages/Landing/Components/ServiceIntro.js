import React from 'react';
import styled from 'styled-components';
import './ServiceIntro.scss';
import QuizTest from './QuizTest.gif';
import QuizMake from './QuizMake.gif';
import QuizSave from './QuizSave.gif';
import Mileage from './Mileage.gif';

const ServiceIntroContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 2em 0;
  justify-content: space-evenly;
  box-sizing: border-box;
  background-color: #fafafa;
  flex-direction: column;
  font-family: 'EBSHMJESaeronRA';
  position: relative;

  > h1 {
    margin-top: 4em;
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
  @media (max-width: 1280px) {
    > h1 {
      margin-top: 3em;
    }
    > h1 span {
      font-size: 46px;
    }
    > h2 {
      font-size: 2.8em;
    }
  }
  @media (max-width: 960px) {
    > h1 {
      margin-top: 2.5em;
    }
    > h1 span {
      font-size: 40px;
    }
    > h2 {
      font-size: 2.5em;
    }
  }
  @media (max-width: 768px) {
    > h1 {
      margin-top: 2em;
      letter-spacing: -3px;
    }
    > h1 span {
      font-size: 32px;
    }
    > h2 {
      font-size: 2.2em;
    }
  }
  @media (max-width: 480px) {
    > h1 {
      margin-top: 1em;
      letter-spacing: -3px;
    }
    > h1 span {
      font-size: 24px;
    }
    > h2 {
      font-size: 1.2em;
    }
  }
`;

const BoxContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 3em 0;
  box-sizing: border-box;
  height: 70vh;
  background-color: #93aca0;
  @media (max-width: 1280px) {
    flex: 1 1 100%;
  }
  > .box {
    flex: 1;
    overflow: hidden;
    transition: 0.5s;
    margin: 0 0.5%;
    box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.3);
    line-height: 0;
    border-radius: 5px;
    background-color: #303030;
    &:hover {
      flex: 1 1 10%;
      > img {
        width: 100%;
        height: 100%;
      }
    }
  }
  > .box > img {
    width: 100%;
    height: calc(100% - 6vh);
    transition: 0.5s ease-in-out;
  }

  > .box > span {
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 3.8vh;
    display: block;
    text-align: center;
    color: #fff;
    height: 6vh;
    line-height: 1.8;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
    letter-spacing: 0;
  }
  @media (max-width: 768px) {
    > .box > span {
      font-size: 2.5vh;
      line-height: 2.5;
      letter-spacing: -1px;
    }
  }
`;

const TextContainer = styled.div`
  width: 100%;
  padding: 2em 0;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: #93aca0;
  &.active {
    display: flex;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0;
    }
    .service__title {
      font-size: 2.8em;
      font-weight: 900;
      letter-spacing: -1px;
    }
    .contents {
      font-size: 1.5em;
      letter-spacing: -1px;
    }
  }
  @media (max-width: 480px) {
    .container {
      padding: 0;
    }
    .service__title {
      font-size: 1.8em;
      font-weight: 600;
      letter-spacing: -1px;
    }
    .contents {
      font-size: 1.2em;
      letter-spacing: -1px;
    }
  }
`;

const ServiceIntro = () => {
  const handleMouseOver1 = () => {
    const hover1 = document.querySelector('.hov-ani1');
    const animated1 = hover1.getAttribute('data-animated');
    hover1.setAttribute('src', animated1);

    const problem1 = document.querySelector('.problem1');
    problem1.classList.add('active');
    const problem2 = document.querySelector('.problem2');
    problem2.classList.remove('active');
    const problem3 = document.querySelector('.problem3');
    problem3.classList.remove('active');
    const problem4 = document.querySelector('.problem4');
    problem4.classList.remove('active');
  };
  const handleMouseOver2 = () => {
    const hover2 = document.querySelector('.hov-ani2');
    const animated2 = hover2.getAttribute('data-animated');
    hover2.setAttribute('src', animated2);

    const problem1 = document.querySelector('.problem1');
    problem1.classList.remove('active');
    const problem2 = document.querySelector('.problem2');
    problem2.classList.add('active');
    const problem3 = document.querySelector('.problem3');
    problem3.classList.remove('active');
    const problem4 = document.querySelector('.problem4');
    problem4.classList.remove('active');
  };
  const handleMouseOver3 = () => {
    const hover3 = document.querySelector('.hov-ani3');
    const animated3 = hover3.getAttribute('data-animated');
    hover3.setAttribute('src', animated3);

    const problem1 = document.querySelector('.problem1');
    problem1.classList.remove('active');
    const problem2 = document.querySelector('.problem2');
    problem2.classList.remove('active');
    const problem3 = document.querySelector('.problem3');
    problem3.classList.add('active');
    const problem4 = document.querySelector('.problem4');
    problem4.classList.remove('active');
  };
  const handleMouseOver4 = () => {
    const hover4 = document.querySelector('.hov-ani4');
    const animated4 = hover4.getAttribute('data-animated');
    hover4.setAttribute('src', animated4);

    const problem1 = document.querySelector('.problem1');
    problem1.classList.remove('active');
    const problem2 = document.querySelector('.problem2');
    problem2.classList.remove('active');
    const problem3 = document.querySelector('.problem3');
    problem3.classList.remove('active');
    const problem4 = document.querySelector('.problem4');
    problem4.classList.add('active');
  };
  const handleMouseOut1 = () => {
    const hover1 = document.querySelector('.hov-ani1');
    const static1 = hover1.getAttribute('data-static');
    hover1.setAttribute('src', static1);
  };
  const handleMouseOut2 = () => {
    const hover2 = document.querySelector('.hov-ani2');
    const static2 = hover2.getAttribute('data-static');
    hover2.setAttribute('src', static2);
  };
  const handleMouseOut3 = () => {
    const hover3 = document.querySelector('.hov-ani3');
    const static3 = hover3.getAttribute('data-static');
    hover3.setAttribute('src', static3);
  };
  const handleMouseOut4 = () => {
    const hover4 = document.querySelector('.hov-ani4');
    const static4 = hover4.getAttribute('data-static');
    hover4.setAttribute('src', static4);
  };
  return (
    <ServiceIntroContainer>
      <div className="custom-shape-divider-bottom-1635122661">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <h1 id="1" className="h1 service__title">
        <span>나랏말싸미 유생이 되면,</span>
      </h1>
      <h2 className="h2 contents">아래과 같은 활동을 할 수 있어요!</h2>
      <BoxContainer>
        <div className="box">
          <img
            onMouseOver={handleMouseOver1}
            onMouseOut={handleMouseOut1}
            src="https://cdn.discordapp.com/attachments/830706676852064307/901416133486333992/003.png"
            alt=""
            data-animated={QuizTest}
            data-static="https://cdn.discordapp.com/attachments/830706676852064307/901416133486333992/003.png"
            className="hov-ani1"
          />
          <span>문 제 풀 이</span>
        </div>
        <div className="box">
          <img
            onMouseOver={handleMouseOver2}
            onMouseOut={handleMouseOut2}
            src="https://cdn.discordapp.com/attachments/830706676852064307/901416130562887690/001.png"
            alt=""
            data-animated={QuizMake}
            data-static="https://cdn.discordapp.com/attachments/830706676852064307/901416130562887690/001.png"
            className="hov-ani2"
          />
          <span>문 제 출 제</span>
        </div>
        <div className="box">
          <img
            onMouseOver={handleMouseOver3}
            onMouseOut={handleMouseOut3}
            src="https://cdn.discordapp.com/attachments/830706676852064307/901416134874628136/002.png"
            alt=""
            data-animated={QuizSave}
            data-static="https://cdn.discordapp.com/attachments/830706676852064307/901416134874628136/002.png"
            className="hov-ani3"
          />
          <span>문 제 보 관</span>
        </div>
        <div className="box">
          <img
            onMouseOver={handleMouseOver4}
            onMouseOut={handleMouseOut4}
            src="https://cdn.discordapp.com/attachments/830706676852064307/901776863947526144/004.png"
            alt=""
            data-animated={Mileage}
            data-static="https://cdn.discordapp.com/attachments/830706676852064307/901776863947526144/004.png"
            className="hov-ani4"
          />
          <span>마 일 리 지</span>
        </div>
      </BoxContainer>
      <TextContainer className="problem1">
        <div className="container">
          <h3 className="service__title">문제를 풀어보아요!</h3>
          <span className="contents">
            한글문제 풀이활동에 대한 재미 기능 제공
          </span>
          <span className="contents">
            한글문제 풀이활동에 대한 마일리지 제공
          </span>
          <span className="contents">
            한글문제 풀이활동에 대한 마일리지 별 랭킹 제공
          </span>
        </div>
      </TextContainer>
      <TextContainer className="problem2">
        <div className="container">
          <h3 className="service__title">문제를 만들어 보아요!</h3>
          <span className="contents">
            한글문제 생성활동에 대한 재미 기능 제공
          </span>
          <span className="contents">
            한글문제 생성활동에 대한 다양한 문제 출제 유형 제공
          </span>
          <span className="contents">
            한글 문제를 다양한 카테고리별로 출제하는 기능 제공
          </span>
        </div>
      </TextContainer>
      <TextContainer className="problem3">
        <div className="container">
          <h3 className="service__title">문제를 보관해 보아요!</h3>
          <span className="contents">
            한글문제 풀이활동에 대한 나만의 서재 기능 제공
          </span>
          <span className="contents">
            카테고리 별로 쉽게 분류할 수 있는 기능 제공
          </span>
          <span className="contents">
            문제를 풀면서 성취감을 자극시키는 효과 제공
          </span>
        </div>
      </TextContainer>
      <TextContainer className="problem4">
        <div className="container">
          <h3 className="service__title">마일리지를 쿠폰으로 바꿔요! </h3>
          <span className="contents">
            한글문제 풀이활동에 대한 마일리지 획득 시,
          </span>
          <span className="contents">쿠폰 교환기능 제공</span>
          <span className="contents">
            마일리지 보유 기준으로 랭킹 제도 제공
          </span>
        </div>
      </TextContainer>
    </ServiceIntroContainer>
  );
};

export default ServiceIntro;
