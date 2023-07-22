import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {styled} from "styled-components";
import { addAccountData } from '../../../Redux/submit_data_reducer';
import DropdownExpend from './category_dropdown_expend';
import DropdownProfit from './category_dropdown_profit';

import axios from 'axios'
import apiUrl from '../../../API_URL';

const SubmitData = () => {
    const memberId = localStorage.getItem('memberId')

    //날짜
    const selectedDate = useSelector((state) => state.selectedDate);
  
    const formatDate = (date) => {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    const currentDate = selectedDate.selectedDate;

    //탭 버튼
    const [activeTab, setActiveTab] = useState(1);
    const [type, setType] = useState('지출');

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
        setType(tabIndex === 0 ? '수입' : '지출');
      };

      const authorizationToken = localStorage.getItem('Authorization-Token');

    //입력창
    const [amountInput, setAmountInput] = useState()
    const [tradeName, setTradeName] = useState('')
    const [noteInput, setNoteInput] = useState('')
    const dispatch = useDispatch();

    const amountInputChange = (e) => {
        const inputValue = e.target.value;
        const numericValue = Number(inputValue.replace(/\D/g, ''));
        setAmountInput(numericValue);
      };

    const tradeNameChange = (e) => {
        setTradeName(e.target.value);
    };

    const noteInputChange = (e) => {
        setNoteInput(e.target.value);
    };

    //카테고리
    const [selectedOption, setSelectedOption] = useState();

    const handleChange = (option) => {
        setSelectedOption(option);
    };

    //Submit
    const accountDataList = useSelector((state) => state.accountData);
    const onSubmit = (e) => {
        e.preventDefault();
        
        const inputData = {
            type: type,
            tradeName: tradeName,
            amount: Number(amountInput),
            note: noteInput,
            date: formatDate(currentDate),
            category: selectedOption ? selectedOption.label : '',
        };
        axios.post(`${apiUrl.url}/trades/${memberId}`,inputData,{
            headers: {
              'Authorization': localStorage.getItem('Authorization-Token'),
            },
        })
        .then(res=> {
            console.log(res)
            window.location.reload()
            setAmountInput('');
            setTradeName('');
            setNoteInput('');
        })
    };
    
    return (
        <SubmitWrapper>
            <Header>
                <p> {formatDate(currentDate)} </p>
                <div>
                    <TabButton active={activeTab===0} onClick={() => handleTabClick(0)}>수입</TabButton>
                    <TabButton active={activeTab===1} onClick={() => handleTabClick(1)}>지출</TabButton>
                </div>
            </Header>
            <SubmitInputWapper onSubmit={onSubmit}>
                <SubmitInputContents>
                    <Title>카테고리</Title>
                    <TabCategory active={activeTab === 0}>
                        <DropdownProfit selectedOption={selectedOption} handleChange={handleChange}/>
                    </TabCategory>
                    <TabCategory active={activeTab === 1}>
                        <DropdownExpend selectedOption={selectedOption} handleChange={handleChange}/>
                    </TabCategory>
                </SubmitInputContents>
                <SubmitInputContents>
                    <Title>금액</Title>
                    <Input name="expense" type="text" value={amountInput} onChange={amountInputChange}/>
                </SubmitInputContents>
                <SubmitInputContents>
                    <Title>내역</Title>
                    <Input name='tradeName' type="text" value={tradeName} onChange={tradeNameChange}/>
                </SubmitInputContents>
                <SubmitInputContents>
                    <Title>노트</Title>
                    <NoteInput name='note' type="text" value={noteInput} onChange={noteInputChange}/>
                </SubmitInputContents>
                <SubmitButton type="submit">확인</SubmitButton>
            </SubmitInputWapper>
        </SubmitWrapper>
    )
}

export default SubmitData

const SubmitWrapper = styled.div`
    border: 2px solid rgb(210, 210, 210);
    height: 100%;
    border-radius: 16px;
    padding: 28px 36px;
`
const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    >p{
        font-size: 18px;
        font-weight: 500;
    }
`
const TabButton = styled.button`
    font-size: 12px;
    padding: 6px 12px;
    margin-left: 6px;
    background-color: ${(props) => (props.active ? 'rgb(246, 111, 60)' : 'white')};
    color: ${(props) => (props.active ? 'white' : 'rgb(95, 95, 95)')};
    border: 1px solid ${(props) => (props.active ? 'rgb(246, 111, 60)' : 'rgb(210, 210, 210)')};
    border-radius: 6px;
    cursor: pointer;
    outline: none;
`;

const SubmitInputWapper = styled.form`
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const SubmitInputContents = styled.div`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px 0;
    border-bottom: 2px solid rgb(210, 210, 210);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &:nth-last-child(2) {
        display: flex;
        flex-direction: column;
        align-items: start;
        border-bottom: none;
        margin-bottom: 15px;
    }
`
const Title = styled.div`
    padding-left: 10px;
`

const TabCategory = styled.div`
    display: ${(props) => (props.active ? 'block' : 'none')};
`
const Input = styled.input`
    padding: 10px;
    border: none;
    text-align: right;
`

const NoteInput = styled.input`
    width: 100%;
    height: 80px;
    margin-top: 10px;
    padding: 10px;
    border: 2px solid rgb(210, 210, 210);
    border-radius: 10px;
`
const SubmitButton = styled.button`
    background-color: rgb(246, 111, 60);
    font-size: 14px;
    padding: 8px 14px;
    margin-left: 6px;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;

`
