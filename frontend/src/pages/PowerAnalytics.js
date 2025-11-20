import React from 'react';
import AnalyticsChart from '../components/AnalyticsChart';
import { useData } from '../contexts/DataContext';
import { Zap, TrendingUp, Battery, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

function PowerAnalytics() {
  const { solarPanels, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-yellow-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading power analytics...</p>
        </div>
      </div>
    );
  }

  const totalPower = solarPanels.reduce((sum, p) => sum + p.powerOutput, 0);
  const avgPower = solarPanels.length > 0 ? (totalPower / solarPanels.length).toFixed(0) : 0;
  const maxPower = Math.max(...solarPanels.map(p => p.powerOutput));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-xl shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-500 bg-clip-text text-transparent">
                Power Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Real-time power generation monitoring</p>
            </div>
          </div>
        </motion.div>

        {/* Power Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium mb-2">Total Power Output</p>
                <p className="text-5xl font-bold mb-1">{totalPower}W</p>
                <p className="text-yellow-200 text-xs">Combined generation</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <Zap className="w-12 h-12" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-2">Average Power</p>
                <p className="text-5xl font-bold mb-1">{avgPower}W</p>
                <p className="text-blue-200 text-xs">Per panel output</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-12 h-12" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-2xl p-8 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-2">Peak Power</p>
                <p className="text-5xl font-bold mb-1">{maxPower}W</p>
                <p className="text-green-200 text-xs">Maximum capacity</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <Battery className="w-12 h-12" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Power Trends (24 Hours)</h2>
          </div>
          <AnalyticsChart />
        </motion.div>

        {/* Individual Panel Power */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl">
              <Battery className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800 dark:text-white">Individual Panel Power Output</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Per-panel performance metrics</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {solarPanels.map((panel, index) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-2xl hover:border-orange-400 dark:hover:border-orange-500 transition-all transform hover:scale-105 bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-gray-800 dark:text-white text-xl">{panel.id}</h3>
                  <Zap className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400 font-bold">Power Output</span>
                      <span className="font-black text-orange-600 dark:text-orange-400">{panel.powerOutput}W</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(panel.powerOutput / 300) * 100}%` }}
                        transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
                        className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 h-3 rounded-full shadow-lg"
                      ></motion.div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Efficiency</span>
                    <span className="font-black text-gray-800 dark:text-white">{panel.efficiency.toFixed(1)}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default PowerAnalytics;
