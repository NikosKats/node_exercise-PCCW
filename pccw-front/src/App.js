// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './routes/routes';

function App() {
  return (
    <>
      <Router>
        <RoutesConfig />
      </Router>
    </>
  );
}

export default App;
