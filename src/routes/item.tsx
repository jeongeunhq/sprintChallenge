//할 일일 목록 상세 페이지

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import todoIcon from '/src/assets/todo.png';  
import doneIcon from '/src/assets/done.png'; 
import img from '/src/assets/img.png'; 
import memo from '/src/assets/memo.png'; 
import Edit from '/src/assets/Edit.png'; 
import Plus from '/src/assets/Plus.png'; 
import EditDefault from '/src/assets/EditDefault.png'; 
import EditDone from '/src/assets/EditDone.png';
import Delete from '/src/assets/Delete.png'; 
import {
  Todo,
  Icon,
  Detail, Image, PlusIcon, Memo, MemoImage, MemoTitle, ButtonWrapper,
  ButtonIcon, MemoText
} from "../components/itemComponent";

export default function Item() {
  const { id } = useParams(); // useParams 훅을 사용하여 URL에서 id 추출
  const [todo, setTodo] = useState<any>(null); // 할 일 객체 저장
  const [isEditingMemo, setIsEditingMemo] = useState<boolean>(false); // 메모 편집 상태
  const [memoText, setMemoText] = useState<string>(''); // 메모 내용
  const [isEditingName, setIsEditingName] = useState<boolean>(false); // 이름 편집 상태
  const [newTodoName, setNewTodoName] = useState<string>(''); // 새 할 일 이름
  const navigate = useNavigate(); //페이지 이동 

// 컴포넌트가 마운트될 때 할 일 데이터 가져오기
  useEffect(() => {
    const fetchTodo = async () => {
      if (id) {
        try {
          const response = await fetch(`https://assignment-todolist-api.vercel.app/api/eunha/items/${id}`);
          if (response.ok) {
            const data = await response.json();
            setTodo(data);  //할 일 데이터 설정
            setMemoText(data.memo || ''); //메모 내용 초기화
            setNewTodoName(data.name || ''); //할 일 이름 초기화 
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

  //이미지 업로드 함수 
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/eunha/images/upload`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data.url);
  
        if (id) {
          const updateResponse = await fetch(`https://assignment-todolist-api.vercel.app/api/eunha/items/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imageUrl: data.url }),
          });
  
          if (updateResponse.ok) {
            console.log("이미지가 할 일에 성공적으로 업데이트되었습니다.");
  
            // 상태 업데이트를 통해 UI가 즉시 리렌더링되도록 함
            setTodo((prevTodo: any) => ({
              ...prevTodo,
              imageUrl: data.url,
            }));
          } else {
            console.error("이미지 URL 업데이트에 실패했습니다.");
          }
        }
      } else {
        console.error("이미지 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  // 플러스 버튼 클릭 시 이미지 추가 입력창 열기
  const handlePlusClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        await handleImageUpload(target.files[0]);
      }
    };
    input.click();
  };
// 메모 편집 상태로 전환하는 함수
  const handleMemoClick = () => {
    setIsEditingMemo(true);
  };
// 메모 내용 변경 처리 함수
  const handleMemoChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemoText(event.target.value);
  };
// 메모 입력창에서 포커스를 잃었을 때 메모 저장
  const handleMemoBlur = async () => {
    setIsEditingMemo(false);
    await updateMemo();
  };
// 메모 입력창에서 Enter 키 입력 시 메모 저장
  const handleMemoKeyDown = async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setIsEditingMemo(false);
      await updateMemo();
    }
  };
// 메모 업데이트 함수
  const updateMemo = async () => {
    if (!id) return;

    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/eunha/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ memo: memoText }),
      });

      if (response.ok) {
        console.log("메모가 성공적으로 수정되었습니다.");
      } else {
        console.error("메모 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating memo:", error);
    }
  };
// 할 일 이름 편집 상태로 전환하는 함수
  const handleNameClick = () => {
    setIsEditingName(true);
  };
  // 할 일 이름 변경 처리 함수
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(event.target.value);
  };
// 할 일 이름 입력창에서 포커스를 잃었을 때 이름 저장
  const handleNameBlur = async () => {
    setIsEditingName(false);
    await updateTodoName();
  };
// 할 일 이름 업데이트 함수
  const updateTodoName = async () => {
    if (!id || !newTodoName) return;

    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/eunha/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newTodoName }),
      });

      if (response.ok) {
        console.log("할 일 이름이 성공적으로 수정되었습니다.");
      } else {
        console.error("할 일 이름 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating todo name:", error);
    }
  };
// 완료 상태 토글 함수
  const handleToggleCompletion = async () => {
    if (!id) return;

    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/eunha/items/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isCompleted: !todo?.isCompleted }),
      });

      if (response.ok) {
        setTodo((prevTodo: any) => ({
          ...prevTodo,
          isCompleted: !prevTodo.isCompleted,
        }));
        console.log("할 일 완료 상태가 변경되었습니다.");
      } else {
        console.error("할 일 완료 상태 변경에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

// 삭제 버튼 클릭 시 항목 삭제
  const handleDelete = async () => {
    if (!id) return;

    try {
      const response = await fetch(`https://assignment-todolist-api.vercel.app/api/eunha/items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log("할 일이 성공적으로 삭제되었습니다.");
        navigate('/');
      } else {
        console.error("할 일 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const isEditDone = memoText && todo?.imageUrl;

  return (
    <>
      <Todo isCompleted={todo?.isCompleted}>
        <Icon src={todo?.isCompleted ? doneIcon : todoIcon} alt="Todo Icon" onClick={handleToggleCompletion} />
        {isEditingName ? (
          <input
            value={newTodoName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            autoFocus
            style={{ border: '1px solid white', padding: '10px', borderRadius:'20px' ,outline: 'none', fontSize: '20px' }}
          />
        ) : (
          <span onClick={handleNameClick} style={{ cursor: 'pointer', textDecoration:'underline' }}>
            {todo?.name}
          </span>
        )}
      </Todo>
      <Detail>
        <Image>
          <img
            src={todo?.imageUrl || img}
            alt="Todo"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
          {todo?.imageUrl ? (
            <PlusIcon
              src={Edit}
              alt="Edit Image"
              onClick={handlePlusClick}  
            />
          ) : (
            <PlusIcon
              src={Plus}
              alt="Add Image"
              onClick={handlePlusClick}  
            />
          )}
        </Image>

        <Memo onClick={handleMemoClick} style={{ position: 'relative', cursor: 'pointer' }}>
          <MemoImage src={memo} alt="Memo" />
          {isEditingMemo ? (
            <textarea
              value={memoText}
              onChange={handleMemoChange}
              onBlur={handleMemoBlur}
              onKeyDown={handleMemoKeyDown}
              autoFocus
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'transparent',
                color: '#000',
                border: 'none',
                outline: 'none',
                resize: 'none',
                fontSize: '16px',
                padding: '20px',
                overflow: 'auto',      
                boxSizing: 'border-box'
              }}
            />
          ) : (
            <>
              <MemoTitle>Memo</MemoTitle>
              <MemoText>{memoText}</MemoText>
            </>
          )}
          <ButtonWrapper>
            <ButtonIcon onClick={() => navigate('/')} src={isEditDone ? EditDone : EditDefault} alt={isEditDone ? "Done Editing" : "Edit"} />
            <ButtonIcon onClick={handleDelete} src={Delete} alt="Delete Todo" />
          </ButtonWrapper>
        </Memo>
      </Detail>
    </>
  );
}
