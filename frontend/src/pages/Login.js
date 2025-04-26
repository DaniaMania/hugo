import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Add actual authentication logic here
        navigate('/main');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full landing-background">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-inter text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1472FF] focus:border-transparent"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-inter text-gray-700 mb-1">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1472FF] focus:border-transparent"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[#1472FF] text-white py-2 rounded-lg font-inter font-medium hover:bg-opacity-90 transition-all duration-200"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;