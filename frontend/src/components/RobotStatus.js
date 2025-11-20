import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Activity, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const RobotStatus = ({ robot }) => {
  const { isDark } = useTheme();

  if (!robot) return null;

  const getBatteryColor = (battery) => {
    if (battery >= 80) return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    if (battery >= 50) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    if (battery >= 20) return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
    return 'text-red-600 bg-red-100 dark:bg-red-900/20';
  };

  const getModeIcon = (mode) => {
    switch (mode) {
      case 'cleaning': return <Activity className="h-4 w-4 text-blue-500 dark:text-blue-400" />;
      case 'charging': return <Zap className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />;
      case 'idle': return <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500 dark:text-gray-400" />;
    }
  };

  const getModeColor = (mode) => {
    switch (mode) {
      case 'cleaning': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'charging': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'idle': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-6 rounded-xl shadow-lg ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="energy-gradient p-2 rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Cleaning Robot
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Status: {robot.health}
            </p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getModeColor(robot.mode)}`}>
          {getModeIcon(robot.mode)}
          <span className="capitalize">{robot.mode}</span>
        </div>
      </div>

      {/* Battery Level */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Battery Level
          </span>
          <span className={`text-sm font-bold ${getBatteryColor(robot.battery).split(' ')[0]}`}>
            {robot.battery}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${robot.battery}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`h-2 rounded-full ${
              robot.battery >= 80 ? 'bg-green-500' :
              robot.battery >= 50 ? 'bg-yellow-500' :
              robot.battery >= 20 ? 'bg-orange-500' : 'bg-red-500'
            }`}
          />
        </div>
      </div>

      {/* Robot Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Location</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {robot.location}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Last Cleaned</span>
          </div>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {new Date(robot.lastCleaned).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Health Status</span>
          </div>
          <span className={`text-sm font-medium ${
            robot.health === 'Good' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {robot.health}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 space-y-2">
        {robot.mode === 'idle' && (
          <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
            Start Cleaning
          </button>
        )}
        
        {robot.mode === 'cleaning' && (
          <button className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
            Stop Cleaning
          </button>
        )}
        
        {robot.battery < 30 && (
          <button className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium">
            Charge Robot
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default RobotStatus;
