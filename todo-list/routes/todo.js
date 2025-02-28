const { Router } = require("express");
const todoRouter = Router();
const { TodoModel } = require("../db");

const {auth}=require("../middleware/auth");

// Create a new todo
todoRouter.post("/todo",auth,async function (req, res) {
  const userId = req.userId; // Ensure req.userId is set by middleware (e.g., auth middleware)

  const { title, done, deadline } = req.body;

  try {
    await TodoModel.create({
      userId,
      title,
      done: done || false,
      deadline,
    });
    res.status(201).json({ message: "Todo created" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create todo", error: error.message });
  }
});

// Get all todos for the authenticated user
todoRouter.get("/todo", auth, async function (req, res) {
  const userId = req.userId;

  try {
    const todos = await TodoModel.find({ userId }); // Corrected query to filter by userId
    if (!todos || todos.length === 0) {
      return res.status(404).json({ message: "No todos found" });
    }
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch todos", error: error.message });
  }
});

// Update a specific todo
todoRouter.put("/todo/:id", auth, async function (req, res) {
  const userId = req.userId;
  const todoId = req.params.id;

  const { title, done } = req.body;

  try {
    const todo = await TodoModel.findOne({ _id: todoId, userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Update the fields if provided
    todo.title = title !== undefined ? title : todo.title;
    todo.done = done !== undefined ? done : todo.done;

    await todo.save();
    res.status(200).json({ message: "Todo updated" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update todo", error: error.message });
  }
});

// Delete a specific todo
todoRouter.delete("/todo/:id", auth, async function (req, res) {
  const userId = req.userId;
  const todoId = req.params.id;

  try {
    const todo = await TodoModel.findOne({ _id: todoId, userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await TodoModel.deleteOne({ _id: todoId, userId });
    res.status(200).json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete todo", error: error.message });
  }
});

module.exports = {
  todoRouter
}
