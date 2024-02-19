import { useCallback, useLayoutEffect, useState } from "react";
import styled, { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme/Theme';
import { GlobalStyle } from '../Theme/global-style';
import { AiFillGithub } from "react-icons/ai";

const MenuBtn = styled.button`
  z-index: 9;
  position: absolute;
  left: 120px;
  margin: 10px;
  width: auto;
  height: auto;
  border: 0;
  background: none;
  cursor: pointer;
  @media screen and (max-width: 820px) {
    left: 15px;
  }
`;

const MenuBar = styled.div`
  z-index: 99;
  position: absolute;
  width: 380px;
  height: 0;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 17px;
  background: ${({ theme }: { theme: any }) => theme.barColor};
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  transition: all 0.4s ease;
  overflow: hidden;
  opacity: 0;
  overflow-y: scroll;
  &[data-isopen="false"] {
    height: 70%;
    opacity: 1;
  }
  @media screen and (max-width: 766px) {
    width: 40vh;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    &[data-isopen="false"] {
      height: 70%;
    }
  }

  @media screen and (orientation: landscape) and (max-width: 820px) {
    width: 70%;
    height: 100%;
    &[data-isopen="false"] {
      height: 70%;
    }
  }
`;

const CancelBtn = styled.button`
  position: relatuve;
  display: block;
  margin: 10px;
  background: none;
  border: 0;
  cursor: pointer;
`;
const IconLogo = styled.div`
  width: auto;
  display: block;
  margin: auto;
  padding: 20px;
`;
const AppName = styled.h3`
  margin: 0;
`;
const MyPage = styled.footer`
  background: ${({ theme }: { theme: any }) => theme.barColor};
  width: 100%;
`;
const MenuOption = styled.div`
  width: 100%;
  height: 300px;
  text-align: left;
`;
const BellAlert = styled.img`
width: 25px;
margin-right: 10px;
`
const MenuList = styled.div`
display: flex;
padding: 0 73px 0 73px; 
&:hover {
  background: #D3D3D3;
  cursor: pointer;
  color: black;
}
`
const ThemeBtn = styled.button`
position: absolute;
width: 40px;
height: 40px;
margin: 4px 0 0 0;
left: 86%;
border-radius: 50px;
@media screen and (max-width: 820px) {
  left: 82%;
}
`
const MenuBg = styled.div`
z-index: 20;
position: fixed;
width: 100%;
height: 100%;
background: #000000;
display: none;
&[data-isopen="false"] {
  display: block;
  background-color : rgb(0,0,0,0.5);
  backdrop-filter: blur(10px);
}
`
const LinkIcon = styled.a`
color: ${({ theme }: { theme: any }) => theme.textColor}
`

export const Header = () => {
  const [menu, setMenu] = useState<boolean>(true);
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = useCallback(() => {
    const updatedTheme = theme === "light" ? "dark" : "light";
    setTheme(updatedTheme);
    localStorage.setItem("theme", updatedTheme);
  }, [theme])

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && ["dark", "light"].includes(savedTheme)) {
      return setTheme(savedTheme);
    }
  }, []);

  const clickMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <MenuBg onClick={clickMenu} data-isopen={menu ? "true" : "false"} />
        <MenuBtn onClick={clickMenu}>
          {theme === 'light' ? <img src="./img/hamburger.svg" /> : <img src="./img/hamburger_inDark.svg" />}
        </MenuBtn>
        <ThemeBtn onClick={toggleTheme}>
          {theme === 'light' ? <img src="./img/Darkmode.svg" /> : <img src="./img/Light_inDark.svg" />}
        </ThemeBtn>
        <MenuBar data-isopen={menu ? "true" : "false"}>
          <CancelBtn onClick={clickMenu}>
            {theme === 'light' ? <img src="./img/Cancel.svg" /> : <img src="./img/Cancel_Dark.svg" />}
          </CancelBtn>
          <IconLogo>
            <img src="./img/icon.svg" />
          </IconLogo>
          <AppName>너의 타이머를 부탁해!!</AppName>
          <p>버전 1.0.0</p>
          <MenuOption>
            <MenuList>
              {theme === 'light' ? <BellAlert src="./img/Bell.svg" /> : <BellAlert src="./img/Bell_inDark.svg" />}
              <p>공지사항</p>
            </MenuList>
          </MenuOption>
          <MyPage>
            <LinkIcon href="https://github.com/NekoNyangYee/yourtimer">
              <AiFillGithub
                fontSize={35}
                style={{ padding: "20px" }}
              />
            </LinkIcon>
          </MyPage>
        </MenuBar>
      </ThemeProvider>

    </>
  );
};
