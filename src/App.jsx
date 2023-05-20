import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { BaseURLContext } from './contexts/Context';
import PostList from './components/PostList';
import PostDetails from './components/PostDetails';
import PostEdit from './components/PostEdit';
import PostAdd from './components/PostAdd';
import 'bootstrap/dist/css/bootstrap.css';

const BASEURL = 'http://localhost:7070';

export default function App() {
  return (
    <BaseURLContext.Provider value={BASEURL}>
      <Router>
        <Link to='/' className='btn btn-primary mb-3 mt-3 ms-3'>
          К списку
        </Link>
        <Routes>
          <Route path='/' element={<PostList />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/posts/:id/edit' element={<PostEdit />} />
          <Route path='/posts/new' element={<PostAdd />} />
          <Route path='*' element={<div>Not Found</div>} />
        </Routes>
      </Router>
    </BaseURLContext.Provider>
  );
}
