import React from 'react';
import { useData } from '../contexts/DataContext';
import { Activity, Zap, AlertTriangle, TrendingUp, Sun, Droplets, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

function Overview() {
  const { solarPanels, alerts, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-orange-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const avgEfficiency = solarPanels.length > 0
    ? (solarPanels.reduce((sum, p) => sum + p.efficiency, 0) / solarPanels.length).toFixed(1)
    : 0;

  const totalPower = solarPanels.reduce((sum, p) => sum + p.powerOutput, 0);
  const criticalAlerts = alerts.filter(a => a.type === 'critical').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-lg">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                System Overview
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Real-time solar panel monitoring dashboard</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Panels</p>
                <p className="text-4xl font-bold mt-2">{solarPanels.length}</p>
                <p className="text-blue-200 text-xs mt-1">Active systems</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <Activity className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Avg Efficiency</p>
                <p className="text-4xl font-bold mt-2">{avgEfficiency}%</p>
                <p className="text-green-200 text-xs mt-1">System performance</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Total Power</p>
                <p className="text-4xl font-bold mt-2">{totalPower}W</p>
                <p className="text-yellow-200 text-xs mt-1">Current output</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <Zap className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Critical Alerts</p>
                <p className="text-4xl font-bold mt-2">{criticalAlerts}</p>
                <p className="text-red-200 text-xs mt-1">Requires attention</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <AlertTriangle className="w-8 h-8" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Solar Panels Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Solar Panels Status</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {solarPanels.map((panel, index) => (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`relative overflow-hidden rounded-xl p-5 border-2 transform hover:scale-105 transition-all shadow-lg ${
                  panel.status === 'optimal' ? 'border-green-400 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20' :
                  panel.status === 'good' ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20' :
                  panel.status === 'warning' ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20' :
                  'border-red-400 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20'
                }`}
              >
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    panel.status === 'optimal' ? 'bg-green-500 text-white' :
                    panel.status === 'good' ? 'bg-blue-500 text-white' :
                    panel.status === 'warning' ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {panel.status.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">{panel.id}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white">{panel.efficiency.toFixed(1)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Power</span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white">{panel.powerOutput}W</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Droplets className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Dust</span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white">{panel.dustLevel.toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Temp</span>
                    </div>
                    <span className="font-bold text-gray-800 dark:text-white">{panel.temperature.toFixed(0)}°C</span>
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

export default Overview;
