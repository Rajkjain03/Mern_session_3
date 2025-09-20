import { createSlice } from '@reduxjs/toolkit';

// State structure as required by lab: { todos: [] }
const initialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload && todo.id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;