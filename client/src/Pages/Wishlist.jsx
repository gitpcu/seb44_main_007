import { styled } from "styled-components";
import { useRef, useState, useEffect } from "react";
import Palette from "../Palette/Palette";
import { data } from "../InitData/wishlist";
import Modal from "../Components/Modal";

const WishlistContainer = styled.div`
  width: calc(100% - 300px);
  height: 100vh;
  padding: 10px;
  background-color: #22221F;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WishlistDiv = styled.div`
  width: 80%; 
`
const LimitDiv = styled.div`
  border: 1px solid white;
  border-radius: 20px;
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 5% 0;
`
const LimitSpanContainer = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: row;
  margin: 5% 0%;
  padding-left: 20%;
`
const LimitSpanDiv = styled.div`
  width: 30%; 
  margin: 0px 5%;
`
const LimitSpan = styled.span`
  width: 50%;
  color: white;
  font-size: 1.5rem;
`
export const LimitInput = styled.input`
  width: 100%;
  background-color: rgba(0,0,0,0);
  border: 0px;
  border-radius: 5px;
  color: white;
  font-size: ${props => props.fontsize};
  padding: 1%;
  &:focus{
    outline: none;
  }
  ::placeholder{
    color: rgba(255,255,255,0.5);
  }
`
const WishDiv = styled.div`
  width: 100%;
`
const MenuDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`
const TitleDiv = styled.div`
  width: 12.5%;
  color: white;
`
const TitleSpan = styled.span`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  height: 100%;
`
const ButtonDiv = styled.div`
  width: 72.5%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 5px;
`
export const Button = styled.button`
  border-radius: 20px;
  margin: 0px 1%;
  padding: 10px;
  width: 18%;
  background-color: ${props => props.selected ? '#F9591D' : 'white'};
  color: ${props => props.selected ? 'white' : 'black'};
`
const AddDiv = styled.div`
  width: 15%;
`
const AddButton = styled(Button)`
  width: 100%;
  background-color: #C5FF78;
  color: #365A42;
  height: 100%;
`
const ListDiv = styled.div`
  width: 100%;
  border: 1px solid white;
  border-radius: 20px;
  padding: 5%;
  margin: 2% 0%;
  overflow: scroll;
  background-color: black;
  &::-webkit-scrollbar {
    display: none;
}
`
const WishUl = styled.ul`
  width: 100%;
  height: 420px;
  overflow-x: hidden;
  overflow-y: scroll;
  list-style-type: none;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #7a7a7a;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(0,0,0,0);
  }
`
const WishLi = styled.li`
  width: 100%;
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: space-around;
  padding: 1% 0;
  background-color: rgba(0,0,0,0);
  border-radius: 5px;
  opacity: ${props => props.available ? '1' : '0.2'};
  &:hover{
    background-color: rgba(255, 255, 255, 0.1);
  }
`
const DragImg = styled.img`
  width: 3%;
  filter: invert(100%) sepia(9%) saturate(7417%) hue-rotate(292deg) brightness(114%) contrast(106%);
`
const ProductImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
`
const ListSpanContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`
const ListSpanDiv = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
`
const ListSpan = styled.span`
  color: white;
  font-size: 1.2rem;
`
export const CategoryCircle = styled.div`
  border-radius: 100%;
  background-color: ${props => props.bgcolor};
  width: 21px;
  height: 18px;
  margin: 0px 10px;
`
const EditImg = styled.img`
  width: 3%;
  filter: invert(36%) sepia(10%) saturate(0%) hue-rotate(275deg) brightness(96%) contrast(90%);
`
const DeleteImg = styled.img`
  width: 3%;
  filter: invert(37%) sepia(90%) saturate(2999%) hue-rotate(340deg) brightness(100%) contrast(103%);
`
const WishLists = ({wishlist, editFunc, deleteFunc}) => {
  const handleDelete = () => {
    deleteFunc(wishlist); 
  };
  return (
    <WishLi available={wishlist.available}>
      <DragImg src='https://www.svgrepo.com/show/506246/menu-hamburger.svg'></DragImg>
      <ProductImg src={wishlist.img}></ProductImg>
      <ListSpanContainer>
        <ListSpanDiv>
          <ListSpan>{wishlist.name}</ListSpan>
        </ListSpanDiv>
        <ListSpanDiv>
          <ListSpan>\{wishlist.price.toLocaleString()}</ListSpan>
        </ListSpanDiv>
        <ListSpanDiv>
          <CategoryCircle bgcolor={Palette[wishlist.category]}></CategoryCircle>
          <ListSpan>{wishlist.category.replace('/', '_')}</ListSpan>
        </ListSpanDiv>
        <ListSpanDiv>
          <ListSpan>{wishlist.date}</ListSpan>
        </ListSpanDiv>
      </ListSpanContainer>
      <EditImg src='https://www.svgrepo.com/show/488318/pencil-ui.svg' onClick={editFunc}></EditImg>
      <DeleteImg src='https://www.svgrepo.com/show/485930/trashcan.svg' onClick={handleDelete}></DeleteImg>
    </WishLi>
  )
}
export default function Wishlist() {
    const [wishlist, setWishlist] = useState(data)
    const [limitPrice, setLimitPrice] = useState(data.limit)
    const [usablePrice, setUsablePrice] = useState(data.useable)
    const [index, setIdx] = useState(0)
    const [writeMode, setMode] = useState(false)

    useEffect(() => {
      let sum = 0
      for(let obj of wishlist.list){
        if(obj.price > limitPrice || sum + obj.price > limitPrice){
          obj.available = false
        } else {
          obj.available = true
          sum += obj.price
        }
      }
      setUsablePrice(limitPrice - wishlist.list.filter(el => el.available).reduce((acc, cur) => acc + cur.price, 0))
    }, [limitPrice, wishlist])

    const sortByPriority = () => {
      const sort = wishlist.list.sort((a, b) => {
        return a.priority - b.priority
      });
      setWishlist({ ...wishlist, list: sort });
      setIdx(0)
    }
    const sortByDate = () => {
      const sort = wishlist.list.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });
      setWishlist({ ...wishlist, list: sort });
      setIdx(1)
    }
    const sortByPrice = () => {
      const sort = wishlist.list.sort((a, b) => {
        return a.price - b.price
      });
      setWishlist({ ...wishlist, list: sort });
      setIdx(2)
    }
  const buttons = [
    {
      title: '우선순위순',
      func: sortByPriority,
    },
    {
      title: '등록순',
      func: sortByDate,
    },
    {
      title: '금액순',
      func: sortByPrice,
    }
  ]

  const [openModal, setOpenModal] = useState(false);

  const openModalDiv = () => {
    setOpenModal(true);
  };

  const deleteWishlist = (targetWishlist) => {
    const updatedList = wishlist.list.filter((item) => item !== targetWishlist); 
    setWishlist({ ...wishlist, list: updatedList });
  };
  const editWishlist = () =>{
    setOpenModal(true);
  }
  return (
    <>
      {openModal ? 
      (<Modal
        setOpenModal={setOpenModal}
        wishlist={wishlist}
        setWishlist={setWishlist}
        limitPrice={limitPrice}
      ></Modal>) : 
      ''}
      <WishlistContainer>
        <WishlistDiv>
          <LimitDiv>
            <LimitSpanContainer>
              <LimitSpanDiv>
                {writeMode ? 
                  <LimitInput
                    type='input'
                    value={limitPrice}
                    onChange={(e) => setLimitPrice(Number(e.target.value))}
                    onBlur={() => setMode(false)}
                    fontsize='1.5rem'
                  ></LimitInput> :
                  <LimitSpan onClick={() => setMode(true)}>\{limitPrice.toLocaleString()}</LimitSpan>
                }
              </LimitSpanDiv>
              <LimitSpanDiv>
                <LimitSpan>상한액</LimitSpan>
              </LimitSpanDiv>
            </LimitSpanContainer>
            <LimitSpanContainer>
              <LimitSpanDiv>
                <LimitSpan>\{usablePrice.toLocaleString()}</LimitSpan>
              </LimitSpanDiv>
              <LimitSpanDiv>
                <LimitSpan>사용 가능 금액</LimitSpan>
              </LimitSpanDiv>
            </LimitSpanContainer>
          </LimitDiv>
          <WishDiv>
            <MenuDiv>
              <TitleDiv>
                <TitleSpan>
                  Wish List  
                </TitleSpan>
              </TitleDiv>
              <ButtonDiv>
                {buttons.map((el, idx) => 
                  <Button
                    key={idx}
                    onClick={el.func}
                    selected={index === idx ? true : false}
                  >
                    {el.title}
                  </Button>)}
              </ButtonDiv>
              <AddDiv>
                <AddButton onClick={openModalDiv}>
                  추가하기
                </AddButton>
              </AddDiv>
            </MenuDiv>
            <ListDiv>
              <WishUl>
                {wishlist.list.map((el) => {
                  return(
                    <WishLists
                      wishlist={el}
                      editFunc={editWishlist}
                      deleteFunc={deleteWishlist}
                    ></WishLists>
                  )
                }
                )}
              </WishUl>
            </ListDiv>
          </WishDiv>
        </WishlistDiv>
      </WishlistContainer>
    </>
  );
}
