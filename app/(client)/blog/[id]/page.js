import Card from '@/app/components/Card';
import React from 'react'

async function page({params}) {
    const {id} = params;
    const res = await fetch(`https://blogapp-six-chi.vercel.app/api/blog/${id}`);
    const data = await res.json();
    const blog = data.data;
  return (
    <div>
        <Card name={blog.author} img={blog.img} title={blog.title} content={blog.content}/>
    </div>
  )
}

export default page