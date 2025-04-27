import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
    const navigate = useNavigate();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleGetStarted = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            navigate('/login');
        }, 200); // Match the animation duration
    };

    return (
        <div className={`relative flex flex-col items-center justify-center h-screen w-full landing-background landing-page ${isTransitioning ? 'fade-out' : ''}`}>
            <h1 className="text-7xl gradient-text relative z-10">Voltway</h1>
            <div className="mt-8 space-y-2 relative z-10">
                <p className="text-1xl font-inter italic text-white">Advanced E-Commerce Level with Efficient Supply Chain Management System</p>
            </div>
            <button 
                onClick={handleGetStarted}
                className="glow-button mt-12 relative z-10"
            >
                Get Started
            </button>
        </div>
    );
}

export default Landing;