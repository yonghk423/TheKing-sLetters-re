import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { useUserDispatch, useUserState } from "../../../context/UserContext";
import EmailExistModal from './EmailExistModal'

const Div = styled.div`
position: fixed;
z-index: 999;
top: 0;
left: 0;
bottom: 0;
right: 0;
background-color: white;
display: grid;
place-items: center;
.moving {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background:  url('https://cdn.discordapp.com/attachments/830706676852064307/900914511006027826/115517_5bbc1895b0215-removebg-preview.png') 0 top / 120% repeat-x;
    background-size: 50% 100%;
    animation: movebg 40s linear infinite;
}
`;

const GithubAuth = () => {
  const dispatch = useUserDispatch();
  const [isExist, setIsExist] = useState(false);

  useEffect( async () => {
    const url = new URL(window.location.href)
    if(url.searchParams.get('code')) {
      const authorizationCode = url.searchParams.get('code')
      await axios.get(`https://api.thekingsletters.ml/auth/git?code=${authorizationCode}`)
      .then((res) => {
        const userData = res.data.data.userData;
        dispatch({type: "USER_LOGIN"});
        dispatch({
          type: "SET_USER_DATA",
          userData: {
            email: userData.email || "0",
            gender: userData.gender || "0",
            image: userData.image || "0",
            mobile: userData.mobile || "0",
            name: userData.name || "",
            mileage: userData.mileage || "0",
            rank: userData.rank || "0",
            createdAt: userData.createdAt || "0",
            updatedAt: userData.updatedAt || "0"
          }
        });
        window.location='/'
      })
      .catch(() => setIsExist(true))
    }
  }, [])
  
  return (
      <Div>
        {isExist && <EmailExistModal setIsExist={setIsExist} />}
        <div className="moving"></div>
      </Div>
  )
}
      
  

export default GithubAuth;
