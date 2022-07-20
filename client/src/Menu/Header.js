import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 유저 컨텍스트
import { useUserState } from '../context/UserContext';

const NavBar = styled.div`
  background-color: #d7dbd1;
  display: grid;
  grid-template-columns: max(10vw, 150px) 1fr max(10vw, 200px);
  justify-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 20px;
  font-family: 'EBSHunminjeongeumSBA';

  > .navbar__logo {
    font-size: 24px;
    > a {
      color: #000000;
    }
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    justify-items: end;
    > .navbar__logo {
      z-index: 1;
    }
  }
`;

const NavBarMenu = styled.ul`
  display: flex;
  padding-left: 0px;

  > li {
    padding: 8px 12px;
    text-align: center;
    transition: all 0.4s;
    > a {
      color: #000000;
      font-size: 15px;
      transition: all 0.4s;
    }
  }
  > li::after {
    content: '';
    width: 1px;
    height: 11px;
    position: absolute;
    top: 22px;
    margin-left: 10px;
    background-color: #000000;
  }
  > li:hover {
    background-color: #303030;
    border-radius: 4px;
    &::after {
      width: 0;
      height: 0;
    }
    > a {
      color: #fff;
    }
  }
  > li:last-child::after {
    width: 0;
    height: 0;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavBarUser = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1em;
  > .modal_button {
    border: 1px solid #303030;
    border-radius: 5px;
    padding: 8px 18px;
    font-size: 1em;
    > button,
    a {
      font-family: 'EBSHunminjeongeumSBA';
      font-size: 1em;
      color: black;
    }
    :hover {
      cursor: pointer;
      background-color: #303030;
      transition: all 0.4s;
      > button,
      a {
        cursor: pointer;
        color: #fff;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavBarToggle = styled.div`
  display: none;
  position: absolute;
  font-family: 'EBSHunminjeongeumSBA';
  top: 0;
  left: 0;
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Header = () => {
  /* 유저 컨텍스트 */
  const userState = useUserState();
  const handleButtonClick = () => {
    let nav = document.querySelector('nav');
    let menuBtn = document.querySelector('.menu-btn');
    nav.classList.toggle('nav-open');
    menuBtn.classList.toggle('close');
  };

  const handleLinkClick = () => {
    let nav = document.querySelector('nav');
    let menuBtn = document.querySelector('.menu-btn');
    nav.classList.toggle('nav-open');
    menuBtn.classList.toggle('close');
  };

  return (
    <div>
      <NavBar>
        <div className="navbar__logo">
          <Link to="/">나랏말싸미</Link>
        </div>
        <NavBarMenu className="navbar__menu">
          <li>
            <Link to="/main">소예담 학당</Link>
          </li>
          <li>
            <Link to="/quizpost">소예담 문제등록</Link>
          </li>
          <li>
            <Link to="/mynote">소예담 서재</Link>
          </li>
          <li>
            <Link to="/mileageshop">저잣거리</Link>
          </li>
        </NavBarMenu>
        <NavBarUser>
          {/* 로그인 조건부 렌더링 로그인했으면 내정보, 안했으면 회원가입 표시 display 속성으로 컨트롤하지 않으면 에러 발생*/}
          {!userState.isUserLoggedIn ?
          <>
          <div className="modal_button" id="modal_signin"></div>
          <div
            className="modal_button"
            id="modal_signup"
            style={{ display: userState.isUserLoggedIn ? 'none' : 'block' }}
          ></div>
          <li
            className="modal_button"
            style={{ display: userState.isUserLoggedIn ? 'block' : 'none' }}
          >
            <Link to="/mypage">내정보</Link>
          </li>
          </>
          : null}

          {/* 로그인 조건부 렌더링 로그인했으면 내정보, 안했으면 회원가입 표시 display 속성으로 컨트롤하지 않으면 에러 발생*/}
          {userState.isUserLoggedIn ?
          <>
          <li
            className="modal_button"
            style={{ display: userState.isUserLoggedIn ? 'block' : 'none' }}
          >
            <Link to="/mypage">내정보</Link>
          </li>
          <div
            className="modal_button"
            id="modal_signup"
            style={{ display: userState.isUserLoggedIn ? 'none' : 'block' }}
          ></div>
          <div className="modal_button" id="modal_signin"></div>
          </>
          
          : null}
        </NavBarUser>
      </NavBar>

      <NavBarToggle>
        <Nav className="nav">
          <MenuBtn className="menu-btn" onClick={handleButtonClick}>
            <div className="line line__1"></div>
            <div className="line line__2"></div>
            <div className="line line__3"></div>
          </MenuBtn>

          <NavLinks className="nav-links" onClick={handleLinkClick}>
            <Link to="/" className="title">
              나랏말싸미
            </Link>

            <li className="link">
              <Link to="/main">소예담 학당</Link>
            </li>
            <li className="link">
              <Link to="/quizpost">소예담 문제등록</Link>
            </li>
            <li className="link">
              <Link to="/mynote">소예담 서재</Link>
            </li>
            <li className="link">
              <Link to="/mileageshop">저잣거리</Link>
            </li>

            {/* 로그인 조건부 렌더링 로그인했으면 내정보, 안했으면 회원가입 표시 display 속성으로 컨트롤하지 않으면 에러 발생*/}
            {!userState.isUserLoggedIn ?
            <>
            <div className="modal_button" id="modal_signin_toggle"></div>
            <div
              className="modal_button"
              id="modal_signup_toggle"
              style={{ display: userState.isUserLoggedIn ? 'none' : 'flex' }}
            ></div>
            <li
              className="modal_button"
              style={{ display: userState.isUserLoggedIn ? 'flex' : 'none' }}
            >
              <Link to="/mypage">내정보</Link>
            </li>
            </>
            : null}

            {/* 로그인 조건부 렌더링 로그인했으면 내정보, 안했으면 회원가입 표시 display 속성으로 컨트롤하지 않으면 에러 발생*/}
            {userState.isUserLoggedIn ?
            <>
            <li
              className="modal_button"
              style={{ display: userState.isUserLoggedIn ? 'flex' : 'none' }}
            >
              <Link to="/mypage">내정보</Link>
            </li>
            <div
              className="modal_button"
              id="modal_signup_toggle"
              style={{ display: userState.isUserLoggedIn ? 'none' : 'flex' }}
            ></div>
            <div className="modal_button" id="modal_signin_toggle"></div>
            </>
            : null}
          </NavLinks>
        </Nav>
      </NavBarToggle>
      {/* <ModalController /> */}
    </div>
  );
};

const Nav = styled.nav`
  --transition-time: 500ms;
  position: relative;
  width: 500px;
  height: 100vh;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(20px);
  transform: translateX(-100%);
  transition: all 800ms cubic-bezier(0.8, 0, 0.33, 1);
  z-index: 4;

  a {
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: 3px;
    text-decoration: none;
    user-select: none;
    color: #fff;
    text-align: center;
  }

  &.nav-open {
    transform: translateX(0%);
    > .menu-btn {
      top: 5px;
      right: 5px;
    }
    > .nav-links li {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100vw;
  }
`;

const MenuBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  --icon-width: 25px;
  position: absolute;
  top: 10px;
  right: -35px;
  width: calc(var(--icon-width) + 25px);
  height: calc(var(--icon-width) + 25px);
  flex-direction: column;
  transition: all calc(100ms + var(--transition-time))
    cubic-bezier(0.8, 0, 0.33, 1.25);
  cursor: pointer;
  z-index: 10;
  width: 25px;
  height: 25px;
  &.close .line__1 {
    transform: rotate(45deg) translate(2px, -3px);
  }
  &.close .line__2 {
    transform: rotate(-45deg);
  }
  &.close .line__3 {
    transform: rotate(45deg) translate(-2px, 3px);
  }

  > .line {
    width: var(--icon-width);
    background: #000;
    height: 2px;
    margin: 3px 0;
    transition: all calc(var(--transition-time) + 100ms)
      cubic-bezier(0.9, 0, 0.33, 1);
  }

  > .line__1 {
    width: var(--icon-width);
    transform-origin: left;
  }
  > .line__2 {
    width: var(--icon-width);
    transform-origin: center;
  }
  > .line__3 {
    width: var(--icon-width);
    transform-origin: right;
  }
`;

const NavLinks = styled.ul`
  --link-height: 60px;
  position: relative;
  width: 100%;

  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: var(--link-height);
    list-style: none;
    opacity: 0;
    transform: translateX(-50%);
    transition: all var(--transition-time) cubic-bezier(0.8, 0, 0.33, 0.9);
    cursor: pointer;
    z-index: 8;

    &:hover {
      background-color: #222;
      transition: all 0.35s ease-in-out;
      > Link {
        color: #fff;
      }
    }
  }

  > .modal_button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: var(--link-height);
    > button,
    a {
      text-transform: uppercase;
      font-family: 'EBSHunminjeongeumSBA';
      font-size: 1.5rem;
      font-weight: 900;
      color: #fff;
    }
    > button:hover,
    a:hover {
      cursor: pointer;
    }
  }
  > .modal_button:hover {
    background-color: #222;
    transition: all 0.35s ease-in-out;
  }
  // 로그인 회원가입 버튼 위에 살짝 마진
  > .modal_button:first-of-type {
    margin: 2em 0 0 0;
  }

  > .title {
    position: absolute;
    top: -30%;
    left: 0;
    font-size: 50px;
    text-align: center;
    width: 100%;
    height: 60px;
    letter-spacing: 5px;
    color: #fff;
  }

  > li:nth-child(6) {
    margin-top: 8%;
  }
`;

export default Header;
