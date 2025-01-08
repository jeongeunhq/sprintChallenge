import { styled } from "styled-components";
import logo from '/src/assets/logo.png';
import { Link, Outlet } from "react-router-dom";


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
  color: #6500C3;
  font-size: 20px;
  font-weight: bold;
  img {
    height: 28px;
    width: 50px;
    margin-right:5px; 
  }
`;

const ContentWrapper = styled.div`
  padding-top: 60px; 
`;

export default function Layout() {
  return (
    <ContentWrapper>
      <Wrapper>
        <Title>
          <Link to="/">
            <img src={logo} className="logo" alt="로고" />
          </Link>
          do it ;
        </Title>
      </Wrapper>
      <Outlet />
    </ContentWrapper>
  );
}
