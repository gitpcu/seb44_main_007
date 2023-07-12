import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";

// keyframes
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  background-color: rgb(34, 34, 31);
  width: calc(100% - 300px);
  ${({ isLoaded }) =>
    isLoaded &&
    css`
      animation: ${fadeInAnimation} 0.5s ease-in-out;
      opacity: 1;
    `};
`;
const ShowPage = styled.div`
  width: 80%;
  height: 80%;
`;
const PageTop = styled.div`
  width: 100%;
  height: 49%;
`;
const TopProfile = styled.div`
  width: 100%;
  height: 90%;
  margin-bottom: 10%;
  display: flex;
  justify-content: space-between;
`;
const TopLeft = styled.div`
  width: 25%;
  height: 100%;
`;
const UserPictureWrap = styled.div`
  width: 100%;
  height: 80%;
`;
const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  border-radius: 100px;
`;
const ImgButton = styled.button`
text-align:center;
  background-color: #365A42;
  font-size:24px;
  width:100%;
  color:white;
  height:15%;
  margin-top:5%;
  border:none;
  border-radius:50px;
`;

const TopRight = styled.div`
  width: 70%;
  height: 100%;
`;
const HelloUser = styled.div`
  font-size:64px;
  width:100%;
  color:white;
`
const SubscribeButton = styled.div`
  
`

const PageBottom = styled.div`
  width: 100%;
  height: 51%;
`;

function MyPage() {
  const [isLoaded, setIsLoaded] = useState(false); // 첫 로딩때 화면 전환
  const [Image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const fileInput = useRef(null);

  const onChangeImg = (e) => {
    console.log(e.target.files);
    // if (e.target.files[0]) {
    //     setImage(e.target.files[0]);
    // } else {
    //   //업로드 취소할 시
    //   setImage(
    //     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    //   );
    //   return;
    // }
    // //화면에 프로필 사진 표시
    // const reader = new FileReader();
    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setImage(reader.result);
    //   }
    // };
    // reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <PageWrap isLoaded={isLoaded}>
      <ShowPage>
        <PageTop>
          <TopProfile>
            <TopLeft>
              <UserPictureWrap>
                <ImagePreview src={Image} />
                <ImgButton onClick={onChangeImg}>프로필 이미지 변경</ImgButton>
              </UserPictureWrap>
            </TopLeft>
            <TopRight>
                <HelloUser>Hello님, 환영합니다 !</HelloUser>
            </TopRight>
          </TopProfile>
        </PageTop>
        <PageBottom>22</PageBottom>
      </ShowPage>
    </PageWrap>
  );
}

export default MyPage;
