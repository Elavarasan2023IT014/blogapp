import LoginPage from '@/app/components/LoginPage'
import SessionWrapper from '@/app/components/SessionWrapper'
import React from 'react'

async function Login() {
  return (
    <div>
      <SessionWrapper>
        <LoginPage role='user'/>
      </SessionWrapper>
    </div>
  )
}

export default Login