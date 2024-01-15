// routes/routes.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home';
import Error from './error';

const RoutesConfig = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<Error />} />
  </Routes>
);

export default RoutesConfig;
