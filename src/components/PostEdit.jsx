import React, { useContext, useEffect, useState } from 'react';
import { BaseURLContext } from '../contexts/Context';
import { useParams, useNavigate } from 'react-router-dom';
import './PostEdit.css';

export default function PostEdit() {
  const { id } = useParams();
  const baseURL = useContext(BaseURLContext);
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseURL}/posts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setPost(data.post));
  }, [baseURL, id]);

  function handleChange(event) {
    setPost({
      ...post,
      content: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`${baseURL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate(`/posts/${id}`);
    });
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='mt-5'>
        <div className='mb-3'>
          <label htmlFor='postContent' className='form-label'>
            Content:
          </label>
          <textarea
            className='form-control'
            id='postContent'
            value={post.content}
            onChange={handleChange}
            rows='5'
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary'>
          Отправить
        </button>
      </form>
    </div>
  );
}
