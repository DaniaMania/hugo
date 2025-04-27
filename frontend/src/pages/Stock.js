import React, { useState, useEffect } from 'react';
import { FaWarehouse, FaExclamationTriangle, FaFilter, FaChartLine, FaHistory, FaCog } from 'react-icons/fa';

function Stock() {
    const [inventory, setInventory] = useState([]);
    const [filters, setFilters] = useState({
        model: '',
        warehouse: '',
        partType: '',
        stockLevel: ''
    });
    const [selectedWarehouse, setSelectedWarehouse] = useState('all');
    const [lowStockThreshold, setLowStockThreshold] = useState(20);

    // Sample data - replace with actual API call
    useEffect(() => {
        setInventory([
            {
                part_id: 'BAT-001',
                part_name: 'Battery Pack S2',
                location: 'WH1',
                quantity_available: 15,
                model: 'S2',
                part_type: 'Battery',
                value: 299.99
            },
            {
                part_id: 'MOT-001',
                part_name: 'Motor Controller V2',
                location: 'WH2',
                quantity_available: 45,
                model: 'V2',
                part_type: 'Motor',
                value: 199.99
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

    const getStockStatus = (quantity) => {
        if (quantity <= lowStockThreshold) {
            return 'text-red-600 dark:text-red-400';
        }
        return 'text-gray-600 dark:text-gray-300';
    };

    return (
        <div className="h-full w-full py-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stock Management</h1>
                <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        <FaChartLine className="inline mr-2" />
                        Analytics
                    </button>
                    <button className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                        <FaHistory className="inline mr-2" />
                        History
                    </button>
                    <button className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                        <FaCog className="inline mr-2" />
                        Settings
                    </button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Scooter Model
                        </label>
                        <select
                            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-sm"
                            value={filters.model}
                            onChange={(e) => handleFilterChange('model', e.target.value)}
                        >
                            <option value="">All Models</option>
                            <option value="S2">S2</option>
                            <option value="V2">V2</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Warehouse
                        </label>
                        <select
                            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-sm"
                            value={filters.warehouse}
                            onChange={(e) => handleFilterChange('warehouse', e.target.value)}
                        >
                            <option value="">All Warehouses</option>
                            <option value="WH1">WH1</option>
                            <option value="WH2">WH2</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Part Type
                        </label>
                        <select
                            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-sm"
                            value={filters.partType}
                            onChange={(e) => handleFilterChange('partType', e.target.value)}
                        >
                            <option value="">All Types</option>
                            <option value="Battery">Battery</option>
                            <option value="Motor">Motor</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Stock Level
                        </label>
                        <select
                            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-sm"
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

            {/* Inventory Table */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Part ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Part Name</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Location</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Model</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Value</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredInventory.map((item) => (
                                <tr key={item.part_id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{item.part_id}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{item.part_name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        <div className="flex items-center">
                                            <FaWarehouse className="mr-2 text-gray-400" />
                                            {item.location}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                                        <div className="flex items-center">
                                            {item.quantity_available <= lowStockThreshold && (
                                                <FaExclamationTriangle className="mr-2 text-red-500" />
                                            )}
                                            <span className={getStockStatus(item.quantity_available)}>
                                                {item.quantity_available}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{item.model}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{item.part_type}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                        ${item.value.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Low Stock Alerts */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Low Stock Alerts</h2>
                <div className="space-y-3">
                    {filteredInventory
                        .filter(item => item.quantity_available <= lowStockThreshold)
                        .map(item => (
                            <div key={item.part_id} className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                <FaExclamationTriangle className="text-red-500 mr-3" />
                                <span className="text-red-700 dark:text-red-400 text-sm">
                                    Only {item.quantity_available} {item.part_name} left at {item.location}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Stock; 