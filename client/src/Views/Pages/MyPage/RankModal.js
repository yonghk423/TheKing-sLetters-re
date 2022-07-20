import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import RankModalImg from './RankModalImg.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

// axios 기본값
axios.defaults.baseURL = `https://api.thekingsletters.ml`;
axios.defaults.withCredentials = true;

// 콘솔로그 표시 온오프
const DEBUG_MODE = true;

const ModalBackground = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.75);
  display: flex;
  justify-content: center;
  place-items: center;

> div {
  @media (max-width: 768px) {
      width: 30em;
    }
  width: 40em;
  
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;  
}
`;

const TitleCloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  > button {
  position: relative;
  bottom: 12px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  }
  `;

const Title = styled.div`
box-shadow: 3px 15px 5px grey;
display: inline-block;
  text-align: center;
  margin-top: 10px;  
  > h1 {
    font-family: 'EBSHMJESaeronRA';   
    font-size: 40px;
    margin: -5%;
    color: #263238;
  }

  > .classTitle {
    @media (max-width: 768px) {
      font-family: 'EBSHMJESaeronRA';
font-size: 19px;
position: relative;
left: -82px;
top: 25px;
    }
font-family: 'EBSHMJESaeronRA';
font-size: 19px;
position: relative;
left: -130px;
top: 25px;
  }

  > .nameTitle {
    @media (max-width: 768px) {
      font-family: 'EBSHMJESaeronRA';
font-size: 19px;
position: relative;
left: -10px;
top: 25px;
    }
font-family: 'EBSHMJESaeronRA';
font-size: 19px;
position: relative;
left: -30px;
top: 25px;     
  }

  > .mileageTitle {
    @media (max-width: 768px) {
font-family: 'EBSHMJESaeronRA';
font-size: 19px;
position: relative;
left: 115px;
top: 25px;
    }
font-family: 'EBSHMJESaeronRA';
font-size: 19px;
position: relative;
left: 165px;
top: 25px;     
  }
  
  > div {
    @media (max-width: 768px) {
      width: 29.5em;
    } 
    //scroll

    overflow: auto;
    height: 440px;
    width: 39em;
    border: 1px solid black;
    margin-top: 35px;
    margin-bottom: 10px;
    color: #263238;

   
    > div {
      @media (max-width: 768px) {
        font-size: 19px;
    }       
      font-family: 'EBSHMJESaeronRA';
      font-size: 25px;
      display: flex;
      justify-content: flex-start;
      > .class {
        letter-spacing : 3px;
        width: 5em;
        margin: 10px;
        margin-top: 1px;
        margin-right: 1.5em;
     }

     > .name {
      letter-spacing : 3px;
       margin: 10px;
       margin-top: 1px;
       margin-right: auto;
     }

     > .mileage {
       width: 3em;
       margin: 10px;
       margin-top: 1px;
       margin-left: 10px;
     }
   }    
  }
  `;
 
  const Footer = styled.div`
  flex: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  > .trueBtn {
  font-family: 'EBSHMJESaeronRA';
  width: 150px;
  height: 45px;
  margin-bottom: 20px;
  border: none;
  border: 1px solid rgba(77, 109, 254, 0.9);
  background-color: rgba(77, 109, 254, 0.9);
 
  color: white; 
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  font-size: 1.5em;
  position: relative;
  bottom: -20px;  
}
> .trueBtn:hover {
    border: 1px solid #0066ff;
    background-color: #0066ff;
  }

  `;

const AppBox = styled.div`
  > button {
  width: 200px;
  height: 40px;
  border: none;
  border-radius: 6px;
  background-color: #7fa57f;
  color: white;
  cursor: pointer;
  }
  `;  

const Modal6 = ({ setOpenModal }) => {
  const [rank, setRank] = useState([]);
  const [limit, setLimit] = useState(7);
  const [button, setButton] = useState(true);

  useEffect(() => {  
    axios.get(`/users/rank/?offset=0&limit=${limit}`
    ).then((response)  => {
      setRank(response.data.data.rankList);
    }).catch((err) => {
      DEBUG_MODE && console.log(err);
    });
   }, []);

   const moreData = () => {    
    setLimit(limit + 3)    
   }
   useEffect(() => {
    axios.get(`/users/rank/?offset=0&limit=${limit}`
    ).then((response) => {
     setRank(response.data.data.rankList);
     if(response.data.data.message) {
       setButton(false);
     }
    }).catch((err) => {
      DEBUG_MODE && console.log(err);
    });
  }, [limit])

  return (
    <ModalBackground>
      <div className="modalContainer">
      <TitleCloseBtn>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            &times;
          </button>
        </TitleCloseBtn>
        <Title>
          <h1>전체 랭킹</h1>
          <span className="classTitle">순위</span>
          <span className="nameTitle">이름</span>
          <span className="mileageTitle">마일리지</span> 
                   
          <div style={{backgroundImage: `url(${RankModalImg}`}}>
          {rank.map((el, i)=> 
            <div key={i}>
              <span className="class">{i+1}위</span>
              <span className="name">{el.name}</span>
              <span className="mileage">{el.mileage}</span>            
            </div>
          )}
          </div>  
        </Title>        
        <Footer>
            {
              button ?
          <button className='trueBtn'
            onClick={moreData}
            id="cancelBtn"
          >
            더보기
          </button>
          :
          <button className='falseBtn'
            onClick={moreData}
            id="cancelBtn"
          >
            
          </button>
             }          
          </Footer>
      </div>
      </ModalBackground>
  );
}


const RankModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <AppBox>
      <button
        className="openModalBtn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Open
      </button>
      {modalOpen && <Modal6 setOpenModal={setModalOpen} />}
    </AppBox>
  );
}

export default Modal6;