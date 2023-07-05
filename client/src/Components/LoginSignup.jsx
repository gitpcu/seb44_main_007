import { styled } from 'styled-components'
import { SignupButton } from '../Pages/Home'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  position: relative;
`
const ImgContainer = styled.div`
  background-image: url('https://images.squarespace-cdn.com/content/v1/61f5c6070d329d402cfb46f5/eb63c7cb-3497-400a-a75c-31a16c8f824e/unsplash-image-JhevWHCbVyw.jpg?format=1000w');
  background-size: cover;
  width: 60%;
`
const ContentContainer = styled.div`
  width: 40%;
  background-color: #191919;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ContentDiv = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`
const ContentTitle = styled.p`
  font-size: 48px;
  color: white;
`
const InfoDiv = styled.div`
  width: 100%;
  height: 400px;
`
const InfoInputDiv = styled.div`
  width: 100%;
  height: 40px;
  border: 0px;
  margin: 50px 0px;
  border-bottom: 1px solid white;
`
const InfoInput = styled.input`
  width: 90%;
  height: 100%;
  border: 0px;
  background: rgba(0,0,0,0);
  outline: none;
  padding: 0px 5px;
  color: white;
  &::placeholder{
    color: white;
  }
`
const InfoValidTest = styled.p`
  width: 100%;
  height: 20px;
  margin: 5px;
  color: red;
  font-size: 12px;
  display:flex;
  /* display: ${props => props.passvalidtest ? 'none' : 'flex'}; */
`
const LoginButton = styled(SignupButton)`
  width: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  padding: 10px 15px;
  font-weight: normal;
`
const GooglLoginButton = styled(LoginButton)`
  background-color: rgba(0,0,0,0);
  border: 1px solid white;
`
const GoogleLogo = styled.img`
  width: 20px;
`
export default function LoginSignup({info}){
  return (
    <Container>
      <ImgContainer />
      <ContentContainer>
        <ContentDiv>
          <ContentTitle>
            {info.title}
          </ContentTitle>
          <InfoDiv>
            {info.input.map(el => {
              return(
                <InfoInputDiv>
                  <InfoInput
                    type={el.type === 'Password' ? 'password' : 'text'}
                    placeholder={el.type}
                    onChange={el.func}
                  ></InfoInput>
                  <InfoValidTest passvalidtest={el.valid}>{el.validMessage}</InfoValidTest>
                </InfoInputDiv>
              )
            })}
          </InfoDiv>
          <LoginButton onClick={info.buttonFunction}>{info.buttonText}</LoginButton>
          <GooglLoginButton>
            <GoogleLogo src='https://www.svgrepo.com/show/452216/google.svg'></GoogleLogo>
            Login with Google
          </GooglLoginButton>
        </ContentDiv>
      </ContentContainer>
    </Container>
  )
}