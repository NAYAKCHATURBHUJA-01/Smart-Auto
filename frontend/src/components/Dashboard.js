import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Battery, 
  Thermometer, 
  Zap, 
  AlertTriangle, 
  CheckCircle,
  Activity,
  TrendingUp,
  Bot,
  RefreshCw
} from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useTheme } from '../contexts/ThemeContext';
import SolarPanelCard from './SolarPanelCard';
import RobotStatus from './RobotStatus';
import AlertsPanel from './AlertsPanel';
import AnalyticsChart from './AnalyticsChart';
import EfficiencyChart from './EfficiencyChart';

const Dashboard = () => {
  const { solarPanels, cleaningRobot, alerts, analytics, loading } = useData();
  const { isDark } = useTheme();
  const [selectedPanel, setSelectedPanel] = useState(null);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="solar-gradient p-4 rounded-full"
        >
          <Sun className="h-8 w-8 text-white" />
        </motion.div>
      </div>
    );
  }

  const totalPower = solarPanels.reduce((sum, panel) => sum + panel.powerOutput, 0);
  const averageEfficiency = solarPanels.reduce((sum, panel) => sum + panel.efficiency, 0) / solarPanels.length;
  const criticalAlerts = alerts.filter(alert => alert.type === 'critical').length;
  const warningAlerts = alerts.filter(alert => alert.type === 'warning').length;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Solar Panel Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time monitoring and AI-driven optimization
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Power</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalPower.toFixed(0)}W
                </p>
              </div>
              <div className="energy-gradient p-3 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Efficiency</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {averageEfficiency.toFixed(1)}%
                </p>
              </div>
              <div className="solar-gradient p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Robot Battery</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cleaningRobot?.battery}%
                </p>
              </div>
              <div className="energy-gradient p-3 rounded-lg">
                <Battery className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {criticalAlerts + warningAlerts}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${
                criticalAlerts > 0 ? 'bg-red-500' : 'bg-green-500'
              }`}>
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Solar Panels Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Solar Panels Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solarPanels.map((panel, index) => (
                  <SolarPanelCard
                    key={panel.id}
                    panel={panel}
                    index={index}
                    isSelected={selectedPanel === panel.id}
                    onSelect={() => setSelectedPanel(selectedPanel === panel.id ? null : panel.id)}
                  />
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6">
              <EfficiencyChart data={solarPanels} />
              {analytics && <AnalyticsChart data={analytics.dailyTrends} />}
            </div>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Robot Status */}
            <RobotStatus robot={cleaningRobot} />

            {/* Alerts Panel */}
            <AlertsPanel alerts={alerts} />

            {/* Quick Actions */}
            <div className={`p-6 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-solar-500 hover:bg-solar-600 text-white rounded-lg transition-colors duration-200">
                  <RefreshCw className="h-4 w-4" />
                  <span>Refresh Data</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-energy-500 hover:bg-energy-600 text-white rounded-lg transition-colors duration-200">
                  <Bot className="h-4 w-4" />
                  <span>Start Cleaning</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200">
                  <Activity className="h-4 w-4" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
