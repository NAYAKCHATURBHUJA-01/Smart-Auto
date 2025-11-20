import React from 'react';
import AlertsPanel from '../components/AlertsPanel';
import { useData } from '../contexts/DataContext';
import { AlertTriangle, AlertCircle, Info, CheckCircle, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

function AlertsPage() {
  const { alerts, loading } = useData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading alerts...</p>
        </div>
      </div>
    );
  }

  const criticalCount = alerts.filter(a => a.type === 'critical').length;
  const warningCount = alerts.filter(a => a.type === 'warning').length;
  const infoCount = alerts.filter(a => a.type === 'info').length;
  const successCount = alerts.filter(a => a.type === 'success').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-orange-600 p-4 rounded-2xl shadow-2xl">
                <Bell className="w-10 h-10 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-red-600 via-orange-500 to-yellow-600 bg-clip-text text-transparent mb-1">
                🔔 System Alerts
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Real-time notifications and warnings</p>
            </div>
          </div>
        </motion.div>

        {/* Alert Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Critical</p>
                <p className="text-4xl font-bold mt-2">{criticalCount}</p>
                <p className="text-red-200 text-xs mt-1">Urgent attention</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <AlertTriangle className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Warning</p>
                <p className="text-4xl font-bold mt-2">{warningCount}</p>
                <p className="text-yellow-200 text-xs mt-1">Needs review</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <AlertCircle className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Info</p>
                <p className="text-4xl font-bold mt-2">{infoCount}</p>
                <p className="text-blue-200 text-xs mt-1">Informational</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <Info className="w-8 h-8" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Success</p>
                <p className="text-4xl font-bold mt-2">{successCount}</p>
                <p className="text-green-200 text-xs mt-1">Completed</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl backdrop-blur-sm">
                <CheckCircle className="w-8 h-8" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Alerts Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          <AlertsPanel />
        </motion.div>
      </div>
    </div>
  );
}

export default AlertsPage;
