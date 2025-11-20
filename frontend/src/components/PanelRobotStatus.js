import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Activity,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  Sun,
  ArrowRight,
  RotateCw,
  Droplets,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const PanelRobotStatus = ({ robot, panels, onAssignPanel, onStartCleaning }) => {
  const { isDark } = useTheme();
  const [selectedPanel, setSelectedPanel] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const getPanelStatus = (panel) => {
    if (panel.dustLevel >= 80) return 'critical';
    if (panel.dustLevel >= 60) return 'warning';
    if (panel.dustLevel >= 40) return 'good';
    return 'optimal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'good': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'critical': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const handlePanelSelect = (panel) => {
    setSelectedPanel(panel);
    setShowConfirm(true);
  };

  const handleConfirmCleaning = () => {
    if (selectedPanel) {
      onAssignPanel(selectedPanel);
      onStartCleaning(selectedPanel.id);
      setShowConfirm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Panel Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-xl shadow-lg ${
          isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="solar-gradient p-2 rounded-lg">
              <Sun className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Panel Selection
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose a panel to clean
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {panels.map((panel) => {
            const status = getPanelStatus(panel);
            return (
              <motion.button
                key={panel.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePanelSelect(panel)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedPanel?.id === panel.id
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-gray-200 dark:border-gray-700'
                } ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {panel.id}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                    {status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Dust Level</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {panel.dustLevel}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        panel.dustLevel >= 80 ? 'bg-red-500' :
                        panel.dustLevel >= 60 ? 'bg-yellow-500' :
                        panel.dustLevel >= 40 ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${panel.dustLevel}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Last Cleaned
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(panel.lastCleaned).toLocaleDateString()}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      {showConfirm && selectedPanel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl shadow-lg border-2 border-blue-500 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Confirm Cleaning Operation
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Robot will be assigned to clean panel {selectedPanel.id}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getStatusColor(getPanelStatus(selectedPanel))}`}>
              <Droplets className="h-5 w-5" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 px-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Current Dust Level</span>
              <span className="font-medium text-gray-900 dark:text-white">{selectedPanel.dustLevel}%</span>
            </div>
            
            <div className="flex items-center justify-between py-2 px-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Duration</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {Math.ceil(selectedPanel.dustLevel / 20)} minutes
              </span>
            </div>

            <div className="flex items-center justify-between py-2 px-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <span className="text-sm text-gray-600 dark:text-gray-400">Robot Battery Required</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {Math.ceil(selectedPanel.dustLevel / 10)}%
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center space-x-3">
            <button
              onClick={handleConfirmCleaning}
              className="flex-1 py-2 px-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-2"
            >
              <RotateCw className="h-4 w-4" />
              <span>Start Cleaning</span>
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Current Operation */}
      {robot.assignedPanel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl shadow-lg ${
            isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="energy-gradient p-2 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Current Operation
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Panel {robot.assignedPanel}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Time Elapsed</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {robot.timeElapsed || '0:00'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Cleaning Progress</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {robot.cleaningProgress || 0}%
              </span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${robot.cleaningProgress || 0}%` }}
                className="h-2 rounded-full bg-blue-500"
              />
            </div>
          </div>

          {robot.mode === 'cleaning' && (
            <button
              className="mt-4 w-full py-2 px-4 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Stop Operation</span>
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default PanelRobotStatus;