import ProfilePage from '@/app/components/Profile'
import SessionWrapper from '@/app/components/SessionWrapper'
import React from 'react'

function Profile() {
  return (
    <div>
      <SessionWrapper>
        <ProfilePage />
      </SessionWrapper>
    </div>
  )
}

export default Profile