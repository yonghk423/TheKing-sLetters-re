import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const MainHotContainer = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 100%;
  padding: 4% 6% 6%;
  box-sizing: border-box;
  background-color: #d7dbd1;
  position: relative;
  .main__banner {
    width: 100%;
    box-sizing: border-box;
    > h2 {
      font-family: 'EBSHunminjeongeumSBA';
      font-size: 2rem;
      border-bottom: 2px solid #303030;
      margin: 0 0.8rem 1rem 0.8rem;
      letter-spacing: 3px;
    }
    .box {
      display: flex;
      position: relative;
      box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.3);
      width: 100%;
      height: 500px;
      border-radius: 5px;
      justify-content: center;
      align-items: center;
      background-color: #fafafa;
      cursor: pointer;
      transition: transform 0.5s;
      &:hover {
        transform: scale(1.1); /* 이미지 확대 */
        transition: transform 0.5s; /*  시간 설정  */
        > img {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-transition: all 0.45s ease;
          transition: all 0.45s ease;
          opacity: 0.1;
          width: 100%;
        }
        > .main__category > span {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-transition: all 0.45s ease;
          transition: all 0.45s ease;
          -webkit-transform: translateY(0);
          transform: translateY(0);
          opacity: 1;
        }
        > .main__bottom > h1 {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-transition: all 0.45s ease;
          transition: all 0.45s ease;
          -webkit-transform: translateY(0);
          transform: translateY(0);
          opacity: 1;
          margin-bottom: 1rem;
        }
        > .main__bottom > span {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-transition: all 0.45s ease;
          transition: all 0.45s ease;
          -webkit-transform: translateY(0);
          transform: translateY(0);
          opacity: 1;
          > .main_heart {
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            -webkit-transition: all 0.45s ease;
            transition: all 0.45s ease;
            -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
          }
        }
      }
      > img {
        max-width: 100%;
        height: 500px;
        background-size: cover;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        box-sizing: border-box;
        border-radius: 5px;
        z-index: 1;
        vertical-align: top;
        backface-visibility: hidden;
      }

      > .main__category {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        bottom: 6rem;

        > span {
          margin-right: 1rem;
          background-color: #fafafa;
          border: 1px solid #303030;
          box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
          border-radius: 5px;
          padding: 1.2% 2%;
          font-size: 1.3em;
          font-weight: bold;
          -webkit-transform: translateY(-100%);
          transform: translateY(-100%);
          opacity: 0;
          letter-spacing: 1px;
          &:last-child {
            margin-right: 0;
          }
        }
      }

      > .main__bottom {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
        bottom: -4rem;
        padding-left: 1.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        > h1 {
          font-size: 1.7rem;
          font-weight: bold;
          text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
          opacity: 0;
          letter-spacing: 1px;
          -webkit-transform: translateY(100%);
          transform: translateY(100%);
        }
        > span {
          font-size: 1.2rem;
          opacity: 0;
          letter-spacing: 1px;
          -webkit-transform: translateY(100%);
          transform: translateY(100%);
          position: absolute;
          top: 1rem;
          left: 2rem;
          right: 0;
          z-index: 1;
          bottom: 0;
          > .main_heart {
            margin-right: 0.5rem;
            opacity: 0;
            letter-spacing: 1px;
            -webkit-transform: translateY(100%);
            transform: translateY(100%);
          }
        }
      }
    }
    .slick-slide {
      background-color: transparent;
      box-sizing: border-box;
      width: 100%;
      padding: 1rem 0;
      > div {
        margin: 1.3rem;
      }
    }
    @media (max-width: 768px) {
      padding-bottom: 5rem;
    }

    /* 버튼 수정부분 */
    .slick-dots {
      bottom: -3rem;

      button {
        width: 1rem;
        height: 1rem;
        border: 0;
        border-radius: 50%;
        background-color: #fafafa;
        &::before {
          display: none;
        }
      }
      .slick-active {
        button {
          background-color: #303030;
        }
      }
    }

    /* 화살표 수정 부분 */
    .slick-arrow {
      position: absolute;
      transform: translateY(-50%);
      &::before {
        font-weight: bold;
        font-size: 50px;
        transition: all 0.4s;
      }
    }
    .slick-prev {
      left: 1.5rem !important;
      z-index: 1;
      &:hover {
        color: #fafafa;
        &::before {
          color: #303030;
        }
      }
    }
    .slick-next {
      right: 3.5rem !important;
      z-index: 1;
      &:hover {
        color: #fafafa;
        &::before {
          color: #303030;
        }
      }
    }
  }

  .custom-shape-divider-bottom-1636093019 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-bottom-1636093019 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 80px;
    transform: rotateY(180deg);
  }

  .custom-shape-divider-bottom-1636093019 .shape-fill {
    fill: #fafafa;
  }
`;
const settings = {
  //여기있는 settings값만 수정가능 'settings'자체를 수정할 순 없음
  dots: true, // 슬라이드 밑에 점 보이게
  infinite: true, // 무한으로 반복
  speed: 1000,
  autoplay: false,
  autoplaySpeed: 2000, // 넘어가는 속도
  slidesToShow: 3, // 4장씩 보이게
  slidesToScroll: 1, // 1장씩 뒤로 넘어가게
  centerMode: true,
  centerPadding: '0px',
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 1,
        infinite: true,
        dots: true,
        vertical: true,
      },
    },
  ],

  // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
};

const MainHot = ({ MainHotData }) => {
  const [HeartMainHot, setHeartMainHot] = useState([]);
  useEffect(() => {
    handleHeartMainHot();
  }, [MainHotData]);
  const handleHeartMainHot = () => {
    let mainData = MainHotData.sort((a, b) => b.heart - a.heart);
    let result = [];
    for (let i = 0; i < mainData.length; i++) {
      if (result.length !== 4) {
        result.push(mainData[i]);
      } else if (
        result.legth > 4 &&
        mainData[i].heart === mainData[i + 1].heart
      ) {
        result.push(mainData[i + 1]);
      }
    }
    setHeartMainHot(result);
  };
  const handleQuizClick = async (event) => {
    await axios
      .get(`https://api.thekingsletters.ml/quizzes`, {
        withCredentials: true,
      })
      .then((res) => {
        let allQuiz = res.data.data.quizList.filter((el) => el.id === event);
        if (allQuiz[0].id === event) {
          return axios.get(
            `https://api.thekingsletters.ml/quizzes/selectquiz/?quizId=${event}`
          );
        }
      });
  };

  return (
    <MainHotContainer>
      <div className="main__banner">
        <h2>조회수 多</h2>
        <Slider {...settings}>
          {HeartMainHot.map((el, i) => {
            return (
              <Link to={`/quizsolve/${el.id}`} key={i}>
                <div
                  className="box hover"
                  onClick={() => handleQuizClick(el.id)}
                >
                  <img src={el.thumbnail} alt="img" />
                  <div className="main__category">
                    <span>{el.categories[0].category}</span>
                    <span>{el.quiz_types[0].quizContent.quizType}</span>
                    <span>{el.answer_types[0].answerContent.answerType}</span>
                    <span>{el.rewardPoint}냥</span>
                  </div>
                  <div className="main__bottom">
                    <h1>{el.title}</h1>
                    <span>
                      <FontAwesomeIcon
                        className="main_heart"
                        icon={faHeart}
                      ></FontAwesomeIcon>
                      <strong>{el.heart}</strong>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </Slider>
      </div>
      <div className="custom-shape-divider-bottom-1636093019">
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
    </MainHotContainer>
  );
};

export default MainHot;
