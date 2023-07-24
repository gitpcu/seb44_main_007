import AccountbookMain from "./main/accountbookMain";
import AccountbookSide from "./side/accountbookSide";
import {styled} from "styled-components";
import { useNavigate } from 'react-router-dom';

const AccountBook = styled.div`
    width: calc(100% - 300px);  
    display: flex;
    flex-direction: row;
`

const Accountbook = () => {
    const memberId = localStorage.getItem('memberId');
    const navigate = useNavigate()
    if (!memberId) {
        navigate("/login");
    } else {
        return (
            <AccountBook>
                <AccountbookMain />
                <AccountbookSide />
            </AccountBook>
        )
    }
    
}

export default Accountbook