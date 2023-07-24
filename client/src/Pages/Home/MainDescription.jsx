import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer"

const Container = styled.div`
  font-family: 'Pretendard', sans-serif;
  display: flex;
  flex-direction: row;
  margin: 90px;
  justify-content: ${props => props.align === 'left' ? 'flex-start' : 'flex-end'};
  animation: ${props => props.isView ? 'appearText 2.5s' : ''};
  opacity: 0;
  animation-fill-mode: forwards;
`
const ImgContainer = styled.div`
  width: 40%;
  border-radius: 30px;
  margin: ${props => props.align === 'left' ? '0px 40px 0px 150px' : '0px 150px 0px 40px'};
  box-shadow: 0px 4px 50px rgba(0,0,0,0.25);
`
const Img = styled.img`
  width: 100%;
  border-radius: 30px;
`
const TextContainer = styled.div`
  width: 35%;
  margin: ${props => props.align === 'left' ? '10px 40px 0px 10px' : '10px 10px 0px 40px'};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const TitleDiv = styled.div`
  width: 100%;
  margin: 0px 0px 30px 0px;
`
const TitleDescription = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: ${props => props.align};
`
const TitleIcon = styled.img`
  width: 30px;
  height: 30px;
  filter: invert(35%) sepia(63%) saturate(4815%) hue-rotate(345deg) brightness(91%) contrast(89%);
  margin: 0px 5px;
`
const TitleDescriptText = styled.span`
  color: #DC3131;
  font-size: 20px;
  font-weight: bold;
  margin: 3px 5px 0px 5px;
`
const Title = styled.p`
  width: 100%;
  color: black;
  font-size: 45px;
  font-weight: bold;
  text-align: ${props => props.align};
`
const Text = styled.p`
  width: 100%;
  color: #636363;
  font-size: 20px;
  line-height: 1.8;
  text-align: ${props => props.align};
`
export default function MainDescription({idx, img, icon, description, title, text}){
  const [element, inView] = useInView()
  const [isView, setIsView] = useState(false)
  useEffect(() => {
    if(inView){
      setIsView(true)
    }
  }, [inView])
  if(idx % 2 === 0){
    return (
      <Container align='left' ref={element} isView={isView}>
        <ImgContainer align='left'>
          <Img src={img}></Img>
        </ImgContainer>
        <TextContainer align='left'>
          <TitleDiv>
            <TitleDescription align='left'>
              <TitleIcon src={icon}></TitleIcon>
              <TitleDescriptText>{description}</TitleDescriptText>
            </TitleDescription>
            <Title align='left'>{title}</Title>
          </TitleDiv>
          {text.map(el => <Text align='left'>{el}</Text>)}
        </TextContainer>
      </Container>
    )
  } else {
    return (
      <Container align='right' ref={element} isView={isView}>
        <TextContainer>
          <TitleDiv>
            <TitleDescription align='right'>
              <TitleIcon src={icon}></TitleIcon>
              <TitleDescriptText>{description}</TitleDescriptText>
            </TitleDescription>
            <Title align='right'>{title}</Title>
          </TitleDiv>
          {text.map(el => <Text align='right'>{el}</Text>)}
        </TextContainer>
        <ImgContainer>
          <Img src={img}></Img>
        </ImgContainer>
      </Container>
    )
  }
}