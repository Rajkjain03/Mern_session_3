import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos, addTodo, deleteTodo } from '../features/todoSlice';
import { clearCredentials } from '../features/authSlice';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

const API_BASE_URL = 'http://localhost:5001/api';

const TodoList = () => {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/todos`, {
          credentials: 'include', // Ensures the login cookie is sent
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(setTodos(data));
        } else {
          dispatch(clearCredentials());
        }
      } catch (error) { console.error('Failed to fetch todos:', error); }
    };
    fetchTodos();
  }, [dispatch]);

  const handleAddTodo = async (text) => {
    try {
      const res = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        credentials: 'include',
      });
      if (res.ok) dispatch(addTodo(await res.json()));
    } catch (error) { console.error('Failed to add todo:', error); }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) dispatch(deleteTodo(id));
    } catch (error) { console.error('Failed to delete todo:', error); }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      dispatch(clearCredentials());
    } catch (error) { console.error('Logout failed:', error); }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <button onClick={handleLogout} style={{ float: 'right', padding: '8px', cursor: 'pointer' }}>Logout</button>
      <h1 style={{ color: '#333' }}>My To-Do List</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;