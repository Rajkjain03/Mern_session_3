import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/authSlice';

const Signin = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5001/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: include credentials for cookies
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        dispatch(setCredentials({ token: data.token, user: { email } }));
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Signin error:', error);
      alert('An error occurred during sign in.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2>Sign In</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px' }} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px' }} 
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account?{' '}
        <button 
          type="button" 
          onClick={onToggle} 
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Signin;