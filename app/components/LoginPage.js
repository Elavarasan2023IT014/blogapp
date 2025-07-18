'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import '../styles/Login.css';
import {  useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react"
import Image from 'next/image';

function LoginPage({ role }) {

  const { data: session } = useSession()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Fill the all filds!');
      return;
    }

    let userCredential = {
      username: username,
      password: password,
    }

    const res = await fetch('/api/auth/login', {
      method: 'POST', headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userCredential)
    });

    const data = await res.json();

    localStorage.setItem('token', data.success);

    localStorage.setItem('role', data.role);

    if (data.success && data.role == 'user') {
      localStorage.setItem('authenticated',true)
      router.replace('/');
    } else if (data.success && data.role == 'admin') {
      localStorage.setItem('role','admin');
      router.replace('/dashbord');
    }

  }

  const handleGithub = async(e) =>{
    
      e.preventDefault();
      await signIn('github',{callbackUrl: '/'});
  }

  return (
    <div className='login-container'>
      <h1>Login</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor='username'>Username:</label>
          <input type='text' placeholder='Enter Username' id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' placeholder='Enter Password' id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className='login-page-btn' type='submit'>Login</button>
        {role == 'user' && (
          <div className='user-options'>
            <p>
              <i>
                Don&apos;t have an account?{' '}
                <Link href="/register">
                  <span className="register-link">Register</span>
                </Link>
              </i>
            </p>
            <div className='last'>
              <div className='or'> or </div>
              <button onClick={handleGithub} className='github'><Image src='/github.png' alt='github' height={200} width={200} className='github'/></button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginPage;