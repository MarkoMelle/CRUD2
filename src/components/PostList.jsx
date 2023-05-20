import React, { useContext, useEffect, useState } from 'react';
import { BaseURLContext } from '../contexts/Context';
import { Link, useNavigate } from 'react-router-dom';
import './PostList.css';

export default function PostList() {
  const baseURL = useContext(BaseURLContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseURL}/posts`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setPosts(data));
  }, [baseURL]);

  return (
    <div className='container'>
      <button
        type='button'
        onClick={() => {
          navigate('/posts/new');
        }}
        className='btn btn-primary mb-3'
      >
        Создать
      </button>
      <ul className='list-group'>
        {posts.map((post) => (
          <li key={post.id} className='card mb-3'>
            <Link
              to={`/posts/${post.id}`}
              className='card-body card-link text-decoration-none'
            >
              {post.content}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
