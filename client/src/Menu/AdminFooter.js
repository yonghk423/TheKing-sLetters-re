import React from 'react';
import styled from 'styled-components';

const AdminFooterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #4d3e3d;
  padding: 8px 20px;
  font-family: 'EBSHunminjeongeumSBA';
  > .masterLogin .modal_button button {
    font-family: 'EBSHunminjeongeumSBA';
    padding: 8px 18px;
    transition: all 0.4s ease;
  }
  > .masterLogin .modal_button button:hover {
    cursor: pointer;
    color: #fafafa;
  }
  > .admin__footer__logo {
    font-size: 24px;
    > a {
      color: #fafafa;
    }
  }

  @media (max-width: 768px) {
    padding: 8px 14px;
    > .admin__footer__logo {
      font-size: 20px;
    }
    > .masterLogin .modal_button button {
      padding: 8px 14px;
    }
    > .footer__logo {
      font-size: 1.5em;
    }
  }
`;

const AdminFooterGithub = styled.ul`
  font-family: 'EBSHMJESaeronRA';
  display: flex;
  margin-left: auto;
  cursor: pointer;
  box-sizing: border-box;
  letter-spacing: -1px;

  > .admin__footer__user {
    padding: 8px 10px;
    font-size: 15px;
    text-align: center;

    > a {
      color: #fafafa;
      transition: all 0.3s;
    }
    > a:hover {
      color: #303030;
    }
  }
  @media (max-width: 768px) {
    > .admin__footer__user {
      font-size: 13px;
      text-align: left;
    }
  }
`;
const AdminFooter = () => {
  return (
    <AdminFooterContainer>
      <div className="admin__footer__logo">
        <a>나랏말싸미</a>
      </div>
      <li className="masterLogin">
        <div className="modal_button" id="modal_admin_signin_toggle"></div>
      </li>
      <AdminFooterGithub>
        <li className="admin__footer__user">
          <a href="https://github.com/yonghk423">김용희</a>
        </li>
        <li className="admin__footer__user">
          <a href="https://github.com/improvise0828">김범수</a>
        </li>
        <li className="admin__footer__user">
          <a href="https://github.com/Geonyeong-Son">손건영</a>
        </li>
        <li className="admin__footer__user">
          <a href="https://github.com/otter9459">이정훈</a>
        </li>
      </AdminFooterGithub>
    </AdminFooterContainer>
  );
};

export default AdminFooter;
