import React, { useContext, useState } from 'react';
import { BaseURLContext } from '../contexts/Context';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';

export default function PostAdd() {
  const [input, setInput] = useState('');
  const baseURL = useContext(BaseURLContext);
  const navigate = useNavigate();

  function handleChange(event) {
    setInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch(`${baseURL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: uuid(), content: input }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/');
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
            value={input}
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
