import { useState, useEffect } from "react";
import styled from "styled-components";
import todoIcon from '/src/assets/todo.png';  
import doneIcon from '/src/assets/done.png';  
import todoEmpty from '/src/assets/todoEmpty.png';  
import doneEmpty from '/src/assets/doneEmpty.png';
import EmptyAddLarge from '/src/assets/EmptyAddLarge.png';
import EmptyAddSmall from '/src/assets/EmptyAddSmall.png';
import AddLarge from '/src/assets/AddLarge.png';
import AddSmall from '/src/assets/AddSmall.png';
import { Link } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 20px;
`;

const TextArea = styled.textarea`
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
  @media (min-width: 768px) and (max-width: 2024px) {
    width: 1016px;
    font-size: 14px;
    padding: 10px;
  }
  @media (min-width: 376px) and (max-width: 768px) {
    width: 578px;
    font-size: 14px;
    padding: 10px;
  }
  @media (max-width: 375px) {
    width: 250px;
    font-size: 24px;
    padding: 10px;
    text-align: center;
  }
`;

const SubmitBtn = styled.button<{ isEmpty: boolean }>`
  background: url(${(props) =>
    props.isEmpty ? EmptyAddLarge : AddLarge}) no-repeat center;
  background-size: contain;
  border: none;
  width: 168px;
  height: 50px;
  cursor: pointer;
  @media (max-width: 768px) {
    background: url(${(props) =>
      props.isEmpty ? EmptyAddSmall : AddSmall}) no-repeat center;
    width: 50px;
    height: 50px;
  }
`;

const Todo = styled.div`
  background-color: #BEF264;
  color: #15803D;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  width: auto;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

const TodoList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 580px;
  min-width: 300px;
`;

const TodoItem = styled.li`
  margin-top: 20px;
  width: 550px;
  background-color: #F1F5F9;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconButton = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 10px;
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  margin-top: 30px;
  width: 100%;
  justify-content: space-around;
  align-items: flex-start;
  @media (min-width: 400px) and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 399px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Done = styled.div`
  background-color: #15803D;
  color: #FCD34D;
  border-radius: 20px;
  display: inline-block;
  text-align: center;
  width: auto;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

const DoneTodoList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%; 
  max-width: 580px;
  min-width: 300px;
`;

const DoneItem = styled.li`
  margin-top: 20px;
  width: 550px;
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

const EmptyImage = styled.img`
  width: 200px;
  height: auto;
  margin-top: 20px;
  margin-left:100px;
`;

export default function Home() {
  const [tenantId, setTenantId] = useState<string>("eunha");
  const [todo, setTodo] = useState<string>(""); 
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]); 

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items`);
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);  // 응답 데이터를 확인
  
          if (Array.isArray(data)) {  // 응답 데이터가 배열 형식이라면
            const fetchedTodos = data.map((item: { id: number; name: string; isCompleted: boolean }) => ({
              id: item.id,
              text: item.name,  // 'name'을 'text'로 매핑
              completed: item.isCompleted,  // 'isCompleted'를 'completed'로 매핑
            }));
            setTodos(fetchedTodos);  // 상태 업데이트
          } else {
            console.error("No valid items in the response");
          }
        } else {
          console.error("Failed to fetch todos");
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
  
    fetchTodos();
  }, [tenantId]);
  
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo(e.target.value);
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTodo = todo.trim(); 
    if (trimmedTodo) {
      try {
        const response = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: trimmedTodo }),
        });

        if (!response.ok) {
          throw new Error("할 일 추가 실패");
        }

        setTodos((prevTodos) => [
          ...prevTodos,
          { id: Date.now(), text: trimmedTodo, completed: false },
        ]);
        
        setTodo(""); 
      } catch (error) {
        console.error(error);
        alert("할 일 추가 실패");
      }
    } else {
      alert("할 일을 입력해주세요!"); 
    }
  };

  const toggleTodo = async (id: number) => {
    try {
      // 먼저 로컬에서 상태를 업데이트
      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
  
      // API로 PATCH 요청 보내기
      const todoToUpdate = todos.find((item) => item.id === id);
      if (todoToUpdate) {
        const response = await fetch(
          `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isCompleted: !todoToUpdate.completed, // 완료 상태를 반대로 변경
            }),
          }
        );
  
        if (!response.ok) {
          throw new Error("할 일 상태 변경 실패");
        }
      }
    } catch (error) {
      console.error(error);
      alert("할 일 상태 변경 실패");
    }
  };
  

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <TextArea
          required
          rows={1}
          value={todo}
          onChange={handleInputChange}
          placeholder="할 일을 입력해주세요"
        />
        <SubmitBtn type="submit" isEmpty={todos.length === 0} />
      </Form>

      <ListsContainer>
        <TodoList>
          <Todo>To do</Todo>
          {todos.filter((item) => !item.completed).length === 0 ? (
            <EmptyImage src={todoEmpty} alt="할일 없음" />
          ) : (
            todos
              .filter((item) => !item.completed)
              .map((item) => (
                <TodoItem key={item.id}>
                  <div>
                    <IconButton
                      src={todoIcon}
                      alt="To do"
                      onClick={() => toggleTodo(item.id)}
                    />
                    <Link to={`/items/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                      {item.text}
                    </Link>
                  </div>
                </TodoItem>
              ))
          )}
        </TodoList>

        <DoneTodoList>
          <Done>Done</Done>
          {todos.filter((item) => item.completed).length === 0 ? (
            <EmptyImage src={doneEmpty} alt="할일 없음" />
          ) : (
            todos
              .filter((item) => item.completed)
              .map((item) => (
                <DoneItem key={item.id}>
                  <div>
                    <IconButton
                      src={doneIcon}
                      alt="Done"
                      onClick={() => toggleTodo(item.id)}
                    />
                    <Link to={`/items/${item.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                      {item.text}
                    </Link>
                  </div>
                </DoneItem>
              ))
          )}
        </DoneTodoList>
      </ListsContainer>
    </div>
  );
}