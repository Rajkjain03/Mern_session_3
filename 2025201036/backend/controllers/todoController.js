import Todo from '../models/todoModel.js';

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    // Return todos in the format expected by lab: [{ id, title }]
    const formattedTodos = todos.map(todo => ({
      id: todo._id,
      title: todo.text,
      _id: todo._id, // Keep _id for frontend compatibility
      text: todo.text // Keep text for frontend compatibility
    }));
    res.status(200).json(formattedTodos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    if (!req.body.text) return res.status(400).json({ message: 'Text field is required' });
    
    const todo = await Todo.create({ text: req.body.text, user: req.user._id });
    // Return todo in the format expected by lab: { id, title }
    const formattedTodo = {
      id: todo._id,
      title: todo.text,
      _id: todo._id, // Keep _id for frontend compatibility
      text: todo.text // Keep text for frontend compatibility
    };
    res.status(201).json(formattedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Todo not found or not authorized' });
    }
    await todo.deleteOne();
    res.status(200).json({}); // Return empty object as required by lab
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};