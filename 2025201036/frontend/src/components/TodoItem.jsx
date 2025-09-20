import React from 'react';

const TodoItem = ({ todo, onDelete }) => (
  <li style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
    <span style={{ flexGrow: 1 }}>{todo.text}</span>
    <button onClick={() => onDelete(todo._id)} style={{ backgroundColor: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
  </li>
);
export default TodoItem;