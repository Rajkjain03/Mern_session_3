import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TodoList from './components/TodoList';
import Signin from './components/Signin';
import Signup from './components/Signup';
import './index.css';

function App() {
  const { token } = useSelector((state) => state.auth); //
  const [showSignup, setShowSignup] = useState(false);
  const toggleForms = () => setShowSignup(!showSignup);

  return (
    <div className="app-container">
      {token ? (
        <TodoList /> //
      ) : showSignup ? (
        <Signup onToggle={toggleForms} />
      ) : (
        <Signin onToggle={toggleForms} /> //
      )}
    </div>
  );
}

export default App;