//  TODO 관리 기능을 제공하는 메인 페이지지

import { useState, useEffect } from "react";
import todoIcon from '/src/assets/todo.png';  
import doneIcon from '/src/assets/done.png';  
import todoEmpty from '/src/assets/todoEmpty.png';  
import doneEmpty from '/src/assets/doneEmpty.png';
import { Link } from "react-router-dom";
import {
  Form, TextArea, SubmitBtn, Todo,
  TodoList, TodoItem, IconButton, ListsContainer, Done, DoneTodoList,
  DoneItem, EmptyImage, Empty
  
} from "../components/homeComponent";

export default function Home() {
  // 상태 관리: tenantId, 현재 입력 중인 할 일, 할 일 목록을 관리
  const [tenantId, setTenantId] = useState<string>("eunha");  //tenantId 초기값 저장장
  const [todo, setTodo] = useState<string>("");  // 입력 중인 할 일 텍스트
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([]); 

  useEffect(() => {
    const fetchTodos = async () => {
      setTenantId("eunha");
      try {
        const response = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items`);
        if (response.ok) {
          const data = await response.json();
  
          if (Array.isArray(data)) {  
            // API 응답 데이터를 상태 형식에 맞게 변환
            const fetchedTodos = data.map((item: { id: number; name: string; isCompleted: boolean }) => ({
              id: item.id,
              text: item.name,  
              completed: item.isCompleted,  
            }));
            setTodos(fetchedTodos);  // 변환된 할 일 목록을 상태로 설정
          } else {
            console.error("todo 목록 에러");
          }
        } else {
          console.error("todo 목록 에러");
        }
      } catch (error) {
        console.error("todo 목록 에러", error);
      }
    };
  
    fetchTodos(); // 할 일 목록 가져오기 호출
  }, [tenantId]); // tenantId가 변경될 때마다 재실행
  
  // 할 일 입력 필드 변경 시 호출되는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodo(e.target.value); // 입력된 값으로 상태 업데이트
  };

   // 할 일 추가 시 호출되는 함수
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    const trimmedTodo = todo.trim();  // 입력된 할 일 텍스트 공백 제거
    // 입력 값이 비어있지 않으면 실행
    if (trimmedTodo) { 
      // API 요청을 통해 새로운 할 일 추가
      try {
        const response = await fetch(`https://assignment-todolist-api.vercel.app/api/${tenantId}/items`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: trimmedTodo }), // 할 일 텍스트를 요청 본문으로 전송
        });

        if (!response.ok) {
          throw new Error("할 일 추가 실패");
        }
       // 할 일 목록 상태에 새로 추가된 항목을 추가
        setTodos((prevTodos) => [
          ...prevTodos,
          { id: Date.now(), text: trimmedTodo, completed: false },
        ]);
        
        setTodo("");  // 입력 필드 초기화
      } catch (error) {
        console.error(error);
        alert("할 일 추가 실패");
      }
    } else {
      alert("할 일을 입력해주세요!");  // 입력이 비어 있을 경우 알림 표시
    }
  };

  // 할 일 완료 여부 토글 시 호출되는 함수
  const toggleTodo = async (id: number) => {
    // 먼저 로컬 상태에서 할 일 완료 여부를 토글
    try {
      // 먼저 로컬에서 상태를 업데이트
      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
  
      // API 요청을 통해 할 일 완료 상태 업데이트
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
              isCompleted: !todoToUpdate.completed, // 완료 상태를 반대로 변경하여 전송
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
            <Empty>
            <EmptyImage src={todoEmpty} alt="할일 없음" />
            <p style={{
                 textAlign: "center",
                 marginTop: "10px",
                 justifyContent: "center",
                 fontSize: "16px",
                 color: "#6B7280",
                 letterSpacing: "0.5px"
              }}>
                할 일이 없어요. <br/> TODO를 새롭게 추가해주세요!
              </p>
            </Empty>
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
            <Empty>
            <EmptyImage src={doneEmpty} alt="할일 없음" />
              <p style={{
                textAlign: "center",
                marginTop: "10px",
                justifyContent: "center",
                fontSize: "16px",
                color: "#6B7280",
                letterSpacing: "0.5px"
              }}>
                아직 다 한 일이 없어요. <br/> 해야할 일을 체크해보세요!
              </p>
          </Empty>
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