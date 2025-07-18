import BlogPage from '@/app/components/BlogPage'
import React from 'react'
import { cookies } from 'next/headers'

async function Dashbord() {
  const data = await cookies();
  const role = data.get('user-role')?.value;
  console.log(role);

  return (
    <div>
      {role == 'admin' && (<BlogPage/>)}
      {role != 'admin' && (<h1 style={{fontSize:'40px',textAlign:'center',color:'red',margin:'10px'}}>Admin Only access this page</h1>)}
    </div>
  )
}

export default Dashbord