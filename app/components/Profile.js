'use client'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image';
import '../styles/Profile.css';

function ProfilePage() {
  const { data: session } = useSession();

  if(!session){
    return<div>You Must be Login to See this Page...</div>
  }

  return (
    <div>
      {session && (
        <div className='user-container'>
          <div className='user-card'>
            <Image src={session.user?.image} height={200} width={200} alt='user img' className='user-img'/>
            <div className='user-info'>
              <h2>Welcome <span>{session.user.name}</span></h2>
              <h3>Email: {session.user.email}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
