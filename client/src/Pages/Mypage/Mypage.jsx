import MypageComponent from "./MypageComponent";
import { useNavigate } from 'react-router-dom';


const Mypage = () => {
    const memberId = localStorage.getItem('memberId');
    const navigate = useNavigate()
    if (!memberId) {
        navigate("/login");
    }
    return (
        <>
            <MypageComponent />
        </>
        
    )
}

export default Mypage
