import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaDownload, FaRobot, FaEnvelope, FaCheck, FaExchangeAlt, FaExclamationTriangle, FaRedo, FaComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Orders() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({
        dateRange: { start: '', end: '' },
        orderType: '',
        scooterModel: '',
        status: '',
        search: ''
    });
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [showBatchPanel, setShowBatchPanel] = useState(false);

    // Sample data - replace with actual API call
    useEffect(() => {
        const sampleOrders = [
            {
                id: 'PO-2024-001',
                type: 'Purchase Order',
                date: '2024-03-20',
                supplier: 'TechParts Inc.',
                parts: ['Motor Controller', 'Battery Pack'],
                eta: '2024-04-15',
                status: 'At Risk',
                aiFlag: 'Delay Risk',
                model: 'S2'
            },
            // Add more sample orders
        ];
        setOrders(sampleOrders);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateRangeChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            dateRange: {
                ...prev.dateRange,
                [name]: value
            }
        }));
    };

    const handleOrderClick = (orderId) => {
        navigate(`/main/orders/${orderId}`);
    };

    const handleBatchAction = (action) => {
        // Implement batch actions
        console.log('Batch action:', action, selectedOrders);
    };

    return (
        <div className="space-y-6">
            {/* Filters Section */}
            <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Date Range */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</label>
                        <div className="flex space-x-2">
                            <input
                                type="date"
                                name="start"
                                value={filters.dateRange.start}
                                onChange={handleDateRangeChange}
                                className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                            <input
                                type="date"
                                name="end"
                                value={filters.dateRange.end}
                                onChange={handleDateRangeChange}
                                className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Order Type */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Order Type</label>
                        <select
                            name="orderType"
                            value={filters.orderType}
                            onChange={handleFilterChange}
                            className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">All Types</option>
                            <option value="Purchase Order">Purchase Order</option>
                            <option value="Webshop Order">Webshop Order</option>
                            <option value="Fleet Contract">Fleet Contract</option>
                        </select>
                    </div>

                    {/* Scooter Model */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Scooter Model</label>
                        <select
                            name="scooterModel"
                            value={filters.scooterModel}
                            onChange={handleFilterChange}
                            className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">All Models</option>
                            <option value="S2">S2</option>
                            <option value="S3">S3</option>
                            <option value="Fleet">Fleet</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                        <select
                            name="status"
                            value={filters.status}
                            onChange={handleFilterChange}
                            className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        >
                            <option value="">All Statuses</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Partial">Partial</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    {/* Search */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="search"
                                value={filters.search}
                                onChange={handleFilterChange}
                                placeholder="Search by ID, part, supplier..."
                                className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white pl-10"
                            />
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Orders</h2>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setShowBatchPanel(!showBatchPanel)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Batch Actions
                            </button>
                            <button
                                onClick={() => handleBatchAction('export')}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <FaDownload className="inline mr-2" />
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 dark:border-gray-700"
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Supplier/Customer</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Parts Included</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ETA</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">AI Flag</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-[#282423] divide-y divide-gray-200 dark:divide-gray-700">
                                {orders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                                        onClick={() => handleOrderClick(order.id)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 dark:border-gray-700"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {order.type}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {order.date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {order.supplier}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {order.parts.join(', ')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {order.eta}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                order.status === 'At Risk' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200' :
                                                order.status === 'Delayed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' :
                                                'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {order.aiFlag}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                                                    <FaCheck />
                                                </button>
                                                <button className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300">
                                                    <FaExchangeAlt />
                                                </button>
                                                <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                                                    <FaExclamationTriangle />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Batch Actions Panel */}
            {showBatchPanel && (
                <div className="fixed right-0 top-0 w-64 h-full bg-white dark:bg-[#282423] shadow-lg p-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Batch Actions</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => handleBatchAction('export')}
                            className="w-full flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <FaDownload />
                            <span>Export Selected</span>
                        </button>
                        <button
                            onClick={() => handleBatchAction('email')}
                            className="w-full flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <FaEnvelope />
                            <span>Email Summary</span>
                        </button>
                        <button
                            onClick={() => handleBatchAction('ai')}
                            className="w-full flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            <FaRobot />
                            <span>Ask Hugo</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Orders; 