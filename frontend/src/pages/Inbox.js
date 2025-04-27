import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaTag, FaPaperclip, FaClock, FaCheck, FaExclamationTriangle, FaArrowRight } from 'react-icons/fa';

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filters, setFilters] = useState({
    urgentDelays: false,
    priceChanges: false,
    engineeringChanges: false,
    resolved: false,
    flagged: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showAIPanel, setShowAIPanel] = useState(true);

  useEffect(() => {
    // Sample email data
    setEmails([
      {
        id: 1,
        from: 'BatteryTech Inc.',
        subject: 'Delay Notice: PO #1221 - Battery Packs',
        date: '2024-03-15',
        content: 'We regret to inform you that the delivery of battery packs (PO #1221) will be delayed by 2 weeks due to supply chain issues. New ETA: April 5th.',
        tags: ['urgent', 'delay'],
        aiInsights: {
          summary: 'This email indicates a 2-week delay for PO #1221 (batteries). Recommend updating the S2 production forecast and notifying sales.',
          suggestedActions: ['Update PO Status', 'Notify Procurement Lead', 'Add to Risk Digest']
        }
      },
      {
        id: 2,
        from: 'MotorParts Co.',
        subject: 'Price Update: Electric Motors',
        date: '2024-03-14',
        content: 'Due to increased material costs, we need to adjust the price of electric motors by 5%. New price list attached.',
        tags: ['price-change'],
        aiInsights: {
          summary: 'Price increase notification for electric motors. Impact on production costs needs assessment.',
          suggestedActions: ['Review Price Impact', 'Generate Renegotiation Request']
        }
      }
    ]);
  }, []);

  const handleFilterChange = (filter) => {
    setFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const filteredEmails = emails.filter(email => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        email.from.toLowerCase().includes(searchLower) ||
        email.subject.toLowerCase().includes(searchLower) ||
        email.content.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <div className="flex h-full">
      {/* Main Inbox Panel */}
      <div className="flex-1 p-4">
        {/* Search and Filters */}
        <div className="mb-4 flex items-center gap-4">
          <div className="relative flex-1">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                filters.urgentDelays 
                  ? 'bg-red-600 text-white dark:bg-red-700' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => handleFilterChange('urgentDelays')}
            >
              <FaExclamationTriangle /> Urgent
            </button>
            <button
              className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                filters.priceChanges 
                  ? 'bg-yellow-600 text-white dark:bg-yellow-700' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
              onClick={() => handleFilterChange('priceChanges')}
            >
              <FaTag /> Price Changes
            </button>
          </div>
        </div>

        {/* Email List */}
        <div className="space-y-2">
          {filteredEmails.map(email => (
            <div
              key={email.id}
              className={`p-4 rounded-lg cursor-pointer ${
                selectedEmail?.id === email.id
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              onClick={() => setSelectedEmail(email)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">{email.from}</h3>
                  <p className="text-gray-800 dark:text-gray-200">{email.subject}</p>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-300">{email.date}</span>
              </div>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
                {email.content}
              </p>
              <div className="mt-2 flex gap-2">
                {email.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-2 py-1 text-xs rounded-full ${
                      tag === 'urgent' 
                        ? 'bg-red-600 text-white dark:bg-red-700' 
                        : tag === 'price-change' 
                          ? 'bg-yellow-600 text-white dark:bg-yellow-700' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Panel */}
      {selectedEmail && showAIPanel && (
        <div className="w-96 border-l dark:border-gray-700 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Hugo's Insights</h2>
            <button
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setShowAIPanel(false)}
            >
              <FaArrowRight />
            </button>
          </div>
          <div className="mb-4">
            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Summary</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {selectedEmail.aiInsights.summary}
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Suggested Actions</h3>
            <div className="space-y-2">
              {selectedEmail.aiInsights.suggestedActions.map(action => (
                <button
                  key={action}
                  className="w-full px-4 py-2 text-left text-sm rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inbox; 