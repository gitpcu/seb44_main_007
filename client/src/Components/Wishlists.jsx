import { styled } from "styled-components";
import Palette from "../Palette/Palette";
import { useDrop, useDrag } from "react-dnd";
import { useRef, useState, useEffect } from 'react';

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
    background-color: rgba(0, 0, 0, 0);
  }
`;

const WishLi = styled.li`
  width: 100%;
  display: flex;
  flex-direction: center;
  align-items: center;
  justify-content: space-around;
  padding: 1% 0;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 5px;
  opacity: ${(props) => (props.available ? "1" : "0.2")};
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
const DragImg = styled.img`
  width: 3%;
  filter: invert(100%) sepia(9%) saturate(7417%) hue-rotate(292deg)
    brightness(114%) contrast(106%);
`;
const ProductImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
`;
const ListSpanContainer = styled.div`
  width: 70%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
const ListSpanDiv = styled.div`
  width: 25%;
  display: flex;
  align-items: center;
`;
const ListSpan = styled.span`
  color: white;
  font-size: 1.2rem;
`;
export const CategoryCircle = styled.div`
  border-radius: 100%;
  background-color: ${(props) => props.bgcolor};
  width: 21px;
  height: 18px;
  margin: 0px 10px;
`;
const EditImg = styled.img`
  width: 3%;
  filter: invert(36%) sepia(10%) saturate(0%) hue-rotate(275deg) brightness(96%)
    contrast(90%);
`;
const DeleteImg = styled.img`
  width: 3%;
  filter: invert(37%) sepia(90%) saturate(2999%) hue-rotate(340deg)
    brightness(100%) contrast(103%);
`;

const WishLists = ({ list, index, moveList, editFunc, deleteFunc }) => {
  const ref = useRef(null);
  const handleDelete = () => {
    deleteFunc(list);
  };
  const handleEdit = () => {
    editFunc(list);
  };

  const [, drag] = useDrag({
    type: 'wishList',
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const [, drop] = useDrop({
    accept: 'wishList',
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveList(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  drag(drop(ref));

  return (
    <WishLi
      available={list.available}
      ref={ref}
    >
      <DragImg src="https://www.svgrepo.com/show/506246/menu-hamburger.svg"></DragImg>
      <ProductImg src={list.img}></ProductImg>
      <ListSpanContainer>
        <ListSpanDiv>
          <ListSpan>{list.name}</ListSpan>
        </ListSpanDiv>
        <ListSpanDiv>
          <ListSpan>\{list.price.toLocaleString()}</ListSpan>
        </ListSpanDiv>
        <ListSpanDiv>
          <CategoryCircle bgcolor={Palette[list.category]}></CategoryCircle>
          <ListSpan>{list.category.replace("/", "_")}</ListSpan>
        </ListSpanDiv>
        <ListSpanDiv>
          <ListSpan>{list.date}</ListSpan>
        </ListSpanDiv>
      </ListSpanContainer>
      <EditImg
        src="https://www.svgrepo.com/show/488318/pencil-ui.svg"
        onClick={handleEdit}
      ></EditImg>
      <DeleteImg
        src="https://www.svgrepo.com/show/485930/trashcan.svg"
        onClick={handleDelete}
      ></DeleteImg>
    </WishLi>
  );
};

export default function WishListDragContainer({
  wishlist,
  editFunc,
  deleteFunc,
  setWishlist
}) {

  const [lists, setLists] = useState(wishlist);

  const moveList = (dragIndex, hoverIndex) => {
    const draggedList = wishlist[dragIndex];
    const updatedLists = wishlist.slice();
    console.log(`dragIndex: ${dragIndex} / hoverIndex: ${hoverIndex}`)
    updatedLists.splice(dragIndex, 1);
    updatedLists.splice(hoverIndex, 0, draggedList);

    const updatedListsWithNewPriority = updatedLists.map((list, index) => ({
      ...list,
      priority: index
    }));
    setWishlist({list:updatedListsWithNewPriority})
  };

  return (
    <WishUl>
      {wishlist !== undefined && wishlist.map((el, idx) => {
        return (
          <WishLists
            list={el}
            index={idx}
            moveList={moveList}
            editFunc={editFunc}
            deleteFunc={deleteFunc}
            key={el.priority}
          ></WishLists>
        );
      })}
    </WishUl>
  );
}
