import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Contact from '../pages/Contact';
import ProtectedRoute from '../ProtectedRoute'; 

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path="/Contact" element={<Contact />} />

      </Routes>
    </Router>
  );
};

export default Routing;