import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

// axios 기본값
axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

const FindContentsContainer = styled.div`
  font-family: 'EBSHMJESaeronRA';
  width: 100%;
  padding: 6% 6% 8% 6%;
  box-sizing: border-box;
  background-color: #fafafa;
  position: relative;

  > .find__title {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 1%;
    font-size: 1.8em;
    border-radius: 5px;
    background-color: #6b574f;
    padding-left: 1em;
    text-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
    letter-spacing: 3px;
    color: #fafafa;
    margin-top: 3em;
  }
  .paginationBtn {
    list-style: none;
    display: flex;
    justify-content: center;
    padding: 6rem 0 2rem;
  }
  .paginationBtn a {
    padding: 0.6rem;
    margin: 0.4rem;
    border-radius: 5px;
    border: 1.5px solid #303030;
    color: #303030;
    cursor: pointer;
    transition: all 0.4s;
    font-size: 1rem;
    &:hover {
      color: #fafafa;
      background-color: #303030;
    }
  }
  .paginationActive a {
    color: #fafafa;
    background-color: #303030;
  }

  @media (max-width: 768px) {
    .paginationBtn {
      width: 100%;
      list-style: none;
      display: flex;
      justify-content: center;
      padding: 3rem 0 2rem;
    }
    .paginationBtn a {
      padding: 0.4rem;
      margin: 0.3rem;
      border-radius: 5px;
      border: 1.2px solid #303030;
      color: #303030;
      cursor: pointer;
      transition: all 0.4s;
      font-size: 0.8rem;
    }
    .paginationActive a {
      color: #fafafa;
      background-color: #303030;
    }
  }
  .custom-shape-divider-top-1635519064 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .custom-shape-divider-top-1635519064 svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 50px;
    transform: rotateY(180deg);
  }

  .custom-shape-divider-top-1635519064 .shape-fill {
    fill: #d4cdc1;
  }
`;

const InputContainer = styled.div`
  margin-top: 3em;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding: 1%;
  padding-right: 1em;
  font-size: 1.5em;
  border-radius: 5px;
  background-color: #6b574f;
  width: 100%;
  z-index: 5;
  > input {
    width: inherit;
    font-family: 'EBSHMJESaeronRA';
    background-color: #fafafa;
    font-size: 1.2em;
    outline: none;
    border: 0;
    box-sizing: border-box;
    margin-left: 0.7em;
    letter-spacing: 1px;
    border-radius: 5px;
    &:focus-within {
      box-shadow: 5px 5px 1px rgba(0, 0, 0, 0.3);
    }
  }

  > button {
    font-family: 'EBSHMJESaeronRA';
    margin-left: auto;
    width: 10%;
    font-size: 1em;
    margin-left: 1em;
    padding: 0 0.5em;
    background-color: transparent;
    border: 1px solid #303030;
    box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    cursor: pointer;
    color: #303030;
    letter-spacing: 3px;
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
    transition: all 0.4s;
    box-sizing: border-box;
  }
  > button:hover {
    color: #fafafa;
    background-color: #303030;
  }

  @media (max-width: 768px) {
    > input {
      font-size: 0.8em;
      padding: 0.2em;
    }
    > button {
      padding: 0.2em;
      width: 15%;
      font-size: 15px;
    }
  }
  @media (max-width: 960px) {
    > input {
      font-size: 0.8em;
      padding: 0.2em;
    }
    > button {
      padding: 0.2em;
      width: 15%;
      font-size: 0.8em;
    }
  }
`;

const DropDownContainer = styled.ul`
  background-color: transparent;
  display: block;
  margin-top: -1px;
  padding: 0.5em 0;
  border: 1px solid rgb(223, 225, 229);
  border-radius: 0 0 5px 5px;
  box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
  z-index: 3;
  font-size: 1.2em;
  letter-spacing: 1px;
  > li {
    padding: 0 1.5em;
    margin-bottom: 0.4em;
    cursor: pointer;
  }
  &.active {
    display: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 1%;
  padding-right: 1.5em;
  margin-top: 4em;
  border-radius: 5px;
  background-color: #6b574f;
  z-index: 3;
  position: relative;
  > .user_profile_img {
    width: 50px;
    border-radius: 50%;
  }
  > .user_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1 auto;
    > .user {
      margin-left: 1em;
      font-size: 1.2em;
      color: #fafafa;
    }
    > .user_title {
      margin-left: 1em;
      font-size: 1.5em;
      color: #fafafa;
    }
    > .delete_btn {
      font-family: 'EBSHMJESaeronRA';
      font-size: 1em;
      margin-left: auto;
      padding: 0.5em;
      background-color: transparent;
      border: 1px solid #303030;
      box-shadow: 3px 3px 1px rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      cursor: pointer;
      color: #303030;
      letter-spacing: 3px;
      text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.2);
      transition: all 0.4s;
      box-sizing: border-box;
      &:hover {
        color: #fafafa;
        background-color: #303030;
      }
    }
  }

  @media (max-width: 768px) {
    .user_info {
      font-size: 0.7em;
      > .user {
        margin-left: 0.8em;
        font-size: 1em;
        letter-spacing: 0;
        width: 120px;
      }
      > .user_title {
        margin-left: 0.5em;
        font-size: 1.2em;
      }
      > .delete_btn {
        z-index: 5;
        width: 71px;
      }
    }
    .user_title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
const FindContents = ({
  validQuiz,
  isLogin,
  setValidQuiz,
}) => {
  const deselectedOptions = [];
  const nameFiltered = validQuiz.map((el) => el.user.name);
  const titleFiltered = validQuiz.map((el) => el.title);
  deselectedOptions.push(...nameFiltered, ...titleFiltered);
  const [hasText, setHasText] = useState(false);
  const [inputValue, setInputVaule] = useState('');
  const [options, setOptions] = useState(deselectedOptions);
  const [find, setFind] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);
  const [FindOne, setFindOne] = useState(deselectedOptions);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputValue === '') {
      // 렌더링 -> effect() -> inputValue 변경 -> 렌더링 -> effect()
      setHasText(false);
      setOptions(deselectedOptions);
    }
    setFindOne(validQuiz);
  }, [inputValue]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputVaule(value); // MEMO: 비동기 작업

    // MEMO: setInputVaule() 보다 먼저 실행될 수 있음!
    const filteredOptions = deselectedOptions.filter((option) => {
      for (let c of value) {
        if (
          option.includes(c.toLowerCase()) ||
          option.includes(c.toUpperCase())
        )
          return true;
      }
      return false;
    });

    setOptions(filteredOptions);
    setHasText(true);
  };

  const handleDropDownClick = (clickedOption) => {
    setInputVaule(clickedOption);

    const filteredOptions = deselectedOptions.filter((option) => {
      for (let c of clickedOption) {
        if (
          option.includes(c.toLowerCase()) ||
          option.includes(c.toUpperCase())
        )
          return true;
      }
      return false;
    });

    const targetIndex = filteredOptions.indexOf(clickedOption);

    setOptions([
      filteredOptions[targetIndex],
      ...filteredOptions.slice(0, targetIndex),
      ...filteredOptions.slice(targetIndex + 1),
    ]);
    const dropDown = document.querySelector('.dropdown__container');
    dropDown.classList.add('active');
  };

  const FilteredButtonClick = () => {
    const findUser = validQuiz.filter((el) => el.user.name === inputValue);
    const findTitle = validQuiz.filter((el) => el.title === inputValue);
    if (findUser.length === 0 && isFiltered === false) {
      setFindOne(findTitle);
    }
    if (findTitle.length === 0 && isFiltered === false) {
      setFindOne(findUser);
    }
    setIsFiltered(!isFiltered);
  };

  const deleteQuiz = async (value, i) => {
    if (isLogin) {
      await axios
        .delete('/admin/deletequiz', {
          data: { quizId: value },
        })
        .then(() => {
          const del = validQuiz.filter((el) => el.id !== value);
          setValidQuiz(del);
        });
    }
  };

  // 페이지네이션 구현
  const max_contents = 5;
  const pageVisited = find * max_contents;
  const pageCount = Math.ceil(validQuiz.length / max_contents);
  const changePage = ({ selected }) => {
    setFind(selected);
  };
  const displayContents = validQuiz
    .slice(pageVisited, pageVisited + max_contents)
    .map((el, i) => {
      return (
        <UserInfo key={i}>
          <img
            className="user_profile_img"
            src={el.thumbnail}
            alt="profile_image"
          ></img>
          <div className="user_info">
            <div className="user">
              <div className="user_id">
                사용자 ID: <span>{el.user.email}</span>
              </div>
              <div className="user_name">
                이름: <span>{el.user.name}</span>
              </div>
            </div>
            <div className="user_title">{el.title}</div>
            <button className="delete_btn" onClick={() => deleteQuiz(el.id, i)}>
              삭제하기
            </button>
          </div>
        </UserInfo>
      );
    });

  const displayFind = FindOne.map((el, i) => {
    return (
      <UserInfo key={i}>
        <img
          className="user_profile_img"
          src={el.thumbnail}
          alt="profile_image"
        ></img>
        <div className="user_info">
          <div className="user">
            <div className="user_id">
              사용자 ID: <span>{el.user.email}</span>
            </div>
            <div className="user_name">
              이름: <span>{el.user.name}</span>
            </div>
          </div>
          <div className="user_title">{el.title}</div>
          <button className="delete_btn" onClick={() => deleteQuiz(el.id, i)}>
            삭제하기
          </button>
        </div>
      </UserInfo>
    );
  });

  return (
    <FindContentsContainer>
      <div className="find__title">전체 게시글</div>
      <InputContainer>
        <input
          type="search"
          name="search_NT"
          value={inputValue}
          onChange={handleInputChange}
          ref={inputRef}
          onFocus={(e) => (e.target.placeholder = '')}
          onBlur={(e) =>
            (e.target.placeholder = ' 이름 또는 제목을 검색하세요.')
          }
          placeholder=" 이름 또는 제목을 검색하세요."
        />
        <button onClick={FilteredButtonClick}>검색</button>
      </InputContainer>
      {hasText && (
        <DropDown options={options} handleComboBox={handleDropDownClick} />
      )}
      {isFiltered === false ? displayContents : displayFind}
      <ReactPaginate
        previousLabel={'이전'}
        nextLabel={'다음'}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={'paginationBtn'}
        previousLinkClassName={'previousBtn'}
        nextLinkClassName={'nextBtn'}
        disabledClassName={'paginationDisabled'}
        activeClassName={'paginationActive'}
      />
      <div className="custom-shape-divider-top-1635519064">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </FindContentsContainer>
  );
};

const DropDown = ({ options, handleComboBox }) => {
  return (
    <DropDownContainer className="dropdown__container">
      {options.map((option, i) => (
        <li key={i} onClick={() => handleComboBox(option)}>
          {option}
        </li>
      ))}
    </DropDownContainer>
  );
};

export default FindContents;
