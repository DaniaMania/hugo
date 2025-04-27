import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, BarChart,
  Bar, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis,
} from "recharts";
import axios from "axios";
import parseGeminiResponse from "../hooks/parseGeminiResponse";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];


function Dashboard() {
  const [activeTab, setActiveTab] = useState("movement");
  const [stockData, setStockData] = useState([
    {
      id: "P001", name: "Part A", location: "Warehouse 1", quantity: 100,
      inbound: 50, outbound: 30, category: "Electronics",
    },
    {
      id: "P002", name: "Part B", location: "Warehouse 2", quantity: 200,
      inbound: 75, outbound: 45, category: "Mechanical",
    },
    {
      id: "P003", name: "Part C", location: "Warehouse 1", quantity: 150,
      inbound: 60, outbound: 40, category: "Electronics",
    },
    {
      id: "P004", name: "Part D", location: "Warehouse 2", quantity: 80,
      inbound: 30, outbound: 20, category: "Mechanical",
    },
    {
      id: "P005", name: "Part E", location: "Warehouse 1", quantity: 120,
      inbound: 40, outbound: 25, category: "Electrical",
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState([]);
  const [normalAlerts, setNormalAlerts] = useState([]);

  useEffect(() => {
    // localStorage.clear();
    let isMounted = true;

    const localData = localStorage.getItem("alerts");
    if (localData) {
      const savedAlerts = JSON.parse(localData);
      const critical = savedAlerts.filter(item => item.critical);
      const normal = savedAlerts.filter(item => !item.critical);
      setCriticalAlerts(critical);
      setNormalAlerts(normal);
      setLoading(false);
      return;
    };

    axios
      .get("https://hugo-lovat-tau.vercel.app/gemini/notification")
      .then((response) => {
        if (isMounted) {
          const parsedAlerts = parseGeminiResponse(response.data.response);
          localStorage.setItem("alerts", JSON.stringify(parsedAlerts));
          const critical = parsedAlerts.filter((item) => item.critical);
          const normal = parsedAlerts.filter((item) => !item.critical);

          setCriticalAlerts(critical);
          setNormalAlerts(normal);
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.error("Error fetching alerts:", error);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Prepare data for the pie chart (categories)
  const categoryData = stockData.reduce((acc, part) => {
    const existingCategory = acc.find((item) => item.name === part.category);
    if (existingCategory) {
      existingCategory.value += part.quantity;
    } else {
      acc.push({ name: part.category, value: part.quantity });
    }
    return acc;
  }, []);

  // Prepare data for the scatter plot
  const scatterData = stockData.map((part) => ({
    name: part.name,
    quantity: part.quantity,
    ratio: (part.inbound / part.outbound).toFixed(2),
    size: part.quantity,
  }));

  const renderGraph = () => {
    switch (activeTab) {
      case "movement":
        return (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone" dataKey="quantity" stroke="#3b82f6" name="Current Stock"
                />
                <Line
                  type="monotone" dataKey="inbound" stroke="#10b981" name="Inbound Orders"
                />
                <Line
                  type="monotone" dataKey="outbound" stroke="#ef4444" name="Outbound Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      case "distribution":
        return (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="quantity" stackId="a" fill="#8884d8" name="Quantity"
                />
                <Bar
                  dataKey="inbound" stackId="a" fill="#82ca9d" name="Inbound"
                />
                <Bar
                  dataKey="outbound" stackId="a" fill="#ffc658" name="Outbound"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      case "category":
        return (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData} cx="50%" cy="50%" labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={150} fill="#8884d8" dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );
      case "ratio":
        return (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="quantity" name="Quantity" />
                <YAxis
                  type="number"
                  dataKey="ratio"
                  name="Inbound/Outbound Ratio"
                />
                <ZAxis
                  type="number"
                  dataKey="size"
                  range={[60, 400]}
                  name="Size"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
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
    <div className="h-full w-full">
      <div className="space-y-6">
        {/* Stock Overview Section */}
        <div className="bg-white dark:bg-[#282423] rounded-xl shadow-lg p-6">
          <h2 className="text-[30px] font-bold text-gray-800 dark:text-white mb-4 font-['Ubuntu'] leading-[38px]">
            Stock Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
              <h3 className="text-[24px] font-bold text-blue-700 dark:text-blue-300 font-['Ubuntu'] leading-[32px]">
                Total Parts
              </h3>
              <p className="text-4xl font-bold text-blue-900 dark:text-blue-200 font-['Ubuntu']">
                {stockData.length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
              <h3 className="text-[24px] font-bold text-green-700 dark:text-green-300 font-['Ubuntu'] leading-[32px]">
                Total Quantity
              </h3>
              <p className="text-4xl font-bold text-green-900 dark:text-green-200 font-['Ubuntu']">
                {stockData.reduce((sum, part) => sum + part.quantity, 0)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
              <h3 className="text-[24px] font-bold text-purple-700 dark:text-purple-300 font-['Ubuntu'] leading-[32px]">
                Active Locations
              </h3>
              <p className="text-4xl font-bold text-purple-900 dark:text-purple-200 font-['Ubuntu']">
                {new Set(stockData.map((part) => part.location)).size}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab("movement")}
                  className={`${
                    activeTab === "movement"
                      ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base font-['Inter']`}
                >
                  Stock Movement
                </button>
                <button
                  onClick={() => setActiveTab("distribution")}
                  className={`${
                    activeTab === "distribution"
                      ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base font-['Inter']`}
                >
                  Stock Distribution
                </button>
                <button
                  onClick={() => setActiveTab("category")}
                  className={`${
                    activeTab === "category"
                      ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base font-['Inter']`}
                >
                  Category Distribution
                </button>
                <button
                  onClick={() => setActiveTab("ratio")}
                  className={`${
                    activeTab === "ratio"
                      ? "border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base font-['Inter']`}
                >
                  Quantity Ratio
                </button>
              </nav>
            </div>
          </div>

          {/* Graph Content */}
          <div className="mt-6">{renderGraph()}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reactive Intelligence */}
          <div className="bg-white rounded-lg shadow p-8 text-fit">
            <h2 className="mb-6">🔔 Urgent</h2>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {criticalAlerts.length > 0 ? (
                  criticalAlerts.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gray-50 border-l-4 border-red-500"
                    >
                      <h3 className="font-bold text-red-600 mb-2">
                        Critical Concern:
                      </h3>
                      <p className="text-gray-800 mb-4">{item.concern}</p>
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Actions:
                      </h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {item.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="text-gray-700">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No critical concerns found.</p>
                )}
              </div>
            )}
          </div>

          {/* Email Alerts (normal concerns now) */}
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="mb-6">Other Concerns</h2>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-700">
                  Total Concerns:{" "}
                  <span className="font-bold">{normalAlerts.length}</span> |
                  Total Actions:{" "}
                  <span className="font-bold">
                    {normalAlerts.reduce(
                      (sum, item) => sum + item.actions.length,
                      0
                    )}
                  </span>
                </p>

                {/* Collapsible Section */}
                <details className="space-y-4">
                  <summary className="cursor-pointer text-blue-600 mb-4">
                    Expand to view details
                  </summary>
                  {normalAlerts.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-gray-50 border-l-4 border-blue-300"
                    >
                      <h3 className="font-bold text-blue-600 mb-2">Concern:</h3>
                      <p className="text-gray-800 mb-4">{item.concern}</p>
                      <h4 className="font-semibold text-gray-700 mb-2">
                        Actions:
                      </h4>
                      <ul className="list-disc pl-5 space-y-2">
                        {item.actions.map((action, actionIndex) => (
                          <li key={actionIndex} className="text-gray-700">
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </details>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
