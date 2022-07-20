import React from 'react';
import styled from 'styled-components';

const CommentsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 2em 0 5em 0;
  font-family: 'EBSHMJESaeronRA';
  position: relative;
  box-sizing: border-box;
  background-color: #6f958f;

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

  @media (max-width: 768px) {
    h1 span {
      letter-spacing: 0;
    }
    h2 {
      letter-spacing: -3px;
      font-size: 2.3em;
    }
  }

  @media (max-width: 480px) {
    h1 span {
      font-size: 24px;
      letter-spacing: 0;
    }
    h2 {
      font-size: 18px;
      letter-spacing: -3px;
    }
  }

  .custom-shape-divider-bottom-1635145667 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-bottom-1635145667 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 50px;
  }

  .custom-shape-divider-bottom-1635145667 .shape-fill {
    fill: #fafafa;
  }
`;

const CommentBox = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-around;
  align-items: center;
  > div {
    border-radius: 5px;
    box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
    background-color: #fafafa;
    box-sizing: border-box;
    margin-left: 20px;
    color: #303030;
    margin: 0 1em;
    > .top {
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      > .img {
        float: left;
        background: url('https://cdn.discordapp.com/attachments/830706676852064307/901368456862117918/-_-001.png');
        width: 7em;
        height: 7em;
        background-size: cover;
        border-radius: 50%;
        padding: 1em;
        margin: 2em 1em 0 1em;
      }
      > h3 {
        float: left;
        font-size: 2em;
        margin-top: 0.5em;
      }
      > span {
        float: left;
        font-size: 1.5em;
      }
    }
    > p {
      margin: 1.2em 1em;
      font-size: 1.5em;
      line-height: 1.5em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 7;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    > h6 {
      font-size: 1.5em;
      margin-left: 1.2em;
      margin-bottom: 1.2em;
      > span {
        margin-left: 1.2em;
      }
    }
  }
  @media (max-width: 1280px) {
    display: flex;
    width: 100%;
  }
  @media (max-width: 960px) {
    display: flex;
    width: 100%;
    > div {
      margin: 1em;
    }
    > div > p {
      -webkit-line-clamp: 6;
    }
    > div > h6 {
      font-size: 1.3em;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    > div {
      margin: 1em;
    }
    > div > p {
      -webkit-line-clamp: 5;
    }
  }
`;

const Comments = () => {
  return (
    <CommentsContainer>
      <div className="custom-shape-divider-bottom-1635145667">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <h1 className="h1 service__title">
        <span>나랏말싸미 유생들이</span>
      </h1>
      <h2 className="h2 contents">전해주는 생생한 입학 후기를 보아요!</h2>
      <CommentBox>
        <div>
          <div className="top">
            <div className="img"></div>
            <h3>한량서생</h3>
            <span>1526냥</span>
          </div>
          <p>
            다양한 한글 맞춤법을 알 수 있는 정말 좋은 플랫폼인 것 같아요! 문제를
            풀면 플랫폼 통화인 "냥"으로 포인트도 쌓을 수 있고 쌓은 포인트로 실제
            사용하능한 "쿠폰"으로 교환까지 되다니.. 정말 획기적인 플랫폼인 것
            같아요! sns에서 친구들과 소통하면서 종종 '이렇게 쓰는게 맞나?' 싶은
            것들이 많았는데 "나랏말싸미"를 이용하고 나서는 그런 고민 일절 하지
            않아요! 또 내가 알고 있는 지식을 문제 출제 기능을 통해서 다른 사람과
            공유하고 싶은 생각도 드네요!! 정말 좋아요!
          </p>
          <h6>
            내가 출제한 문제 수<span>45가름</span>
          </h6>
        </div>
        <div>
          <div className="top">
            <div className="img"></div>
            <h3>신사임당</h3>
            <span>5252냥</span>
          </div>
          <p>
            우선 직접 문제를 만들 수 있다는 점이 너무 신선하고 흥미로웠습니다!
            내가 누군가에게 지식을 전할 수 있고, 또 추천 기능 덕분에 제 문제가
            얼마나 사랑받고 있는지를 직접 눈으로 확인할 수 있어서 좋았어요!!
            그리고 모든 문제를 관리자분들이 검수하셔서 그런지 문제 퀄리티도 전부
            굉장히 좋은 것 같습니다! 덕분에 어디 가서 맞춤법으로 망신 당하는
            일이 없어졌어요! 덕분에 자신감도 뿜뿜한답니다! 하지 않아요! 또 내가
            알고 있는 지식을 문제 출제 기능을 통해서 다른 사람과 공유하고 싶은
          </p>
          <h6>
            내가 출제한 문제 수<span>32가름</span>
          </h6>
        </div>
        <div>
          <div className="top">
            <div className="img"></div>
            <h3>훈민정음</h3>
            <span>2854냥</span>
          </div>
          <p>
            내가 알고 있는 지식을 문제 출제 기능을 통해서 다른 사람과 공유하고
            문제를 풀면서 리워드를 제공받을 수 있다니. 정말 획기적인 것 같아요!
            요즘 유행하는 "play to earn" 이라는 개념을 도입해서 게임도하고
            열심히 모은 리워드로 실제 사용가능한 쿠폰으로 교환까지할 수 있다는
            점이 너무 매력적입니다. 게다가 한글도 더 알게 되고, 요즘 잘 안쓰는
            단어들은 어떻게 썼었는지 헷갈리는 경우가 많았는데 이 플랫폼으로
            공부도할 수 있어서 일석삼조 아닌가 싶은 생각도 합니다!
          </p>
          <h6>
            내가 출제한 문제 수<span>52가름</span>
          </h6>
        </div>
      </CommentBox>
    </CommentsContainer>
  );
};

export default Comments;
