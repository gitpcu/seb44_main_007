import {styled} from "styled-components";
import DatePicker from 'react-datepicker';
import Palette from "../../../Palette/Palette";

export const AccountbookPage = styled.div`
height: 100%;
color: white;
display: flex;
flex-direction: row;
`

export const AccountbookWrapper = styled.div`
width: 1100px;
min-height: 100vh;
background-color: rgb(34, 34, 31);
padding: 50px;
`

export const userWelcome = styled.p`
font-size: 26px;
margin-bottom: 36px;
`

export const AccountBox = styled.ul`
width: 1000px;
height: 130px;
border-radius: 20px;
border: solid 2px rgb(160, 160, 160) ;
display: flex;
flex-direction: row;
justify-content: space-between;
margin-bottom: 10px;
`

export const InnerWrapper = styled.li`
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 25px 30px;
`
export const InnerWrapperGoal = styled(InnerWrapper)`
background: linear-gradient(to left top , rgba(246, 111, 60, 1), rgba(34, 34, 31, 1));
border-radius: 18px;
`

export const Title = styled.div`
font-size: 18px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`
export const Amount = styled.p`
font-weight: bold;
font-size: 28px;
`
export const AmountGoal = styled(Amount)`
display: flex;
justify-content: flex-end;
`

export const AccountbookSection = styled.div`
padding: 30px;
`
export const AccountbookHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 35px;
.datePicker {
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: rgb(34, 34, 31);
  box-shadow: none;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  margin-left: 10px;
  color: white;
  text-align: center;
  padding-right: 14px;
  &:focus {
    border: 2px solid colors.$ORANGE;
  }
}
`
export const TabHeader = styled.div`
  display: ${(props) => (props.active ? 'block' : 'none')};
  flex-direction: row;
  font-size: 20px;
  >p{
    font-size: 16px;
  }
`;

export const TabHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  >p{
    font-size: 16px;
  }
`;

export const CustomDatePicker = styled(DatePicker)`
  border: 1px solid #000;
  color: white;
  font-size: 14px;
  cursor: pointer;
`;

export const TabButton = styled.button`
font-size: 14px;
padding: 8px 16px;
margin-left: 10px;
background-color: ${(props) => (props.active ? 'rgb(246, 111, 60)' : 'rgb(34, 34, 31)')};
color: white;
border: 1px solid ${(props) => (props.active ? 'rgb(246, 111, 60)' : 'rgb(210, 210, 210)')};
border-radius: 10px;
cursor: pointer;
outline: none;
`;

export const AccountbookContents = styled.div`
display: flex;
flex: 1;

`

export const TabContents = styled.div`
  display: ${(props) => (props.active ? 'block' : 'none')};
height: 550px;

`;
export const DatePage = styled.div`
padding-top: 42px;
display: flex;
flex-direction: row;
>p{
    color : rgb(160, 160, 160);
}
> img {
    filter: invert(69%) sepia(0%) saturate(201%) hue-rotate(210deg) brightness(93%) contrast(90%);
    width: 20px;
    height: 20px;
}
`
export const DateContent = styled.div`
display: flex;
flex-direction: row;
`

export const MonthDay = styled.div`
width: 110px;
height: 400px;
margin-top: 30px;
padding: 10px 20px;
display: flex;
justify-content: flex-end;
border-right: 2px solid;
border-image: linear-gradient(to bottom,rgba(220, 220, 220, 1), rgba(34, 34, 31, 1)) 1;
`
export const DataUl = styled.ul`
width:830px;
margin-top: 30px;
`
export const DataLi = styled.li`
padding: 10px 20px;
display: flex;
flex-direction: row;
align-items: center;
border: 1px solid transparent;
border-radius: 10px;
transition: border-color 0.3s;
&:hover {
    border: 1px solid #C5FF78;
}
&:focus {
    border: 1px solid #C5FF78;
}
`
export const Dot = styled.div`
margin-right: 10px;
width: 8px;
height: 8px;
border-radius: 10px;
background-color: ${({ category }) => Palette[category] || "white"};
`

export const Category = styled.div`
width: 80px;
font-size: 14px;
border-right: 1px solid rgb(160, 160, 160);
display: flex;
flex-direction: column;
`
export const TradeName = styled.div`
width: 150px;
padding-left: 20px;
font-size: 17px;
font-weight: 600;
`
export const Note = styled.div`
width: 430px;
padding-left: 20px;
font-size: 14px;
font-weight: 300;
color: rgb(210, 210, 210);
`
export const AmountLi = styled(TradeName)`
color: ${props => props.isIncome ? 'rgb(246, 111, 60)' : 'inherit'};
font-weight: 800;
display: flex;
justify-content: flex-end;
padding-right: 20px;
`


