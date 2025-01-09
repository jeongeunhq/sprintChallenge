import styled from "styled-components";

export const Todo = styled.div<{ isCompleted: boolean }>`
  width: 100%; 
  height: 50px;
  font-size: 20px;
  background-color: ${({ isCompleted }) => (isCompleted ? '#DDD6FE' : '#FFFFFF')};
  border: 1px solid black;
  padding: 10px;
  display: flex;
  border-radius: 20px;
  justify-content: center;
  align-items: center;  
  text-align: center;

  @media (min-width: 768px) and (max-width: 2024px) {
    width: 996px;
    padding: 10px;
  }

  @media (min-width: 376px) and (max-width: 768px) {
    width: 696px;
    padding: 10px;
  }

  @media (max-width: 375px) {
    width: 343px;
    padding: 10px;
    text-align: center;
  }
`;


export const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px; 
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-top: 20px;

  @media (min-width: 768px) and (max-width: 2024px) {
   flex-direction: row;
  }
  @media (min-width: 376px) and (max-width: 768px) {
   flex-direction: column;
    gap: 20px; 
  }
  @media (max-width: 375px) {
   flex-direction: column;
    gap: 20px; 
  }
`;
export const Image = styled.div`
  width: 100%;
  height: 311px;
  border: 2px dashed #CBD5E1;
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  position: relative; 
  
  @media (min-width: 768px) and (max-width: 2024px) {
    width: 384px;
  }
  @media (min-width: 376px) and (max-width: 768px) {
    width: 696px;
  }
  @media (max-width: 375px) {
    width: 343px;
  }
`;

export const PlusIcon = styled.img`
  position: absolute;
  bottom: 10px; 
  right: 10px; 
  width: 64px;
  height: 64px; 
`;

export const Memo  = styled.div`
position: relative;
width: 100%;
height: 311px;
@media (min-width: 768px) and (max-width: 2024px) {
    width: 588px;
    padding: 10px;
  }
  @media (min-width: 376px) and (max-width: 768px) {
    width: 696px;
    padding: 10px;
  }
  @media (max-width: 375px) {
    width: 343px;
    padding: 10px;
    text-align: center;
  }

`;

export const MemoImage = styled.img`
  width: 100%; 
  height:100%;
`;

export const MemoTitle = styled.div`
  position: absolute;
  top: 30px; 
  left: 50%;
  transform: translateX(-50%); 
  font-size: 20px;
  font-weight: bold;
  color: #92400E;
`;
export const MemoText = styled.div`
  position: absolute;
  top: 60px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  font-size: 16px;
  color: #1E293B;
  overflow: auto;          
  max-height: calc(100% - 60px); 
  padding: 5px;
  word-break: break-word;  
  white-space: pre-wrap;   
  box-sizing: border-box;  
  scrollbar-color: #FDE68A #FDE68A; 
`;


export const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px; 
  @media (min-width: 768px) and (max-width: 2024px) {
   justify-content: flex-end;
  }
  @media (min-width: 376px) and (max-width: 768px) {
   justify-content: center;
  }
  @media (max-width: 375px) {
   justify-content: center;
`;

export const ButtonIcon = styled.img`
  width: 168px;
  height: 56px;
  cursor: pointer;
  &:hover {
    opacity: 0.8; 
  }
`;