import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/authSlice';

const Signup = ({ onToggle }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return alert('Passwords do not match!');
    }
    
    try {
      const res = await fetch('http://localhost:5001/signup', {
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
      console.error('Signup error:', error);
      alert('An error occurred during sign up.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2>Sign Up</h2>
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
        <input 
          type="password" 
          placeholder="Confirm Password" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
          required 
          style={{ padding: '10px' }} 
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>
          Sign Up
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account?{' '}
        <button 
          type="button" 
          onClick={onToggle} 
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
        >
          Sign In
        </button>
      </p>
    </div>
  );
};

export default Signup;