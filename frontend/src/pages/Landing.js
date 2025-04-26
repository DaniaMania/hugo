import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full landing-background">
            <h1 className="text-6xl gradient-text">Voltway</h1>
            <div className="mt-8 space-y-2">
                <p className="text-1xl font-inter italic text-white">Efficient Supply Chain Management System</p>
            </div>
            <button 
                onClick={() => navigate('/login')}
                className="mt-12 px-8 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-full font-inter font-medium text-lg text-white hover:bg-white/20 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            >
                Let's get started
            </button>
        </div>
    );
}
export default Landing;