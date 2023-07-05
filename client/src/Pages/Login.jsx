// import { styled } from 'styled-components'
import { useState } from "react";
import LoginSignup from "../Components/LoginSignup";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailValidMessage, setEmailValidMessage] =
    useState("이메일을 입력하세요");

  const [password, setPassword] = useState("");
  const [pwValid, setPwValid] = useState(true);
  const [pwValidMessage, setPwValidMessage] = useState("비밀번호를 입력하세요");

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const clickLoginButton = () => {
    if (emailValid && pwValid) {
      console.log("성공");
    } else {
      if (email === "") {
        setEmailValid(false)
        setEmailValidMessage("이메일을 입력하세요");
      } else if (!email.includes("@") || !email.includes(".")) {
        setEmailValid(false)
        setEmailValidMessage("올바르지 않은 이메일 형식입니다");
      }
      // const isExistEmail = data.filter(el => el.email === email)
      // else if(isExistEmail.length < 1){
      //   setEmailValidMessage('등록되지 않은 이메일입니다!')
      // } 서버 통신 시작하면 주석 해제 이후 서버에 등록된 이메일과 대조
      else {
        setEmailValid(true)
        setEmailValidMessage("");
      }

      const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
        password
      );
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const isLengthValid = password.length >= 10;
      if (password === "") {
        setPwValid(false)
        setPwValidMessage("비밀번호를 입력하세요");
      } else if (!(hasSpecialChar && hasLetter && hasNumber && isLengthValid)) {
        setPwValid(false)
        setPwValidMessage(
          "비밀번호는 특수문자와 문자, 숫자를 포함해 10자 이상이어야 합니다"
        );
      }
      // else if(isExistEmail[0].password === password){
      //   setPwValidMessage('비밀번호가 틀립니다!')
      // } 서버 통신 시작하면 주석 해제 이후 서버에 등록된 이메일의 비밀번호와 대조
      else {
        setPwValid(true)
        setPwValidMessage("");
      }
    }
  };

  const loginInfo = {
    title: "로그인",
    input: [
      {
        type: "Email",
        validMessage: emailValidMessage,
        valid: emailValid,
        func: inputEmail,
      },
      {
        type: "Password",
        validMessage: pwValidMessage,
        valid: pwValid,
        func: inputPassword,
      },
    ],
    buttonText: "login",
    buttonFunction: clickLoginButton,
  };

  return <LoginSignup info={loginInfo}></LoginSignup>;
}
