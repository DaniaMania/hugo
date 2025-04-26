import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function MainPage() {
    return (
        <div className="flex h-screen">
            {/* Side Navigation */}
            <nav className="w-64 bg-gray-900 text-white flex flex-col py-8 px-4">
                <h2 className="text-2xl font-bold mb-8">Menu</h2>
                <NavLink 
                    to="inbox" 
                    className={({ isActive }) => 
                        `mb-4 hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
                    }
                >
                    Inbox
                </NavLink>
                <NavLink 
                    to="orders" 
                    className={({ isActive }) => 
                        `mb-4 hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
                    }
                >
                    Orders
                </NavLink>
                <NavLink 
                    to="stock" 
                    className={({ isActive }) => 
                        `mb-4 hover:text-blue-400 ${isActive ? 'text-blue-400' : ''}`
                    }
                >
                    Stock Data
                </NavLink>
            </nav>
            
            {/* Main Content Area */}
            <main className="flex-1 bg-gray-100 p-8">
                <Outlet />
            </main>
        </div>
    );
}

export default MainPage; 