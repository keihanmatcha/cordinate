import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Closet from './pages/Closet';
import Register from './pages/Register';
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/closet" element={<Closet />} />
    </Routes>
  );
};
