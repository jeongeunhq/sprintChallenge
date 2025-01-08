import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface TodoItem {
  id: number;
  name: string;
  completed: boolean;
}

export default function Item() {
  const { tenantId, itemId } = useParams<{ tenantId: string; itemId: string }>();
  const [todoItem, setTodoItem] = useState<TodoItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodoItem = async () => {
      try {
        const response = await fetch(
          `https://assignment-todolist-api.vercel.app/api/${tenantId}/items/${itemId}`
        );

        if (!response.ok) {
          throw new Error("할 일 항목을 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        setTodoItem(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    };

    if (tenantId && itemId) {
      fetchTodoItem();
    }
  }, [tenantId, itemId]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!todoItem) {
    return <p>할 일 항목을 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <h1>할 일 상세</h1>
      <p>이름: {todoItem.name}</p>
      <p>완료 여부: {todoItem.completed ? "완료" : "미완료"}</p>
    </div>
  );
}
