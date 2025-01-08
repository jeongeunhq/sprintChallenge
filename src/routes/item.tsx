import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styled from "styled-components";
import todoIcon from '/src/assets/todo.png';  
import doneIcon from '/src/assets/done.png'; 
import img from '/src/assets/img.png'; 
import memo from '/src/assets/memo.png'; 
import Edit from '/src/assets/Edit.png'; 
import Plus from '/src/assets/Plus.png'; 
import EditDefault from '/src/assets/EditDefault.png'; 
import Delete from '/src/assets/Delete.png'; 

const Todo = styled.div`
  width: 100%; 
  height: 50px;
  font-size: 20px;
  background-color: #F1F5F9;
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

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px; /* 아이콘과 텍스트 사이 여백 */
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
  margin-top: 20px;

  @media (min-width: 768px) and (max-width: 2024px) {
   flex-direction: row;
  }
  @media (min-width: 376px) and (max-width: 768px) {
   flex-direction: column;
    gap: 20px; /* 세로로 정렬 시 간격 조정 */
  }
  @media (max-width: 375px) {
   flex-direction: column;
    gap: 20px; /* 세로로 정렬 시 간격 조정 */
  }
`;
const Image = styled.div`
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

const PlusIcon = styled.img`
  position: absolute;
  bottom: 10px; 
  right: 10px; 
  width: 64px;
  height: 64px; 
`;

const Memo  = styled.div`
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

const MemoImage = styled.img`
  width: 100%; 
  height:100%;
`;

const MemoText = styled.div`
  position: absolute;
  top: 20px; 
  left: 50%;
  transform: translateX(-50%); 
  font-size: 20px;
  font-weight: bold;
  color: #92400E;
`;

const ButtonWrapper = styled.div`
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

const ButtonIcon = styled.img`
  width: 168px;
  height: 56px;
  cursor: pointer;
  &:hover {
    opacity: 0.8; /* 마우스 오버 시 투명도 변경 */
  }
`;

export default function Item() {
  const { id } = useParams();
  const [todo, setTodo] = useState<any>(null);

  useEffect(() => {
    const fetchTodo = async () => {
        if (id) {
            try {
              const response = await fetch(`https://assignment-todolist-api.vercel.app/api/eunha/items/${id}`);
              if (response.ok) {
                const data = await response.json();
                setTodo(data);  // 응답을 상태에 저장
              } else {
                console.error("할 일 정보를 불러오는 데 실패했습니다.");
              }
            } catch (error) {
              console.error("Error fetching todo:", error);
            }
          }
        };
    
        fetchTodo();
      }, [id]);
  
  return (
    <>
    <Todo><Icon src={todo?.isCompleted ? doneIcon : todoIcon} alt="Todo Icon" />{todo?.name}</Todo>
    <Detail>
        <Image>
          <img src={img} alt="Todo" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          <PlusIcon src={Plus} alt="Add" />
        </Image>
        <Memo>
        <MemoText>memo</MemoText>
        <MemoImage src={memo} alt="Memo" />
        <ButtonWrapper>
            <ButtonIcon src={EditDefault} alt="Edit" />
            <ButtonIcon src={Delete} alt="Delete" />
          </ButtonWrapper>
        </Memo>
    </Detail>
    </>
  );
}