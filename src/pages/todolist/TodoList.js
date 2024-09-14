import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import person from '../../../src/assets/person.svg';
import './TodoList.css';

const TodoList = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem(`todos_${user.email}`);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  const addTodo = () => {
    if (newTodo.title.trim() === '') {
      alert('Please provide a task title');
      return;
    }

    if (isEditing) {
      const updatedTodos = todos.map((todo, i) =>
        i === editIndex ? { ...todo, title: newTodo.title, description: newTodo.description } : todo
      );
      setTodos(updatedTodos);
      localStorage.setItem(`todos_${user.email}`, JSON.stringify(updatedTodos));
      setIsEditing(false);
      setEditIndex(null);
    } else {
      const updatedTodos = [...todos, { ...newTodo, completed: false }];
      setTodos(updatedTodos);
      localStorage.setItem(`todos_${user.email}`, JSON.stringify(updatedTodos));
    }

    setNewTodo({ title: '', description: '' });
    setShowTaskForm(false);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    localStorage.setItem(`todos_${user.email}`, JSON.stringify(updatedTodos));
  };

  const toggleCompletion = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem(`todos_${user.email}`, JSON.stringify(updatedTodos));
  };

  const handleEdit = (index) => {
    setNewTodo({ title: todos[index].title, description: todos[index].description });
    setIsEditing(true);
    setEditIndex(index);
    setShowTaskForm(true);
  };

  useEffect(() => {
    localStorage.setItem(`todos_${user.email}`, JSON.stringify(todos));
  }, [todos]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="profile-section">
          <img src={person} alt="Profile" className="profile-pic" />
          <h4>{user.name}</h4>
          <button onClick={handleLogout} className="logout-btn">Log out</button>
        </div>
      </aside>

      <main className="main-content">
        <div className="todo-list-header">
          <h2>My Tasks</h2>
          <button className="new-task-btn" onClick={() => setShowTaskForm(!showTaskForm)}>
            {showTaskForm ? 'Cancel' : isEditing ? 'Edit Task' : 'New Task'}
          </button>
        </div>

        {showTaskForm && (
          <div className="task-form">
            <input
              type="text"
              placeholder="Task Title"
              value={newTodo.title}
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Task Description"
              value={newTodo.description}
              onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            />
            <button onClick={addTodo} className="add-task-btn">
              {isEditing ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        )}

        <div className="todo-list">
          <ul>
            {todos.map((todo, index) => (
              <li key={index} className="todo-item">
                <div className="todo-status">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleCompletion(index)}
                  />
                  <span className={`status-label ${todo.completed ? 'completed' : 'incomplete'}`}>
                    {todo.completed ? 'Completed' : 'Incomplete'}
                  </span>
                </div>
                <div className={`task-content ${todo.completed ? 'task-completed' : ''}`}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                </div>
                <div className="task-actions">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default TodoList;
