import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import TodoList from "./pages/TodoList";
import AddTodo from "./pages/AddTodo";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<TodoList />} />
        <Route path="/add-todo" element={<AddTodo />} />
      </Routes>
    </Router>
  );
}

export default App;
