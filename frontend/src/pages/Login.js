import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    axios
      const backendURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      axios.post(`${backendURL}/auth/login`, { email, password })
    
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          navigate("/main");
        }
      })
      .catch((error) => {
        console.error("There was an error logging in!", error);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full landing-background">
      <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              hover:border-black transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent
              hover:border-black transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="glow-button w-full"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
