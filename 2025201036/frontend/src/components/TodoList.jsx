import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos, addTodo, deleteTodo } from '../features/todoSlice';
import { clearCredentials } from '../features/authSlice';
import AddTodoForm from './AddTodoForm';
import TodoItem from './TodoItem';

const TodoList = () => {
  const { todos } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('http://localhost:5001/todos', {
          credentials: 'include', // Ensures the login cookie is sent
        });
        
        if (res.ok) {
          const data = await res.json();
          dispatch(setTodos(data));
        } else {
          // If unauthorized, clear credentials
          dispatch(clearCredentials());
        }
      } catch (error) { 
        console.error('Failed to fetch todos:', error);
        dispatch(clearCredentials());
      }
    };
    fetchTodos();
  }, [dispatch]);

  const handleAddTodo = async (text) => {
    try {
      const res = await fetch('http://localhost:5001/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
        credentials: 'include',
      });
      
      if (res.ok) {
        const newTodo = await res.json();
        dispatch(addTodo(newTodo));
      } else {
        console.error('Failed to add todo');
      }
    } catch (error) { 
      console.error('Failed to add todo:', error); 
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/todos/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (res.ok) {
        dispatch(deleteTodo(id));
      } else {
        console.error('Failed to delete todo');
      }
    } catch (error) { 
      console.error('Failed to delete todo:', error); 
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5001/logout', {
        method: 'POST',
        credentials: 'include',
      });
      dispatch(clearCredentials());
    } catch (error) { 
      console.error('Logout failed:', error);
      dispatch(clearCredentials()); // Clear anyway
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: '#333', margin: 0 }}>My To-Do List</h1>
        <button 
          onClick={handleLogout} 
          style={{ 
            padding: '8px 16px', 
            cursor: 'pointer',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Logout
        </button>
      </div>
      <AddTodoForm onAddTodo={handleAddTodo} />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {todos.map((todo) => (
          <TodoItem key={todo._id || todo.id} todo={todo} onDelete={handleDelete} />
        ))}
      </ul>
      {todos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '40px' }}>
          No todos yet. Add one above!
        </p>
      )}
    </div>
  );
};

export default TodoList;