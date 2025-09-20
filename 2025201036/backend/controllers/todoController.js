import Todo from '../models/todoModel.js';

export const getTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }); //
  res.status(200).json(todos);
};

export const createTodo = async (req, res) => {
  if (!req.body.text) return res.status(400).json({ message: 'Text field is required' });
  const todo = await Todo.create({ text: req.body.text, user: req.user._id }); //
  res.status(201).json(todo);
};

export const deleteTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo || todo.user.toString() !== req.user._id.toString()) {
    return res.status(404).json({ message: 'Todo not found or not authorized' });
  }
  await todo.deleteOne(); //
  res.status(200).json({ id: req.params.id });
};