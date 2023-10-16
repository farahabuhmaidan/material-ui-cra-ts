import * as React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Table from './Table';
import Wizard from './Wizard';
import './style.css'

export default function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/"> Members </Link> 
        <Link to="/wizard"> Join the Club </Link>
      </nav>
      <div className="tabs">
      <Routes>
        <Route path="/" element={<Table />} />
        <Route path="/wizard" element={<Wizard />} />
      </Routes>
      </div>
    </div>
  );
}
