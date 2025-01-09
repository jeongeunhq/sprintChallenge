import { useState, useEffect } from "react";
import todoIcon from '/src/assets/todo.png';  
import doneIcon from '/src/assets/done.png';  
import todoEmpty from '/src/assets/todoEmpty.png';  
import doneEmpty from '/src/assets/doneEmpty.png';
import { Link } from "react-router-dom";
import {
  Form, TextArea, SubmitBtn, Todo,
  TodoList, TodoItem, IconButton, ListsContainer, Done, DoneTodoList,
  DoneItem, EmptyImage
  
} from "../components/homeComponent";

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
            <>
            <EmptyImage src={todoEmpty} alt="할일 없음" />
            <p style={{
                 textAlign: "center",
                 marginTop: "10px",
                 marginLeft: "100px",
                 justifyContent: "center",
                 fontSize: "16px",
                 color: "#6B7280",
                 letterSpacing: "0.5px"
              }}>
                할 일이 없어요. <br/> TODO를 새롭게 추가해주세요!
              </p>
            </>
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
            <>
            <EmptyImage src={doneEmpty} alt="할일 없음" />
              <p style={{
                textAlign: "center",
                marginTop: "10px",
                marginLeft: "150px",
                justifyContent: "center",
                fontSize: "16px",
                color: "#6B7280",
                letterSpacing: "0.5px"
              }}>
                아직 다 한 일이 없어요. <br/> 해야할 일을 체크해보세요!
              </p>
          </>
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