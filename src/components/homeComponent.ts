import styled from "styled-components";

import EmptyAddLarge from '/src/assets/EmptyAddLarge.png';
import EmptyAddSmall from '/src/assets/EmptyAddSmall.png';
import AddLarge from '/src/assets/AddLarge.png';
import AddSmall from '/src/assets/AddSmall.png';

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
`;

export const TextArea = styled.textarea`
  border: 2px solid black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 20px;
  font-size: 16px;
  color: black;
  background-color: #F1F5F9;
  width: 100%; 
  max-width: 1016px; 
  height: 50px;
  resize: none;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #6500C3;
  }
  @media (min-width: 745px) and (max-width: 2024px) {
    width: 1016px;
    font-size: 14px;
    padding: 10px;
  }
  @media (min-width: 376px) and (max-width: 744px) {
    width: 578px;
    font-size: 14px;
    padding: 10px;
  }
  @media (max-width: 375px) {
    width: 280px;
    font-size: 24px;
    padding: 10px;
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
    width: 50px;
    height: 50px;
  }
`;

export const Todo = styled.div`
  background-color: #BEF264;
  color: #15803D;
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
`;

export const TodoItem = styled.li`
  margin-top: 20px;
  width: 100%; 
  max-width: 696px;
  background-color: #F1F5F9;
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
  @media (min-width: 375px) and (max-width: 744px) {
    flex-direction: column;
    width: 696px;
    align-items: center;
  }
  @media (max-width: 374px) {
    flex-direction: column;
    align-items: center;
    width: 344px;
  }
`;

export const Done = styled.div`
  background-color: #15803D;
  color: #FCD34D;
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
  background-color: #F1F5F9;
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
  margin-left:100px;
`;
