//App.tsx
import React from 'react';
import './App.css';
import { Navbar, Home, Add } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/add' element={<Add />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
