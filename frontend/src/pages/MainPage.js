import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaEnvelope, FaShoppingCart, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';

function MainPage() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleSignOut = () => {
        // Clear user session
        localStorage.removeItem('token');
        navigate('/login');
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
            {/* Floating Toggle Button */}
            {!isSidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 bg-blue-600 text-white p-2 rounded-r-lg shadow-lg hover:bg-blue-700 transition-all duration-300"
                    aria-label="Open sidebar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </button>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full bg-white dark:bg-[#000000] shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full w-64">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between p-4 border-b dark:border-gray-800">
                        <h1 className="text-2xl font-bold text-blue-600 dark:bg-[linear-gradient(135deg,#1472FF_22%,#FFFFFF_45%,#7BCCFF_72%)] dark:bg-clip-text dark:text-transparent font-['Ubuntu']">Voltway</h1>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={toggleDarkMode}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                {isDarkMode ? (
                                    <FaSun className="h-5 w-5 text-yellow-400" />
                                ) : (
                                    <FaMoon className="h-5 w-5 text-gray-600" />
                                )}
                            </button>
                            <button
                                onClick={toggleSidebar}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                                aria-label="Close sidebar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 p-4 space-y-2">
                        <NavLink
                            to="/main/dashboard"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            <FaHome className="w-5 h-5 mr-3 text-gray-600 dark:text-white" />
                            <span className="font-['Inter']">Dashboard</span>
                        </NavLink>
                        
                        <NavLink
                            to="/main/hugo"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            <FaBox className="w-5 h-5 mr-3 text-gray-600 dark:text-white" />
                            <span className="font-['Inter']">Hugo Chatbot</span>
                        </NavLink>
                        <NavLink
                            to="/main/inbox"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            <FaEnvelope className="w-5 h-5 mr-3 text-gray-600 dark:text-white" />
                            <span className="font-['Inter']">Inbox</span>
                        </NavLink>
                        <NavLink
                            to="/main/orders"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            <FaShoppingCart className="w-5 h-5 mr-3 text-gray-600 dark:text-white" />
                            <span className="font-['Inter']">Orders</span>
                        </NavLink>
                        
                        <NavLink
                            to="/main/stock"
                            className={({ isActive }) =>
                                `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                                    isActive
                                        ? 'bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <span className="font-['Inter']">Stock Data</span>
                        </NavLink>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                    <span className="text-sm font-medium font-['Inter']">U</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 font-['Inter']">User Name</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-['Inter']">user@example.com</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center justify-center p-2 text-sm text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 font-['Inter']"
                        >
                            <FaSignOutAlt className="w-5 h-5 mr-2 text-gray-600 dark:text-white" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainPage; 