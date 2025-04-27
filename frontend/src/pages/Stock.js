import React, { useState, useEffect } from 'react';
import { FaWarehouse, FaExclamationTriangle, FaFilter, FaChartLine, FaHistory, FaCog, FaDownload, FaBell } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Stock() {
    const [inventory, setInventory] = useState([]);
    const [stockMovements, setStockMovements] = useState([]);
    const [filters, setFilters] = useState({
        model: '',
        warehouse: '',
        partType: '',
        stockLevel: ''
    });
    const [selectedWarehouse, setSelectedWarehouse] = useState('all');
    const [lowStockThreshold, setLowStockThreshold] = useState(20);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedPart, setSelectedPart] = useState(null);

    // Sample data - replace with actual API calls
    useEffect(() => {
        // Mock data for inventory
        setInventory([
            {
                part_id: 'BAT-001',
                part_name: 'Battery Pack S2',
                location: 'WH1',
                quantity_available: 15,
                model: 'S2',
                part_type: 'Battery',
                value: 299.99,
                reorder_point: 20,
                safety_stock: 10
            },
            {
                part_id: 'MOT-001',
                part_name: 'Motor Controller V2',
                location: 'WH2',
                quantity_available: 45,
                model: 'V2',
                part_type: 'Motor',
                value: 199.99,
                reorder_point: 30,
                safety_stock: 15
            },
            // Add more sample data
        ]);

        // Mock data for stock movements
        setStockMovements([
            {
                date: '2024-03-20',
                part_id: 'BAT-001',
                type: 'inbound',
                quantity: 50,
                source: 'Supplier X'
            },
            {
                date: '2024-03-19',
                part_id: 'BAT-001',
                type: 'outbound',
                quantity: 35,
                destination: 'Assembly Line'
            },
            // Add more sample data
        ]);
    }, []);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const filteredInventory = inventory.filter(item => {
        return (
            (!filters.model || item.model === filters.model) &&
            (!filters.warehouse || item.location === filters.warehouse) &&
            (!filters.partType || item.part_type === filters.partType) &&
            (!filters.stockLevel || 
                (filters.stockLevel === 'low' && item.quantity_available <= lowStockThreshold) ||
                (filters.stockLevel === 'normal' && item.quantity_available > lowStockThreshold)
            )
        );
    });

    const getStockStatus = (quantity, reorderPoint) => {
        if (quantity <= reorderPoint) {
            return 'text-red-600 dark:text-red-400';
        }
        return 'text-gray-600 dark:text-gray-300';
    };

    const renderStockMovementChart = () => {
        // This will be replaced with actual data from the database
        const mockData = [
            { date: '2024-03-01', stock: 100 },
            { date: '2024-03-02', stock: 120 },
            { date: '2024-03-03', stock: 90 },
            { date: '2024-03-04', stock: 110 },
            { date: '2024-03-05', stock: 130 },
            { date: '2024-03-06', stock: 95 },
            { date: '2024-03-07', stock: 105 },
        ];

        return (
            <div className="bg-white dark:bg-[#282423] rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-[18px] font-bold text-gray-800 dark:text-white font-['Inter'] leading-[24px]">
                        Stock Level Trend
                    </h3>
                    <div className="flex space-x-4">
                        <button className="px-3 py-1 text-sm bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-md">
                            Last 7 Days
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                            Last 30 Days
                        </button>
                        <button className="px-3 py-1 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                            Custom Range
                        </button>
                    </div>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={mockData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        >
                            <CartesianGrid 
                                strokeDasharray="3 3" 
                                stroke="#E5E7EB" 
                                vertical={false}
                            />
                            <XAxis 
                                dataKey="date" 
                                tick={{ fill: '#6B7280' }}
                                tickLine={false}
                                axisLine={{ stroke: '#E5E7EB' }}
                            />
                            <YAxis 
                                tick={{ fill: '#6B7280' }}
                                tickLine={false}
                                axisLine={{ stroke: '#E5E7EB' }}
                            />
                            <Tooltip 
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="stock"
                                stroke="#3B82F6"
                                strokeWidth={2}
                                dot={{ fill: '#3B82F6', strokeWidth: 2 }}
                                activeDot={{ r: 8, fill: '#3B82F6' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Data will be automatically updated when database is connected</span>
                    <div className="flex space-x-4">
                        <button className="flex items-center">
                            <FaDownload className="mr-1" />
                            Export
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="h-full w-full py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-[36px] font-bold text-gray-900 dark:text-white font-['Ubuntu'] leading-[44px]">Stock Management</h1>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <nav className="flex space-x-4" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`${
                                activeTab === 'overview'
                                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            } px-3 py-2 rounded-md text-sm font-medium`}
                        >
                            Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('trends')}
                            className={`${
                                activeTab === 'trends'
                                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            } px-3 py-2 rounded-md text-sm font-medium`}
                        >
                            Trends
                        </button>
                        <button
                            onClick={() => setActiveTab('insights')}
                            className={`${
                                activeTab === 'insights'
                                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            } px-3 py-2 rounded-md text-sm font-medium`}
                        >
                            AI Insights
                        </button>
                    </nav>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-[14px] font-normal text-gray-700 dark:text-gray-300 mb-2 font-['Inter'] leading-[20px]">
                                Part ID
                            </label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                placeholder="Enter Part ID"
                            />
                        </div>
                        <div>
                            <label className="block text-[14px] font-normal text-gray-700 dark:text-gray-300 mb-2 font-['Inter'] leading-[20px]">
                                Location
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                value={filters.warehouse}
                                onChange={(e) => handleFilterChange('warehouse', e.target.value)}
                            >
                                <option value="">All Warehouses</option>
                                <option value="WH1">Warehouse 1</option>
                                <option value="WH2">Warehouse 2</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[14px] font-normal text-gray-700 dark:text-gray-300 mb-2 font-['Inter'] leading-[20px]">
                                Model
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                value={filters.model}
                                onChange={(e) => handleFilterChange('model', e.target.value)}
                            >
                                <option value="">All Models</option>
                                <option value="S2">S2</option>
                                <option value="V2">V2</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[14px] font-normal text-gray-700 dark:text-gray-300 mb-2 font-['Inter'] leading-[20px]">
                                Stock Level
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                                value={filters.stockLevel}
                                onChange={(e) => handleFilterChange('stockLevel', e.target.value)}
                            >
                                <option value="">All Levels</option>
                                <option value="low">Low Stock</option>
                                <option value="normal">Normal Stock</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'overview' && (
                    <>
                        {/* Inventory Table */}
                        <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg overflow-hidden mb-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-[14px] font-normal text-gray-500 dark:text-gray-300 uppercase tracking-wider font-['Inter'] leading-[20px]">Part ID</th>
                                            <th className="px-4 py-3 text-left text-[14px] font-normal text-gray-500 dark:text-gray-300 uppercase tracking-wider font-['Inter'] leading-[20px]">Part Name</th>
                                            <th className="px-4 py-3 text-left text-[14px] font-normal text-gray-500 dark:text-gray-300 uppercase tracking-wider font-['Inter'] leading-[20px]">Location</th>
                                            <th className="px-4 py-3 text-left text-[14px] font-normal text-gray-500 dark:text-gray-300 uppercase tracking-wider font-['Inter'] leading-[20px]">Quantity</th>
                                            <th className="px-4 py-3 text-left text-[14px] font-normal text-gray-500 dark:text-gray-300 uppercase tracking-wider font-['Inter'] leading-[20px]">Model</th>
                                            <th className="px-4 py-3 text-left text-[14px] font-normal text-gray-500 dark:text-gray-300 uppercase tracking-wider font-['Inter'] leading-[20px]">Type</th>
                                            <th className="px-4 py-3 text-left text-[14px] font-normal text-gray-500 dark:text-gray-300 uppercase tracking-wider font-['Inter'] leading-[20px]">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-[#282423] divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredInventory.map((item) => (
                                            <tr key={item.part_id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="px-4 py-3 text-[14px] text-gray-900 dark:text-gray-200 font-['Inter'] leading-[20px]">{item.part_id}</td>
                                                <td className="px-4 py-3 text-[14px] text-gray-900 dark:text-gray-200 font-['Inter'] leading-[20px]">{item.part_name}</td>
                                                <td className="px-4 py-3 text-[14px] text-gray-900 dark:text-gray-200 font-['Inter'] leading-[20px]">{item.location}</td>
                                                <td className={`px-4 py-3 text-[14px] font-['Inter'] leading-[20px] ${getStockStatus(item.quantity_available, item.reorder_point)}`}>
                                                    {item.quantity_available}
                                                </td>
                                                <td className="px-4 py-3 text-[14px] text-gray-900 dark:text-gray-200 font-['Inter'] leading-[20px]">{item.model}</td>
                                                <td className="px-4 py-3 text-[14px] text-gray-900 dark:text-gray-200 font-['Inter'] leading-[20px]">{item.part_type}</td>
                                                <td className="px-4 py-3 text-[14px] text-gray-900 dark:text-gray-200 font-['Inter'] leading-[20px]">${item.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Low Stock Alerts */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filteredInventory
                                .filter(item => item.quantity_available <= item.reorder_point)
                                .map((item) => (
                                    <div key={item.part_id} className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                                        <div className="flex items-center">
                                            <FaExclamationTriangle className="text-red-500 mr-2" />
                                            <h3 className="text-[16px] font-bold text-red-700 dark:text-red-300 font-['Inter'] leading-[24px]">
                                                Low Stock Alert
                                            </h3>
                                        </div>
                                        <p className="mt-2 text-[14px] text-red-600 dark:text-red-400 font-['Inter'] leading-[20px]">
                                            {item.part_name} at {item.location} has only {item.quantity_available} units left
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </>
                )}

                {activeTab === 'trends' && (
                    <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg p-6">
                        <h2 className="text-[24px] font-bold text-gray-800 dark:text-white mb-4 font-['Ubuntu'] leading-[32px]">Stock Movement Trends</h2>
                        {renderStockMovementChart()}
                    </div>
                )}

                {activeTab === 'insights' && (
                    <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg p-6">
                        <h2 className="text-[24px] font-bold text-gray-800 dark:text-white mb-4 font-['Ubuntu'] leading-[32px]">AI-Powered Insights</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                <h3 className="text-[18px] font-bold text-blue-700 dark:text-blue-300 font-['Inter'] leading-[24px]">Reorder Suggestions</h3>
                                <ul className="mt-2 space-y-2">
                                    {filteredInventory
                                        .filter(item => item.quantity_available <= item.reorder_point)
                                        .map((item) => (
                                            <li key={item.part_id} className="text-[14px] text-blue-600 dark:text-blue-400 font-['Inter'] leading-[20px]">
                                                {item.part_name}: Reorder {item.safety_stock} units
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                <h3 className="text-[18px] font-bold text-purple-700 dark:text-purple-300 font-['Inter'] leading-[24px]">Risk Assessment</h3>
                                <ul className="mt-2 space-y-2">
                                    {filteredInventory
                                        .filter(item => item.quantity_available <= item.safety_stock)
                                        .map((item) => (
                                            <li key={item.part_id} className="text-[14px] text-purple-600 dark:text-purple-400 font-['Inter'] leading-[20px]">
                                                {item.part_name} may cause production delays
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Stock; 