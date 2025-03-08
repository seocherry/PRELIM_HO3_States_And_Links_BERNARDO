import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Home Page
const Home = () => (
  <div className="container">
    <h1>Welcome!</h1>
    <p>to my ReactJS Application!</p>
  </div>
);

const PropsPage = ({ message }) => (
  <div className="container">
    <h1>{message}</h1>
  </div>
);

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addItem = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addItem();
    }
  };

  const removeItem = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
  };

  const saveEdit = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === editIndex ? editText : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText("");
  };

  const handleEditKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add new task"
      />
      <button className="add-btn" onClick={addItem}>
        Add
      </button>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            {editIndex === index ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyPress={handleEditKeyPress}
              />
            ) : (
              <span>{todo}</span>
            )}
            {editIndex === index ? (
              <button className="save-btn" onClick={saveEdit}>
                Save
              </button>
            ) : (
              <>
                <button className="edit-btn" onClick={() => startEdit(index)}>
                  ✏️
                </button>
                <button
                  className="delete-btn"
                  onClick={() => removeItem(index)}
                >
                  ❌
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Navigation Bar
const Navbar = () => (
  <nav className="navbar">
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/props">Props Page</Link>
      </li>
      <li>
        <Link to="/todo">Todo List</Link>
      </li>
    </ul>
  </nav>
);

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/props" element={<PropsPage message="Hello World!" />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </Router>
  );
};

export default App;
