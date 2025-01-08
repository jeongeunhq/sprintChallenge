import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import Item from "./routes/item";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import Header from "./components/header";

const router = createBrowserRouter([
  {
    path: "/", // 기본 경로 설정
    element: <Header />,
    children: [
      {
        path: "/", // "/" 경로에 Home 컴포넌트를 렌더링
        element: <Home />,
      },
      {
        path: "/items/:tenantId/:itemId", // "item" 경로에 Item 컴포넌트를 렌더링
        element: <Item />,
      },
    ],
  },
]);

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: NanumSquare;
  }
`;

function App() {
  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  );
}

export default App;
