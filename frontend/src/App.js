import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { DarkModeProvider } from "./components/DarkModeContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import Dashboard from "./components/Dashboard";
import Hugo from "./pages/Hugo";
import Inbox from "./pages/Inbox";
import Orders from "./pages/Orders";
import Stock from "./pages/Stock";
// import Home from "./pages/Home";

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainPage />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="hugo" element={<Hugo />} />
            <Route path="orders" element={<Orders />} />
            <Route path="stock" element={<Stock />} />
          </Route>
        </Routes>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
