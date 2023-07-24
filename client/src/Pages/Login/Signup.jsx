import LoginSignup from "./LoginSignup";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const memberId = localStorage.getItem('memberId');
  const navigate = useNavigate()
  if (memberId) {
    navigate("/accountbook");
  }
  return <LoginSignup page='signup'></LoginSignup>;
}
