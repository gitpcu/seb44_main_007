import AccountbookMain from "../Accountbook/main/accountbookMain";
import AccountbookSide from "../Accountbook/side/accountbookSide";
import {styled} from "styled-components";

const AccountBook = styled.div`
    width: calc(100% - 300px);  
    display: flex;
    flex-direction: row;
`

const Accountbook = () => {

    return (
        <AccountBook>
            <AccountbookMain />
            <AccountbookSide />
        </AccountBook>
    )
}

export default Accountbook