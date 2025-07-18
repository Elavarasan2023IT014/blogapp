import React from 'react'
import '../styles/Card.css'
import Link from 'next/link'
import Image from 'next/image'


function Card({ BlogID, role, name, img, title, content, onEdit, onDelete }) {

    return (
        <div>

            <div className='card'>

                <Image src={img} alt='title' height={300} width={300} className='blog-img' />
                <div className='content'>
                    <Link href={`/blog/${BlogID}`} className="blog-link">
                    <div className='blog-datas'>
                        <div className='author'>
                            <div className='author-initail'>{name.charAt(0).toUpperCase()}</div>
                            <h3 className='author-name'>{name}</h3>
                        </div>
                        <div className='article'>
                            <h2 className='blog-title'>Title: {title}</h2>
                            <p className='blog-content'>{content}</p>
                        </div>
                    </div>
                    </Link>
                    {role == 'admin' && (
                        <div className='btn-container'>
                            <button className='btn btn-upt' onClick={onEdit}><Image src='/edit.png' alt='edit' height={200} width={200} className='btn-img' /></button>
                            <button className='btn btn-dlt' onClick={onDelete}><Image src='/delete.png' alt='delete' height={200} width={200} className='btn-img' /></button>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

export default Card