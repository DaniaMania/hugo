import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    axios
      .post("http://localhost:4000/auth/login", { email, password })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("userEmail", email);
          navigate("/main");
        }
      })
      .catch((error) => {
        console.error("Logging in error", error);
      });
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Spline 3D Animation */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene="https://prod.spline.design/wYdGPJF-yvKMW4RI/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
          className="w-full h-full"
        />
      </div>

      {/* Login form overlay */}
      <div className={`relative z-10 flex flex-col items-center justify-center min-h-screen transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Background shapes */}
        <div className="absolute w-[430px] h-[520px] transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <div className="absolute h-[200px] w-[200px] rounded-full bg-gradient-to-br from-[#1845ad] to-[#23a2f6] -left-20 -top-20"></div>
          <div className="absolute h-[200px] w-[200px] rounded-full bg-gradient-to-r from-[#ff512f] to-[#f09819] -right-8 -bottom-20"></div>
        </div>

        {/* Login form */}
        <div className="relative w-[400px] bg-white/10 backdrop-blur-md rounded-xl border-2 border-white/10 shadow-[0_0_40px_rgba(8,7,16,0.6)] p-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-['Inter'] text-white">Welcome to</h1>
            <h1 className="gradient-text text-4xl mt-2">Voltway</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-base font-bold font-['Inter'] text-white/90 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/60
                  focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                  transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-base font-bold font-['Inter'] text-white/90 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/60
                  focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent
                  transition-all"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-white text-gray-900 font-['Inter'] font-semibold rounded-lg
                hover:bg-white/90 transition-all shadow-lg"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
