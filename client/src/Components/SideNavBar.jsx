import { styled } from 'styled-components';
import { Link, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';

const Nav = styled.nav`
  position: fixed;
  width: 300px;
  height: 100%;
  background-color: #191919;
`
const SidebarContainer =  styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
`
const LogoDiv = styled.div`
  width: 100%;
`
const LogoImg = styled.img`
  width: 80%;
`
const DivideBar = styled.div`
  width: 100%;
  height: 3px;
  margin: ${props => props.margin};
  background-color: #C0C0C0;
`
const MenuDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Menu = styled.ul`
  position: relative;
  width: 100%;
  list-style-type: none;
  padding: 0px;
`
const MenuList = styled.li`
  position: relative;
  width: 100%;
  height: 30px;
  margin: 20px 0px;
  padding: 20px 0px;
  display: flex;
  align-items: center;
  border: 0px;
  background-color:#191919;
`
const MenuListDiv =styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  border: 0px;
  border-radius: 20px;
`
const MenuListImg = styled.img`
  position: absolute;
  width:40px;
  padding: 0px 20px;
  background-color: rgba(0, 0, 0, 0);
  filter: ${props => props.selected ? 
  'invert(56%) sepia(41%) saturate(7144%) hue-rotate(347deg) brightness(97%) contrast(101%)' : 
  'invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%)'};
  transition: 500ms;
  z-index: 5;
  &:hover{
    width: 45px;
    filter: invert(56%) sepia(41%) saturate(7144%) hue-rotate(347deg) brightness(97%) contrast(101%);
    & ~ .MenuListSpan{
      color:white;
      transform: translate(40px, 0px);
      opacity:1;
    }
    & ~ .MenuListDiv{
      background: linear-gradient(to right, #191919, #F9591D);
    }
  }
`
const MenuListSpan = styled.span`
  font-family: 'ChosunBg';
  width: 100%;
  margin-left: 50px;
  color: white;
  transition: 300ms;
  opacity:0;
  z-index: 3;
`
const LowerMenuImg = styled(MenuListImg)`
  width:30px;
  &:hover{
    width: 35px;
  }
`
const LowerMenuList = styled(MenuList)`
  margin: 15px 0px;
  padding: 10px 0px;
`
export default function SideNavBar(){
  const menuList = [
    {
      image: 'https://www.svgrepo.com/show/333903/dollar-circle.svg',
      title: '가계부',
      path:'/accountbook'
    },
    {
      image: 'https://www.svgrepo.com/show/340496/account.svg',
      title: '소비 패턴 분석',
      path:'/analysis'
    },
    {
      image: 'https://www.svgrepo.com/show/511145/star.svg',
      title: '위시리스트',
      path:'/wishList'
    },
    {
      image: 'https://www.svgrepo.com/show/485696/diamond.svg',
      title: 'Premium',
      path:'/premium'
    },
    {
      image: 'https://www.svgrepo.com/show/487692/profile.svg',
      title: '마이페이지',
      path:'/mypage'
    },
    {
      image: 'https://www.svgrepo.com/show/507772/logout.svg',
      title: '로그아웃',
      path:'/logout'
    }
  ]

  const [curLocation, setLocation] = useState('/accountbook');
  const [logoutModal, openLogoutModal] = useState(false);
  const askLogout = () => {
    openLogoutModal(true);
  }

  const location = useLocation();
  useEffect(() => {
    setLocation(location.pathname)
  }, [location.pathname]);
  console.log(logoutModal)
  if(location.pathname === '/'
  || location.pathname === '/login'){
    return ''
  }
  return(
    <Nav>
      <SidebarContainer>
        <LogoDiv>
          <LogoImg src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png'></LogoImg>
        </LogoDiv>
        <DivideBar margin='30px 0px' />
        <MenuDiv>
          <Menu>
            {menuList.slice(0, 3).map(el => {
              return(
              <Link to={el.path} className='navLink'>
                <MenuList>
                  <MenuListImg src={el.image} className='MenuListImg' selected={curLocation === el.path ? true : false }></MenuListImg>
                  <MenuListSpan className='MenuListSpan'>{el.title}</MenuListSpan>
                  <MenuListDiv className='MenuListDiv' />
                </MenuList>
              </Link>
              )
            })}
          </Menu>
        </MenuDiv>
        <DivideBar margin='50px 0px 180px 0px' />
        <Menu>
          {menuList.slice(3, 5).map(el => {
            return(
              <Link to={el.path} className='navLink'>
                <LowerMenuList>
                  <LowerMenuImg src={el.image} className='MenuListImg' selected={curLocation === el.path ? true : false }></LowerMenuImg>
                  <MenuListSpan className='MenuListSpan'>{el.title}</MenuListSpan>
                  <MenuListDiv className='MenuListDiv' />
                </LowerMenuList>
              </Link>
            )
          })}
          <Link to='/login' className='navLink'>
            <LowerMenuList>
              <LowerMenuImg
                src={menuList.at(-1).image}
                className='MenuListImg' 
                selected={curLocation === menuList.at(-1).path ? true : false }
                onClick={askLogout}></LowerMenuImg>
              <MenuListSpan className='MenuListSpan'>{menuList.at(-1).title}</MenuListSpan>
              <MenuListDiv className='MenuListDiv' />
            </LowerMenuList>
          </Link>
        </Menu>
      </SidebarContainer>
    </Nav>
  )
}