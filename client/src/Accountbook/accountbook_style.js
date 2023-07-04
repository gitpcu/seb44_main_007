import {styled} from "styled-components";

export const AccountbookPage = styled.body`
height: 100%;
color: white;
`

export const AccountbookWrapper = styled.div`
width: 1100px;
min-height: 100vh;
background-color: rgb(34, 34, 31);
padding: 50px;
`

export const userWelcome = styled.p`
font-size: 36px;
margin-bottom: 56px;
`

export const AccountBox = styled.div`
width: 1000px;
height: 130px;
border-radius: 20px;
border: solid 2px rgb(160, 160, 160) ;
display: flex;
flex-direction: row;
justify-content: space-between;
margin-bottom: 26px;
`

export const InnerWrapper = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: space-between;
padding: 20px 30px 20px 30px;
`
export const InnerWrapperGoal = styled(InnerWrapper)`
background: linear-gradient(to left top , rgba(246, 111, 60, 1), rgba(34, 34, 31, 1));
border-radius: 18px;
`

export const Title = styled.p`
font-size: 22px;
`
export const Amount = styled.p`
font-weight: bold;
font-size: 32px;
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
.datePicker {
  display: flex;
  align-items: center;
  border: 1px solid colors.$GRAY6;
  border-radius: 4px;
  background-color: rgb(34, 34, 31);
  box-shadow: none;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
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
`;

export const MonthChange = styled.div`
display: ${(props) => (props.active ? 'block' : 'none')};
flex-direction: row;
>img {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(118deg) brightness(102%) contrast(102%);
    width: 10px;
    height: 10px;
}
>p{
    font-size: 24px;
}
`

export const TabButton = styled.button`
width: 74px;
height: 40px;
font-size: 16px;
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
border: 1px solid green;
margin-top: 42px;
`

export const TabContents = styled.div`
  display: ${(props) => (props.active ? 'block' : 'none')};
height: 400px;

`;
export const DatePage = styled.div`
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
`

export const MonthDay = styled.div`
width: 100px;
border-right: 2px solid linear-gradient(to top  , rgba(246, 111, 60, 1), rgba(34, 34, 31, 1));
`