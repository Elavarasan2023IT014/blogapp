'use client';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import uuid from 'react-uuid';
import '../styles/BlogPage.css';

function BlogPage() {
  const [role, setRole] = useState('user');
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blog, setBlog] = useState([]);
  const [image, setImage] = useState(null);
  const [editID, setEditingId] = useState('');
  const [btn, setBtn] = useState('Add');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }

    const fetchData = async () => {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setBlog(data.Blogdata || []);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !title || !content || !image) {
      alert('Please fill all fields!');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'mahaveer');

    const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/dkn3it92b/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const imageData = await cloudinaryRes.json();
    const imgUrl = imageData.secure_url;

    const newBlog = {
      id: uuid(),
      author: name,
      title: title,
      content: content,
      img: imgUrl,
    };

    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBlog),
    });

    const data = await response.json();
    setBlog([...blog, newBlog]);
    setName('');
    setTitle('');
    setContent('');
    setImage(null);
    setShowModal(false);
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    if (!name || !title || !content) {
      alert('Please fill all fields!');
      return;
    }

    const editBlog = {
      id: editID,
      author: name,
      title: title,
      content: content,
      img: image,
    };

    const res = await fetch('/api/blog', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editBlog),
    });

    const data = await res.json();
    setBlog(blog.map((item) => (item.id === editID ? editBlog : item)));
    setName('');
    setTitle('');
    setContent('');
    setImage(null);
    setShowModal(false);
    setBtn('Add');
  };

  const handleDelete = async (id) => {
    await fetch('/api/blog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    setBlog(blog.filter((item) => item.id !== id));
  };

  const editPreLoad = (blog) => {
    setEditingId(blog.id);
    setName(blog.author);
    setTitle(blog.title);
    setContent(blog.content);
    setImage(blog.img);
    setBtn('Edit');
    setShowModal(true);
  };

  return (
    <div className="blog-page-container">
      <div className="blog-list">
        {blog.length === 0 ? (
          <p className="no-blogs">No Blogs Found</p>
        ) : (
          blog.map((data) => (
            <div key={data.id} className="py-4">
              <Card
                BlogID={data.id}
                role={role}
                name={data.author}
                img={data.img}
                title={data.title}
                content={data.content}
                onEdit={() => editPreLoad(data)}
                onDelete={() => handleDelete(data.id)}
              />
            </div>
          ))
        )}
      </div>

      {role === 'admin' && (
        <button className="create-btn" onClick={() => setShowModal(true)}>
          +
        </button>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <form onSubmit={btn === 'Add' ? handleSubmit : handleEdit} className="blog-form">
              <h2 className="form-heading">{btn === 'Add' ? 'Create a Blog' : 'Edit Blog'}</h2>
              <div className="input-group">
                <label htmlFor="name">Author Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter Your Name"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="title">Blog Title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter the Title"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="content">Content</label>
                <textarea
                  id="content"
                  placeholder="Enter Content"
                  className="form-textarea"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label htmlFor="image">Upload Image</label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="form-file"
                  onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                />
              </div>
              <div className="form-btn-group">
                <button type="submit" className="submit-btn">
                  {btn}
                </button>
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => {
                    setShowModal(false);
                    setBtn('Add');
                    setName('');
                    setTitle('');
                    setContent('');
                    setImage(null);
                  }}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPage;