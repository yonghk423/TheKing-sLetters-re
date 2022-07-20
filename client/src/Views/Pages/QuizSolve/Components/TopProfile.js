import styled from "styled-components";
import RecommendMessage from "./RecommendMessage";
import profileIcon from "../Assets/profile-1.png";
// import heartFullIcon from "../Assets/heart-full-1.svg";
import heartEmptyIcon from "../Assets/heart-empty-1.svg";
import exclamationIcon from "../Assets/exclamation-1.svg";

const TopProfileWrapper = styled.div`
	position: relative;
	width: auto;
	margin: 0 0 2rem 0;
  padding: 2% 15% 4% 15%;
  @media (max-width: 960px) {
    padding: 2% 7% 4% 7%;
  }
	font-size: 16px;
	display: flex;
	flex-direction: row;
	background-color: #d7dbd1;
	.custom-shape-divider-bottom-1636245050 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }
  .custom-shape-divider-bottom-1636245050 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 65px;
  }
  .custom-shape-divider-bottom-1636245050 .shape-fill {
    fill: #ffffff;
  }
  @media (min-width: 1024px) {
    .custom-shape-divider-bottom-1636245050 svg {
      height: 150px;
    }
  }
	> .user_profile_image_container {
		max-width: 8rem;
		max-height: 8rem;
		outline: 3px solid rgba(0, 0, 0, 0.1);
		background-color: rgba(0, 0, 0, 0.1);
		overflow: hidden;
		display: flex;
		align-items: center;
	}
	> .user_profile_image_container .user_profile_image {
		max-width: 100%;
		max-height: 100%;
	}
	> .user_info_container {
		margin: 0 0 0 1rem;
		display: flex;
		flex-direction: column;
		> .user_ranking {
			font-family: 'EBSHunminjeongeumSBA';
			font-size: 21px;
			> .ranking_circle {
				display: inline-block;
				width: 24px;
				height: 24px;
				background-color: rgba(0, 0, 0, 0.5);
				color: white;
				border-radius: 50%;
				text-align: center;
				font-size: 18px;
				line-height: 24px;
				margin: 0px 3px 5px 3px;
			}
		}
		> .user_name {
			border-bottom: 1px solid rgba(0, 0, 0, 0.5);
			padding: 5px 0px 5px 0px;
			font-family: 'EBSHunminjeongeumSBA';
			font-size: 21px;
		}
	}
	> .recommend_container {
		position: relative;
		margin: 2em 0 2em auto;
		/* flex 설정 */
		display: flex;
		flex-direction: row;
		> .recommend_icon {
			width: 1.5em;
			height: 1.5em;
		}
		> .recommend_icon:hover {
			cursor: pointer;
		}
		> .recommend_number {
			margin: 0 5px 0 5px;
			font-size: 18px;
			line-height: 18px;
		}

	}
	> .profile_please_login {
    font-family: 'EBSHunminjeongeumSBA';
    padding: 1rem 0 2rem 0;
		font-size: 16px;
		width: 100%;
		display: flex;
		flex-flow: row;
		gap: 5px;
		> img {
			margin: 0 10px 0 10px;
			width: 10%;
			max-width: 2rem;
		}
	}
	> .profile_please_login {
		border-radius: 1px;
		padding: 5% 0 5% 0;
		width: 100%;
		display: flex;
		flex-flow: row;
		gap: 1%;
		> img {
			margin: 0 1% 0 1%;
			width: 10%;
			max-width: 2rem;
		}
		> p {
			font-size: 18px;
      @media (max-width: 1024px) {
        font-size: 16px;
      }
      @media (max-width: 768px) {
        font-size: 14px;
      }
      @media (max-width: 480px) {
        font-size: 12px;
      }
		}
	}
`;

const TopProfile = ({quizData, userData, recommendHandler, isGuest}) => {
	return (
    <TopProfileWrapper>
			{/* 로그인 했다면 아래의 화면을 표시 */}
			{!isGuest ?
			<>
			<div className="user_profile_image_container">
				<img className="user_profile_image" src={userData.image} alt={profileIcon}></img>
			</div>
			<div className="user_info_container">
				<div className="user_ranking">전체 순위: <span className="ranking_circle">{userData.ranking}</span>위</div>
				<div className="user_name">이름: <span>{userData.name}</span></div>
			</div>
			
			<div className="recommend_container">
				<img src={heartEmptyIcon} className="recommend_icon" alt="추천 아이콘" onClick={() => recommendHandler()}></img>
				<p className="recommend_number">{quizData.howManyLikes}</p>
				<RecommendMessage />
			</div>
			</>
			: null}

			{/* 로그인 하지 않았다면 아래의 화면을 표시 */}
			{isGuest ?
			<div className="profile_please_login">
				<img src={exclamationIcon} alt="느낌표 아이콘"></img>
				<p>
					현재 <span style={{color: "blue"}}>로그인</span>상태가 아닙니다<br />
					문제의 <span style={{color: "blue"}}>정답</span>을 확인하려면 <span style={{color: "blue"}}>로그인</span> 해주세요
				</p>
			</div>
			: null}			
			{/* 프로필 삼각형 아이콘 */}
			<div className="custom-shape-divider-bottom-1636245050">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M649.97 0L550.03 0 599.91 54.12 649.97 0z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
		</TopProfileWrapper>
	);
};  

export default TopProfile;