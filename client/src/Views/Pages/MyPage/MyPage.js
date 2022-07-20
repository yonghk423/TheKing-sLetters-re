import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog } from "@fortawesome/free-solid-svg-icons";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import Modal6 from './RankModal'
import DeleteApproveModal from './DeleteApproveModal';
import { Link } from 'react-router-dom';
import { useUserState } from "../../../context/UserContext";
import MyPageModal from "../../Modals/MyPageModal";

// axios 기본값 설정
axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

// 콘솔로그 표시 온오프
const DEBUG_MODE = true;

//----------------첫번째 박스-----------------------------------
const FirstBox = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;

#modal_mypage {
    position: relative;
    
> button {
      position: absolute;
      left: 0;
      opacity: 0;
    }
> button:hover {
      cursor: pointer;
    }
  }

> .title {
  font-family: 'EBSHMJESaeronRA';
  padding-top: 3%;
  padding-left: 0.1%;
  padding-right: 0.1%;
  border-bottom: 2px solid #303030;
  margin-left: 2%;
  margin-bottom: 1%;
  font-size: 2rem;
  letter-spacing: 3px;
  @media (max-width: 980px) {
    margin-left: 4%;
  }
  @media (max-width: 783px) {
    margin-left: 8%;
  }
}

> .setting {
  padding-top: 3%;
  padding-left: 0.7%;
  padding-right: 0.5%;
  margin-bottom: 1%;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all .2s ease;
    &:hover{
    color: #5E5E5E;
  }
}
`;

//----------------두번째 박스-----------------------------------
const SecondBox =styled.div`
width: 100%;
display: flex;
justify-content: flex-start;
position: relative;

> img {
  max-width: 20rem;
  max-height: 20rem;
  object-fit: contain;
}

> .profile {
    width: 7rem;
    height: 7rem;
    outline: 3px solid rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;
    align-items: center;
    margin: 1rem 1rem 1rem 2.5rem;
  }
  
  > .profileData { 
    font-family: 'EBSHMJESaeronRA';
    margin: 1rem;
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    letter-spacing: 2px;
    > h2 {
    font-size: 1.2rem;
    padding: 5px 0px 5px 0px;
    &:last-child{
      border-bottom: 1px solid #303030;
    }
  }
}
  
  > .class {
    display: flex;
    justify-content:center;
    align-items: center;
    padding-top: 2%;
  padding-left: 0.7%;
  padding-right: 0.5%;
  margin-bottom: 2%;
    > .openModalBtn {
    cursor: pointer;
    transition: all .2s ease; 
    background-color: transparent;
    font-size: 0.7rem;
      &:hover{
    color: #5E5E5E;
      }
    }
  }
`;
//------------아코디언 박스(보유 마일리지, 구매내역, 내가 만든 문제)---------------------------------------------------------------------

const Ul = styled.ul`
  font-family: 'EBSHMJESaeronRA';
  display: flex;
  flex-direction: column;
  padding: 1% 1.7%;
  padding-bottom: 5rem;
`;

const Li = styled.li`
> .checkbox {  
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

//보유 마일리지, 구매내역, 내가 만든 문제 탭버튼
> .tab {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5% 0;
  border: 1px solid rgba(209,213,218,0.5);
  background-color: rgba(209,213,218,0.5);
  border-radius: 5px;
  color: #303030;
  cursor: pointer;
  letter-spacing: 3px;
  position: relative;
  transition: all .4s ease;
 
  @media (max-width: 768px){
    padding: 0.5rem 0;
  }

  > div {
    font-size: 1rem;
    display: flex;
    @media (max-width: 460px) {
      font-size: 0.6rem;
    }
  }
  > .mileage-title {
    margin-left: 1em;
  }
  > .mileage {
    margin-left: 1em;
  }

  > .mileage-store {
    margin-left: auto;
    margin-right: 1em;
  }

  > .purchase-history {
    margin-left: 1em;
  }

  > .created-problem {
    margin-left: 1em;
  }
}

> .tab:hover {
  background: #8CA1A5;
}

/* ----------------------상품 목록------------------------ */

> .itemListContainer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  padding: 0;
  max-height: 0;
  background: rgba(209,213,218,0.5);
  overflow: hidden;
  transition: all .4s ease;
  > div { 
    overflow: auto;
    display: flex;
    padding: 1% 0 2% 0;

   
  //------------------------------상품 내역--------------------------
>  .buyItemsBox {
  padding: .5rem 0;
  padding-left: 0.6rem;
  letter-spacing: 3px;
  > .itemImage{
    position: relative;
    width: 250px;
    height: 250px;
    margin: 1rem;
    background-color: transparent;
    > a > img{
      border-radius: 5px;
      box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
    }
  }

  > .itemName {
    text-align: center;
    font-size: 1.4rem;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
    margin-bottom: .3rem;
  }

  > .cost {
    text-align: center;
    font-size: 1rem;
    margin-bottom: .3rem;
  }

  > .quantity {
    text-align: center;
    font-size: 1rem;
    margin-bottom: .3rem;
  }

  > .company {
    text-align: center;
    font-size: .8rem;
    margin-bottom: .8rem;
  }
}
  }
}

/* ----------------------구매 내역------------------------ */
> .purchasedContainer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  padding: 0;
  /* max-height: 0; */
  background: rgba(209,213,218,0.5);
  overflow: hidden;
  transition: all .4s ease;
  > div { 
    overflow: auto;
    display: flex;
    padding: 1% 0 2% 0;
  > .itemBox{
    padding: 1rem 0;
    padding-left: 0.6rem;
    letter-spacing: 3px;
    > .itemImage {
    position: relative;
    width: 250px;
    height: 250px;
    margin: 1rem;
    background-color: transparent;
    border-radius: 5px;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
}

  > .itemName {
    text-align: center;
    font-size: 1.4rem;
    text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
    margin-bottom: .3rem;
  }

  > .company {
    text-align: center;
    font-size: .8rem;
    margin-bottom: .3rem;
  }

  > .deadline {
    text-align: center;
    font-size: 1rem;
    margin-bottom: .3rem;
  }

  > .barcodeNum { 
    text-align: center;
    font-size: 1rem;
  }

 
  }

  }
}

> .emptyPurchasedContainer {
  display: block;
  justify-content: space-between;
  margin-bottom: 1em;
  padding: 0;
  /* max-height: 0; */
  background: rgba(209,213,218,0.5);
  overflow: hidden;
  transition: all .4s ease;
  > div { 
    overflow: auto;
    display: flex;
    padding: 5.5% 0 5.5% 0;
 
    > .emptyUsedItem {
      display: block;
      margin: 0 auto;
      margin-top: 2em;
      margin-bottom: 2em;
      font-size: 2em;
      color: #808e95;
    }
  }
    }


/* ----------------------내가 만든 퀴즈---------------------- */

  > .madeQuizContainer {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
    padding: 0;
    /* max-height: 0; */
    background: rgba(209,213,218,0.5);
    overflow: hidden;
    transition: all .4s ease;
    > .quiz_box_container { 
      overflow: auto;
      display: flex;
      padding: 1% 0 2% 0;
      > .quizBox {
        padding: 1% 0;
        padding-left: 0.6rem;
        position: relative;
        width: 276px;
        > button {
        position: absolute;
        top: 35px;
        right: 20px;
        font-size: 1rem;
        width: 20px;
        height: 20px;
        line-height: 18px;
        border: 1px solid #303030;
        border-radius: 5px;
        background-color: transparent;
        cursor: pointer;
        transition: all .4s ease;
        &:hover {
          color: #fafafa;
          background-color: #303030;
        }
        @media (max-width: 768px){
          width: 15px;
          height: 15px;
          top: 36px;
          font-size: .8rem;
          line-height: 0px;
        }
      }
      > .thumbnail {
      position: relative;
      width: 250px;
      height: 250px;
      margin: 1rem;
      background-color: transparent;
        > a > img{
          border-radius: 5px;
          box-shadow: 2px 2px 10px rgba(0,0,0,0.2);
        }
      }
      > .title {
        padding-left: 1.5rem;
        font-size: 1.4rem;
        text-shadow: 2px 2px 1px rgba(0,0,0,0.2);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

> .emptyMadeQuizContainer {
  display: block;
  justify-content: space-between;
  margin-bottom: 1em;
  padding: 0;
  /* max-height: 0; */
  background: rgba(209,213,218,0.5);
  overflow: hidden;
  transition: all .4s ease;
  > div { 
    overflow: auto;
    display: flex;
    height: 100px;
    padding: 5.5% 0 5.5% 0;
    > .emptyMadeQuiz {
      display: block;
      margin: 0 auto;
      margin-top: 1.5em;
      margin-bottom: 1.5em;
      font-size: 2em;
      color: #808e95;
    }
    > .emptyMadeQuiz:hover {
      color: #303030;
    }
    
    }
  }

> .checkbox:checked ~ .itemListContainer {  
  height: auto;
  max-height: 600px;
  transition: max-height 0.5s linear 0.25s;
}
> .checkbox:checked ~ .purchasedContainer {  
  height: auto;
  max-height: 600px;
  transition: max-height 0.5s linear 0.25s;
}
> .checkbox:checked ~ .emptyPurchasedContainer {  
  height: auto;
  max-height: 600px;
  transition: max-height 0.5s linear 0.25s;
}
> .checkbox:checked ~ .madeQuizContainer {  
  height: auto;
  max-height: 600px;
  transition: max-height 0.5s linear 0.25s;
}
> .checkbox:checked ~ .emptyMadeQuizContainer {  
  height: auto;
  max-height: 600px;
  transition: max-height 0.5s linear 0.25s;
}

> .checkbox:checked + .tab {  
  background-color: #738A90;
  padding: 0.5rem 0;
}
`;

const MyPage = (props) => {
  const userState = useUserState();
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    image: '',
    mileage: '',
  })
  const [deleteCheckOpen, setDeleteCheckOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState('')

  const [buyItems, setBuyItems] = useState([]);
  const [usedItems, setUsedItem] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  
  const deleteMyQuiz = async () => {
    await axios.delete(`/users/deletequiz?quizid=${selectedQuiz}`)
    .then( async () => {
      await axios.get("/mypublish")
      .then((response)=> {
        setQuiz(response.data.data.madeQuiz)
      })
    })
  };


  useEffect(() => {
    if(userState.isUserLoggedIn) {
      axios.get("/users/info") 
      .then((response) => {
        setUserData({
          email : response.data.data.userData.email,
          name : response.data.data.userData.name,
          image : response.data.data.userData.image,
          mileage : response.data.data.userData.mileage,
        })    
      });

      axios.get("/mypublish") 
      .then((response)=> {
        setQuiz(response.data.data.madeQuiz)
        DEBUG_MODE && console.log(response.data.data.madeQuiz)
      });

      axios.get("/myitems")
      .then((response) => {
        setUsedItem(response.data.data.userData.user_usedItems);
      });
      
      axios.get("/items/all")
      .then((response) => {
        DEBUG_MODE && console.log(response);
        DEBUG_MODE && console.log(response.data.data.itemList);
        setBuyItems(response.data.data.itemList);
      });
    }
  }, []);

  return (
    <>
      {deleteCheckOpen && <DeleteApproveModal setDeleteCheckOpen={setDeleteCheckOpen} deleteMyQuiz={deleteMyQuiz} />}
      {modalOpen && <Modal6 setOpenModal={setModalOpen} />}
      <FirstBox>
        <div className="title">내 정보</div>
        <div className="setting">
            <li>
              <div id="modal_mypage"><FontAwesomeIcon icon={faUserCog} size="2x" className="setting" />
              <MyPageModal /></div>
            </li>
        </div>
      </FirstBox>

      <SecondBox>
        {/* <div className='data1'> */}
          <img 
            className="profile"
            src={userData.image}
            alt="" />
        {/* </div> */}
        <div className='profileData'>
          <h2>ID: {userData.email}</h2>
          <h2>이름: {userData.name}</h2>
        </div>
        {/* <div className='data3'> */}
        <div className="class">
          <button
            className="openModalBtn"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <FontAwesomeIcon icon={faTrophy} size="4x" className="class" />
          </button>
        </div>  
      </SecondBox>

      <Ul>
        <Li>
            <input className="checkbox" type="checkbox"  id="section-1-radio"/>
            <label className="tab" for="section-1-radio" id="section-1-tab">
                <div className="mileage-title">보유 상평통보: </div>
                <div className="mileage">{userData.mileage} 냥</div>
                <div className="mileage-store">저잣거리 보기</div>
            </label>
            <div className="itemListContainer" >
              <div className="buyItems">
                {buyItems.length !== 0 ? (
                  <>
                  {buyItems.map((el)=>(
                    <div className="buyItemsBox">
                      <div className="itemImage">
                        <Link to="/mileageshop" ><img src={el.itemImage} alt="items"/></Link>
                      </div>
                      <div className="itemName">{el.itemName}</div>
                      <div className="cost">가격: {el.cost} 냥</div>
                      <div className="quantity">재고: {el.quantity} 개</div>
                      <div className="company">(주) {el.company}</div>
                    </div>
                  ))}
                  </>
                ) : (
                  <>
                  <div>
                    상품이 존재하지 않습니다.
                  </div>
                  </>
                )}
              </div>               
            </div>
        </Li>
        <Li>
            <input className="checkbox" type="checkbox"  id="section-2-radio"/>
            <label className="tab" for="section-2-radio" id="section-2-tab">
                <div className="purchase-history">구매 내역</div>
            </label>
            <div className={usedItems.length !== 0 ? "purchasedContainer" : "emptyPurchasedContainer"} id="section-2-panel">
              <div className="usedItems">
                {usedItems.length !== 0 ? (
                  <>
                  {usedItems.map((el) => (
                    <div className="itemBox">
                    <img className="itemImage" src={el.usedItem.itemImage} alt="itemImg"></img>
                    <div className="itemName">{el.usedItem.itemName}</div>
                    <div className="company">(주) {el.usedItem.company}</div>
                    <div className="deadline">사용기간: {el.usedItem.deadline}</div>
                    <div className="barcodeNum">인증번호: {el.usedItem.barcodeNum}</div>
                    </div>
                  ))
                  }
                  </>
                ) : (
                  <>
                    <div className="emptyUsedItem">
                      상품이 존재하지 않습니다.
                    </div>
                  </>
                )}
              </div>             
            </div>
        </Li>
        <Li>
            <input className="checkbox" type="checkbox" id="section-3-radio"/>
            <label className="tab" for="section-3-radio" id="section-3-tab">
                <div className="created-problem">내가 만든 문제</div>
            </label>
            <div className={quiz.length !== 0 ? "madeQuizContainer" : "emptyMadeQuizContainer"} id="section-3-panel">
              <div className="quiz_box_container">
                {quiz.length !== 0 ?
                <>
                  {quiz.map((el)=>
                  <div className="quizBox">
                    <button onClick={() => { setSelectedQuiz(el.id); setDeleteCheckOpen(true) }}>&times;</button>
                      <div className="thumbnail">
                        <Link to={`/quizsolve/${el.id}`}>
                          <img  className="thumbnail__img" src={el.thumbnail} alt="thumbnail"></img> 
                        </Link>
                      </div>
                    <div className="title">{el.title}</div>   
                  </div>
                  )}
                </>
                :
                <>
                  <Link to='/quizpost' className="emptyMadeQuiz">문제 만들러 가기</Link>
                </>
                }
              </div>
            </div>
        </Li>
      </Ul>
    </>
  )
}

export default MyPage;