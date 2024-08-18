import React from 'react';
import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import NoMatch from './pages/noMatch/NoMatch';
import PostProduct from './pages/product/PostProduct';
import UpdateProduct from './pages/product/UpdateProduct';




const App = () => {
  return (
    <>
  <Header/>
  <Routes>
    <Route path='/' element={<Dashboard/>} />
    <Route path='/product' element={<PostProduct/>} />
    <Route path='/product/:id' element={<UpdateProduct/>} />
    <Route path='*' element={<NoMatch/>} />
  </Routes>
  </>
  );
};

export default App;
