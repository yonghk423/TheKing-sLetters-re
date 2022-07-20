import styled from 'styled-components';
import profileIcon from '../Assets/profile-1.png';
import exclamationIcon from "../Assets/exclamation-1.svg";

const TopProfileTitle = styled.div`
  width: 100%;
  padding: 3% 6.2% 2% 6.2%;
  box-sizing: border-box;
  background-color: #d7dbd1;
  position: relative;
  .top__profile__title {
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 2rem;
    border-bottom: 2px solid #303030;
    letter-spacing: 3px;
  }
`;

const TopProfileWrapper = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: auto;
  padding: 2% 15% 4% 15%;
  @media (max-width: 960px) {
    padding: 2% 7% 4% 7%;
  }
  font-size: 16px;
  display: flex;
  flex-direction: row;
  background-color: #d7dbd1;

  > .user_profile_image_wrapper {
    width: 8rem;
    height: 8rem;
    outline: 1px solid rgba(0, 0, 0, 0.1);
    background-color: rgb(215 219 209);
    overflow: hidden;
    display: flex;
    align-items: center;
  }
  > .user_profile_image_wrapper .user_profile_image {
    max-width: 100%;
    max-height: 100%;
  }
  > .user_info_container {
		margin: 0 0 0 1rem;
		display: flex;
		flex-direction: column;
  }
  > .user_info_container .user_ranking {
    font-family: 'EBSHunminjeongeumSBA';
		font-size: 21px;
  }
  > .user_info_container .user_ranking .ranking_circle {
    display: inline-block;
    width: 24px;
		height: 24px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fafafa;
    border-radius: 50%;
    text-align: center;
    font-size: 18px;
		line-height: 24px;
    margin-right: 5px;
  }
  > .user_info_container .user_name {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    padding: 5px 0px 5px 0px;
    font-family: 'EBSHunminjeongeumSBA';
    font-size: 21px;
  }
  @media (max-width: 960px) {
    > .user_profile_image_wrapper {
      width: 6rem;
      height: 6rem;
    }
    > .user_info_container {
      letter-spacing: 1px;
      font-size: 1rem;
    }
    > .user_info_container .user_name {
      font-size: 1.2rem;
    }
  }
`;

const TopProfileContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
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
  > .profile_please_login {
    font-family: 'EBSHunminjeongeumSBA';
		font-size: 16px;
    height: 6rem;
		display: flex;
		flex-flow: row;
    align-items: center;
		gap: 5px;
    background-color: #d7dbd1;
    
		> img {
			margin: 0 10px 0 15%;
			width: 10%;
			max-width: 2rem;
      @media (max-width: 960px) {
        margin: 0 10px 0 10%;
      }
		}
	}
`;

const TopProfile = ({ userData, isGuest }) => {
  return (
    <TopProfileContainer>
      {/* 로그인 했다면 아래의 화면을 표시 */}
			{!isGuest ?
      <>
      <TopProfileTitle>
        <h2 className="top__profile__title">문제 등록</h2>
      </TopProfileTitle>
      <TopProfileWrapper>
        <div className="user_profile_image_wrapper">
          <img
            className="user_profile_image"
            src={userData.image || profileIcon}
            alt="profile_image"
          ></img>
        </div>
        <div className="user_info_container">
          <div className="user_ranking">
            전체 순위: <span className="ranking_circle">{userData.rank}</span>위
          </div>
          <div className="user_name">
            이름: <span>{userData.name}</span>
          </div>
        </div>
      </TopProfileWrapper>
      </>
      : null}

      {/* 로그인 하지 않았다면 아래의 화면을 표시 */}
			{isGuest ?
      <>
      <TopProfileTitle>
        <h2 className="top__profile__title">문제 등록</h2>
      </TopProfileTitle>
			<div className="profile_please_login">
				<img src={exclamationIcon} alt="느낌표 아이콘"></img>
				<p>
					현재 <span style={{color: "blue"}}>로그인</span>상태가 아닙니다<br />
					퀴즈를 <span style={{color: "blue"}}>등록</span>하시려면 <span style={{color: "blue"}}>로그인</span> 해주세요
				</p>
			</div>
      </>
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
    </TopProfileContainer>
  );
};

export default TopProfile;
