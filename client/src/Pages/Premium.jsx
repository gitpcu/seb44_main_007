import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { Button } from "./Wishlist";
import { ModalBackground, ModalContainer, ModalDiv } from "../Components/Modal"

const PremiumContainer = styled.div`
  width: calc(100% - 300px);
  height: 100vh;
  padding: 10px;
  background-color: #22221f;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PremiumDiv = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;
const PremiumTitleDiv = styled.div`
  width: 100%;
  border-bottom: 3px solid white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2%;
  margin-bottom: 5%;
`
const TitleDiv = styled.div`
  width: 40%;
  display: flex;
  flex-direction: row;
  align-items: center;
`
const Title = styled.span`
  font-size: 3rem;
  color: white;
  font-weight: bold;
`
const TitleLogo = styled.img`
  width: 60px;
  height: 60px;
  filter: invert(98%) sepia(49%) saturate(1122%) hue-rotate(26deg) brightness(100%) contrast(100%);
`
const PayButton = styled(Button)`
  background-color: #F9591D;
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
`
const PremiumBodyDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
const PremiumBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 7px solid #C5FF78; 
`
const PremiumBodyLeft = styled.div`
  position: relative;
  width: 20%;
  background-color: transparent;
  border-bottom: 200px solid #C5FF78; 
  border-right: 50px solid transparent;
`
const PremiumBodyLeftOdd = styled(PremiumBodyLeft)`
  border-right: 0px;
  border-left: 50px solid transparent;
`
const BodyLeftDiv = styled.div`
  position: absolute;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  left:15%;
  padding-top: 10%;
`
const BodyLeftDivOdd = styled(BodyLeftDiv)`
  left:0%;
  right: 15%;
`
const BodyLeftImg = styled.img`
  width: 60%;
  filter: invert(31%) sepia(37%) saturate(429%) hue-rotate(87deg) brightness(88%) contrast(89%);
  margin-bottom: 7%;
`
const BodyLeftSpan = styled.span`
  color: #365A42;
  font-size: 1.5rem;
  font-weight: bold;
`
const PremiumBodyRight = styled.div`
  width: 80%;
  background-color: transparent;
  position: relative;
  display: flex;
  justify-content: center;
`
const BodyRightDiv = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const BodyRightDivOdd = styled(BodyRightDiv)`
  align-items: flex-end;
`
const BodyRightTitle = styled.span`
  color: white;
  font-size: 3.5rem;
  font-weight: bold;
`
const BodyRightDescribe = styled.span`
  color: white;
`
export default function Premium(){
  const premiumInfo = [
    {
      img: 'https://www.svgrepo.com/show/454970/money-website.svg',
      name: '소비 습관 보고서',
      title: '나쁜 소비 습관 한번에 해결!',
      describe: '쉽게 알아볼 수 있는 소비 데이터를 매달 보내 드립니다!'
    },
    {
      img: 'https://www.svgrepo.com/show/484019/person.svg',
      name: '자산 관리자 조언',
      title: '전문가의 명쾌한 조언!',
      describe: '자산 관리자의 조언을 통해 회원님의 재산을 안전하게 지키세요!'
    },
    {
      img: 'https://www.svgrepo.com/show/455332/android.svg',
      name: 'AI 추천 소비계획',
      title: '똑똑한 AI의 똑소리나는 관리!',
      describe: '최첨단 AI가 당신의 소비 계획을 알차고 든든하게 세워줍니다!'
    }
  ]

  const[modal, setModal] = useState(false)
  const openModal = () =>{
    setModal(true)
  }
  return(
    <>
      {/* {modal ? <Modal} */}
      <PremiumContainer>
        <PremiumDiv>
          <PremiumTitleDiv>
            <TitleDiv>
              <TitleLogo src='https://www.svgrepo.com/show/485696/diamond.svg'></TitleLogo>
              <Title>프리미엄 혜택</Title>
            </TitleDiv>
            <PayButton onClick={openModal}>프리미엄 혜택 받기</PayButton>
          </PremiumTitleDiv>
          <PremiumBodyDiv>
            {premiumInfo.map((el, idx) =>{
              return(
                idx % 2 === 0 ? (
                  <PremiumBody>
                    <PremiumBodyLeft>
                      <BodyLeftDiv>
                        <BodyLeftImg src={el.img}></BodyLeftImg>
                        <BodyLeftSpan>{el.name}</BodyLeftSpan>
                      </BodyLeftDiv>
                    </PremiumBodyLeft>
                    <PremiumBodyRight>
                      <BodyRightDiv>
                        <BodyRightTitle>{el.title}</BodyRightTitle>
                        <BodyRightDescribe>{el.describe}</BodyRightDescribe>
                      </BodyRightDiv>
                    </PremiumBodyRight>
                  </PremiumBody>
                ) : (
                  <PremiumBody>
                    <PremiumBodyRight>
                      <BodyRightDivOdd>
                        <BodyRightTitle>{el.title}</BodyRightTitle>
                        <BodyRightDescribe>{el.describe}</BodyRightDescribe>
                      </BodyRightDivOdd>
                    </PremiumBodyRight>
                    <PremiumBodyLeftOdd>
                      <BodyLeftDivOdd>
                        <BodyLeftImg src={el.img}></BodyLeftImg>
                        <BodyLeftSpan>{el.name}</BodyLeftSpan>
                      </BodyLeftDivOdd>
                    </PremiumBodyLeftOdd>
                  </PremiumBody>
                )
              )
            })}
          </PremiumBodyDiv>
        </PremiumDiv>
      </PremiumContainer>
    </>
  )
}