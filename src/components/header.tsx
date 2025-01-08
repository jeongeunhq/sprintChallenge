import { useState, useEffect } from "react";
import { styled } from "styled-components";
import logo from '/src/assets/logo.png';
import LargeLogo from '/src/assets/LargeLogo.png';
import { Link, Outlet } from "react-router-dom";

// LogoImage에 isLargeScreen prop의 타입을 명시합니다.
interface LogoImageProps {
  isLargeScreen: boolean;
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center; 
  align-items: center;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px rgba(0, 0, 0, 0.1);
`;

const Title = styled.span`
  display: flex;
  align-items: center;
  max-width: 1190px;
  width: 100%;
`;

const LogoImage = styled.img<LogoImageProps>`  // 여기에 <LogoImageProps>를 추가하여 isLargeScreen을 prop으로 받음
  height: ${({ isLargeScreen }) => (isLargeScreen ? "40px" : "40px")};  // 화면 크기에 따라 높이 조정
  width: ${({ isLargeScreen }) => (isLargeScreen ? "151px" : "71px")};  // 화면 크기에 따라 너비 조정
  margin-right: 5px;
`;

const ContentWrapper = styled.div`
  padding-top: 60px; 
`;

export default function Layout() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768); // 화면 크기가 768px 이상일 때 Large 로고 표시

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <ContentWrapper>
      <Wrapper>
        <Title>
          <Link to="/">
            <LogoImage
              src={isLargeScreen ? LargeLogo : logo}
              alt="로고"
              isLargeScreen={isLargeScreen}  // isLargeScreen을 props로 전달
            />
          </Link>
        </Title>
      </Wrapper>
      <Outlet />
    </ContentWrapper>
  );
}
