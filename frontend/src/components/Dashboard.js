import React, { useState } from 'react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function Dashboard() {
    const [activeTab, setActiveTab] = useState('movement');
    const [stockData, setStockData] = useState([
        { id: 'P001', name: 'Part A', location: 'Warehouse 1', quantity: 100, inbound: 50, outbound: 30, category: 'Electronics' },
        { id: 'P002', name: 'Part B', location: 'Warehouse 2', quantity: 200, inbound: 75, outbound: 45, category: 'Mechanical' },
        { id: 'P003', name: 'Part C', location: 'Warehouse 1', quantity: 150, inbound: 60, outbound: 40, category: 'Electronics' },
        { id: 'P004', name: 'Part D', location: 'Warehouse 2', quantity: 80, inbound: 30, outbound: 20, category: 'Mechanical' },
        { id: 'P005', name: 'Part E', location: 'Warehouse 1', quantity: 120, inbound: 40, outbound: 25, category: 'Electrical' },
    ]);

    const [alerts, setAlerts] = useState([
        { type: 'warning', message: 'Late delivery from Supplier X for Part A', timestamp: '2024-03-20 10:30' },
        { type: 'info', message: 'Engineering change detected for Part B', timestamp: '2024-03-20 09:15' },
        { type: 'error', message: 'Price increase alert from Supplier Y', timestamp: '2024-03-20 08:45' },
    ]);

    const [emails, setEmails] = useState([
        { from: 'supplier@example.com', subject: 'Order #1234 Update', timestamp: '2024-03-20 10:00', read: false },
        { from: 'engineering@example.com', subject: 'Part Specification Change', timestamp: '2024-03-20 09:30', read: false },
    ]);

    // Prepare data for the pie chart (categories)
    const categoryData = stockData.reduce((acc, part) => {
        const existingCategory = acc.find(item => item.name === part.category);
        if (existingCategory) {
            existingCategory.value += part.quantity;
        } else {
            acc.push({ name: part.category, value: part.quantity });
        }
        return acc;
    }, []);

    // Prepare data for the scatter plot
    const scatterData = stockData.map(part => ({
        name: part.name,
        quantity: part.quantity,
        ratio: (part.inbound / part.outbound).toFixed(2),
        size: part.quantity
    }));

    const renderGraph = () => {
        switch (activeTab) {
            case 'movement':
                return (
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stockData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="quantity" stroke="#8884d8" name="Current Stock" />
                                <Line type="monotone" dataKey="inbound" stroke="#82ca9d" name="Inbound Orders" />
                                <Line type="monotone" dataKey="outbound" stroke="#ffc658" name="Outbound Orders" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'distribution':
                return (
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stockData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="location" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="quantity" stackId="a" fill="#8884d8" name="Quantity" />
                                <Bar dataKey="inbound" stackId="a" fill="#82ca9d" name="Inbound" />
                                <Bar dataKey="outbound" stackId="a" fill="#ffc658" name="Outbound" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'category':
                return (
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                );
            case 'ratio':
                return (
                    <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="quantity" name="Quantity" />
                                <YAxis type="number" dataKey="ratio" name="Inbound/Outbound Ratio" />
                                <ZAxis type="number" dataKey="size" range={[60, 400]} name="Size" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Legend />
                                <Scatter name="Parts" data={scatterData} fill="#8884d8" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8">
            {/* Stock Overview Section */}
            <div className="bg-white rounded-lg shadow p-8">
                <h1 className="mb-6">Stock Overview</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-blue-800 mb-2">Total Parts</h3>
                        <p className="text-4xl font-bold text-blue-600">{stockData.length}</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-green-800 mb-2">Total Quantity</h3>
                        <p className="text-4xl font-bold text-green-600">
                            {stockData.reduce((sum, part) => sum + part.quantity, 0)}
                        </p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg">
                        <h3 className="text-purple-800 mb-2">Active Locations</h3>
                        <p className="text-4xl font-bold text-purple-600">
                            {new Set(stockData.map(part => part.location)).size}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('movement')}
                                className={`${
                                    activeTab === 'movement'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Stock Movement
                            </button>
                            <button
                                onClick={() => setActiveTab('distribution')}
                                className={`${
                                    activeTab === 'distribution'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Stock Distribution
                            </button>
                            <button
                                onClick={() => setActiveTab('category')}
                                className={`${
                                    activeTab === 'category'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Category Distribution
                            </button>
                            <button
                                onClick={() => setActiveTab('ratio')}
                                className={`${
                                    activeTab === 'ratio'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                            >
                                Quantity Ratio
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Graph Content */}
                {renderGraph()}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Reactive Intelligence Section */}
                <div className="bg-white rounded-lg shadow p-8">
                    <h2 className="mb-6">🔔 Reactive Intelligence</h2>
                    <div className="space-y-4">
                        {alerts.map((alert, index) => (
                            <div key={index} className={`p-4 rounded-lg ${
                                alert.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                                alert.type === 'error' ? 'bg-red-50 border-l-4 border-red-500' :
                                'bg-blue-50 border-l-4 border-blue-500'
                            }`}>
                                <p className="text-sm text-gray-600 mb-1">{alert.timestamp}</p>
                                <p className="font-medium">{alert.message}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Email Alerts Section */}
                <div className="bg-white rounded-lg shadow p-8">
                    <h2 className="mb-6">Email Alerts</h2>
                    <div className="space-y-4">
                        {emails.map((email, index) => (
                            <div key={index} className={`p-4 rounded-lg border ${
                                email.read ? 'bg-gray-50' : 'bg-blue-50'
                            }`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-medium mb-1">{email.from}</p>
                                        <p className="text-gray-600">{email.subject}</p>
                                    </div>
                                    <span className="text-sm text-gray-500">{email.timestamp}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard; 