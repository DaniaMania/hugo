import React, { useState, useEffect } from 'react';
import { FaCheck, FaExchangeAlt, FaExclamationTriangle, FaRedo, FaComment, FaRobot, FaEnvelope, FaFileAlt, FaClock } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function OrderDetail() {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [showAiSidebar, setShowAiSidebar] = useState(false);
    const [aiQuery, setAiQuery] = useState('');

    // Sample data - replace with actual API call
    useEffect(() => {
        const sampleOrder = {
            id: 'PO-2024-001',
            type: 'Purchase Order',
            date: '2024-03-20',
            supplier: 'TechParts Inc.',
            customer: 'Voltway Manufacturing',
            model: 'S2',
            parts: [
                {
                    name: 'Motor Controller',
                    quantity: 100,
                    unitCost: 45.99,
                    status: 'Delayed',
                    eta: '2024-04-19',
                    notes: 'Supplier reported production delay'
                },
                {
                    name: 'Battery Pack',
                    quantity: 200,
                    unitCost: 89.99,
                    status: 'On Track',
                    eta: '2024-04-15',
                    notes: 'Engineering update: New battery type recommended'
                }
            ],
            timeline: [
                { date: '2024-03-20', event: 'Order Created', status: 'Completed' },
                { date: '2024-03-25', event: 'Supplier Confirmed', status: 'Completed' },
                { date: '2024-04-15', event: 'Expected Delivery', status: 'Pending' }
            ],
            emails: [
                {
                    date: '2024-03-22',
                    subject: 'Order Confirmation - PO-2024-001',
                    from: 'supplier@techparts.com',
                    highlights: ['Order confirmed', 'Production scheduled']
                },
                {
                    date: '2024-03-28',
                    subject: 'Delay Notice - Motor Controller',
                    from: 'supplier@techparts.com',
                    highlights: ['4-day delay expected', 'Component shortage']
                }
            ]
        };
        setOrder(sampleOrder);
    }, [orderId]);

    const handleAction = (action) => {
        // Implement actions
        console.log('Action:', action, orderId);
    };

    const handleAiQuery = () => {
        // Implement AI query
        console.log('AI Query:', aiQuery);
    };

    if (!order) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</h3>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{order.id}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</h3>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{order.type}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Model</h3>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{order.model}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</h3>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{order.date}</p>
                    </div>
                </div>
            </div>

            {/* Part List */}
            <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Parts</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Part Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Unit Cost</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ETA</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-[#282423] divide-y divide-gray-200 dark:divide-gray-700">
                            {order.parts.map((part, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {part.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {part.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        ${part.unitCost}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            part.status === 'Delayed' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200' :
                                            part.status === 'On Track' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200' :
                                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200'
                                        }`}>
                                            {part.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                        {part.eta}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {part.notes}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Timeline</h2>
                <div className="space-y-4">
                    {order.timeline.map((event, index) => (
                        <div key={index} className="flex items-start">
                            <div className="flex-shrink-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    event.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-100 dark:bg-gray-800'
                                }`}>
                                    <FaClock className={`${
                                        event.status === 'Completed' ? 'text-green-500 dark:text-green-400' : 'text-gray-400'
                                    }`} />
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{event.event}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Linked Emails */}
            <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Linked Emails</h2>
                <div className="space-y-4">
                    {order.emails.map((email, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{email.subject}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{email.from}</p>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{email.date}</p>
                            </div>
                            <ul className="mt-2 space-y-1">
                                {email.highlights.map((highlight, hIndex) => (
                                    <li key={hIndex} className="text-sm text-gray-600 dark:text-gray-300">
                                        • {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions Panel */}
            <div className="fixed right-0 top-0 w-64 h-full bg-white dark:bg-[#282423] shadow-lg p-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Actions</h3>
                <div className="space-y-2">
                    <button
                        onClick={() => handleAction('markReceived')}
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <FaCheck />
                        <span>Mark as Received</span>
                    </button>
                    <button
                        onClick={() => handleAction('switchSupplier')}
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                    >
                        <FaExchangeAlt />
                        <span>Switch Supplier</span>
                    </button>
                    <button
                        onClick={() => handleAction('raiseAlert')}
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <FaExclamationTriangle />
                        <span>Raise Alert</span>
                    </button>
                    <button
                        onClick={() => handleAction('reorder')}
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <FaRedo />
                        <span>Request Reorder</span>
                    </button>
                    <button
                        onClick={() => handleAction('addNote')}
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <FaComment />
                        <span>Add Note</span>
                    </button>
                </div>
            </div>

            {/* AI Copilot Sidebar */}
            {showAiSidebar && (
                <div className="fixed left-0 top-0 w-64 h-full bg-white dark:bg-[#282423] shadow-lg p-4">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Ask Hugo</h3>
                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                placeholder="Ask about this order..."
                                className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white pl-10"
                            />
                            <FaRobot className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <button
                            onClick={handleAiQuery}
                            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Ask
                        </button>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Suggested Questions:</p>
                            <button
                                onClick={() => setAiQuery("What's the risk of delay for this order?")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            >
                                What's the risk of delay for this order?
                            </button>
                            <button
                                onClick={() => setAiQuery("Are there any engineering updates affecting these parts?")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            >
                                Are there any engineering updates affecting these parts?
                            </button>
                            <button
                                onClick={() => setAiQuery("What's the best alternative supplier for delayed parts?")}
                                className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            >
                                What's the best alternative supplier for delayed parts?
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default OrderDetail; 