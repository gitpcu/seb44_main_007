import React, { useState } from 'react';
import {styled} from "styled-components";
import axios from 'axios';
import apiUrl from '../../../API_URL';
import dot from '../../../Images/dot.png';

const EditDelete = () => {
    //수정, 삭제 모달 열기
    const [EditDeleteModalIsOpen, setEditDeleteModalIsOpen] = useState(false);
    
    const openEditDeleteModal = () => {
        setEditDeleteModalIsOpen(true);
    };
    
    const closeEditDeleteModal = () => {
        setEditDeleteModalIsOpen(false);
    };
    
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    //수정 모달열기

    //삭제
    

    return (
        <EditDeleteContainer>
            <img src={dot} alt='수정/삭제' onClick={openEditDeleteModal}/>
            {EditDeleteModalIsOpen ? 
            <ModalBackdrop onClick={closeEditDeleteModal}>
                <ModalView onClick={handleModalClick}>
                <p>목표 지출 금액</p>
                <ModalInput>
                    <button>수정</button>
                    <button>삭제</button>
                </ModalInput>
                </ModalView>
            </ModalBackdrop> 
            : null}
        </EditDeleteContainer>
    )
}
export default EditDelete

const EditDeleteContainer = styled.div`
    display: flex;
    align-items: center;
    > img {
    filter: invert(69%) sepia(0%) saturate(201%) hue-rotate(210deg) brightness(93%) contrast(90%);
    width: 20px;
    cursor: pointer;
    }
`;

const ModalBackdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalView = styled.div.attrs(props => ({
  role: 'dialog'
}))`
  text-align: center;
  text-decoration: none;
  padding: 50px 70px;
  background-color: white;
  border-radius: 20px;
  color: rgb(34, 34, 31);
  z-index: 10000;

  >p{
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const ModalInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  >button {
    height: 40px;
    padding: 0 15px;
    margin-right: 10px;
    text-align: right;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    color: white;
    background-color: rgb(246, 111, 60);
  }  
`;