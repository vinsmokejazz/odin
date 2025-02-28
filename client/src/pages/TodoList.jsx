import { useEffect, useState } from "react";
import API from "../api/api";
import TodoItem from "../components/TodoItem";

export default function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await API.get("/todo");
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Todo List</h2>
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}
