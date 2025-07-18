'use client'
import React,{useState} from 'react';
import Link from 'next/link';
import '../styles/Register.css';
import { useRouter } from 'next/navigation';

function RegisterPage({role}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const router = useRouter();

    const handleSubmit = async(e) =>{

        e.preventDefault();

        if(!username || !password || !email){
            alert('Fill the all filds!');
            return;
        }

        const newUser = {
          username,
          email,
          password,
          role
        }

        const response = await fetch('/api/auth/register',{
          method : 'POST' , headers :{
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify(newUser)
        })

        const data = await response.json();

        console.log(data);

        if(data.success){
          router.replace('/login');
        }
    }

  return (
    <div className='reg-container'>
      <h1>Register</h1>
      <form className='reg-form' onSubmit={handleSubmit}>
        <div className='input-group'>
          <label htmlFor='username'>Username:</label>
          <input type='text' placeholder='Enter Username' id='username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </div>
        <div className='input-group'>
          <label htmlFor='mail'>Email:</label>
          <input type='email' placeholder='Enter Email' id='mail' name='mail' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password:</label>
          <input type='password' placeholder='Enter Password' id='password' name='password' value={password} onChange={(e)=> setPassword(e.target.value)} required/>
        </div>
        <button className='reg-btn' type='submit'>Register</button>
        <p>
          <i>
            Already have an account?{' '}
            <Link href="/login">
              <span className="login-link">Login</span>
            </Link>
          </i>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
