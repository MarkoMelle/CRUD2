import React, { useContext, useEffect, useState } from 'react';
import { BaseURLContext } from '../contexts/Context';
import { useParams, useNavigate } from 'react-router-dom';

export default function PostDetails() {
  const { id } = useParams();
  const baseURL = useContext(BaseURLContext);
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseURL}/posts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setPost(data.post))
      .catch((error) => setError(error.message));
  }, [baseURL, id]);

  function handleDelete() {
    fetch(`${baseURL}/posts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {})
      .catch((error) => setError(error.message));
    navigate(`/`);
  }

  function handleEdit() {
    navigate(`/posts/${id}/edit`);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='container mt-5'>
      <h1 className='mb-4'>Post Details</h1>
      <p className='mb-4'>{post.content}</p>
      <button
        type='button'
        onClick={handleEdit}
        className='btn btn-primary me-2'
      >
        Изменить
      </button>
      <button type='button' onClick={handleDelete} className='btn btn-danger'>
        Удалить
      </button>
    </div>
  );
}
