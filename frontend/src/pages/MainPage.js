import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaInbox,
  FaRobot,
  FaWarehouse,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaBars,
  FaChevronLeft,
} from "react-icons/fa";

function MainPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setIsSidebarOpen(!isMobileView);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const sidebarItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/main", end: true },
    { icon: <FaInbox />, label: "Inbox", path: "/main/inbox" },
    { icon: <FaBox />, label: "Orders", path: "/main/orders" },
    { icon: <FaWarehouse />, label: "Stock", path: "/main/stock" },
    { icon: <FaRobot />, label: "Hugo", path: "/main/hugo" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-black">
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative h-full bg-white dark:bg-black border-r dark:border-gray-800 transition-all duration-300 ease-in-out flex flex-col z-50 ${
          isSidebarOpen ? "w-64" : "w-16"
        } ${
          isMobile
            ? isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : ""
        }`}
        aria-expanded={isSidebarOpen}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-b dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              >
                {isSidebarOpen ? (
                  <FaChevronLeft className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <FaBars className="text-gray-600 dark:text-gray-300" />
                )}
              </button>
              {isSidebarOpen && (
                <h1 className="text-[36px] font-bold text-blue-600 dark:bg-[linear-gradient(135deg,#1472FF_22%,#FFFFFF_45%,#7BCCFF_72%)] dark:bg-clip-text dark:text-transparent font-['Ubuntu'] leading-[44px]">
                  Voltway
                </h1>
              )}
            </div>
            {isSidebarOpen && (
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDarkMode ? (
                  <FaSun className="text-yellow-500" />
                ) : (
                  <FaMoon className="text-gray-600" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              <span
                className="w-5 h-5 flex items-center justify-center"
                title={item.label}
              >
                {item.icon}
              </span>
              {isSidebarOpen && (
                <span className="ml-3 font-['Inter'] text-[16px] leading-[24px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-3 border-t dark:border-gray-800 mt-auto">
          <button
            onClick={() => {

              navigate("/login");
              localStorage.removeItem("user-email");
              localStorage.clear();
            }}
            className="flex items-center justify-center w-full p-2 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
          >
            <FaSignOutAlt
              className="w-5 h-5 flex items-center justify-center"
              title="Logout"
            />
            {isSidebarOpen && (
              <span className="ml-3 font-['Inter'] text-[16px] leading-[24px] whitespace-nowrap overflow-hidden text-ellipsis">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 overflow-y-auto ${
          isMobile
            ? "w-full"
            : isSidebarOpen
            ? "w-[calc(100%-16rem)]"
            : "w-[calc(100%-4rem)]"
        }`}
      >
        <div className="h-full w-full p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainPage;
