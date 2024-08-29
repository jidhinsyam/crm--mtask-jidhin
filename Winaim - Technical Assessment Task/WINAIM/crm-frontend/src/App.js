 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Contacts from './components/Contacts';
import Opportunities from './components/Opportunities';
import Interactions from './components/Interactions';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/contacts">Contacts</Link></li>
            <li><Link to="/opportunities">Opportunities</Link></li>
            <li><Link to="/interactions">Interactions</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/interactions" element={<Interactions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
