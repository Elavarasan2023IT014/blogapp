import React from 'react'
import { cookies } from 'next/headers';

async function Profile() {
    const data = await cookies();
    const role = data.get('user-role')?.value;

  return (
    <div>
      {role == 'admin' && (<div>This is admin profile</div>)}
      {role != 'admin' && (<h1 style={{fontSize:'40px',textAlign:'center',color:'red',margin:'10px'}}>Admin Only access this page</h1>)}
    </div>
  )
}

export default Profile