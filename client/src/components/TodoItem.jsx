export default function TodoItem({ todo }) {
  return (
    <div>
      <p>{todo.title}</p>
      <p>Status: {todo.done ? "Completed" : "Pending"}</p>
    </div>
  );
}
