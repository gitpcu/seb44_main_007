
import { styled } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setDataList } from "../Redux/wishlist_reducer";
import mainLogo from '../Images/logo_main.png'

const Nav = styled.nav`
  position: relative;
  top: 0px;
  left: 0px;
  width: 300px;
  height: 100vh;
  background-color: #191919;
`;
const SidebarContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
`;
const LogoDiv = styled.div`
  width: 100%;
  height: 15%;
  min-height: 90px;
`;
const LogoImg = styled.img`
  width: 90%;
`;
const DivideBar = styled.div`
  width: 100%;
  height: 3px;
  display: flex;
  flex: 1;
  margin: 10% 0px 100% 0px;
  background-color: #c0c0c0;
`;
const MenuDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  border-top: 2px solid #c0c0c0;
`;
const Menu = styled.ul`
  position: relative;
  width: 100%;
  list-style-type: none;
  padding: 0px;
`;
const MenuList = styled.li`
  position: relative;
  width: 100%;
  height: 30px;
  margin: 25% 0px;
  display: flex;
  align-items: center;
  border: 0px;
  background-color: #191919;
`;
const MenuListDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 0px;
  border-radius: 1rem;
  padding: 5px 10px;
  ${(props) =>
    props.isHovered
      ? "background: linear-gradient(to right, #191919, #F9591D);"
      : ""};
  ${(props) =>
    props.selected
      ? "background: linear-gradient(to right, #191919, #F9591D);"
      : ""}
  & > .navLink {
    width: 4rem;
    height: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const MenuListImg = styled.img`
  position: absolute;
  width: 2.3rem;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 10px;
  filter: ${(props) =>
    props.selected
      ? "invert(56%) sepia(41%) saturate(7144%) hue-rotate(347deg) brightness(97%) contrast(101%)"
      : "invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)"};
  transition: 500ms;
  z-index: 5;
  &:hover {
    width: 2.5rem;
    filter: invert(56%) sepia(41%) saturate(7144%) hue-rotate(347deg)
      brightness(97%) contrast(101%);
  }
`;
const MenuListSpan = styled.span`
  font-family: "ChosunBg";
  width: 100%;
  color: white;
  transition: 500ms;
  opacity: 0;
  z-index: 10;
  ${(props) =>
    props.isHovered
      ? "color:white; transform: translate(40px, 0px); opacity:1;"
      : ""}
  ${(props) =>
    props.selected
      ? "color:white; transform: translate(40px, 0px); opacity:1;"
      : ""}
`;
const LowerMenuImg = styled(MenuListImg)`
  width: 1.8rem;
  &:hover {
    width: 2rem;
  }
`;
const LowerMenuList = styled(MenuList)`
  margin: 15% 0px;
`;
const LowerMenuDiv = styled(MenuListDiv)`
  border-radius: 0.7rem;
  height: 3rem;
`;

const UpperMenu = ({ el, idx, hoveredIdx, setHoveredIdx, curLocation }) => {
  return (
    <MenuList>
      <MenuListDiv
        className="MenuListDiv"
        isHovered={idx === hoveredIdx ? true : false}
        selected={curLocation === el.path ? true : false}
      >
        <Link to={el.path} className="navLink">
          <MenuListImg
            src={el.image}
            className="MenuListImg"
            selected={curLocation === el.path ? true : false}
            onMouseOver={() => setHoveredIdx(idx)}
            onMouseOut={() => setHoveredIdx("")}
          ></MenuListImg>
        </Link>
        <MenuListSpan
          className="MenuListSpan"
          isHovered={idx === hoveredIdx ? true : false}
          selected={curLocation === el.path ? true : false}
        >
          {el.title}{" "}
        </MenuListSpan>
      </MenuListDiv>
    </MenuList>
  );
};
const LowerMenu = ({
  el,
  idx,
  hoveredIdx,
  setHoveredIdx,
  curLocation,
  logout,
}) => {
  return (
    <LowerMenuList>
      <LowerMenuDiv
        className="MenuListDiv"
        isHovered={idx === hoveredIdx ? true : false}
        selected={curLocation === el.path ? true : false}
      >
        <Link to={el.path} className="navLink">
          <LowerMenuImg
            src={el.image}
            className="MenuListImg"
            selected={curLocation === el.path ? true : false}
            onMouseOver={() => setHoveredIdx(idx)}
            onMouseOut={() => setHoveredIdx("")}
            onClick={idx === 5 ? logout : null}
          ></LowerMenuImg>
        </Link>
        <MenuListSpan
          className="MenuListSpan"
          isHovered={idx === hoveredIdx ? true : false}
          selected={curLocation === el.path ? true : false}
        >
          {el.title}
        </MenuListSpan>
      </LowerMenuDiv>
    </LowerMenuList>
  );
};

export default function SideNavBar({ setIsHome }) {
  const menuList = [
    {
      image: "https://www.svgrepo.com/show/333903/dollar-circle.svg",
      title: "가계부",
      path: "/accountbook",
    },
    {
      image: "https://www.svgrepo.com/show/340496/account.svg",
      title: "소비 패턴 분석",
      path: "/analysis",
    },
    {
      image: "https://www.svgrepo.com/show/511145/star.svg",
      title: "위시리스트",
      path: "/wishList",
    },
    {
      image: "https://www.svgrepo.com/show/485696/diamond.svg",
      title: "Premium",
      path: "/premium",
    },
    {
      image: "https://www.svgrepo.com/show/487692/profile.svg",
      title: "마이페이지",
      path: "/mypage",
    },
    {
      image: 'https://www.svgrepo.com/show/507772/logout.svg',
      title: '로그아웃',
      path: '/'
    }
  ]

  const [curLocation, setLocation] = useState('/accountbook');
  const [hoveredIdx, setHoveredIdx] = useState(99);

  const wishlist = useSelector(state => state.wishlist)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const logout =() => {
    alert('로그아웃합니다!');
    dispatch(setDataList([]))
    localStorage.clear();
    navigate('/')
  }

  const location = useLocation().pathname;
  useEffect(() => {
    setLocation(location)
    if(location === '/'){
      setIsHome(true)
    } else {
      setIsHome(false)
    }
  }, [location]);

  if(location === '/'
  || location === '/login'
  || location === '/signup'
  || location === '/paying'){
    return ''
  }

  if (location === "/" || location === "/login" || location === "/signup") {
    return "";
  }
  return (
    <Nav>
      <SidebarContainer>
        <LogoDiv>
          <LogoImg src={mainLogo}></LogoImg>
        </LogoDiv>
        <MenuDiv>
          <Menu>
          {menuList.map((el, idx) => {
            return idx < 3 ? (
              <div key={idx}>
                <UpperMenu
                  el={el}
                  idx={idx}
                  hoveredIdx={hoveredIdx}
                  setHoveredIdx={setHoveredIdx}
                  curLocation={curLocation}
                />
                {idx === 2 ? <DivideBar/> : null}
              </div>
            ) : (
              <LowerMenu
                el={el}
                idx={idx}
                hoveredIdx={hoveredIdx}
                setHoveredIdx={setHoveredIdx}
                curLocation={curLocation}
                logout={logout}
                key={idx}
              />
            );
          })}
          </Menu>
        </MenuDiv>
      </SidebarContainer>
    </Nav>
  )
}