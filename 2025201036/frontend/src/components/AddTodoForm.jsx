import React, { useState } from 'react';

const AddTodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddTodo(text);
    setText('');
  };
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input type="text" placeholder="Enter a new to-do..." value={text} onChange={(e) => setText(e.target.value)} style={{ padding: '8px', marginRight: '10px', width: '300px' }} />
      <button type="submit" style={{ padding: '8px 12px' }}>Add To-Do</button>
    </form>
  );
};
export default AddTodoForm;