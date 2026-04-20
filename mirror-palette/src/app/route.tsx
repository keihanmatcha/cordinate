import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Closet from './pages/Closet';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/closet" element={<Closet />} />
    </Routes>
  );
};
