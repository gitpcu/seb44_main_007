import { styled } from "styled-components";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer"

import MainDescription from "../Components/MainDescription";
import analyze from '../Images/analyze_img.png';
import account from '../Images/account_img.png';
import wishlist from '../Images/wishlist_img.png';
import logo1 from '../Images/logo_appear_1.png';
import logo2 from '../Images/logo_appear_2.png';
import logo3 from '../Images/logo_appear_3.png';

const A = styled.div`
  position: relative;
`

const Background = styled.div`
  background-image: url('https://images.unsplash.com/photo-1580508174046-170816f65662?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  position: relative;
  top:0;
  left:0;
  font-family: 'ChosunBg';
  z-index:1;
  &::before {
    content: '';
    position: absolute;
    top: 0; left:0; right:0; bottom:0;
    background: inherit;
    z-index:-1;
    filter: blur(5px); 
  }
`
const MainDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  height: 70vh;
  margin: -48vh 0 0 -35%;
  padding-top: 26vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const MainText = styled.p`
  color: white;
  font-size: 64px;
  text-shadow: 0px 1px 10px #00000045;
  margin: 10px;
  animation: appearText 1s;
`
const StartButton = styled.button`
  width: 300px;
  padding: 30px;
  background-color: #F9591D;
  border: 0px;
  border-radius: 20px;
  color: white;
  font-size: 36px;
  font-weight: bold;
  margin: 150px;
  opacity: 0.7;
  animation: appearButton 1s;
  &:hover{
    opacity: 1;
  }
`
const ScrollArrow = styled.img`
  width: 75px;
  height: 75px;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
  &:hover{
    animation: arrowMotion 0.3s linear 0s infinite alternate; margin-top: 0;
  }
`
const SummaryContainer = styled.div`
  position: relative;
  top:0;
  left:0;
  width: 100%;
  height: 100vh;
  background-color: #191919;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const SummaryDiv = styled.div`
  position: absolute;
  width: 70%;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
`
const LogoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  margin: 50px 0px 50px 0px;
  display: flex;
  justify-content: center;
`
const SummaryImg = styled.img`
  position: absolute;
  height: 100%;
  opacity: 0;
  animation: ${props => props.isView ? props.ani : ''};
  animation-duration: 5s;
  animation-fill-mode: forwards;
`
const SummaryText = styled(MainText)`
  font-size: 30px;
  font-weight: bold;
  font-family: 'Pretendard', sans-serif;
`
const ScrollMeDiv = styled.div`
  height: 60px;
`
const ScrollMeImg = styled.img`
  width: 50px;
  height: 50px;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
  float: center;
  opacity: 0.5;
  animation: scrollme 0.3s linear 0s infinite alternate;
`
const MainSpan = styled.span`
  color: ${props => props.color};
`
const MainDescribeContainer = styled.div`
  width: 100%;
  background-color: #E9E9E9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`
const SignupDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px 100px 0px;
`
const SignupText = styled.span`
  color: #A9A9A9;
  font-size: 12px;
`
export const SignupButton = styled(StartButton)`
  animation: '';
  padding: 15px;
  font-size: 24px;
  margin: 15px 0px;
`
const Footer = styled.footer`
  width: 100%;
  height: 150px;
  padding: 40px 500px;
  background-color: #191919;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const FooterLogoDiv = styled.div`
  width: 100px;
  height: 100px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const FooterLogo = styled.img`
  width: 50px;
`
const FooterNameDiv = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-left: 100px;
`
export default function Home(){
  const innerText = [
    {
      img: account,
      icon: 'https://www.svgrepo.com/show/488074/bookmark-book.svg',
      description: '가계부',
      title: '누구나 쉽고 빠르게!', 
      text: ['Buyrricade는 쉽고 간편한 UI를 제공하여','처음 이용하는 사람도 어려움 없이', '자신만의 가계부를 쓸 수 있습니다.', '또한 목표 지출 금액을 설정하여', '건강한 소비 습관을 기르는데도 도움이 됩니다.']
    },
    {
      img: analyze,
      icon: 'https://www.svgrepo.com/show/457889/chart-alt.svg',
      description: '소비 패턴 분석',
      title: '한눈에 들어오는 내 지출', 
      text: ['도대체 돈이 어디서 자꾸 나가는거야?','Buyrricade에서는 일자별 지출 뿐만 아니라', '카테고리별 지출 분석 기능을 제공하여', '어떻게 지출이 생기는지 쉽게 파악할 수 있습니다..']
    },
    {
      img: wishlist,
      icon: 'https://www.svgrepo.com/show/165358/genie-lamp.svg',
      description: '위시리스트',
      title: '필요한 물건만 쏙쏙 골라서', 
      text: ['Buyrricade는 지출 상한선을 정해','지금 살 수 있는 것과 다음으로 미뤄야 할 것을 나눠주는', '위시리스트 기능을 제공합니다.', '위시리스트를 통해 쓸모없는 소비를 막고.', '소중한 내 돈을 지켜보세요!']
    },
  ]

  const element = useRef();
  const onMoveBox = () => {
    element.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [second, inView] = useInView()
  const [isView, setIsView] = useState(false)
  useEffect(() => {
    if(inView){
      setIsView(true)
    }
  }, [inView])

  return (
    <A>
      <Background>
        <MainDiv>
          <MainText>
            소중한 내 돈,
          </MainText>
          <MainText>
            Burrycade로 똑똑하게 관리하자
          </MainText>
          <Link to='/login'>
            <StartButton>
              시작하기
            </StartButton>
          </Link>
          <ScrollArrow
            src='https://www.svgrepo.com/show/334629/down-arrow-square.svg'
            onClick={onMoveBox}
          >
          </ScrollArrow>
        </MainDiv>
      </Background>
      <SummaryContainer ref={element}>
        <SummaryDiv ref={second}>
          <LogoContainer>
            <SummaryImg
              src={logo1}
              ani='appear1'
              isView={isView}
              filter='invert(100%) sepia(0%) saturate(882%) hue-rotate(56deg) brightness(113%) contrast(91%)'
            />
            <SummaryImg src={logo2} ani='appear2' isView={isView}/>
            <SummaryImg src={logo3} ani='appear3' isView={isView}/>
          </LogoContainer>
          <SummaryText>
            <MainSpan color="#C5FF78">Buyrricade</MainSpan>는&nbsp;
            <MainSpan color="#E66433">Buy</MainSpan>와&nbsp;
            <MainSpan color="#E66433">Barricade</MainSpan>의 합성어로
          </SummaryText>
          <SummaryText>
          <MainSpan color="#acacac">"계획적인 소비를 통해 쓸모없는 지출을 막자"</MainSpan> 라는 의미를 담고 있습니다.
          </SummaryText>
          <ScrollMeDiv>
            <ScrollMeImg src='https://www.svgrepo.com/show/502622/double-arrow-down.svg'></ScrollMeImg>
          </ScrollMeDiv>
        </SummaryDiv>
      </SummaryContainer>
      <MainDescribeContainer>
        {innerText.map((el, idx) => {
          return(
           <MainDescription
            idx={idx}
            img={el.img}
            icon={el.icon}
            description={el.description}
            title={el.title}
            text={el.text}
          ></MainDescription>
          )
        })}
        <SignupDiv>
          <SignupText>아직 회원이 아니시라면?</SignupText>
          <Link to='/signup'>
            <SignupButton>Buyrricade 시작해보기</SignupButton>
          </Link>
        </SignupDiv>
      </MainDescribeContainer>
      <Footer>
        <FooterLogoDiv>
          <FooterLogo src='https://media.discordapp.net/attachments/1121698218313531492/1125698587003719740/Asset_4.png'></FooterLogo>
        </FooterLogoDiv>
        <FooterNameDiv>
          <span>김소희</span>
          <span>노동준</span>
          <span>송경후</span>
          <span>이수민</span>
          <span>임재섭</span>
        </FooterNameDiv>
      </Footer>
    </A>
  )
}