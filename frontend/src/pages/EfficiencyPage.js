import React from 'react';
import EfficiencyChart from '../components/EfficiencyChart';
import { useData } from '../contexts/DataContext';
import { TrendingUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

function EfficiencyPage() {
  const { solarPanels, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading efficiency data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-blue-600 p-4 rounded-2xl shadow-2xl">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600 bg-clip-text text-transparent mb-1">
                📊 Efficiency Trends
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Performance monitoring and analysis</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 mb-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          <EfficiencyChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800 dark:text-white">Panel Efficiency Details</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Detailed performance metrics</p>
            </div>
          </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-4 px-4 font-bold text-gray-800 dark:text-gray-200">Panel ID</th>
                <th className="text-left py-4 px-4 font-bold text-gray-800 dark:text-gray-200">Efficiency</th>
                <th className="text-left py-4 px-4 font-bold text-gray-800 dark:text-gray-200">Status</th>
                <th className="text-left py-4 px-4 font-bold text-gray-800 dark:text-gray-200">Dust Level</th>
                <th className="text-left py-4 px-4 font-bold text-gray-800 dark:text-gray-200">Temperature</th>
              </tr>
            </thead>
            <tbody>
              {solarPanels.map((panel) => (
                <tr key={panel.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-gray-900 dark:text-white">{panel.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mr-3">
                        <div
                          className={`h-3 rounded-full ${
                            panel.efficiency >= 90 ? 'bg-green-500' :
                            panel.efficiency >= 80 ? 'bg-blue-500' :
                            panel.efficiency >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${panel.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">{panel.efficiency.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      panel.status === 'optimal' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' :
                      panel.status === 'good' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' :
                      panel.status === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300' :
                      'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'
                    }`}>
                      {panel.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{panel.dustLevel.toFixed(0)}%</td>
                  <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">{panel.temperature.toFixed(0)}°C</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
    </div>
  );
}

export default EfficiencyPage;
