import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css';
import AllPost from './components/AllPost';
import CreatePost from './components/CreatePost';
import Home from './components/Home';

import Login from './components/Login';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Register from './components/Register';


function App() {
  return (
    <Router>
      <div className="wrapper">
        <Navbar/>
        <Routes>
          <Route path='/CreatePost' element={<Navigate to="/Register" replace/>}/>          
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/Register' element={<Register/>}/>
          <Route exact path='/Login' element={<Login/>}/>
          <Route exact path='/CreatePost' element={<CreatePost/>}/>
          <Route exact path='/AllPost' element={<AllPost/>}/>
          <Route path='*' element={<NotFound/>}/>  
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
