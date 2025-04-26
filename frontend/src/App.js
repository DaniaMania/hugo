import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import Dashboard from './components/Dashboard';
import Inbox from './pages/Inbox';
import Orders from './pages/Orders';
import Stock from './pages/Stock';
// import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<MainPage />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="orders" element={<Orders />} />
          <Route path="stock" element={<Stock />} />
        </Route>
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
  );
}

export default App;