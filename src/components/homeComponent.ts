import styled from "styled-components";
import EmptyAddLarge from "/src/assets/EmptyAddLarge.png";
import EmptyAddSmall from "/src/assets/EmptyAddSmall.png";
import AddLarge from "/src/assets/AddLarge.png";
import AddSmall from "/src/assets/AddSmall.png";

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 1016px;  
  box-sizing: border-box;

  @media (max-width: 1920px) {
    width: 1016px;
    padding: 8px;
  }

  @media (max-width: 744px) {
    width: 696px;
  }

  @media (max-width: 380px) {
    width: 90%;
    padding: 8px;
    text-align: center;
  }
`;


export const TextArea = styled.textarea`
  border: 2px solid black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 20px;
  font-size: 16px;
  color: black;
  background-color: #f1f5f9;
  width: 100%;
  height: 50px;
  resize: none;

  &::placeholder {
    font-size: 16px;
  }

  &:focus {
    outline: none;
    border-color: #6500c3;
  }

  @media (max-width: 1920px) {
    font-size: 14px;
    width: 100%;
    padding: 8px;
  }

  @media (max-width: 744px) {
    width: 90%;
    font-size: 14px;
  }

  @media (max-width: 380px) {
    width: 100%;
    font-size: 16px;
    padding: 8px;
    text-align: center;
  }
`;

export const SubmitBtn = styled.button<{ isEmpty: boolean }>`
  background: url(${(props) =>
    props.isEmpty ? EmptyAddLarge : AddLarge}) no-repeat center;
  background-size: contain;
  border: none;
  width: 168px;
  height: 50px;
  cursor: pointer;

  @media (max-width: 743px) {
    background: url(${(props) =>
      props.isEmpty ? EmptyAddSmall : AddSmall}) no-repeat center;
    width: 75px;
    height: 56px;
  }
`;

export const Todo = styled.div`
  background-color: #bef264;
  color: #15803d;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  width: auto;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

export const TodoList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 1920px;
`;

export const TodoItem = styled.li`
  margin-top: 20px;
  width: 100%;
  max-width: 696px;
  background-color: #f1f5f9;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IconButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 10px;
`;

export const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-top: 30px;
  width: 100%;
  justify-content: space-around;
  align-items: flex-start;

  @media (max-width: 744px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

export const Done = styled.div`
  background-color: #15803d;
  color: #fcd34d;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  width: auto;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

export const DoneTodoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

export const DoneItem = styled.li`
  margin-top: 20px;
  width: 100%;
  max-width: 696px;
  background-color: #f1f5f9;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: line-through;
`;

export const EmptyImage = styled.img`
  width: 240px;
  height: 240px;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
`;

export const Empty = styled.div` 
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
