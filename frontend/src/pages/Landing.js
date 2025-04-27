import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full landing-background">
            <h1 className="text-7xl gradient-text">Voltway</h1>
            <div className="mt-8 space-y-2">
                <p className="text-1xl font-inter italic text-white">Advanced E-Commerce Level with Efficient Supply Chain Management System</p>
            </div>
            <button 
                onClick={() => navigate('/login')}
                className="glow-button mt-12"
            >
                Get Started
            </button>
        </div>
    );
}
export default Landing;