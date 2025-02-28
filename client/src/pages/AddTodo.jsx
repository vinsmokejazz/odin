import { useState } from "react";
import API from "../api/api";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/todo", { title });
      setMessage("Todo added successfully");
    } catch (error) {
      setMessage("Error adding todo");
    }
  };

  return (
    <div>
      <h2>Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Todo Title" required />
        <button type="submit">Add</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
